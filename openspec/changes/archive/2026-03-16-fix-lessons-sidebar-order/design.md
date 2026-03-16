## Context

Hugo 使用 `weight` 值決定 sidebar 中頁面的顯示順序。`weight` 為正整數時，數值越小排越前；`weight: 0` 是 Go 的 zero value，Hugo 將其視為「未設定」，並將這些頁面排在所有有明確 weight 的頁面之後（預設以標題字母序排列）。

目前 `ch0-warmup.md` 設定 `weight: 0`，因此被排到 sidebar 最末，而非預期的第二位（緊接在 `ch-intro-ai.md` weight: -1 之後）。

## Goals / Non-Goals

**Goals:**
- 修正 `ch0-warmup.md` 在 sidebar 的顯示位置，使其排在導言之後、ch1 之前
- 保持所有課程章節的相對順序不變
- 採用顯式的 weight 值清單，不依賴自動排序或檔名慣例

**Non-Goals:**
- 不修改 URL 結構或頁面路徑
- 不修改頂部 navbar（menu.main）的設定
- 不調整 `ch-intro-ai.md`（weight: -1）的位置

## Decisions

### 決策：所有課程 weight 從 1 開始，逐一遞增

將 weight 值定義為以下顯式清單：

| 檔案 | 舊 weight | 新 weight |
|------|-----------|-----------|
| `ch-intro-ai.md` | `-1` | `-1`（不變） |
| `ch0-warmup.md` | `0` | `1` |
| `ch1-copilot.md` | `1` | `2` |
| `ch2-sdd.md` | `2` | `3` |
| `ch3-openspec.md` | `3` | `4` |
| `ch4-opencode.md` | `4` | `5` |
| `ch5-team.md` | `5` | `6` |

**理由：** 採用明確的正整數清單，避免 Hugo zero value 的歧義。每個檔案的 weight 在 front matter 中顯式宣告，不依賴任何自動偵測機制。

**替代方案考慮：** 僅將 ch0 改為 `0.5` 或 `1`，其餘不動——但這樣 ch1 仍為 1，會與 ch0 的新值衝突或產生混淆，故選擇整體平移。

## Risks / Trade-offs

- [風險] 未來新增章節時，若沿用原始習慣設定 weight: 0 會再次出現同樣問題 → 緩解：在 site-navigation spec 中明確記錄「weight 必須從 1 開始」的規則

## Migration Plan

1. 直接修改 6 個課程 `.md` 檔案的 front matter weight 值
2. 本地執行 `hugo` 確認 sidebar 順序正確
3. commit 並推送，GitHub Pages 自動重新部署
4. 無需 rollback 策略（純內容變更，可隨時還原）
