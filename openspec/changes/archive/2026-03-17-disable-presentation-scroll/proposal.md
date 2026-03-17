## Why

簡報模式覆蓋層（`presentation-overlay`）目前未阻止頁面滾動，導致使用者在操作投影片時可能意外觸發背景頁面的捲動，破壞全螢幕簡報體驗。需確保進入簡報模式後，頁面本身無法被滾動。

## What Changes

- 進入簡報模式時，鎖定 `document.body` 的滾動（`overflow: hidden`）
- 退出簡報模式時，恢復 `document.body` 的原始滾動狀態

## Capabilities

### New Capabilities

（無新增 capability，屬於對現有簡報模式行為的修正）

### Modified Capabilities

- `chapter-presentation-mode`：在進入與退出簡報模式時，需額外管理 body 滾動鎖定的需求

## Impact

- `site/static/js/presentation.js`（或等效的簡報模式 JS 檔案）：需在 enterPresentation / exitPresentation 邏輯中加入 body overflow 控制
- 相關測試需驗證進入模式時 body overflow 為 `hidden`，退出後恢復
