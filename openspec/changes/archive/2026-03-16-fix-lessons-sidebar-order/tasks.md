## 1. 修正課程 weight 值

- [x] 1.1 將 `site/content/lessons/ch0-warmup.md` 的 `weight` 從 `0` 改為 `1`
- [x] 1.2 將 `site/content/lessons/ch1-copilot.md` 的 `weight` 從 `1` 改為 `2`
- [x] 1.3 將 `site/content/lessons/ch2-sdd.md` 的 `weight` 從 `2` 改為 `3`
- [x] 1.4 將 `site/content/lessons/ch3-openspec.md` 的 `weight` 從 `3` 改為 `4`
- [x] 1.5 將 `site/content/lessons/ch4-opencode.md` 的 `weight` 從 `4` 改為 `5`
- [x] 1.6 將 `site/content/lessons/ch5-team.md` 的 `weight` 從 `5` 改為 `6`

## 2. 驗證

- [x] 2.1 執行 `hugo` build，確認無錯誤
- [x] 2.2 確認 `site/public/lessons/index.html` 的 sidebar 中，課程順序為：導言 → 0. 課前暖身 → 1. → 2. → 3. → 4. → 5.
- [x] 2.3 確認 `ch0-warmup` 不再排在 sidebar 最後

## 3. Commit

- [x] 3.1 以 `fix: correct lesson sidebar order by adjusting weight values` 提交變更
