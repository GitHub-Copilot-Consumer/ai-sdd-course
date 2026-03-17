## Context

`site/content/lessons/ch-intro-ai.md` 是課程導言章節，目前包含三節：LLM 基礎、什麼是 Agent、什麼是 Coding Agent。讀者在此建立基礎心智模型後，需要一個市場全景圖，了解「目前有哪些主流工具」以及「本課程為何選用 OpenCode + GitHub Copilot」。

此為純內容變更（Markdown 文件），無程式碼、無 API、無資料庫變動。

## Goals / Non-Goals

**Goals:**
- 在 `ch-intro-ai.md` 新增「主流 Coding Agent CLI 比較」節（第 4 節），置於「什麼是 Coding Agent」之後、「小結」之前
- 比較五個工具：Claude Code CLI、Codex CLI、Gemini CLI、GitHub Copilot CLI、OpenCode
- 以比較表呈現關鍵維度，以 ASCII 圖呈現模型支援光譜
- 明確說明本課程選用 OpenCode + GitHub Copilot 提供的 LLM 的理由
- 加入「此比較基於 2026 年初版本」disclaimer

**Non-Goals:**
- 不評論各工具的程式碼品質或 benchmark 成績
- 不涵蓋 IDE 整合（VS Code extension、JetBrains plugin 等）功能
- 不比較 Chat 模式或 Autocomplete 功能，僅聚焦 CLI Agent 能力

## Decisions

### 決策 1：新增為第 4 節而非附錄

**選擇**：在正文第 4 節加入比較表，而非另立附錄頁面。

**理由**：本課程的讀者需要在理解 Coding Agent 概念後「立即看到」工具選擇的脈絡，讓工具比較直接服務於「為何規格很重要」的論點。附錄會切斷閱讀流。

**替代方案**：獨立頁面 `ch-intro-tools.md`——但此方式會讓導言章節失去完整性，且 Hugo 的側欄導覽對短頁面不友好。

### 決策 2：比較維度的選取

**選取的七個核心維度**（由探索對話確認）：
1. 開源 / 授權
2. 預設模型（廠商）
3. 多模型支援（可否切換廠商）
4. 模型 Fallback（跨廠商自動備援）
5. Subagent 支援度（原生 vs. 有限 vs. 無）
6. Native Tools 集合（Read/Write/Bash/Glob/Grep/WebFetch/Search）
7. 廠商鎖定風險

**排除的維度**：定價（變動頻繁，易失效）、MCP 支援（五個工具皆支援，無差異化）、Plan Mode（五個工具皆支援）。

### 決策 3：ASCII 圖的視覺化策略

使用「模型支援光譜」橫向排列五個工具，顯示從「單一廠商鎖定」到「完全模型無關」的光譜位置。這比表格更直觀地傳達「鎖定風險」的概念，符合文件現有的 ASCII 圖風格。

### 決策 4：課程工具選擇說明的語氣

不以「OpenCode 最好」的推薦語氣撰寫，而是以「本課程的選擇標準」（多模型、隱私、可控性）來說明為何選用 OpenCode + GitHub Copilot LLM，保持教材的客觀性。

## Risks / Trade-offs

- **時效性風險**：AI 工具迭代迅速，比較表內容可能在數月內過時。→ 緩解：加入 disclaimer「此比較基於 2026 年初版本」，並在 spec 中要求此文字存在。
- **比較表寬度**：五工具 × 七維度的 Markdown 表格在窄螢幕上可能換行破版。→ 緩解：縮短欄位值文字，使用符號（✓ / ✗ / 部分）輔助，並在表格前加說明文字。
- **工具資訊準確性**：某些工具（如 Codex CLI）資訊來自 AI 生成的搜尋摘要，可能含有推測成分。→ 緩解：在 spec 中標記「基於 2026 年初公開資訊」，避免宣稱即時準確性。
