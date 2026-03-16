## Why

專案目前的 GitHub Actions 部署工作流程（`.github/workflows/deploy.yml`）已存在基本架構，但 Hugo 設定中的 `baseURL` 仍為佔位符 `https://example.com/`，導致部署至 GitHub Pages 後站內連結與資源路徑將無法正常運作。需要將 `baseURL` 更新為實際的 GitHub Pages 網址，並確保工作流程設定完整正確，使專案在 push 至 `main` branch 後能自動建置並發佈 GitHub Pages。

## What Changes

- 更新 `site/config.yaml` 的 `baseURL` 為正確的 GitHub Pages 網址（格式：`https://<owner>.github.io/<repo>/`）
- 更新 `.github/workflows/deploy.yml`：
  - 加入 `submodules: true`（雖然主題使用 Hugo Module 管理，但確保相容性）
  - 確認建置指令 `hugo -s site/ --minify` 正確
  - 確認部署目標 `publish_dir: ./site/public` 正確
  - 加入 `HUGO_BASEURL` 環境變數，讓 CI 環境使用正確 baseURL
- 在 README.md 補充 GitHub Pages 設定說明（Repository Settings 步驟）

## Capabilities

### New Capabilities

- `github-pages-ci-config`: 完整的 GitHub Actions CI/CD 設定，包含正確的 baseURL 注入與部署流程，使 push 至 main 後自動建置並發佈 GitHub Pages

### Modified Capabilities

- `github-pages-deploy`: 更新現有部署規格，修正 baseURL 設定機制，並確認建置路徑與部署設定與實際專案結構（`site/` 目錄）一致

## Impact

- 影響檔案：`site/config.yaml`、`.github/workflows/deploy.yml`、`README.md`
- 不影響現有 Hugo 內容結構或主題設定
- 需要使用者在 GitHub Repository Settings > Pages 設定 Source 為 `gh-pages` branch（一次性手動設定）
