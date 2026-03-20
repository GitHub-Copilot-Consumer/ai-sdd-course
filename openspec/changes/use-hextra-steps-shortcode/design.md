## Context

課程站台使用 Hugo + Hextra theme。Hextra 內建 `{{% steps %}}` shortcode，能將 `### h3` 標題序列渲染為帶編號圓圈的垂直時間軸，視覺效果遠優於 ASCII art 或粗體文字標題。

目前站台中步驟內容格式不一致：
- `**Step N：**` 粗體文字（非 heading，無語意結構）
- `#### h4` 標題（heading 但層次模糊）
- ASCII art 程式碼區塊（只在 monospace 字體下可讀，無法響應式呈現）

Hextra `{{% steps %}}` shortcode 已內建於 `site/_vendor/github.com/imfing/hextra/layouts/_shortcodes/steps.html`，無需安裝。

## Goals / Non-Goals

**Goals:**
- 統一所有「循序步驟與流程」內容的呈現方式為 `{{% steps %}}` shortcode
- 建立 ADR-002 作為長期內容規範
- 一次性遷移所有現有不符合規範的步驟內容

**Non-Goals:**
- 非循序的視覺圖表（架構圖、span 樹、before/after 檔案樹、資料流程圖、三本柱串接示意圖等）不在本次遷移範圍
- 不修改任何業務邏輯或課程教學內容
- 不變更非步驟性的段落格式

## Decisions

### Decision 1：`{{% steps %}}` 適用範圍

**循序步驟內容**（需遷移）：
- 操作型步驟（How-to 流程、Lab 步驟）
- 概念型循序流程（如問題排查 Workflow：Metrics → Logs → Traces）

**不適用情境**（保持現有格式）：
- 架構圖、依賴樹、before/after 結構對照（保持 ASCII/code block）
- 非序列的圖表或說明（保持 Markdown table/list/code block）

### Decision 2：heading 層次規範

`{{% steps %}}` shortcode 要求內部使用 `### h3` heading。遷移時：
- 原本的 `**Step N：**` 粗體 → 改為 `### ` heading
- 原本的 `#### Step N：` h4 → 改為 `### ` heading（提升一層）
- Step 標題後的 h4 子標題（如 `#### 安裝 pino`）維持 `####` 不變

### Decision 3：ADR-002 內容規範

ADR-002 定義以下規則：
1. 所有循序步驟與流程 **SHALL** 使用 `{{% steps %}}` shortcode
2. steps 內部 **SHALL** 使用 `### h3` heading
3. 非循序圖表 **SHALL NOT** 使用 `{{% steps %}}`
4. 本決策適用於新增內容與現有內容遷移

### Decision 4：遷移目標檔案清單（完整）

| 檔案 | 遷移位置 |
|------|---------|
| `site/content/sdd/ch1-vibe-coding.md` | copilot-instructions 設定流程（Step 1-3） |
| `site/content/sdd/ch2-mvp-to-spec.md` | Lab OpenSpec init（Step 1-4） |
| `site/content/sdd/ch3-openspec.md` | Fast-Forward workflow（Step 1-4） |
| `site/content/sdd/ch4-coding-agent.md` | Coding Agent workflow（Step 1-4） |
| `site/content/sdd/ch5-verify-observe.md` | 問題排查 Workflow（ASCII）、修復 Drift（Step 1-3）、Lab Part 1（Step 1-3）、Lab Part 2（Step 1-3） |
| `site/content/resources/agent-skills-standard.md` | Marketplace 安裝（Step 1-2）、Manual 安裝（Step 1-3） |

## Risks / Trade-offs

- **失去 ASCII 箭頭的視覺流向感**：問題排查 Workflow 的 `│ ▼` 箭頭能明確表達因果流向，改為 `{{% steps %}}` 後改由數字順序表達。接受此取捨，以換取整體一致性。
- **heading 層次調整**：`#### Step N` 提升為 `### Step N` 後，若頁面 TOC 啟用，這些步驟會出現在目錄中。已確認 Hextra `{{% steps %}}` 的 h3 heading 不會被加入 TOC（shortcode 範圍內的 heading 不參與 TOC 生成）。
