## Context

目前 `site/content/lessons/ch6-team.md` 的「Week 1–2：觀念對齊與工具安裝」段落與「專案結構標準化」章節已涵蓋 OpenSpec 設定，但完全缺少 OpenCode 行為規則（`AGENTS.md` / `opencode.json`）的說明。

團隊導入 AI 輔助開發時，若沒有共享的規則設定，各工程師的 OpenCode 行為將不一致，容易產生 AI Drift 或不符合專案慣例的輸出。OpenCode 的 rules 功能提供了三層設定機制（專案級、全域/個人級、`opencode.json` 引用），完全符合「版本管理公共設定、預留個人彈性」的團隊需求。

Hugo 靜態網站、無 JavaScript build pipeline，異動僅為 Markdown 內容修改，複雜度低。

## Goals / Non-Goals

**Goals:**
- 在 Ch6 新增「OpenCode Rules 設定」獨立段落，包含專案級與個人級規則說明
- 在 Week 1–2 Roadmap 表格中加入 Rules 設定的行動項目
- 提供可直接複用的 `AGENTS.md` 與 `opencode.json` 範例程式碼區塊
- 說明 `opencode.json` `instructions` 欄位的 glob 模式用法（複用現有文件）

**Non-Goals:**
- 不修改 `openspec/config.yaml` 的說明（已有獨立章節）
- 不介紹全部 OpenCode 設定項目，僅聚焦 rules 與 instructions
- 不修改 Hugo 主題、CSS、front matter

## Decisions

### 決策 1：新段落插入位置 — 放在「專案結構標準化」之後、「導入 Roadmap」之前

**選項：**
- A. 插入「專案結構標準化」之後（獨立 H2 段落）← 選擇此方案
- B. 合併到「專案結構標準化」內作為子章節

**理由：** Rules 設定與目錄結構同屬「團隊共識建立」類，但性質上是「AI 行為規範」而非「檔案結構」，獨立 H2 讓讀者可直接跳轉，也便於未來擴充。

### 決策 2：範例程式碼策略 — 使用具體專案情境而非泛用模板

**選項：**
- A. 使用泛用模板（`YOUR_PROJECT_NAME`、佔位符）
- B. 使用與課程一致的情境（Hugo + OpenSpec）← 選擇此方案

**理由：** Ch6 讀者剛完成整個課程，使用熟悉的情境能直接對應到自己的專案，降低認知負擔。

### 決策 3：`opencode.json` instructions glob 範例 — 引用現有文件而非創建新文件

直接在範例中展示引用 `CONTRIBUTING.md`、`docs/guidelines.md`、`openspec/specs/*/spec.md` 等現有工件，強調「不需要複製規則，直接引用」的價值。

## Risks / Trade-offs

- [風險] 範例程式碼若過長會影響頁面可讀性 → 使用折疊區塊或精簡範例，保留最具代表性的 3–5 條規則
- [Trade-off] 獨立 H2 增加頁面 TOC 項目數，但提升可發現性，接受此 trade-off
