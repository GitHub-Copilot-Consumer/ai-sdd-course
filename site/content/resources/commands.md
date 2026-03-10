---
title: 常用 OPSX 指令速查
weight: 1
description: OpenSpec/OpenCode 常用指令快速參考手冊
showToc: true
---

## OPSX 核心指令

| 指令 | 用途 |
|------|------|
| `/opsx:explore` | 探索需求、調查瓶頸、釐清模糊問題 |
| `/opsx:new <name>` | 建立新的變更工作區 (Change Workspace) |
| `/opsx:ff` | Fast-Forward，一次生成所有規格文件 (Proposal → Tasks) |
| `/opsx:apply` | AI 讀取 `tasks.md` 並自動撰寫程式碼 |
| `/opsx:verify` | 檢查程式碼是否符合 Spec，偵測偏移 (Drift) |
| `/opsx:archive` | 完成開發，將變更合併回主規格文件 |

---

## 指令詳細說明

### `/opsx:explore`

**階段：** 探索

在寫 Code 前先調查瓶頸、釐清模糊需求。

```
範例：「網站變慢了，先 explore 再決定要改什麼」
```

---

### `/opsx:new <name>`

**階段：** 啟動

建立新的變更資料夾（Change Workspace）。`<name>` 使用 kebab-case。

```
/opsx:new add-user-auth
/opsx:new fix-payment-bug
```

---

### `/opsx:ff`

**階段：** 規劃

Fast-Forward 快速生成。一次從 Proposal 推進到 Tasks，適合需求清晰的情境。

---

### `/opsx:apply`

**階段：** 實作

AI 讀取 `tasks.md` 並逐一完成實作任務，同步標記完成進度。

---

### `/opsx:verify`

**階段：** 驗證

關鍵步驟。對比程式碼實作與 Spec 要求，輸出 Drift Report，確保交付符合規格。

---

### `/opsx:archive`

**階段：** 歸檔

完成開發後，將變更的 Spec 合併回 `openspec/specs/` 主目錄，並清理 Change Workspace。

---

## OpenSpec CLI 基本指令

```bash
# 安裝
npm install -g @fission-ai/openspec

# 初始化專案
openspec init

# 查看變更狀態
openspec status --change <name>

# 列出所有變更
openspec list

# 取得 Artifact 建立指引
openspec instructions <artifact-id> --change <name>
```
