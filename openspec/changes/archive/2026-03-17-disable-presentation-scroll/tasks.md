## 1. 測試先行（TDD Red Phase）

- [x] 1.1 在 `site/tests/presentation-mode/presentation-mode.test.js` 新增測試：進入簡報模式後 `document.body.style.overflow` 應為 `'hidden'`
- [x] 1.2 新增測試：退出簡報模式後 `document.body.style.overflow` 應還原為進入前的值（`_savedBodyOverflow`）
- [x] 1.3 確認新測試在現有程式碼下失敗（Red 狀態）
- [x] 1.4 git commit: `test: add body scroll lock tests for presentation mode`

## 2. 實作（TDD Green Phase）

- [x] 2.1 在 `site/tests/presentation-mode/presentation-mode.js` 模組頂層宣告 `let _savedBodyOverflow = '';`
- [x] 2.2 在 `enterPresentation()` 函式中，建立覆蓋層前加入：`_savedBodyOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';`
- [x] 2.3 在 `exitPresentation()` 函式中，移除覆蓋層後加入：`document.body.style.overflow = _savedBodyOverflow;`
- [x] 2.4 在 `module.exports` 區塊中，將 `getSavedBodyOverflow: () => _savedBodyOverflow` 加入匯出
- [x] 2.5 在 `resetState()` 函式中加入 `_savedBodyOverflow = '';` 重設
- [x] 2.6 執行測試，確認所有測試通過（Green 狀態）
- [x] 2.7 git commit: `feat: lock body scroll on presentation mode enter/exit`

## 3. 驗證與清理

- [x] 3.1 執行完整測試套件，確認覆蓋率 ≥ 80%
- [x] 3.2 同步 `README.md`（若簡報模式操作說明需更新）
- [x] 3.3 git commit: `chore: sync README for presentation scroll lock` （若有變更）
