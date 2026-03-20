## Context

首頁 `site/content/_index.md` 中「課程章節」的連結清單是靜態 Markdown 列表，直接以 hardcoded URL 指向各 lesson 頁面。隨著課程重構，lesson 的檔案 slug 已更新（例如 `ch1-copilot` → `ch1-vibe-coding`、`ch2-sdd` → `ch2-mvp-to-spec`），但首頁連結未同步修改，導致 4 個連結失效，且新增的兩個章節（ch5-verify-observe、ch6-team）與附錄頁面未列出。

Hugo 靜態站點在 `site/content/_index.md` 中維護首頁內容。課程章節清單是純文字的 Markdown 連結，沒有動態生成機制。

## Goals / Non-Goals

**Goals:**
- 更新 `site/content/_index.md` 中所有課程章節連結，與 `site/content/lessons/` 下的實際檔案一一對應
- 確保章節標題與各 lesson 頁面的 `title` front matter 一致
- 補上目前缺少的章節（ch5-verify-observe、ch6-team、appendix-setup）

**Non-Goals:**
- 不修改任何 lesson 內容頁面
- 不變更 Hugo 主題或佈局
- 不新增動態生成課程清單的機制

## Decisions

### 決策：直接修改 `_index.md` 的靜態連結清單

- **選項 A（採用）**：直接修改 `site/content/_index.md`，用一個明確的靜態連結清單取代現有的錯誤清單。
- **選項 B（不採用）**：改用 Hugo shortcode 或 data file 動態生成章節清單。

採用選項 A，因為：
1. 現有架構已是靜態清單，保持一致性
2. 課程章節數量固定，不需要動態機制
3. 改動最小，風險最低，符合「簡單可讀」原則

### 課程章節對應表（明確清單）

| 顯示名稱 | URL 路徑 |
|---------|---------|
| 導言：理解 Model、Agent 與 Coding Agent | `/lessons/ch-intro-ai/` |
| 0. 課前暖身：AI 輔助開發的現況與痛點 | `/lessons/ch0-warmup/` |
| 1. Vibe Coding 與快速原型 | `/lessons/ch1-vibe-coding/` |
| 2. 從 MVP 到規格 — 歡迎來到 Brownfield | `/lessons/ch2-mvp-to-spec/` |
| 3. Technical Spec 與 OpenSpec 工作流 | `/lessons/ch3-openspec/` |
| 4. Coding Agent 結構化開發 | `/lessons/ch4-coding-agent/` |
| 5. 驗證、測試與可觀測性 | `/lessons/ch5-verify-observe/` |
| 6. 團隊導入策略與最佳實踐 | `/lessons/ch6-team/` |
| 附錄：工具安裝與環境設定 | `/lessons/appendix-setup/` |

## Risks / Trade-offs

- [風險] 未來 lesson slug 再次變更時，首頁連結又會失效 → 緩解：此次變更後可在 ADR 或 README 中記錄「首頁清單需與 lesson 檔案同步維護」的規範
- [Trade-off] 靜態清單需手動維護，但對於固定課程內容這是可接受的成本
