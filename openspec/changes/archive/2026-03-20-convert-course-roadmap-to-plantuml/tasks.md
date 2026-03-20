## 1. 測試先行（TDD Red Phase）

- [x] 1.1 在 `site/tests/plantuml/plantuml.test.js` 新增測試：驗證 `ch0-warmup.md` 課程路線圖區段不含 ASCII art 框線字元（`┌`、`┐`、`└`、`┘`、`├`、`┤`）
- [x] 1.2 在 `site/tests/plantuml/plantuml.test.js` 新增測試：驗證 `ch0-warmup.md` 存在 ` ```plantuml ` fenced code block，且內含 `@startuml` 與 `@enduml`
- [x] 1.3 執行測試，確認新增的測試為紅燈（Red）
- [x] 1.4 git commit: `test(ch0): add plantuml roadmap conversion tests`

## 2. 實作（Green Phase）

- [x] 2.1 將 `site/content/lessons/ch0-warmup.md` 的 ASCII art 課程路線圖（第 190–225 行的 ` ``` ` 區塊）替換為 PlantUML fenced code block，包含：
  - `!theme plain` 與 `skinparam backgroundColor transparent`
  - `box "Greenfield 階段"` 含導言、Ch0、Ch1 三節點
  - `note` 標註「MVP 誕生，轉折點」
  - `box "Brownfield 階段"` 含 Ch2–Ch6 五節點
  - `footer` 標註附錄資訊
- [x] 2.2 執行測試，確認所有測試為綠燈（Green）
- [x] 2.3 git commit: `feat(ch0): replace ASCII roadmap with PlantUML diagram`
- [x] 2.4 依 Slidekit 風格調整為水平流程圖：步驟色塊、左至右箭頭、步驟編號
- [x] 2.5 重新執行測試，確認仍為綠燈（Green）
- [x] 2.6 PlantUML render hook 與 shortcode 外層包可水平捲動容器（`overflow-x: auto`）
- [x] 2.7 新增測試：render hook 與 shortcode 皆包含 `plantuml-diagram` 容器

## 3. 驗收

- [ ] 3.1 本地執行 `hugo server`，目視確認課程路線圖正確渲染為 SVG，節點與分區標籤完整
- [ ] 3.2 確認 Greenfield / Brownfield 分區視覺清晰，轉折點 note 標註顯示正確
- [ ] 3.3 更新 `README.md`（若有與此 change 相關的說明需同步）
- [ ] 3.4 git commit: `docs: sync README for plantuml roadmap change`（若有變更）
