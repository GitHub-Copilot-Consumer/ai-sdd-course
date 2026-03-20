## Why

首頁「課程章節」區塊的連結與實際課程內容頁面不符，導致使用者點擊後出現 404 或跳轉至錯誤頁面。隨著課程章節名稱與 URL 陸續更新，首頁也需要同步反映最新的章節標題與連結。

## What Changes

- 修正首頁 `_index.md` 中「課程章節」的所有連結路徑，使其對應現有 lesson 檔案的實際 slug
- 更新各章節的顯示標題，與各 lesson 頁面的 `title` front matter 保持一致
- 新增目前缺少的章節連結（第 5 章「驗證、測試與可觀測性」、第 6 章「團隊導入策略」、附錄「工具安裝與環境設定」）

## Capabilities

### New Capabilities

- `homepage-course-index`: 首頁課程章節清單，提供正確的章節標題與對應連結

### Modified Capabilities

- `site-navigation`: 首頁導覽連結需反映最新 URL 結構

## Impact

- 影響檔案：`site/content/_index.md`
- 無 API 或後端變動
- 無破壞性變更
