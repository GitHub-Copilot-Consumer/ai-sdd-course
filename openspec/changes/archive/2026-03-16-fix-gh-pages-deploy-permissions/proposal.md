## Why

GitHub Actions 的 `GITHUB_TOKEN` 自 2023 年起預設權限為 read-only，導致 `github-actions[bot]` 無法 push 至 `gh-pages` branch，產生 403 錯誤使部署失敗。此問題在目前的 `deploy.yml` 未明確宣告 `contents: write` 權限的情況下，每次 push to `main` 都會失敗。

## What Changes

- 在 `.github/workflows/deploy.yml` 的 `deploy` job 中新增 `permissions` 區塊，明確授予 `contents: write`
- 同時修正 `hugo-version` 至 `0.147.0`（與 `ci-deployment` spec 一致，現有檔案為舊版 `0.120.4`）

## Capabilities

### New Capabilities

（無新 capability）

### Modified Capabilities

- `github-pages-deploy`: 新增 `permissions.contents: write` 要求，確保 `GITHUB_TOKEN` 有權限 push 至 `gh-pages` branch
- `ci-deployment`: 現有 spec 已要求 `hugo-version: '0.147.0'`，但 workflow 檔案仍為舊版 `0.120.4`，需同步修正

## Impact

- 僅影響 `.github/workflows/deploy.yml` 一個檔案
- 不影響 Hugo 建置邏輯、網站內容、或任何其他 CI 步驟
- 修正後每次 push to `main` 應能成功部署至 `gh-pages`
