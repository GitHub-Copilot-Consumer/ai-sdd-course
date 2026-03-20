## 1. 更新 ch5-verify-observe spec

- [x] 1.1 更新 `openspec/specs/ch5-verify-observe/spec.md`：將「Ch5 涵蓋運行時可觀測性」requirement 擴展為三本柱框架（Logs / Traces / Metrics），新增三本柱串接 scenario，新增 SKILL 預告 scenario
- [x] 1.2 更新 `openspec/specs/ch5-verify-observe/spec.md`：更新「Ch5 Lab 涵蓋 verify、observability 與 archive」requirement 為三本柱 Lab，更新 Done criteria 加入 Traces 和 Metrics 驗證項目

## 2. 重組「運行時可觀測性」段落結構

- [x] 2.1 在 `ch5-verify-observe.md` 的「運行時可觀測性」段落開頭，新增「監測三本柱概覽」小節：包含三本柱定義表格、問題排查 workflow ASCII 圖（Metrics → Logs → Traces）
- [x] 2.2 將現有「Structured Logging（結構化日誌）」和「Error Tracking（錯誤追蹤）」重組為「Pillar 1: Logs（日誌）」，內容保留，補充一句柱子定位說明
- [x] 2.3 將現有「Health Check」暫時保留原位（後續移入 Pillar 3）

## 3. 新增 Pillar 2: Traces 段落

- [x] 3.1 在 `ch5-verify-observe.md` Pillar 1 之後新增「Pillar 2: Traces（分佈式追蹤）」段落：包含 span / trace / propagation 基本概念說明（附 ASCII 圖表展示 span 層次結構）
- [x] 3.2 在 Pillar 2 段落中加入 AI Prompt 範例：使用 `@opentelemetry/sdk-node` + `@opentelemetry/auto-instrumentations-node`，建立 `tracing.js` 初始化，ConsoleSpanExporter，在 log 中加入 `traceId`
- [x] 3.3 在 Pillar 2 段落中加入預期 Console 輸出範例（展示 `traceId`、`name`、`duration` 欄位）

## 4. 新增 Pillar 3: Metrics 段落

- [x] 4.1 在 `ch5-verify-observe.md` Pillar 2 之後新增「Pillar 3: Metrics（指標度量）」段落：包含 counter / gauge / histogram 三種類型的定義與範例（附對照表）
- [x] 4.2 在 Pillar 3 段落中加入 AI Prompt 範例：使用 `prom-client`，加入 `http_requests_total`（Counter）、`http_request_duration_seconds`（Histogram）、`active_requests`（Gauge），暴露 `GET /metrics` endpoint
- [x] 4.3 在 Pillar 3 段落中加入預期 `/metrics` 輸出範例（Prometheus text format）
- [x] 4.4 將現有「Health Check」段落移入 Pillar 3 作為子節，更新 response 格式說明

## 5. 新增三本柱串接段落

- [x] 5.1 在 Pillar 3 之後新增「三本柱的串接」段落：包含 correlation ID / traceId 機制的 ASCII 圖表（展示同一個 request 的 ID 出現在 Log / Trace / Metric 三處）
- [x] 5.2 新增 OpenTelemetry 作為統一方案的概念說明（一段文字 + 架構示意圖，說明一套 SDK 產出三種信號的概念，不深入 Collector 配置）

## 6. 新增 SKILL 預告段落

- [x] 6.1 在「三本柱的串接」之後新增「SKILL 預告」段落：一段泛泛的預告文字，說明後續將有自動化 SKILL 工具幫助快速建立可觀測性基礎設施

## 7. 擴展 Lab Part 2 為三本柱實作

- [x] 7.1 將 Lab Part 2 標題從「加入 Structured Logging」更新為「加入可觀測性三本柱」，重組為三個 Step
- [x] 7.2 Lab Step 1（Logs）：保留現有 pino 安裝與 Prompt，確認驗證步驟（JSON log 輸出）
- [x] 7.3 Lab Step 2（Traces）：新增 OpenTelemetry 安裝步驟（`npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node`），AI Prompt 生成 `tracing.js`，在 `index.js` 頂部 `require('./tracing')` 載入，驗證 console 有 span 輸出且 log 包含 `traceId`
- [x] 7.4 Lab Step 3（Metrics）：新增 prom-client 安裝步驟（`npm install prom-client`），AI Prompt 生成 metrics middleware 與 `/metrics` endpoint，驗證 `curl GET /metrics` 回傳 Prometheus 格式，更新 Health Check 到此 step
- [x] 7.5 更新 Lab Done criteria：加入 Traces（`tracing.js` 存在、log 包含 `traceId`）和 Metrics（`GET /metrics` 可存取、含 `http_requests_total`）的驗證項目

## 8. 新增 Client 端可觀測性附錄

- [x] 8.1 更新 `openspec/specs/ch5-verify-observe/spec.md`：新增 requirement「Ch5 提供 Client 端可觀測性延伸閱讀」
- [x] 8.2 更新 delta spec `openspec/changes/ch5-observability-three-pillars/specs/ch5-verify-observe/spec.md`：新增對應的 ADDED requirement
- [x] 8.3 新增 `site/content/resources/client-observability.md`：包含 Server vs Client 架構差異圖、Pillar 1 Logs（Serilog + Local File + Remote Upload + 離線 buffer）、Pillar 2 Traces（App 內部追蹤 + End-to-End + Activity API）、Pillar 3 Metrics（Push model + Client 特有 metrics）、三本柱串接（Local Buffer + batch push + End-to-End traceId 串接）、技術棧對照總表
- [x] 8.4 在 `ch5-verify-observe.md` SKILL 預告之後加入 Client 端附錄連結段落
