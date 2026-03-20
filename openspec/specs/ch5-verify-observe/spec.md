# Spec: ch5-verify-observe

## Purpose

Define the requirements for Ch5, covering spec verification (drift detection), AI-assisted test generation, runtime observability, AI-assisted debugging, and archiving — forming the complete Brownfield quality assurance chapter.

## Requirements

### Requirement: Ch5 涵蓋 Spec 驗證層次
`ch5-verify-observe.md` SHALL 包含「Spec 驗證」段落，說明 `openspec verify` 完整操作、drift detection 的實際輸出解讀、以及修復 drift 的標準流程。

#### Scenario: 學習者了解如何執行 verify
- **WHEN** 學習者閱讀 Spec 驗證段落
- **THEN** SHALL 包含 `openspec verify --change "<name>"` 的完整指令、預期輸出範例（包含通過與 DRIFT 兩種情況）

#### Scenario: 學習者知道如何修復 drift
- **WHEN** 學習者看到 DRIFT 輸出時
- **THEN** 段落 SHALL 說明修復流程：回到 tasks.md 補充遺漏的 task → 再次執行 apply → 重新 verify

### Requirement: Ch5 涵蓋 AI 輔助測試生成
Ch5 SHALL 包含「AI 輔助測試」段落，說明 TDD 與 SDD 並用的方式：用 Spec 的 scenario 作為測試案例的來源，用 Copilot/OpenCode 生成對應的測試程式碼。

#### Scenario: 學習者了解 TDD 與 SDD 的結合方式
- **WHEN** 學習者閱讀 AI 輔助測試段落
- **THEN** SHALL 說明 scenario → test case 的對應關係，並提供一個具體的 Prompt 範例

### Requirement: Ch5 涵蓋運行時可觀測性（Observability）
Ch5 的「運行時可觀測性」段落 SHALL 以現代可觀測性三本柱（Logs / Traces / Metrics）為框架組織內容，包含：三本柱概覽（定義、問題排查 workflow）、Pillar 1: Logs（Structured Logging + Error Tracking）、Pillar 2: Traces（span/trace/propagation + OpenTelemetry AI Prompt）、Pillar 3: Metrics（counter/gauge/histogram + prom-client AI Prompt + Health Check）、三本柱串接說明（correlation ID + OpenTelemetry 統一方案）、SKILL 預告。定位為「AI 如何幫你做這件事」，而非完整的 observability 教學。

#### Scenario: 學習者了解三本柱概覽與問題排查 workflow
- **WHEN** 學習者閱讀「運行時可觀測性」段落的開頭
- **THEN** 段落 SHALL 包含三本柱（Logs / Traces / Metrics）的定義，以及以 ASCII 或 Markdown 圖表呈現的問題排查 workflow（從 Metrics 異常 → 查 Logs → 追 Trace 的流程）

#### Scenario: 學習者了解如何用 AI 加入 structured logging
- **WHEN** 學習者閱讀 Pillar 1: Logs 的 Structured Logging 小節
- **THEN** 段落 SHALL 包含一個具體的 AI Prompt 範例，展示如何用 Copilot/OpenCode 為既有函式批量加入 pino structured logging

#### Scenario: 學習者了解 error tracking 的概念
- **WHEN** 學習者閱讀 Pillar 1: Logs 的 Error Tracking 小節
- **THEN** 段落 SHALL 說明 error tracking 的目的與基本整合方式，不需要深入特定工具

#### Scenario: 學習者了解 Traces 的概念與 AI 實踐方式
- **WHEN** 學習者閱讀 Pillar 2: Traces 段落
- **THEN** 段落 SHALL 說明 span、trace、propagation 的基本概念，並提供一個使用 OpenTelemetry Node.js SDK 的 AI Prompt 範例，展示如何讓 request log 包含 traceId

#### Scenario: 學習者了解 Metrics 的三種類型與 AI 實踐方式
- **WHEN** 學習者閱讀 Pillar 3: Metrics 段落
- **THEN** 段落 SHALL 說明 counter / gauge / histogram 三種 metric 類型，並提供一個使用 prom-client 的 AI Prompt 範例，說明如何加入 `http_requests_total`（Counter）、`http_request_duration_seconds`（Histogram）並暴露 `GET /metrics` endpoint

#### Scenario: 學習者了解三本柱如何串接
- **WHEN** 學習者閱讀「三本柱的串接」段落
- **THEN** 段落 SHALL 說明 correlation ID 與 traceId 如何串聯 Log / Trace / Metric 三者，並以圖表呈現同一個 request 的 requestId 出現在三種信號中的機制，以及 OpenTelemetry 作為統一 SDK 的概念

### Requirement: Ch5 提供 Client 端可觀測性延伸閱讀
Ch5 SHALL 在「運行時可觀測性」單元結尾提供 Client 端可觀測性的延伸閱讀連結，指向獨立的附錄頁 `/resources/client-observability/`，讓有 Client（桌面、行動、IoT 等）開發需求的學習者能進一步了解 Push model、離線 buffer、End-to-End traceId 串接等 Client 特有的可觀測性挑戰。

#### Scenario: 學習者知道 Client 端可觀測性延伸閱讀的入口
- **WHEN** 學習者閱讀完「SKILL 預告」段落
- **THEN** 段落 SHALL 提供 Client 端可觀測性附錄的連結，並說明其適用情境（有 Client 端開發需求的學習者）

### Requirement: Ch5 涵蓋 AI 輔助 Debug
Ch5 SHALL 包含「AI 輔助 Debug」段落，說明在 brownfield 環境中使用 `/opsx:explore` 調查問題、用 Copilot 分析 log 的操作方式。

#### Scenario: 學習者了解如何用 explore 調查問題
- **WHEN** 學習者閱讀 AI 輔助 Debug 段落
- **THEN** SHALL 包含 `/opsx:explore` 的使用範例，展示在既有 codebase 中調查 bug 的完整輸出

### Requirement: Ch5 以 openspec archive 作為收尾
Ch5 SHALL 以 `openspec archive` 作為章節收尾，說明驗證完成後歸檔的完整操作，以及「規格成為活文件」的概念。

#### Scenario: 學習者完成 verify 後知道下一步
- **WHEN** 學習者完成 verify 並通過
- **THEN** 段落 SHALL 說明 `openspec archive --change "<name>"` 的操作與預期輸出

### Requirement: Ch5 Lab 涵蓋 verify、可觀測性三本柱與 archive
Ch5 的 Lab SHALL 包含以下步驟：Part 1（對 Ch4 的實作執行 verify 並修復 drift）、Part 2（加入可觀測性三本柱：Step 1 pino Structured Logging、Step 2 OpenTelemetry Traces with ConsoleSpanExporter、Step 3 prom-client Metrics + GET /metrics + GET /health）、Part 3（執行 archive）。

#### Scenario: 學習者完成 Lab Part 2 三步驟
- **WHEN** 學習者依序完成 Step 1（Logs）、Step 2（Traces）、Step 3（Metrics）
- **THEN** 完成後 SHALL 能在 terminal 看到：(1) pino JSON log 輸出，(2) console span 輸出（含 traceId），(3) `curl GET /metrics` 回傳 Prometheus 格式

#### Scenario: 學習者完成 Ch5 Lab
- **WHEN** 學習者完成整個 Lab（Part 1 + Part 2 + Part 3）
- **THEN** `openspec verify` 全部通過，`tracing.js` 存在且 request log 包含 `traceId`，`GET /metrics` 可存取且含 `http_requests_total`，`openspec archive` 執行成功
