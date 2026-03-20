## MODIFIED Requirements

### Requirement: 首頁呈現章節導覽連結
系統 SHALL 在首頁（`site/content/_index.md`）正文中明確列出以下 9 個章節連結，使用 Hugo 相對路徑格式：

- `[導言：理解 Model、Agent 與 Coding Agent](/lessons/ch-intro-ai/)`
- `[0. 課前暖身：AI 輔助開發的現況與痛點](/lessons/ch0-warmup/)`
- `[1. Vibe Coding 與快速原型](/lessons/ch1-vibe-coding/)`
- `[2. 從 MVP 到規格 — 歡迎來到 Brownfield](/lessons/ch2-mvp-to-spec/)`
- `[3. Technical Spec 與 OpenSpec 工作流](/lessons/ch3-openspec/)`
- `[4. Coding Agent 結構化開發](/lessons/ch4-coding-agent/)`
- `[5. 驗證、測試與可觀測性](/lessons/ch5-verify-observe/)`
- `[6. 團隊導入策略與最佳實踐](/lessons/ch6-team/)`
- `[附錄：工具安裝與環境設定](/lessons/appendix-setup/)`

#### Scenario: 首頁包含所有章節連結
- **WHEN** 讀取 `site/content/_index.md`
- **THEN** 正文 MUST 包含指向 `/lessons/ch-intro-ai/`、`/lessons/ch0-warmup/`、`/lessons/ch1-vibe-coding/`、`/lessons/ch2-mvp-to-spec/`、`/lessons/ch3-openspec/`、`/lessons/ch4-coding-agent/`、`/lessons/ch5-verify-observe/`、`/lessons/ch6-team/`、`/lessons/appendix-setup/` 的連結
