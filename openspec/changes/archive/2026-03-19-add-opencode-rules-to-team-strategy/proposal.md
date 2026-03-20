## Why

目前 Ch6 的團隊導入策略缺乏 OpenCode rules 設定的說明，導致團隊在導入 AI 輔助開發時無法建立一致的 AI 行為準則與共享設定。加入 OpenCode rules（`AGENTS.md` / `opencode.json`）的介紹，讓團隊能夠在版本控管中維護公共規則，並預留個人與全域設定的空間，是完整團隊導入流程的必要環節。

## What Changes

- 在 Ch6 的導入策略段落中，新增「OpenCode Rules 設定」小節
- 說明專案級 `AGENTS.md` 的用途（提交至 Git，供團隊共享）
- 說明 `opencode.json` 的 `instructions` 欄位，支援引用多個規則檔與 glob 模式
- 說明個人/全域規則（`~/.config/opencode/AGENTS.md`）的用途，預留個人設定空間
- 提供具體範例：如何從現有文件（如 `CONTRIBUTING.md`、`docs/`）自動載入規則
- 說明 Claude Code 相容性備援（`CLAUDE.md`）供從 Claude Code 遷移的團隊參考

## Capabilities

### New Capabilities

- `ch6-opencode-rules-setup`: Ch6 新增 OpenCode Rules 設定段落，涵蓋專案級、全域級設定，以及透過 `opencode.json` 引用外部規則檔的方法

### Modified Capabilities

- `ch6-team`: Ch6 導入 Roadmap 的「Week 1–2：工具安裝與觀念對齊」段落新增 OpenCode Rules 設定步驟

## Impact

- 修改 `site/content/lessons/ch6-team.md`，新增規則設定相關段落
- 需建立或更新 `AGENTS.md` 範例片段作為教學素材
- 不影響現有頁面路由、front matter 或 Hugo 設定
