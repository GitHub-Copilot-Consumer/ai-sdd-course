# ADR-001: 首頁課程章節清單需與課程內容檔案同步維護

**日期**: 2026-03-20  
**狀態**: Accepted（更新於 2026-03-20：擴展至雙課程平台）  
**決策者**: 課程維護團隊

---

## 背景

本站首頁（`site/content/_index.md`）以靜態 Markdown 連結清單列出所有課程章節。  
課程內容分佈於 `site/content/sdd/`（SDD 實戰攻略）與 `site/content/agent/`（Agent 整合與自訂擴展）兩個目錄，各頁面以檔案名稱決定其 URL slug。

過去發生課程章節重構（slug 更名、新增章節）後，首頁清單未同步更新的情況，導致使用者點擊後出現 404 或跳轉至舊內容。

## 決策

**首頁課程章節清單（`site/content/_index.md`）必須與 `site/content/sdd/` 及 `site/content/agent/` 下的實際內容檔案保持一致。**

具體規範：

1. **連結路徑須對應現有內容檔案 slug**  
   每個列出的連結路徑（如 `/sdd/ch1-vibe-coding/`、`/agent/ch1-model-fundamentals/`）必須對應對應課程目錄下存在的 `.md` 檔案。

2. **連結顯示名稱須與頁面的 `title` front matter 一致**  
   連結文字必須與對應頁面的 `title` 欄位完全相符。

3. **新增或重命名章節時需同步更新首頁**  
   任何在 `site/content/sdd/` 或 `site/content/agent/` 下新增、刪除、或重命名內容檔案的變更，都必須同時更新首頁清單。

4. **維護驗證腳本**  
   `scripts/test-homepage-links.sh` 維護首頁連結的可驗證性。變更後須執行此腳本確認所有連結通過驗證。

## 正當理由

Hugo 靜態站點的頁面 URL 由檔案名稱決定，首頁靜態清單無法自動追蹤這些變化。本規範確保人工維護時有明確的同步責任歸屬，並以測試腳本提供可驗證的品質門檻。

## 後果

- **正面**: 使用者不會再遇到首頁連結 404 的問題；維護規範明確。  
- **負面**: 需要人工維護首頁清單，未來可考慮引入 Hugo data file 或 shortcode 動態生成以消除此負擔（但目前不在計畫內）。

## 現行章節清單（截至 2026-03-20）

### SDD 實戰攻略（`/sdd/`）

| 顯示名稱 | URL 路徑 | 內容檔案 |
|---------|---------|---------|
| 0. 課前暖身：AI 輔助開發的現況與痛點 | `/sdd/ch0-warmup/` | `sdd/ch0-warmup.md` |
| 1. Vibe Coding 與快速原型 | `/sdd/ch1-vibe-coding/` | `sdd/ch1-vibe-coding.md` |
| 2. 從 MVP 到規格 — 歡迎來到 Brownfield | `/sdd/ch2-mvp-to-spec/` | `sdd/ch2-mvp-to-spec.md` |
| 3. Technical Spec 與 OpenSpec 工作流 | `/sdd/ch3-openspec/` | `sdd/ch3-openspec.md` |
| 4. Coding Agent 結構化開發 | `/sdd/ch4-coding-agent/` | `sdd/ch4-coding-agent.md` |
| 5. 驗證、測試與可觀測性 | `/sdd/ch5-verify-observe/` | `sdd/ch5-verify-observe.md` |
| 6. 團隊導入策略與最佳實踐 | `/sdd/ch6-team/` | `sdd/ch6-team.md` |

### Agent 整合與自訂擴展（`/agent/`）— 骨架

| 顯示名稱 | URL 路徑 | 內容檔案 |
|---------|---------|---------|
| 1. LLM 原理與模型選型 | `/agent/ch1-model-fundamentals/` | `agent/ch1-model-fundamentals.md` |
| 2. Agent 架構：ReAct、Memory 與 Context | `/agent/ch2-agent-architecture/` | `agent/ch2-agent-architecture.md` |
| 3. Coding Agent 生態系與 OpenCode 架構 | `/agent/ch3-coding-agent-ecosystem/` | `agent/ch3-coding-agent-ecosystem.md` |
| 4. Tools 概念與 OpenCode Plugin 簡介 | `/agent/ch4-custom-tools/` | `agent/ch4-custom-tools.md` |
| 5. Skills 系統：Agent Skills 標準與實作 | `/agent/ch5-custom-skills/` | `agent/ch5-custom-skills.md` |
| 6. Custom Agent 與 Commands 設計 | `/agent/ch6-custom-agents/` | `agent/ch6-custom-agents.md` |
| 7. MCP 概念與 Agent 整合 | `/agent/ch7-mcp-overview/` | `agent/ch7-mcp-overview.md` |
