## Context

本專案為 Hugo 靜態網站，位於 `site/` 目錄，使用 Hextra 主題（Hugo Module 管理，非 git submodule）。專案已有 `.github/workflows/deploy.yml` 工作流程，但有以下問題：

1. `site/config.yaml` 的 `baseURL` 為佔位符 `https://example.com/`，部署後站內連結將指向錯誤網域
2. 工作流程中 `submodules: false`，雖然主題以 Hugo Module 管理（Go modules），但明確設定有助於清晰度
3. 缺乏文件說明如何在 GitHub 設定 Pages 來源

部署流程：push main → GitHub Actions 建置 Hugo → push 至 `gh-pages` branch → GitHub Pages 自動發佈。

## Goals / Non-Goals

**Goals:**
- 修正 `baseURL` 設定，使部署後的 GitHub Pages 站內連結正確運作
- 更新 `.github/workflows/deploy.yml` 確保工作流程設定完整（含 Go 環境供 Hugo Module 使用）
- 在 README.md 補充完整的 GitHub Pages 啟用步驟說明

**Non-Goals:**
- 不變更 Hugo 內容結構或主題
- 不引入自訂網域（CNAME）設定
- 不更改現有的部署機制（仍使用 `peaceiris/actions-gh-pages@v3`）

## Decisions

### 決策 1：baseURL 使用 GitHub Pages 標準格式

**選擇**：將 `baseURL` 設為 `https://<owner>.github.io/<repo>/`，並在 GitHub Actions 工作流程中透過環境變數 `HUGO_ENV` 與 `-b` flag 注入正確 baseURL。

**理由**：Hugo 使用 `baseURL` 產生所有絕對路徑。若保留 `https://example.com/`，CSS、JS、圖片與頁面連結將全部斷開。使用 CI 環境變數注入而非直接修改 `config.yaml`，可讓本機開發保持彈性（使用相對路徑或 localhost）。

**替代方案**：直接修改 `config.yaml` 填入正式 URL — 缺點是本機開發時若 baseURL 不同，需要額外處理。

**實作方式**：在 `deploy.yml` 的建置步驟加入 `-b ${{ env.GITHUB_PAGES_URL }}` 參數，並在 workflow 頂層定義 `env.GITHUB_PAGES_URL`。

### 決策 2：保留 Go setup 步驟

**選擇**：保留 `actions/setup-go@v5` 步驟（Go 1.21）。

**理由**：Hextra 主題透過 Hugo Module（Go modules）管理，建置時需要 Go 環境下載模組。移除此步驟將導致建置失敗。

### 決策 3：submodules 設為 false（明確標示）

**選擇**：保持 `submodules: false`，但加入明確說明。

**理由**：主題使用 Hugo Module（`go.mod`）而非 git submodule，因此 `submodules: false` 是正確設定。

## Risks / Trade-offs

- **[風險] Repository 為私有**：若 Repository 為私有，GitHub Pages 需要付費方案。→ 緩解：README 說明此需求
- **[風險] baseURL 的 repo name 需手動維護**：若 repository 改名，需同步更新 workflow 中的 `GITHUB_PAGES_URL`。→ 緩解：集中定義於 workflow 環境變數區塊，方便修改
- **[Trade-off] 使用 `-b` flag 覆蓋 baseURL**：建置時的 baseURL 與 `config.yaml` 中的不同，可能造成混淆。→ 接受：這是 Hugo 的標準 CI 模式，並在 README 說明

## Migration Plan

1. 更新 `.github/workflows/deploy.yml`：加入 `GITHUB_PAGES_URL` 環境變數，修改建置步驟加入 `-b` flag
2. 在 GitHub Repository Settings > Pages 設定 Source 為 `Deploy from branch`，Branch 選 `gh-pages`（root）
3. Push 至 `main` 觸發首次部署
4. 驗證：開啟 `https://<owner>.github.io/<repo>/` 確認站點正常

**回滾**：若部署失敗，可在 GitHub Pages Settings 暫時停用，或還原 workflow commit。

## Open Questions

- 無。Repository owner 與名稱可從 GitHub remote URL 推導，由實作時填入。
