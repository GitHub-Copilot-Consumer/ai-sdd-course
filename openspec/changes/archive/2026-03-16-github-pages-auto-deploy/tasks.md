## 1. 測試基礎建設

- [x] 1.1 在 `site/tests/` 建立 `deploy-workflow.spec.ts`（或 `deploy-workflow.test.ts`），撰寫讀取 `.github/workflows/deploy.yml` 並斷言必要欄位的測試案例
- [x] 1.2 執行測試確認全部失敗（Red 階段）：驗證 `GITHUB_PAGES_URL` 環境變數、`-b` flag、`go-version: '1.21'`、`publish_dir: ./site/public` 等斷言均未通過

## 2. 更新 GitHub Actions 工作流程

- [x] 2.1 在 `.github/workflows/deploy.yml` 的 `env` 區塊加入 `GITHUB_PAGES_URL` 變數（格式：`https://<owner>.github.io/<repo>/`，由使用者填入實際值）
- [x] 2.2 將建置步驟的指令由 `hugo -s site/ --minify` 更新為 `hugo -s site/ --minify -b ${{ env.GITHUB_PAGES_URL }}`
- [x] 2.3 確認 `actions/setup-go@v5`（`go-version: '1.21'`）步驟存在且位於 Hugo setup 步驟之前（目前已存在，確認順序正確）
- [x] 2.4 確認 `submodules: false`、`publish_dir: ./site/public`、`hugo-version: '0.120.4'` 設定正確
- [x] 2.5 執行測試確認全部通過（Green 階段）
- [x] 2.6 git commit：`feat(ci): inject GITHUB_PAGES_URL baseURL into Hugo build`

## 3. 更新 README.md

- [x] 3.1 在 README.md 的「部署」章節補充完整的 GitHub Pages 啟用步驟：至 Repository Settings > Pages，設定 Source 為 `Deploy from branch`，Branch 選 `gh-pages`（root）
- [x] 3.2 在「部署」章節說明 `GITHUB_PAGES_URL` 環境變數需更新為實際的 `https://<owner>.github.io/<repo>/`（修改 `.github/workflows/deploy.yml` 中的 `env` 區塊）
- [x] 3.3 git commit：`docs: update README with GitHub Pages setup instructions`

## 4. 驗收

- [x] 4.1 執行全部測試，確認覆蓋率 ≥ 80%：`npm test --prefix site`（或對應測試指令）
- [x] 4.2 本機執行 `hugo -s site/ --minify` 確認建置無錯誤
- [x] 4.3 確認 `.github/workflows/deploy.yml` 符合 `github-pages-ci-config` 與 `github-pages-deploy` spec 的所有 Scenario
