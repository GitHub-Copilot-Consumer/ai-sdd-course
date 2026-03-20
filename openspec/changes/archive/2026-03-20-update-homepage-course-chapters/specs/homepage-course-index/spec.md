## ADDED Requirements

### Requirement: 首頁課程章節索引
系統 SHALL 在首頁（`site/content/_index.md`）的「課程章節」區塊中，列出以下明確的章節連結清單（依序）：

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

連結文字 MUST 與對應 lesson 頁面的 `title` front matter 完全一致。

#### Scenario: 首頁包含所有 9 個章節連結
- **WHEN** 讀取 `site/content/_index.md`
- **THEN** 正文 MUST 包含指向以下 9 個路徑的 Markdown 連結：`/lessons/ch-intro-ai/`、`/lessons/ch0-warmup/`、`/lessons/ch1-vibe-coding/`、`/lessons/ch2-mvp-to-spec/`、`/lessons/ch3-openspec/`、`/lessons/ch4-coding-agent/`、`/lessons/ch5-verify-observe/`、`/lessons/ch6-team/`、`/lessons/appendix-setup/`

#### Scenario: 連結標題與 lesson 頁面 title 一致
- **WHEN** 比對 `site/content/_index.md` 中的連結文字與各 lesson 的 `title` front matter
- **THEN** 每個連結的顯示文字 MUST 與對應 lesson 的 `title` 完全相符

#### Scenario: 不包含已廢棄的舊連結
- **WHEN** 讀取 `site/content/_index.md`
- **THEN** 正文 MUST NOT 包含指向 `/lessons/ch1-copilot/`、`/lessons/ch2-sdd/`、`/lessons/ch4-opencode/`、`/lessons/ch5-team/` 的連結
