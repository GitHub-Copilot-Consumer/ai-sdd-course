## ADDED Requirements

### Requirement: 循序步驟與流程使用 Hextra steps shortcode
課程內容中所有「循序步驟」與「循序流程」的段落 SHALL 使用 Hextra `{{% steps %}}` shortcode 呈現，且 shortcode 內部 SHALL 使用 `### h3` heading 作為每個步驟的標題。

#### Scenario: 操作型步驟使用 steps shortcode
- **WHEN** 課程內容包含 How-to 流程或 Lab 操作步驟（如「Step 1: 安裝套件」、「Step 2: 執行指令」）
- **THEN** 這些步驟 SHALL 被包裹在 `{{% steps %}}` ... `{{% /steps %}}` 之間，且每個步驟標題 SHALL 為 `### ` heading

#### Scenario: 概念型循序流程使用 steps shortcode
- **WHEN** 課程內容包含概念型因果流程（如「Metrics → Logs → Traces 問題排查 Workflow」）
- **THEN** 這些流程 SHALL 使用 `{{% steps %}}` 呈現，以數字順序取代 ASCII 箭頭表達循序關係

#### Scenario: 非循序圖表不使用 steps shortcode
- **WHEN** 課程內容包含架構圖、span 樹狀結構、before/after 檔案樹、資料流程圖等非循序視覺圖表
- **THEN** 這些圖表 SHALL 保持現有格式（ASCII code block、Markdown table 等），不使用 `{{% steps %}}`

### Requirement: ADR-002 記錄 steps shortcode 使用決策
`openspec/adr/ADR-002-use-hextra-steps-shortcode.md` SHALL 存在，記錄使用 Hextra `{{% steps %}}` shortcode 的決策背景、規範與適用範圍。

#### Scenario: ADR-002 包含完整決策記錄
- **WHEN** 維護者查閱 ADR-002
- **THEN** 文件 SHALL 包含：決策背景（為何不繼續使用粗體文字/ASCII）、適用範圍定義（循序步驟 vs 非循序圖表）、語法規範（`### h3` heading 要求）、遷移範圍（已遷移的檔案清單）
