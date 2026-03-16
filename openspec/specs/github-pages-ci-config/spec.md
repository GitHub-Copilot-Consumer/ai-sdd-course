# github-pages-ci-config Specification

## Purpose

TBD - created by syncing change 'github-pages-auto-deploy'.

## Requirements

### Requirement: GitHub Actions 工作流程注入正確 baseURL
工作流程 SHALL 在 `env` 區塊定義 `GITHUB_PAGES_URL` 環境變數（格式：`https://<owner>.github.io/<repo>/`），並在 Hugo 建置步驟中使用 `-b ${{ env.GITHUB_PAGES_URL }}` flag 覆蓋 `config.yaml` 中的 `baseURL`，確保部署後所有站內連結使用正確網域。

#### Scenario: 工作流程包含 baseURL 注入機制
- **WHEN** 讀取 `.github/workflows/deploy.yml`
- **THEN** 檔案 MUST 包含 `GITHUB_PAGES_URL` 環境變數定義，且建置步驟 MUST 包含 `-b` flag 引用該變數

#### Scenario: 建置指令包含 baseURL override
- **WHEN** 讀取 `.github/workflows/deploy.yml` 的建置步驟
- **THEN** 建置指令 MUST 為 `hugo -s site/ --minify -b ${{ env.GITHUB_PAGES_URL }}` 完整格式

### Requirement: Go 環境供 Hugo Module 使用
工作流程 SHALL 包含 `actions/setup-go@v5` 步驟（`go-version: '1.21'`），位於 Hugo setup 步驟之前，供 Hugo Module（Hextra 主題）在建置時透過 `go.mod` 下載依賴使用。

#### Scenario: 工作流程包含 Go 環境設定
- **WHEN** 讀取 `.github/workflows/deploy.yml`
- **THEN** 步驟列表 MUST 包含 `actions/setup-go@v5` 且 `go-version` MUST 為 `'1.21'`，且該步驟 MUST 位於 Hugo setup 步驟之前
