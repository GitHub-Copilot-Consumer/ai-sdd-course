## MODIFIED Requirements

### Requirement: Coding Agent 特性內容
導言章節正文 MUST 包含「什麼是 Coding Agent」段落，說明 Coding Agent 是 Agent 特化於程式碼領域的版本，並 MUST 明確列出以下三種 Coding Agent 專屬工具：
- 檔案讀寫（讀取與修改程式碼檔案）
- 終端機執行（執行指令、測試、建置）
- Codebase 搜尋（理解專案結構）

段落 MUST 以小結引橋到後續課程，說明「為何 Coding Agent 需要規格」。

正文 MUST 在「什麼是 Coding Agent」節之後、「小結」節之前，包含一個標題為「主流 Coding Agent CLI 比較」的 H2 節，該節的完整需求由 `cli-comparison` spec 定義。

#### Scenario: Coding Agent 專屬工具列舉完整
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 正文
- **THEN** MUST 包含「檔案讀寫」或「讀寫檔案」、「終端機」、「搜尋」相關的工具說明

#### Scenario: 引橋段落存在
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 正文末尾
- **THEN** MUST 包含連結或引導語句，指向後續章節（如「下一章」或「規格驅動」的提及）

#### Scenario: CLI 比較節位置正確
- **WHEN** 讀取 `site/content/lessons/ch-intro-ai.md` 正文結構
- **THEN** 「主流 Coding Agent CLI 比較」H2 節 MUST 出現在「什麼是 Coding Agent」H2 節之後，且在「小結」H2 節之前
