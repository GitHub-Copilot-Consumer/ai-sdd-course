## Why

Hugo 將 `weight: 0` 視為「未設定」（zero value），導致 `ch0-warmup.md`（weight: 0）被排到 sidebar 最後，而非預期的第二位（導言之後）。需修正所有課程檔案的 weight 值，使其從 1 開始，確保 sidebar 顯示順序正確。

## What Changes

- 將 `ch0-warmup.md` 的 weight 從 `0` 改為 `1`
- 將 `ch1-copilot.md` 的 weight 從 `1` 改為 `2`
- 將 `ch2-sdd.md` 的 weight 從 `2` 改為 `3`
- 將 `ch3-openspec.md` 的 weight 從 `3` 改為 `4`
- 將 `ch4-opencode.md` 的 weight 從 `4` 改為 `5`
- 將 `ch5-team.md` 的 weight 從 `5` 改為 `6`
- `ch-intro-ai.md`（weight: -1）保持不變，繼續排在最前面

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `site-navigation`: 課程 sidebar 排序規則變更——所有課程頁面的 weight 值從非零正整數起始，以符合 Hugo weight 排序行為

## Impact

- 影響檔案：`site/content/lessons/ch0-warmup.md` 至 `ch5-team.md`（共 6 個檔案）
- 不影響任何 API 或外部依賴
- 不影響 URL 結構
- 重新 build 後 sidebar 順序即正確
