## Why

Ch5「運行時可觀測性」目前只涵蓋 Structured Logging 和 Error Tracking，缺少現代可觀測性體系的核心：Traces（分佈式追蹤）與 Metrics（指標度量）。學習者在完成課程後無法理解三本柱如何協同運作，也缺乏將三者串接的實務能力。

## What Changes

- 在 `ch5-verify-observe.md` 的「運行時可觀測性」段落加入三本柱概覽（Log / Trace / Metrics 的定義、角色與問題排查 workflow 圖）
- 重組現有段落：將 Structured Logging + Error Tracking 歸入 Pillar 1: Logs；Health Check 歸入 Pillar 3: Metrics
- 新增 Pillar 2: Traces 段落（span/trace 概念 + OpenTelemetry AI Prompt 範例）
- 新增 Pillar 3: Metrics 段落（counter/gauge/histogram 概念 + prom-client AI Prompt 範例）
- 新增「三本柱的串接」段落（correlation ID / traceId 機制、Metrics → Logs → Traces 問題排查 workflow、OpenTelemetry 作為統一方案）
- 新增「SKILL 預告」段落（後續自動化工具預告）
- 擴展 Lab Part 2 為三步驟：Logs (pino) + Traces (OpenTelemetry Console Exporter) + Metrics (prom-client)
- 更新 Lab Done criteria 涵蓋三本柱驗證項目
- 更新 `ch5-verify-observe` spec 的 Observability requirement 以反映新增內容

## Capabilities

### New Capabilities

無新增獨立 capability——本次為現有課程章節內容擴充。

### Modified Capabilities

- `ch5-verify-observe`: 擴展「運行時可觀測性」requirement，從僅涵蓋 Logs 擴展至三本柱（Logs + Traces + Metrics）、三本柱串接概念、OpenTelemetry 統一方案、SKILL 預告，以及 Lab 三本柱實作步驟

## Impact

- **修改檔案**：`site/content/lessons/ch5-verify-observe.md`（主要修改）、`openspec/specs/ch5-verify-observe/spec.md`（spec 更新）
- **無 breaking changes**：內容重組與擴充，不影響其他章節
- **新增 npm 套件**（Lab 用途，供學習者練習）：`@opentelemetry/sdk-node`、`@opentelemetry/auto-instrumentations-node`、`prom-client`
- **不影響**：CI/CD、Hugo 建置流程、其他章節內容
