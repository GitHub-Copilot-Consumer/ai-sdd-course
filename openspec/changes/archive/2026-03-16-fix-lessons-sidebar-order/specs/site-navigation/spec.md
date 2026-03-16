## MODIFIED Requirements

### Requirement: 課程 sidebar 排序規則
課程頁面的 sidebar 順序 SHALL 由各頁面 front matter 中的 `weight` 欄位控制，且所有課程頁面的 `weight` 值 MUST 為非零正整數（≥ 1）或負整數，不得使用 `0`，以避免 Hugo 將其視為未設定而排至最後。

課程頁面的 `weight` 值 MUST 依照以下明確清單設定：

| 檔案 | weight |
|------|--------|
| `site/content/lessons/ch-intro-ai.md` | `-1` |
| `site/content/lessons/ch0-warmup.md` | `1` |
| `site/content/lessons/ch1-copilot.md` | `2` |
| `site/content/lessons/ch2-sdd.md` | `3` |
| `site/content/lessons/ch3-openspec.md` | `4` |
| `site/content/lessons/ch4-opencode.md` | `5` |
| `site/content/lessons/ch5-team.md` | `6` |

#### Scenario: sidebar 顯示順序正確
- **WHEN** 瀏覽 `/lessons/` 頁面的左側 sidebar
- **THEN** 課程項目 MUST 依序顯示為：導言 → 0. 課前暖身 → 1. GitHub Copilot Chat → 2. 解決雜亂無章 → 3. OpenSpec 與 OPSX 工作流 → 4. 跨越生態系 → 5. 團隊導入策略

#### Scenario: ch0-warmup 不排在最後
- **WHEN** 讀取 `site/content/lessons/ch0-warmup.md` 的 front matter
- **THEN** `weight` MUST 為 `1`（非 `0`）
