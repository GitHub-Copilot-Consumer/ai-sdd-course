## Why

課程導言章節（`ch-intro-ai.md`）目前說明了 Coding Agent 的概念，但缺乏對當前主流 CLI 工具的具體比較。讀者在理解「什麼是 Coding Agent」後，需要一個清晰的市場全景圖，才能理解本課程選用 OpenCode + GitHub Copilot 的理由，並在實際工作中做出有依據的工具選擇。

## What Changes

- 在 `site/content/lessons/ch-intro-ai.md` 新增第 4 節：「主流 Coding Agent CLI 比較」
- 新增比較表，涵蓋五個工具：Claude Code CLI、Codex CLI、Gemini CLI、GitHub Copilot CLI、OpenCode
- 比較維度包含：開源、預設模型、多模型支援、模型 Fallback、Subagent 支援、Native Tools、MCP 支援、Plan Mode、定價、廠商鎖定風險
- 新增 ASCII 圖示化「模型支援光譜」，視覺化說明單廠商 vs. 多廠商 vs. 完全模型無關的差異
- 新增 2026 年初的版本 disclaimer
- 新增觀察重點段落，說明多模型支援、Subagent 架構差異、Fallback 能力、本課程工具選擇的理由

## Capabilities

### New Capabilities

- `cli-comparison`: 主流 Coding Agent CLI 工具比較節，作為 `ch-intro-ai.md` 的第 4 節內容，包含比較表、視覺圖、觀察重點

### Modified Capabilities

- `intro-ai-chapter`: 現有導言章節的需求增加「包含 CLI 比較節」的要求，此節位於「Coding Agent」節之後、「小結」之前

## Impact

- 修改檔案：`site/content/lessons/ch-intro-ai.md`
- 新增 spec：`openspec/specs/cli-comparison/spec.md`
- 更新 spec：`openspec/specs/intro-ai-chapter/spec.md`（新增 CLI 比較節的需求）
- 無 API 或依賴變動，純內容變更
