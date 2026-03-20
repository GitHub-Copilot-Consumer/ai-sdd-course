# ADR-001: 首頁課程章節清單需與 lesson 檔案同步維護

**日期**: 2026-03-20  
**狀態**: Accepted  
**決策者**: 課程維護團隊

---

## 背景

本站首頁（`site/content/_index.md`）以靜態 Markdown 連結清單列出所有課程章節。  
`site/content/lessons/` 目錄下的各章節頁面以檔案名稱決定其 URL slug。

過去發生課程章節重構（slug 更名、新增章節）後，首頁清單未同步更新的情況，導致使用者點擊後出現 404 或跳轉至舊內容。

## 決策

**首頁課程章節清單（`site/content/_index.md`）必須與 `site/content/lessons/` 下的實際 lesson 檔案保持一致。**

具體規範：

1. **連結路徑須對應現有 lesson 檔案 slug**  
   每個列出的連結路徑（如 `/lessons/ch1-vibe-coding/`）必須對應 `site/content/lessons/` 下存在的 `.md` 檔案。

2. **連結顯示名稱須與 lesson 的 `title` front matter 一致**  
   連結文字必須與對應 lesson 頁面的 `title` 欄位完全相符。

3. **新增或重命名 lesson 時需同步更新首頁**  
   任何在 `site/content/lessons/` 下新增、刪除、或重命名 lesson 檔案的變更，都必須同時更新首頁清單。

4. **維護驗證腳本**  
   `scripts/test-homepage-links.sh` 維護首頁連結的可驗證性。變更後須執行此腳本確認所有連結通過驗證（9/9 PASS）。

## 正當理由

Hugo 靜態站點的 lesson URL 由檔案名稱決定，首頁靜態清單無法自動追蹤這些變化。本規範確保人工維護時有明確的同步責任歸屬，並以測試腳本提供可驗證的品質門檻。

## 後果

- **正面**: 使用者不會再遇到首頁連結 404 的問題；維護規範明確。  
- **負面**: 需要人工維護首頁清單，未來可考慮引入 Hugo data file 或 shortcode 動態生成以消除此負擔（但目前不在計畫內）。

## 現行章節清單（截至 2026-03-20）

| 顯示名稱 | URL 路徑 | lesson 檔案 |
|---------|---------|------------|
| 導言：理解 Model、Agent 與 Coding Agent | `/lessons/ch-intro-ai/` | `ch-intro-ai.md` |
| 0. 課前暖身：AI 輔助開發的現況與痛點 | `/lessons/ch0-warmup/` | `ch0-warmup.md` |
| 1. Vibe Coding 與快速原型 | `/lessons/ch1-vibe-coding/` | `ch1-vibe-coding.md` |
| 2. 從 MVP 到規格 — 歡迎來到 Brownfield | `/lessons/ch2-mvp-to-spec/` | `ch2-mvp-to-spec.md` |
| 3. Technical Spec 與 OpenSpec 工作流 | `/lessons/ch3-openspec/` | `ch3-openspec.md` |
| 4. Coding Agent 結構化開發 | `/lessons/ch4-coding-agent/` | `ch4-coding-agent.md` |
| 5. 驗證、測試與可觀測性 | `/lessons/ch5-verify-observe/` | `ch5-verify-observe.md` |
| 6. 團隊導入策略與最佳實踐 | `/lessons/ch6-team/` | `ch6-team.md` |
| 附錄：工具安裝與環境設定 | `/lessons/appendix-setup/` | `appendix-setup.md` |
