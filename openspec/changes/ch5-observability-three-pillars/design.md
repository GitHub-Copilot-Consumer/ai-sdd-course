## Context

`ch5-verify-observe.md` 是課程 Ch5 的主要內容頁，目前「運行時可觀測性」段落只涵蓋 Structured Logging 和 Error Tracking（歸屬 Logs 柱），缺少 Traces 和 Metrics 兩個柱子，也沒有說明三者如何串接。

本次修改為純文件內容變更，不涉及應用程式 code。目標是以 Hugo Markdown 格式重組並擴充 `ch5-verify-observe.md`，同時更新 `openspec/specs/ch5-verify-observe/spec.md`。

## Goals / Non-Goals

**Goals:**
- 重組「運行時可觀測性」段落為三本柱結構（Logs / Traces / Metrics）
- 新增三本柱概覽（定義、問題排查 workflow 圖）
- 新增 Pillar 2: Traces（span/trace 概念 + OpenTelemetry + AI Prompt）
- 新增 Pillar 3: Metrics（counter/gauge/histogram + prom-client + AI Prompt）
- 新增三本柱串接說明（correlation ID / OpenTelemetry 統一方案）
- 新增 SKILL 預告段落
- 擴展 Lab Part 2 為三步驟（Logs + Traces + Metrics）
- 更新 `ch5-verify-observe` spec 以反映新內容

**Non-Goals:**
- 不建立真實的 Node.js demo 專案
- 不安裝或配置 OpenTelemetry Collector / Jaeger / Prometheus 等 backend
- 不修改其他章節的內容
- 不為課程網站加入任何互動功能

## Decisions

### 段落結構重組方式

**決策**：重組現有 Structured Logging、Error Tracking、Health Check 三個段落，統一置於三本柱框架下，而非在現有段落前加一個獨立的「三本柱概覽」然後保持原有結構不動。

**理由**：若只在前面加概覽而不重組，讀者在閱讀概覽後看到的段落標題（Structured Logging、Error Tracking）仍是舊的分類邏輯，與概覽的三本柱框架脫節，造成認知不一致。重組後每個柱子都有完整的「概念 → AI Prompt 範例」結構，一致性更高。

**替代方案考慮**：在開頭加三本柱圖表然後不動現有段落——這樣改動最小，但讀者體驗較差。

---

### Trace 技術棧選擇

**決策**：使用 OpenTelemetry (OTel) Node.js SDK，Lab 輸出使用 `ConsoleSpanExporter`。

**理由**：OTel 是 CNCF 標準，業界通用，跨語言支援。用 Console Exporter 讓學員在 Lab 中無需啟動額外 backend（Jaeger、Zipkin 等），降低環境複雜度，聚焦在概念理解。

**替代方案考慮**：docker compose 啟動 Jaeger all-in-one——有更好的視覺化效果，但增加 Lab 設置複雜度，超出課程範圍。

---

### Metrics 技術棧選擇

**決策**：使用 `prom-client`（Prometheus Node.js client），暴露 `GET /metrics` endpoint。

**理由**：prom-client 是 Node.js 生態中最廣泛使用的 Prometheus client，API 直觀，與 Grafana 生態系整合容易。Prometheus 格式是 metrics 的業界標準。

---

### 三本柱串接的呈現方式

**決策**：以 ASCII 圖表呈現「Metrics → Logs → Traces」的問題排查 workflow，加上文字說明 correlation ID / traceId 的機制，最後介紹 OpenTelemetry 作為統一方案的概念（只介紹概念，不寫完整 OTel Collector 配置）。

**理由**：課程定位是「AI 如何幫你快速加入可觀測性基礎」，不是深入的 OTel 教學。提供足夠的概念讓學員理解串接的意義，後續有 SKILL 工具幫助自動化。

---

### SKILL 預告內容

**決策**：泛泛一段預告，不指定 SKILL 名稱或具體功能。

**理由**：SKILL 尚未規劃，過度具體的描述可能造成誤導。

## Risks / Trade-offs

- [Lab 時間增加] Traces + Metrics 步驟讓 Lab 從一個 Part 變三個步驟，時間大幅增加 → 緩解方式：每個步驟有明確的 AI Prompt 範本，學員主要是執行 Prompt + 驗證，不需要自己撰寫 code
- [OTel Console 輸出不直觀] ConsoleSpanExporter 的輸出格式對初學者較難閱讀 → 緩解方式：在說明中提供預期輸出的範例，讓學員知道要看什麼欄位（`traceId`、`name`、`duration`）
- [Tech 版本變動] OTel Node.js SDK 版本迭代較快，AI Prompt 中的套件名稱可能需要定期更新 → 接受此 trade-off，課程內容本來就需要定期維護
