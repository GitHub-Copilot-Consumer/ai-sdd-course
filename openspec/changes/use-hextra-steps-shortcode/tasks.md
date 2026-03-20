## 1. 建立 ADR-002

- [x] 1.1 新增 `openspec/adr/ADR-002-use-hextra-steps-shortcode.md`，記錄決策背景、適用範圍（循序步驟 vs 非循序圖表）、語法規範（`### h3` heading）、遷移檔案清單

## 2. 遷移 ch5-verify-observe.md

- [x] 2.1 將「問題排查 Workflow」ASCII code block（Lines 162-182）轉換為 `{{% steps %}}`，三個步驟標題分別為「Metrics 告訴你「有問題」」、「Logs 告訴你「什麼問題」」、「Traces 告訴你「問題在哪裡」」
- [x] 2.2 將「修復 Drift 的標準流程」（Lines 67-89）的 `**Step 1/2/3：**` 粗體改為 `{{% steps %}}` 內的 `### h3` heading
- [x] 2.3 將 Lab Part 1「Spec 驗證」（Lines 566-585）的 `**Step 1/2/3：**` 粗體改為 `{{% steps %}}` 內的 `### h3` heading
- [x] 2.4 將 Lab Part 2「加入可觀測性三本柱」（Lines 594-700）的 `#### Step 1/2/3：` h4 heading 改為 `{{% steps %}}` 內的 `### h3` heading

## 3. 遷移其他課程章節

- [x] 3.1 遷移 `site/content/sdd/ch1-vibe-coding.md`：copilot-instructions 設定流程 Step 1-3（`**Step N：**` → `{{% steps %}}`）
- [x] 3.2 遷移 `site/content/sdd/ch2-mvp-to-spec.md`：Lab OpenSpec init Step 1-4（`### Step N：` → `{{% steps %}}`）
- [x] 3.3 遷移 `site/content/sdd/ch3-openspec.md`：Fast-Forward workflow Step 1-4（`**Step N：**` → `{{% steps %}}`）
- [x] 3.4 遷移 `site/content/sdd/ch4-coding-agent.md`：Coding Agent workflow Step 1-4（`**Step N：**` → `{{% steps %}}`）
- [x] 3.5 遷移 `site/content/resources/agent-skills-standard.md`：Marketplace 安裝 Step 1-2 與 Manual 安裝 Step 1-3（`**Step N：**` → `{{% steps %}}`）
