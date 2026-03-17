---
title: everything-claude-code 資源介紹
weight: 2
description: 介紹 everything-claude-code agent harness 系統及其與 OpenCode 的整合方式
showToc: true
---

## 專案簡介

**everything-claude-code** 是一個由社群開發的 **agent harness 系統**（v1.8.0，Mar 2026），旨在強化 AI 輔助開發工具的能力與工作流程自動化。

此系統支援多種主流 AI 開發工具：

| 工具 | 支援狀態 |
|------|---------|
| Claude Code | ✅ 完整支援 |
| OpenCode | ✅ 完整支援（v1.3.0 起） |
| Cursor | ✅ 支援 |
| Codex | ✅ 支援 |

**GitHub：** [https://github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

---

## 核心元件

everything-claude-code 由五個核心元件組成，各自負責不同的強化功能：

| 元件 | 說明 |
|------|------|
| **Skills** | 可重複使用的工作流程模組，封裝特定領域的操作步驟（如 TDD、Debug、Code Review）|
| **Hooks** | 事件驅動的自動化觸發器，在特定操作前後自動執行指定邏輯 |
| **Commands** | 自訂斜線指令（slash commands），讓 AI 能夠執行預定義的複雜操作 |
| **Rules** | 行為規範與限制條件，確保 AI 在指定的操作範圍內運作 |
| **Instincts** | 預載的情境判斷規則，讓 AI 在特定情況下自動採取最佳行動策略 |

---

## 安裝方式

### Plugin 安裝（推薦）

最簡便的方式是透過 npm 安裝為 Plugin：

```bash
npm install -g everything-claude-code
```

安裝後，Plugin 會自動偵測並整合到支援的工具中。

### 手動安裝

若需要手動安裝或客製化設定，請依以下步驟操作：

1. Clone 專案倉庫：

   ```bash
   git clone https://github.com/affaan-m/everything-claude-code.git
   ```

2. 進入專案目錄並安裝依賴：

   ```bash
   cd everything-claude-code
   npm install
   ```

3. 將所需的元件目錄（`skills/`、`hooks/`、`commands/` 等）複製到你的專案根目錄或工具設定路徑。

4. 依照各工具的設定方式指定路徑（詳見下方「與 OpenCode 整合」章節）。

---

## 與 OpenCode 整合

### 整合步驟

**方式一：Plugin 設定（推薦）**

在 OpenCode 的設定檔（`~/.config/opencode/config.json` 或專案根目錄的 `.opencode/config.json`）中加入 Plugin：

```json
{
  "plugins": [
    "everything-claude-code"
  ]
}
```

儲存後重新啟動 OpenCode，Plugin 中的 Skills、Commands 等元件會自動載入。

**方式二：手動路徑設定**

若使用手動安裝，可在 OpenCode 設定中指定各元件的絕對路徑：

```json
{
  "skillsDir": "/path/to/everything-claude-code/skills",
  "hooksDir": "/path/to/everything-claude-code/hooks"
}
```

---

### 使用場景範例

#### 場景一：Skills 整合 — 套用 TDD 工作流程

everything-claude-code 內建多種 Skills，其中 `tdd-workflow` Skill 可讓 OpenCode 自動遵循紅綠重構循環。

啟用後，只需在對話中呼叫：

```
/tdd-workflow
```

OpenCode 便會依照 Skills 整合的指引，先寫測試、再實作、最後重構，全程自動標記進度。

#### 場景二：Hooks 自動化 — 提交前自動驗證

透過 Hooks 自動化，可在每次 git commit 前自動觸發程式碼品質檢查：

```json
{
  "hooks": {
    "pre-commit": "everything-claude-code/hooks/pre-commit-lint"
  }
}
```

設定完成後，每次提交時 Hooks 自動化流程會自動執行 lint、測試覆蓋率檢查，若不符合標準則阻止提交，確保程式碼品質。

---

## 延伸資源

- **GitHub 倉庫：** [https://github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- **版本參考：** v1.8.0（Mar 2026）
- **授權：** MIT License
