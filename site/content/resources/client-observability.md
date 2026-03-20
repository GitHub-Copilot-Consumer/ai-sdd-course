---
title: Client 端可觀測性延伸閱讀
weight: 10
description: Server vs Client 可觀測性的架構差異，以及 Logs、Traces、Metrics 在 Client 端（桌面、行動、IoT）的實踐方式。
showToc: true
---

> 本頁是 [Ch5 可觀測性三本柱](/sdd/ch5-verify-observe/) 的延伸閱讀，適合有 **Client 端**（桌面 App、行動 App、IoT 裝置）開發需求的學習者。

---

## Server vs Client 架構差異

Server 端的可觀測性建立在「Server 永遠在線、網路隨時可用」的假設上。Client 端打破了這個假設：

```
Server 端可觀測性架構：
┌──────────────┐         ┌─────────────────┐
│   App Server  │──Push──▶│ OTel Collector  │
│  (Node.js)   │         │ / Prometheus     │
└──────────────┘         └─────────────────┘
  網路永遠可用              即時抓取 OK

Client 端可觀測性架構：
┌──────────────┐  可能離線  ┌─────────────────┐
│ Client App   │────??────▶│ Remote Backend  │
│(桌面/行動/IoT)│           │ (Log Ingestion) │
└──────────────┘           └─────────────────┘
  必須處理：離線 buffer、批次上傳、隱私法規
```

**關鍵差異對照表：**

| 面向 | Server 端 | Client 端 |
|------|----------|----------|
| **網路連線** | 持續穩定 | 可能離線或不穩定 |
| **資料傳送** | Pull（Prometheus scrape）或即時 Push | 批次 Push（batch upload） |
| **隱私考量** | 內網資料，較少限制 | 用戶裝置資料，需符合 GDPR/個資法 |
| **存儲位置** | 直接送 backend | 本地 buffer → 上傳 |
| **Crash 處理** | Server 掛掉有 infra 告警 | App crash 需在重啟後上傳 crash log |
| **跨平台** | 通常單一語言/平台 | 可能跨 Windows/macOS/Linux/Android/iOS |

---

## Pillar 1: Logs（Client 端日誌）

### 技術棧：Serilog（以 .NET 為例）

Client 端的 Structured Logging 挑戰在於：log 不能直接送出去，必須先寫到本地，再批次上傳。

```
Client App
    │
    ▼
Serilog（結構化日誌）
    │
    ├──▶ Local File（本地儲存）
    │     └── logs/app-{date}.log
    │
    └──▶ Remote Sink（批次上傳）
          └── 每 5 分鐘 / 累積 100 條 → HTTP POST to log ingestion API
```

**Prompt 範例：加入 Client 端 Structured Logging**

```
專案是 .NET WPF 桌面應用程式（C#）。
請：
1. 安裝 Serilog + Serilog.Sinks.File + Serilog.Sinks.Http
2. 設定 Serilog：同時寫到本地檔案（logs/app-.log，每天 rolling）和遠端 API（批次上傳）
3. 為所有重要操作加入 structured log（userId、action、durationMs）
4. 加入離線 buffer：網路不通時暫存到本地，恢復連線後自動上傳
5. 不記錄任何 PII（個人識別資料），敏感欄位用 [Redacted] 替換
```

**離線 Buffer 機制：**

```
用戶操作 → Serilog 寫入本地 queue
                    │
          網路可用？ │
          Yes ──────┼──▶ 批次 POST 到 Log API → 清除本地 buffer
          No        │    
                    └──▶ 保留在本地，下次啟動時重試（最多保留 7 天）
```

---

## Pillar 2: Traces（Client 端追蹤）

Client 端的 Traces 分兩種層次：**App 內部追蹤**和**End-to-End 追蹤**。

### App 內部追蹤

追蹤 Client 內部的操作流程，找出 UI 卡頓、慢操作的根本原因：

```
使用者點擊「儲存」按鈕
└── Span: user.save_action          [總計 320ms]
    ├── Span: validation.check      [5ms]
    ├── Span: data.serialize        [15ms]
    ├── Span: file.write_local      [200ms]  ← 瓶頸
    └── Span: api.sync_remote       [100ms]
```

### End-to-End 追蹤

讓同一個使用者操作的 `traceId` 同時出現在 Client log 和 Server log，實現跨端追蹤：

```
Client App                          Server API
    │                                   │
    │  POST /api/todos                  │
    │  Header: traceparent: 00-4bf9...  │
    ├──────────────────────────────────▶│
    │                                   ├── Span: http.POST /api/todos
    │                                   │     traceId: "4bf92f35..."
    │                                   └── Log: {"traceId": "4bf92f35..."}
    │
    └── Client Log: {"traceId": "4bf92f35...", "action": "create_todo"}

相同 traceId → 可以在 Jaeger 中看到完整的 Client → Server 請求路徑
```

**Prompt 範例：使用 Activity API 加入 .NET 追蹤**

```
專案是 .NET 桌面應用程式。
請：
1. 使用 System.Diagnostics.ActivitySource（.NET 內建，無需額外套件）
2. 為核心業務操作建立 Activity（等同 Span）
3. 在每個 HTTP 呼叫的 Header 中帶入 traceparent（W3C Trace Context 格式）
4. 讓 traceId 自動出現在所有 Serilog log 的欄位中
5. 為耗時超過 100ms 的操作加入警告 log
```

---

## Pillar 3: Metrics（Client 端指標）

### Push Model（Client 端必須用 Push）

Server 端 Prometheus 用 **Pull** 模式（Prometheus 主動 scrape），但 Client 裝置沒有固定 IP，外部無法主動連入，**必須用 Push**：

```
Server 端（Pull）：                 Client 端（Push）：
                                    
Prometheus ──scrape──▶ /metrics     Client App
（每 15 秒拉一次）                        │
                                         │ 每 5 分鐘批次 Push
                                         ▼
                                    Pushgateway / Custom API
                                         │
                                         ▼
                                    Prometheus / InfluxDB
```

### Client 特有的 Metrics 類型

除了 Server 端常見的 `http_requests_total`，Client 端有其特有的指標：

| Metric | 類型 | 說明 |
|--------|------|------|
| `app_launches_total` | Counter | 應用程式啟動次數 |
| `feature_usage_total` | Counter | 功能使用次數（labels: feature_name） |
| `crash_total` | Counter | Crash 次數（labels: error_type） |
| `session_duration_seconds` | Histogram | 使用者 session 時長分佈 |
| `ui_render_duration_seconds` | Histogram | 畫面渲染時間（labels: screen） |
| `active_users` | Gauge | 目前活躍用戶數（需聚合） |
| `offline_duration_seconds` | Histogram | 離線時長分佈 |

**Prompt 範例：加入 Client 端 Metrics 收集**

```
專案是跨平台桌面應用程式（.NET / Electron / Tauri）。
請：
1. 建立本地 MetricsCollector 模組，收集以下指標：
   - app_launches_total（每次啟動 +1）
   - feature_usage_total（label: feature_name，每次使用 +1）
   - session_duration_seconds（App 關閉時記錄）
2. 資料存在本地 SQLite（metrics.db），不即時上傳
3. 每次啟動時，將上次的 metrics 批次 POST 到 /api/metrics（Prometheus pushgateway 格式）
4. 確保所有資料匿名化，不包含任何個人識別資訊
5. 提供 opt-out 機制（用戶可以在設定中關閉 metrics 收集）
```

---

## 三本柱串接（Client 端版本）

Client 端的三本柱串接與 Server 端相似，但多了**離線 buffer** 和**批次同步**的挑戰：

```
一個 Client 端操作的完整生命週期：

用戶執行「同步資料」                     traceId: "client-xyz-789"
       │
       ├──▶ Log: {"traceId":"client-xyz-789", "action":"sync_start"}
       │         → 寫入本地 buffer
       │
       ├──▶ Activity/Span: "data.sync"  [traceId: "client-xyz-789"]
       │         → 包含 HTTP 呼叫，帶入 traceparent header
       │
       └──▶ Metric: feature_usage_total{feature="sync"} +1
                 → 寫入本地 metrics.db

       [網路恢復後批次上傳]
            │
            ├──▶ Log API：{"traceId":"client-xyz-789", ...}
            ├──▶ Pushgateway：feature_usage_total{feature="sync"} 1
            └──▶ Server Jaeger：看到從 Client 傳入的 span，
                  與 Server span 串接成完整 End-to-End trace
```

**End-to-End traceId 串接的關鍵：**

1. Client 在發出 HTTP request 時，在 Header 中帶入 `traceparent`（W3C Trace Context）
2. Server 的 OpenTelemetry SDK 自動讀取此 Header，將 Server span 掛在 Client span 之下
3. 最終在 Jaeger 中可以看到從用戶點擊到資料庫查詢的完整路徑

---

## 技術棧對照總表

| 面向 | Server 端（Node.js） | Client 端（.NET） | Client 端（Web/Electron） |
|------|---------------------|-------------------|--------------------------|
| **Logs** | pino + Loki/ELK | Serilog + File Sink + HTTP Sink | console + electron-log + remote API |
| **Traces** | @opentelemetry/sdk-node | System.Diagnostics.ActivitySource | @opentelemetry/sdk-web |
| **Metrics** | prom-client + Prometheus scrape | 自建 Collector + Pushgateway | 自建 Collector + Pushgateway |
| **傳送模式** | Pull（Prometheus scrape） | Push（批次上傳） | Push（批次上傳） |
| **離線處理** | 不需要 | 本地 SQLite / File buffer | localStorage / IndexedDB buffer |
| **Crash 報告** | PM2 / Docker 自動重啟 | Windows Error Reporting / Sentry | Sentry Electron |

---

> **回到課程：** [Ch5 驗證、測試與可觀測性](/sdd/ch5-verify-observe/)
