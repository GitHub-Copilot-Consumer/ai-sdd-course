## Why

課程內容目前使用 ASCII art 繪製圖表（如 `ch0-warmup.md` 的課程路線圖），不易維護且視覺品質有限。站點已整合 PlantUML 渲染（透過 Kroki API），決策是全站統一改用 PlantUML，提升可讀性與一致性。

## What Changes

- 將 `ch0-warmup.md` 中的 ASCII art 課程路線圖替換為 PlantUML fenced code block
- 路線圖改為水平流程（Slidekit 風格近似：多步驟色塊 + 左至右流程）
- 確保圖表在 GitHub Pages 建置時正確渲染為 SVG

## Capabilities

### New Capabilities

- `course-roadmap-plantuml`: 以 PlantUML 呈現課程路線圖，含 Greenfield/Brownfield 分區、各章節節點與轉折點標註

### Modified Capabilities

（無需求層級變更）

## Impact

- 修改檔案：`site/content/lessons/ch0-warmup.md`
- 依賴：站點已有 PlantUML render hook（`site/layouts/_default/_markup/render-codeblock-plantuml.html`）與 Kroki API 整合，無需新增依賴
- 建置環境需能連線至 `kroki.io`（GitHub Pages CI 環境滿足此條件）
