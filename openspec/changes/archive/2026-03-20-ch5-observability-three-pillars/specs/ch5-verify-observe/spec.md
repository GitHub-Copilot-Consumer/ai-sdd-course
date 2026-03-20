## MODIFIED Requirements

### Requirement: Ch5 涵蓋運行時可觀測性（Observability）
Ch5 的「運行時可觀測性」段落 SHALL 以現代可觀測性三本柱（Logs / Traces / Metrics）為框架組織內容，包含：
- 三本柱概覽：定義每個柱子的職責、呈現問題排查 workflow（Metrics 告知有問題 → Logs 定位問題內容 → Traces 找到根本路徑），說明三者缺一不可的理由
- Pillar 1: Logs — Structured Logging（pino JSON 格式）與 Error Tracking 概念，附 AI Prompt 範例
- Pillar 2: Traces — span / trace / propagation 概念，以 OpenTelemetry Node.js SDK 為技術範例，附 AI Prompt 範例
- Pillar 3: Metrics — counter / gauge / histogram 三種類型概念，以 prom-client 為技術範例，Health Check endpoint，附 AI Prompt 範例
- 三本柱串接說明：correlation ID / traceId 的作用機制（ASCII 圖表），OpenTelemetry 作為統一方案的概念介紹
- SKILL 預告：一段說明後續將有自動化 SKILL 工具簡化可觀測性設置

#### Scenario: 學習者了解三本柱概覽與問題排查 workflow
- **WHEN** 學習者閱讀「運行時可觀測性」段落的開頭
- **THEN** 段落 SHALL 包含三本柱（Logs / Traces / Metrics）的定義，以及以 ASCII 或 Markdown 圖表呈現的問題排查 workflow（從 Metrics 異常 → 查 Logs → 追 Trace 的流程）

#### Scenario: 學習者了解 Traces 的概念與 AI 實踐方式
- **WHEN** 學習者閱讀 Pillar 2: Traces 段落
- **THEN** 段落 SHALL 說明 span、trace、propagation 的基本概念，並提供一個使用 OpenTelemetry Node.js SDK 的 AI Prompt 範例，展示如何讓 request log 包含 traceId

#### Scenario: 學習者了解 Metrics 的三種類型與 AI 實踐方式
- **WHEN** 學習者閱讀 Pillar 3: Metrics 段落
- **THEN** 段落 SHALL 說明 counter / gauge / histogram 三種 metric 類型，並提供一個使用 prom-client 的 AI Prompt 範例，說明如何加入 `http_requests_total`（Counter）、`http_request_duration_seconds`（Histogram）並暴露 `GET /metrics` endpoint

#### Scenario: 學習者了解三本柱如何串接
- **WHEN** 學習者閱讀「三本柱的串接」段落
- **THEN** 段落 SHALL 說明 correlation ID 與 traceId 如何串聯 Log / Trace / Metric 三者，並以圖表呈現同一個 request 的 requestId 出現在三種信號中的機制，以及 OpenTelemetry 作為統一 SDK 的概念

#### Scenario: 學習者了解如何用 AI 加入 structured logging（保留）
- **WHEN** 學習者閱讀 Pillar 1: Logs 的 Structured Logging 小節
- **THEN** 段落 SHALL 包含一個具體的 AI Prompt 範例，展示如何用 Copilot/OpenCode 為既有函式批量加入 pino structured logging

#### Scenario: 學習者了解 error tracking 的概念（保留）
- **WHEN** 學習者閱讀 Pillar 1: Logs 的 Error Tracking 小節
- **THEN** 段落 SHALL 說明 error tracking 的目的與基本整合方式，不需要深入特定工具

### Requirement: Ch5 Lab 涵蓋 verify、可觀測性三本柱與 archive
Ch5 的 Lab SHALL 包含以下步驟：
- Part 1：對 Ch4 的實作執行 verify 並修復 drift
- Part 2：加入可觀測性三本柱（Step 1: pino Structured Logging、Step 2: OpenTelemetry Traces with ConsoleSpanExporter、Step 3: prom-client Metrics + GET /metrics + GET /health）
- Part 3：執行 archive

Done criteria SHALL 包含：
- `openspec verify` 全部通過
- Logs：`index.js` 中有 pino structured logging，每個 endpoint 有 JSON 格式 request log
- Traces：`tracing.js` 存在且已初始化，request log 中包含 `traceId` 欄位
- Metrics：`GET /metrics` 回傳 Prometheus 格式 metrics，包含 `http_requests_total`
- Health：`GET /health` 回傳 `{ status: "ok", uptime, timestamp }`
- `openspec archive` 執行成功，`openspec/specs/todo-api/spec.md` 存在

#### Scenario: 學習者完成 Lab Part 2 三步驟
- **WHEN** 學習者依序完成 Step 1（Logs）、Step 2（Traces）、Step 3（Metrics）
- **THEN** 完成後 SHALL 能在 terminal 看到：(1) pino JSON log 輸出，(2) console span 輸出（含 traceId），(3) `curl GET /metrics` 回傳 Prometheus 格式

#### Scenario: 學習者完成 Ch5 Lab（更新）
- **WHEN** 學習者完成整個 Lab（Part 1 + Part 2 + Part 3）
- **THEN** `openspec verify` 全部通過，`tracing.js` 存在，`GET /metrics` 可存取，`openspec archive` 執行成功

## ADDED Requirements

### Requirement: Ch5 提供 Client 端可觀測性延伸閱讀
Ch5 SHALL 在「運行時可觀測性」單元結尾提供 Client 端可觀測性的延伸閱讀連結，指向獨立的附錄頁 `/resources/client-observability/`，讓有 Client（桌面、行動、IoT 等）開發需求的學習者能進一步了解 Push model、離線 buffer、End-to-End traceId 串接等 Client 特有的可觀測性挑戰。

#### Scenario: 學習者知道 Client 端可觀測性延伸閱讀的入口
- **WHEN** 學習者閱讀完「SKILL 預告」段落
- **THEN** 段落 SHALL 提供 Client 端可觀測性附錄的連結，並說明其適用情境（有 Client 端開發需求的學習者）
