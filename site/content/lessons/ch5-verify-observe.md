---
title: "5. 驗證、測試與可觀測性"
weight: 6
description: 用 openspec verify 確認實作符合規格，為 Brownfield 建立基礎可觀測性，最後以 archive 完成整個 SDD 循環。
showToc: true
---

> 用 openspec verify 確認實作符合規格，為 Brownfield 建立基礎可觀測性，最後以 archive 完成整個 SDD 循環。

## 學習目標

本章結束後，你將能夠：

- **執行** `openspec verify` 的完整流程，解讀 Drift 輸出並修復
- **應用** SDD + TDD 並用的測試策略，從 Spec Scenario 生成測試案例
- **使用** AI 為既有 Brownfield 程式碼加入 structured logging 與 error tracking
- **操作** `/opsx:explore` 在既有 codebase 中調查問題
- **完成** `openspec archive` 歸檔，讓規格成為活文件

---

## Spec 驗證：openspec verify

你在 Ch4 完成了所有實作，但「tasks 全打勾」不等於「實作符合規格」。`openspec verify` 做的是更嚴格的事：逐條對照 `specs/` 中的每個 Requirement 和 Scenario，確認 codebase 裡真的有對應的實作。

### 執行方式

```bash
openspec verify --change "formalize-todo-api"
```

### 通過情境（全部符合）

```
Checking 5 requirements...
  ✔ Todo can be created with a non-empty title
  ✔ Creating todo with empty title returns 400 error
  ✔ Todo list returns all existing todos
  ✔ Deleting non-existent todo returns 404
  ✔ Marking todo as complete updates its status

Result: 5/5 requirements satisfied
Ready to archive!
```

### Drift 情境（發現偏離）

```
Checking 5 requirements...
  ✔ Todo can be created with a non-empty title
  ✔ Creating todo with empty title returns 400 error
  ✔ Todo list returns all existing todos
  ✗ DRIFT: Deleting non-existent todo returns 404
    Expected: DELETE /todos/:id returns 404 with { error: "Todo not found" }
    Found: DELETE handler has no id validation, returns 200 regardless
  ✔ Marking todo as complete updates its status

Result: 4/5 requirements satisfied
Action required: Fix drift before archiving
```

### 修復 Drift 的標準流程

當 `verify` 發現 Drift，不要直接手動修程式碼——按照 SDD 流程處理：

**Step 1：回到 tasks.md，補充遺漏的 task**
```markdown
## Tasks

- [x] 加入 title 非空驗證
- [x] 加入基本 CRUD endpoint
- [ ] **[補充]** 加入 DELETE 的 404 處理（來自 verify drift）
```

**Step 2：在 OpenCode 中執行 apply，完成補充的 task**
```
[Build Mode]
/opsx-apply formalize-todo-api

請完成 tasks.md 中最後一個未完成的 task：
加入 DELETE /todos/:id 的 404 驗證
```

**Step 3：重新執行 verify**
```bash
openspec verify --change "formalize-todo-api"
# 直到全部通過
```

**重要原則：** Drift 是正常的。完美的 Spec 不存在，`verify` 的目的不是懲罰你，而是讓你知道「還差哪一步」。

---

## AI 輔助測試

`openspec verify` 確認的是「實作方向正確」，但還需要測試確認「實作細節無誤」。SDD 和 TDD 不是競爭關係——Spec 的 Scenario 是測試案例天然的來源。

### Scenario → Test Case 的對應

你的 `spec.md` 裡每個 Scenario 都是一個測試案例的骨架：

**Spec 中的 Scenario：**
```markdown
#### Scenario: 刪除不存在的 Todo 返回 404
- **GIVEN** 系統中不存在 id 為 "999" 的 todo
- **WHEN** 呼叫 DELETE /todos/999
- **THEN** 回應狀態碼 SHALL 為 404
- **AND** 回應 body SHALL 包含 `{ "error": "Todo not found" }`
```

**對應的測試程式碼（AI 生成）：**
```javascript
test('刪除不存在的 todo 應返回 404', async () => {
  const response = await request(app)
    .delete('/todos/999')
    .expect(404);

  expect(response.body).toEqual({ error: 'Todo not found' });
});
```

### 用 AI 生成測試的 Prompt 範例

把你的 `spec.md` 貼給 Copilot，然後問：

```
以下是我的 OpenSpec 規格文件（spec.md）：

[貼上 specs/todo-api/spec.md 的內容]

請根據每個 Scenario 生成對應的 Jest 測試案例。
規則：
- 使用 supertest 測試 Express API
- 每個 Scenario 對應一個 test() 函式
- 測試名稱直接使用 Scenario 標題
- 不要省略任何 Scenario
```

**AI 會逐一對應每個 Scenario 生成測試**，讓你的測試覆蓋率與 Spec 的完整度直接掛鉤。

---

## 運行時可觀測性

實作完成、測試通過之後，Brownfield 開發還有一個常被忽略的環節：**你能在 production 看到正在發生什麼嗎？**

本節不是完整的 Observability 教學，而是聚焦在一個具體問題：**如何用 AI 工具為 Brownfield 既有程式碼快速建立基礎可觀測性**。

### Structured Logging（結構化日誌）

Vibe Coding 的 MVP 通常只有 `console.log`，甚至完全沒有 log。在進入 Brownfield 迭代後，你需要讓 log 變得「可被機器讀取」。

**Prompt 範例：批量加入 structured logging**

```
#file:src/index.js

目前這個 Express API 完全沒有 logging。
請：
1. 引入 pino 套件（結構化 JSON logger）
2. 為每個 API endpoint 加入 request log（method、path、statusCode、durationMs）
3. 為所有 error 情境加入 error log（errorMessage、stack）
4. 不要改動任何現有的業務邏輯，只加入 logging
```

**預期輸出格式：**
```json
{"level":"info","time":1704067200000,"method":"POST","path":"/todos","statusCode":201,"durationMs":12}
{"level":"error","time":1704067201000,"method":"DELETE","path":"/todos/999","error":"Todo not found","statusCode":404}
```

結構化 log 讓你能用工具（Datadog、Grafana、Loki）直接查詢，而不是用 `grep` 手動找 log。

---

### Error Tracking（錯誤追蹤）

Structured logging 記錄「你預期會發生的事」，Error Tracking 記錄「你沒預期的事」（例外）。

**基本概念：**

```
用戶操作 → API 處理 → 發生例外 → Error Tracking 接收
                                         ↓
                               開發者收到通知（Slack、Email）
                               包含：stack trace、用戶 context、發生頻率
```

**用 AI 加入基本 Error Tracking 的 Prompt：**

```
#file:src/index.js

請在 Express app 加入全域 error handler：
1. 捕獲所有未處理的例外（unhandledRejection、uncaughtException）
2. 記錄 error log（包含 stack trace）
3. 為 API 加入統一的 error response 格式（{ error: message, requestId }）
4. 留下 // TODO: 整合 Sentry/Datadog 的位置標記
```

---

### Health Check

讓 infrastructure（Load Balancer、Kubernetes）知道服務是否健康：

```
請為 Express API 加入 GET /health endpoint：
回應格式：
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## AI 輔助 Debug

當 production 出現問題，Brownfield 的挑戰是：你需要在複雜的既有 codebase 中快速定位問題。`/opsx:explore` 是你的第一道武器。

### 使用 `/opsx:explore` 調查問題

**情境：** 用戶回報「有時候刪除 todo 之後，它還是出現在列表裡」

```
[Plan Mode]
/opsx:explore 請調查以下問題：
用戶回報刪除 todo 後仍出現在列表，具體描述：
- DELETE /todos/:id 返回 200
- 但立即 GET /todos 仍能看到該 todo

請分析：
1. DELETE handler 的實作邏輯（index.js）
2. 刪除後是否有任何 cache 或 state 沒有被清除？
3. id 比較邏輯是否有型別問題？
```

**AI 的調查報告：**
```
Investigation Report:

## Root Cause Candidates

1. **Type Mismatch (High Probability)**
   DELETE handler 使用 === 比較 id：
   File: index.js:52
   Code: todos = todos.filter(t => t.id !== req.params.id)
   問題：t.id 是 number（1, 2, 3...），req.params.id 是 string（"1", "2"...）
   === 比較 number !== string，所以 filter 永遠不會刪除任何元素

## Fix
   將比較改為：t.id !== parseInt(req.params.id)
   或統一使用 string id（推薦）
```

**用 Copilot 分析 Log 的 Prompt：**

```
以下是 production log 中出現的錯誤：

[貼上 JSON log 片段]

請：
1. 解釋這個錯誤的含義
2. 分析最可能的根本原因
3. 說明如何在 code 中重現這個問題
```

---

## openspec archive：讓規格成為活文件

`verify` 全部通過，代表實作與規格一致。最後一步：**歸檔**。

### 什麼是 Archive？

歸檔的動作是把 `openspec/changes/<name>/specs/` 下的 delta spec（這個 change 的規格）合併回 `openspec/specs/`（整個產品的主規格庫）。

```
Before archive:
openspec/
├── specs/                    ← 主規格庫（空的）
└── changes/
    └── formalize-todo-api/
        ├── proposal.md
        ├── specs/
        │   └── todo-api/
        │       └── spec.md   ← delta spec

After archive:
openspec/
├── specs/
│   └── todo-api/
│       └── spec.md           ← 已合併入主規格庫
└── changes/
    └── archive/
        └── formalize-todo-api/  ← 已歸檔
```

隨著每個 change 完成並歸檔，`openspec/specs/` 逐漸累積成一份**活的產品規格文件**——任何時候都能看到「這個產品目前確認可以做到什麼」。

### 執行方式

```bash
openspec archive --change "formalize-todo-api"
```

預期輸出：
```
Archiving change 'formalize-todo-api'...
  ✔ Merged specs/todo-api/spec.md → openspec/specs/todo-api/spec.md
  ✔ Marked change as archived

Archive complete!
History preserved at: openspec/changes/archive/formalize-todo-api/
```

### 歸檔後確認

```bash
# 確認主規格庫已更新
ls openspec/specs/
# todo-api/

# 確認 change 已歸檔
openspec status --change "formalize-todo-api"
# Status: archived
```

---

## Lab 實戰

**目標：** 對 Ch4 的實作執行 verify、修復 drift、加入 structured logging，最後完成 archive。

**前置條件：**
- 完成 Ch4 Lab（`tasks.md` 所有項目為 `[x]`，API 可正常啟動）

---

### Part 1：Spec 驗證

**Step 1：執行 verify**

```bash
openspec verify --change "formalize-todo-api"
```

**Step 2：記錄結果**

- 如果全部通過 → 直接進入 Part 2
- 如果有 DRIFT → 繼續 Step 3

**Step 3：修復 Drift（如有）**

按照本章「修復 Drift 的標準流程」處理：
1. 在 `tasks.md` 補充對應的修復 task
2. 用 OpenCode Build Mode 完成修復
3. 重新執行 `openspec verify` 直到全部通過

---

### Part 2：加入 Structured Logging

**Step 1：安裝 pino**

```bash
npm install pino pino-pretty
```

**Step 2：用 Copilot 生成 logging 程式碼**

把以下 Prompt 貼入 Copilot Chat：
```
#file:index.js

請為這個 Express API 加入 pino structured logging：
1. 每個 endpoint 記錄 request log（method、path、statusCode、durationMs）
2. 每個 error 情境記錄 error log（errorMessage）
3. 使用 pino 的 JSON 格式輸出
4. 不修改任何業務邏輯
```

**Step 3：驗證 logging 正常輸出**

```bash
node index.js &
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"title":"test"}'
# 確認終端機有 JSON 格式的 log 輸出
```

---

### Part 3：Archive

```bash
openspec archive --change "formalize-todo-api"
```

確認 `openspec/specs/todo-api/spec.md` 存在。

---

**Done criteria：**
- `openspec verify` 全部通過（5/5 requirements satisfied）
- `index.js` 中有 pino logging，每個 endpoint 有對應的 request log
- `openspec archive` 執行成功，`openspec/specs/todo-api/spec.md` 存在

> 恭喜！你完成了完整的 SDD 循環：Vibe Coding MVP → 回推 Proposal → Technical Spec → Coding Agent 實作 → Verify → Archive。  
> 下一章，我們看看如何把這套流程推廣到整個團隊。
