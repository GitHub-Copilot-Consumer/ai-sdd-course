## MODIFIED Requirements

### Requirement: 退出簡報模式
系統 SHALL 提供以下退出機制：
- 覆蓋層內 id 為 `btn-exit-presentation` 的「退出」按鈕
- 鍵盤 `Escape` 鍵（瀏覽器全螢幕原生 Escape 亦會觸發 `fullscreenchange` 事件）

退出後，`presentation-overlay` SHALL 從 DOM 中移除，`document.body.style.overflow` SHALL 還原為進入簡報模式前的值（暫存於 `_savedBodyOverflow`），頁面回到原始滾動狀態，鍵盤事件監聽器 SHALL 被移除。

#### Scenario: 點擊退出按鈕離開簡報模式
- **WHEN** 簡報模式啟用中，使用者點擊 `btn-exit-presentation`
- **THEN** `presentation-overlay` SHALL 從 DOM 中移除
- **THEN** `document.fullscreenElement` SHALL 為 null（已退出全螢幕）

#### Scenario: 按 Escape 鍵離開簡報模式
- **WHEN** 簡報模式啟用中，使用者按下 `Escape`
- **THEN** `presentation-overlay` SHALL 從 DOM 中移除

#### Scenario: 退出後鍵盤事件不再觸發切換
- **WHEN** 使用者已退出簡報模式，按下 `ArrowRight`
- **THEN** 頁面 SHALL NOT 切換投影片（事件監聽器已移除）

#### Scenario: 退出後 body overflow 恢復原始值
- **WHEN** 使用者退出簡報模式（任何退出路徑）
- **THEN** `document.body.style.overflow` SHALL 等於進入簡報模式前暫存的 `_savedBodyOverflow` 值

## ADDED Requirements

### Requirement: 簡報模式鎖定 body 滾動
進入簡報模式時，系統 SHALL 將 `document.body.style.overflow` 的當前值暫存至模組層級變數 `_savedBodyOverflow`，然後將 `document.body.style.overflow` 設為 `'hidden'`，以阻止背景頁面的滾動。

退出簡報模式時，系統 SHALL 將 `document.body.style.overflow` 還原為 `_savedBodyOverflow` 中儲存的值。

#### Scenario: 進入簡報模式後 body 不可滾動
- **WHEN** 使用者點擊 `btn-enter-presentation` 進入簡報模式
- **THEN** `document.body.style.overflow` SHALL 為 `'hidden'`

#### Scenario: 退出簡報模式後 body overflow 恢復
- **WHEN** 使用者退出簡報模式
- **THEN** `document.body.style.overflow` SHALL 等於進入前 `_savedBodyOverflow` 所暫存的值
