## 1. 修改 Workflow 檔案

- [x] 1.1 在 `.github/workflows/deploy.yml` 的 `deploy` job 新增 `permissions: contents: write`
- [x] 1.2 將 `hugo-version` 從 `0.120.4` 改為 `0.147.0`（已是 0.147.0，無需修改）
- [x] 1.3 驗證 workflow YAML 語法正確（可用 `cat` 確認格式）

## 2. 驗證與測試

- [x] 2.1 確認 `.github/workflows/deploy.yml` 包含 `permissions: contents: write` 字串
- [x] 2.2 確認 `.github/workflows/deploy.yml` 包含 `hugo-version: '0.147.0'` 字串
- [x] 2.3 Commit 並 push to `main`，確認 GitHub Actions 執行成功（無 403 錯誤）

## 3. 收尾

- [x] 3.1 確認 `gh-pages` branch 有新的 commit（部署成功）
- [x] 3.2 同步 README.md（若有需要更新 CI/CD 相關說明）
