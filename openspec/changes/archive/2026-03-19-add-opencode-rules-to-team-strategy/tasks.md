## 1. 新增 OpenCode Rules 設定段落至 ch6-team.md

- [x] 1.1 在 `site/content/lessons/ch6-team.md` 的「專案結構標準化」段落結束後、「導入 Roadmap」段落之前，新增 H2 標題「## OpenCode Rules 設定」，並撰寫引言說明 AGENTS.md 的用途（公共規則、提交至 Git）
- [x] 1.2 在「OpenCode Rules 設定」段落內，新增「### 專案級規則（AGENTS.md）」子段落，說明建立方式，並加入使用 Hugo + OpenSpec 情境的 AGENTS.md 範例程式碼區塊（包含專案技術說明、目錄結構說明、開發規範至少 2 條）
- [x] 1.3 在「OpenCode Rules 設定」段落內，新增「### 個人/全域規則」子段落，說明 `~/.config/opencode/AGENTS.md` 的路徑與用途（個人化設定、不提交至 Git）
- [x] 1.4 在「OpenCode Rules 設定」段落內，新增「### 透過 opencode.json 引用現有文件」子段落，說明 `instructions` 欄位的用途（不需複製規則、直接複用現有文件），並加入包含 glob 模式與具體路徑的 `opencode.json` 範例程式碼區塊

## 2. 更新 Week 1–2 Roadmap 行動項目表格

- [x] 2.1 在 `ch6-team.md` 的「Week 1–2」行動項目表格中，在「建立並推送 `.github/copilot-instructions.md`」列之後，新增一列：行動項目為「建立並推送專案 `AGENTS.md`，設定 OpenCode 公共規則」，負責角色為 Tech Lead，交付物為「`AGENTS.md` PR 合入 main branch」

## 3. Commit

- [x] 3.1 執行 `git add site/content/lessons/ch6-team.md` 並提交，commit message 遵循 conventional commit 格式：`docs(ch6): add OpenCode rules setup section to team adoption strategy`
