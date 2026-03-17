## Context

`site/content/lessons/ch0-warmup.md` 的「課程路線圖」區段目前以 ASCII art 呈現。站點（Hugo + Hextra）已整合 PlantUML 渲染：

- Render hook：`site/layouts/_default/_markup/render-codeblock-plantuml.html`
- 透過 Kroki 公開 API（`https://kroki.io/plantuml/svg`）在建置時轉換為內嵌 SVG
- 決策已確認：全站統一使用 PlantUML，不保留 ASCII art 圖表

## Goals / Non-Goals

**Goals:**
- 將 `ch0-warmup.md` 中的 ASCII art 課程路線圖替換為等效的 PlantUML 圖（fenced code block）
- 圖表需正確表達：Greenfield 階段（導言、Ch0、Ch1）→ 轉折點 → Brownfield 階段（Ch2–Ch6）→ 附錄

**Non-Goals:**
- 不修改其他章節（本次 scope 僅 ch0-warmup.md）
- 不建立全站 PlantUML 樣式規範文件（那是後續 change 的工作）
- 不修改 PlantUML render hook 或 Kroki 整合邏輯

## Decisions

### 使用 fenced code block 而非 shortcode

**選擇：** ` ```plantuml ``` ` fenced code block  
**理由：** Markdown 原始碼可讀性更高，與一般程式碼區塊語法一致，Hugo render hook 已支援，無需額外 shortcode 標記。  
**替代方案：** `{{< plantuml >}}` shortcode — 功能等效，但語法較冗長，不適合 Markdown 中大量使用。

### PlantUML 圖表類型

**選擇：** 使用 `rectangle` 節點搭配 `left to right direction` 水平流程，分區以 `note` 標註 Greenfield / Brownfield  
**理由：** 需要接近 Slidekit 的水平流程視覺；`rectangle` 可自訂背景色、圓角與邊框，`left to right direction` 可維持左至右的步驟流程。分區標籤改用 `note` 避免 Kroki 解析 `package/box` 造成的語法風險。  
**替代方案：** 
- Activity Diagram + `partition` — 容易變成垂直流，較難做水平步驟視覺
- Component Diagram — 語義不符（章節不是元件）
- Mindmap — 結構不符（線性流程）

### 樣式策略

**選擇：** `!theme plain` + `skinparam backgroundColor transparent` + 節點色塊與圓角  
**理由：** 兼顧 Hextra 主題相容性與簡報式視覺。每個步驟使用柔和色塊（無漸層），並以 `RoundCorner` 建立接近卡片/箭頭的視覺。

### 版面適應策略

**選擇：** PlantUML SVG 外層包一層可水平捲動容器（`overflow-x: auto`）  
**理由：** 圖表為水平流程，窄螢幕容易超出可視區。以容器提供水平捲動，避免破版，同時不改變 SVG 原始尺寸。

## Risks / Trade-offs

- **Kroki API 依賴** → 建置時需連線 `kroki.io`。GitHub Pages CI 環境有網路，此風險已接受。本地離線建置會 fallback 顯示原始 PlantUML 原始碼（render hook 已處理）。
- **中文字寬** → Kroki 渲染中文通常正常，但特定字型可能有輕微對齊差異。驗收時需目視確認 SVG 輸出。
