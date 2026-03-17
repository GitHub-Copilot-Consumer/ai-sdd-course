## ADDED Requirements

### Requirement: 課程路線圖以 PlantUML 呈現

`site/content/lessons/ch0-warmup.md` 的「課程路線圖」區段 SHALL 使用 PlantUML fenced code block（` ```plantuml ``` `）取代原有的 ASCII art 區塊。

PlantUML 圖表 SHALL 使用 `rectangle` 節點搭配 `left to right direction` 形成水平流程，並包含以下結構：
- 8 個步驟節點（導言、Ch0、Ch1、Ch2、Ch3、Ch4、Ch5、Ch6）由左至右箭頭連線
- 以 `note` 標註分區：「Greenfield 階段」位於 Ch0 附近、「Brownfield 階段」位於 Ch4 附近
- 一個 `note` 標註轉折點：「MVP 誕生，轉折點」並放置於 Ch1 附近
- `footer` 標註附錄資訊：「附錄：工具安裝（OpenSpec CLI、OpenCode、Ollama）」

圖表 SHALL 使用 `!theme plain` 與 `skinparam backgroundColor transparent` 以相容 Hextra 主題，並為每個步驟節點提供柔和色塊背景（非漸層），以接近 Slidekit 的多步驟色塊風格。

課程頁面在小螢幕上 SHOULD 避免圖表超出可視區，PlantUML 產生的 SVG SHALL 包裹於可水平捲動的容器（`overflow-x: auto`）。

#### Scenario: 圖表節點完整

- **WHEN** Hugo 建置 `ch0-warmup.md`
- **THEN** 產生的 SVG 包含以下文字節點（以顯示順序）：導言、Ch0、Ch1、Ch2、Ch3、Ch4、Ch5、Ch6

#### Scenario: 分區標籤正確

- **WHEN** Hugo 建置 `ch0-warmup.md`
- **THEN** SVG 中包含 "Greenfield 階段" 與 "Brownfield 階段" 兩個分區標籤

#### Scenario: 轉折點標註存在

- **WHEN** Hugo 建置 `ch0-warmup.md`
- **THEN** SVG 中包含 "MVP 誕生，轉折點" 的 note 標註

#### Scenario: ASCII art 已移除

- **WHEN** 讀取 `ch0-warmup.md` 原始碼
- **THEN** 不存在原有的 ASCII art 框線字元（`┌`、`┐`、`└`、`┘`、`├`、`┤`）於課程路線圖區段

#### Scenario: PlantUML 原始碼存在

- **WHEN** 讀取 `ch0-warmup.md` 原始碼
- **THEN** 存在以 ` ```plantuml ` 開頭、` ``` ` 結尾的 fenced code block，且內含 `@startuml` 與 `@enduml`

#### Scenario: 圖表可水平捲動

- **WHEN** Hugo 透過 PlantUML render hook 輸出 SVG
- **THEN** 輸出內容包裹於 `class="plantuml-diagram"` 的容器，且容器使用 `overflow-x: auto`
