## Context

簡報模式以全螢幕覆蓋層（`presentation-overlay`）呈現投影片，但目前 `enterPresentation()` 與 `exitPresentation()` 函式並未對 `document.body.style.overflow` 做任何設定。當覆蓋層為 `position: fixed` 時，背景頁面在部分瀏覽器環境（尤其觸控裝置）仍可被捲動，破壞全螢幕體驗。

實作位置：`site/tests/presentation-mode/presentation-mode.js`（模組主檔，對應 Hugo partial `site/layouts/partials/presentation-mode.html` 所引入的腳本）。

## Goals / Non-Goals

**Goals:**
- 進入簡報模式時，將 `document.body.style.overflow` 設為 `'hidden'`，阻止背景滾動
- 退出簡報模式時，恢復 `document.body.style.overflow` 為進入前的原始值

**Non-Goals:**
- 不修改覆蓋層本身的捲動行為（投影片內容不需捲動）
- 不處理 `html` 元素或其他容器的 overflow（只操作 `body`）
- 不引入新的常數或偵測機制

## Decisions

### 使用變數暫存原始 overflow 值

- 在 `enterPresentation()` 呼叫前，將 `document.body.style.overflow` 的當前值存入模組層級變數 `_savedBodyOverflow`（字串，預設 `''`）
- 退出時直接從 `_savedBodyOverflow` 還原，不使用 `removeProperty` 或重設為預設值
- **理由**：明確還原為「進入前的狀態」，避免覆蓋使用者或其他腳本可能設定的原始值

### 修改位置

| 函式 | 新增操作 |
|---|---|
| `enterPresentation()` | `_savedBodyOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';` |
| `exitPresentation()` | `document.body.style.overflow = _savedBodyOverflow;` |

### 匯出模組 API

為了讓測試可驗證，將 `_savedBodyOverflow` 透過 `resetState()` 一併重設，並在 `module.exports` 中暴露 `getSavedBodyOverflow: () => _savedBodyOverflow`。

## Risks / Trade-offs

- [風險] 若 `exitPresentation()` 因例外未被正常呼叫，`body.overflow` 將維持 `hidden` → 緩解：現有的 `fullscreenchange` handler 已確保退出路徑涵蓋瀏覽器原生 Escape，覆蓋絕大多數情況
- [Trade-off] 僅還原 `style.overflow`（inline style），若原始 overflow 由 CSS class 控制則無法完整還原 → 可接受，因本專案 body 無自訂 overflow class
