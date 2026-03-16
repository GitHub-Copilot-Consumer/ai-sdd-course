## Context

`.github/workflows/deploy.yml` 使用 `peaceiris/actions-gh-pages@v3` 搭配 `github_token: ${{ secrets.GITHUB_TOKEN }}` 將 Hugo 建置產出 push 至 `gh-pages` branch。GitHub 於 2023 年將 Actions workflow 的 `GITHUB_TOKEN` 預設權限從 read-write 改為 read-only，導致 push 操作回傳 403。

現有 workflow 亦使用 `hugo-version: '0.120.4'`，與 `ci-deployment` spec 要求的 `0.147.0` 不一致。

## Goals / Non-Goals

**Goals:**
- 在 `deploy` job 中明確授予 `contents: write` 權限，使 `GITHUB_TOKEN` 能夠 push 至 `gh-pages` branch
- 同步 `hugo-version` 至 `0.147.0` 以符合現有 spec

**Non-Goals:**
- 不更動建置流程、步驟順序或其他 workflow 設定
- 不引入新的 Secret 或外部 credential
- 不改動網站內容或 Hugo 設定

## Decisions

### 決定 1：使用 job-level `permissions` 而非 repo-level 設定

**選擇**：在 `deploy` job 內新增 `permissions: contents: write`

**原因**：
- 最小權限原則（principle of least privilege）：只對需要寫入的 job 授權，而非開啟整個 repo 的 workflow 預設權限
- 不需要 repo admin 權限即可生效（相對於改 repo Settings → Actions → Workflow permissions）
- 程式碼即文件（the permission intent is explicit in the workflow file itself）

**替代方案**：
- Repo Settings 調整預設權限 → 影響範圍較大，且無法透過 code review 追蹤
- 使用 Personal Access Token (PAT) → 需要額外管理 secret lifecycle，over-engineering

### 決定 2：同步 hugo-version 至 0.147.0

**選擇**：將 `hugo-version` 從 `0.120.4` 改為 `0.147.0`

**原因**：`ci-deployment` spec 已明確要求 `0.147.0`，現有設定不符合已批准的規格。此次修改屬於必要的規格對齊，不是可選項。

## Risks / Trade-offs

- **[Risk] Hugo 0.147.0 與現有 template 不相容** → 本地已使用 0.147.0（deploy.yml 為舊版殘留），風險極低
- **[Risk] 組織層級 Actions 權限政策封鎖 contents: write** → 若 GitHub-Copilot-Consumer org 有更嚴格的 org-level policy，需由 org admin 另行處理；但此為正確的第一步

## Migration Plan

1. 修改 `.github/workflows/deploy.yml`：
   - 在 `deploy` job 新增 `permissions: contents: write`
   - 將 `hugo-version` 從 `0.120.4` 改為 `0.147.0`
2. Commit 並 push to `main`
3. 確認 GitHub Actions 執行成功，`gh-pages` branch 有新 commit

**Rollback**：若失敗，revert commit 即可還原。
