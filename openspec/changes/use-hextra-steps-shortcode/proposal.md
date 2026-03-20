## Why

課程內容中大量的步驟說明與工作流程目前使用不一致的格式（`**Step N:**` 粗體文字、`#### h4` 標題、ASCII art 程式碼區塊），無法呈現 Hextra 原生的視覺層次。統一改用 Hextra `{{% steps %}}` shortcode 能提升閱讀體驗，並建立可長期維護的內容標準。

## What Changes

- **新增 ADR-002**：記錄「所有循序步驟與流程內容一律使用 Hextra `{{% steps %}}` shortcode」的決策
- **遷移 `sdd/ch1-vibe-coding.md`**：將 copilot-instructions 設定流程（3 steps）轉換為 `{{% steps %}}`
- **遷移 `sdd/ch2-mvp-to-spec.md`**：將 Lab OpenSpec init 流程（4 steps）轉換為 `{{% steps %}}`
- **遷移 `sdd/ch3-openspec.md`**：將 Fast-Forward workflow（4 steps）轉換為 `{{% steps %}}`
- **遷移 `sdd/ch4-coding-agent.md`**：將 Coding Agent workflow（4 steps）轉換為 `{{% steps %}}`
- **遷移 `sdd/ch5-verify-observe.md`**：轉換多個位置：問題排查 Workflow（ASCII）、修復 Drift 流程（3 steps）、Lab Part 1（3 steps）、Lab Part 2（3 steps）
- **遷移 `resources/agent-skills-standard.md`**：轉換安裝步驟（兩組）

## Capabilities

### New Capabilities

- `hextra-steps-convention`: 定義課程內容中步驟與流程的呈現標準，包含 ADR-002 與遷移後的內容

### Modified Capabilities

（無需求層級的變更，僅為內容格式遷移）

## Impact

- **內容檔案**：`site/content/sdd/ch1-vibe-coding.md`、`ch2-mvp-to-spec.md`、`ch3-openspec.md`、`ch4-coding-agent.md`、`ch5-verify-observe.md`、`site/content/resources/agent-skills-standard.md`
- **新增檔案**：`openspec/adr/ADR-002-use-hextra-steps-shortcode.md`
- **依賴**：Hextra `{{% steps %}}` shortcode 已內建於本站使用的 Hextra theme（`site/_vendor/github.com/imfing/hextra`），無需額外安裝
- **不影響**：非循序圖表（架構圖、span 樹狀結構、before/after 檔案樹、資料流程圖）維持現有格式
