# ADR-002: 使用 Hextra `{{% steps %}}` Shortcode 呈現所有步驟與流程

**日期**: 2026-03-20  
**狀態**: Accepted  
**決策者**: 課程維護團隊

---

## 背景

課程站台使用 Hugo + Hextra theme。站台內容中大量的步驟說明與工作流程，歷史上採用多種不一致的格式：

- `**Step N：**` 粗體文字（非 heading，無語意結構，無視覺層次）
- `#### Step N：` h4 標題（heading 但層次不一致）
- ASCII art 程式碼區塊（只在 monospace 字體下可讀，無法響應式呈現，難以維護）

Hextra theme 內建 `{{% steps %}}` shortcode（位於 `site/_vendor/github.com/imfing/hextra/layouts/_shortcodes/steps.html`），能將 `### h3` 標題序列渲染為帶編號圓圈的垂直時間軸，提供原生、一致、響應式的視覺呈現。

## 決策

**課程內容中所有「循序步驟」與「循序流程」的段落 SHALL 使用 Hextra `{{% steps %}}` shortcode 呈現。**

具體規範：

1. **適用範圍：循序步驟與流程**  
   操作型步驟（How-to 流程、Lab 操作步驟）與概念型循序流程（如因果鏈：A → B → C）都應使用 `{{% steps %}}`。

2. **語法規範：`### h3` heading**  
   `{{% steps %}}` shortcode 內部 SHALL 使用 `### h3` heading 作為每個步驟的標題。步驟內部的子標題維持 `####` h4。

3. **排除範圍：非循序視覺圖表**  
   架構圖、span 樹狀結構、before/after 檔案樹、資料流程圖等非循序圖表 SHALL NOT 使用 `{{% steps %}}`，保持現有 ASCII code block 或其他適合的格式。

4. **語法格式**  
   ```markdown
   {{%/* steps */%}}

   ### 步驟標題一

   步驟內容...

   ### 步驟標題二

   步驟內容...

   {{%/* /steps */%}}
   ```

## 正當理由

- Hextra `{{% steps %}}` 提供原生視覺層次（數字圓圈 + 垂直連線），遠優於 ASCII 箭頭或粗體文字
- 統一格式降低維護成本，新增步驟只需加 `### h3` heading
- 語意結構明確（步驟是 heading，不是粗體文字），對 accessibility 友善
- Shortcode 已內建於 Hextra theme，無需額外安裝

## 後果

- **正面**：步驟內容視覺一致、易讀、易維護；新增步驟不需要記住 ASCII 格式
- **負面**：`{{% steps %}}` 僅支援 Markdown 內容，若步驟中包含其他 shortcode 可能有渲染限制（Hextra 官方文件已說明此限制）

## 遷移範圍（初始遷移，2026-03-20）

以下檔案已於 change `use-hextra-steps-shortcode` 中完成遷移：

| 檔案 | 遷移位置 |
|------|---------|
| `site/content/sdd/ch5-verify-observe.md` | 問題排查 Workflow（ASCII → steps）、修復 Drift 流程（Step 1-3）、Lab Part 1（Step 1-3）、Lab Part 2（Step 1-3） |
| `site/content/sdd/ch1-vibe-coding.md` | copilot-instructions 設定流程（Step 1-3） |
| `site/content/sdd/ch2-mvp-to-spec.md` | Lab OpenSpec init（Step 1-4） |
| `site/content/sdd/ch3-openspec.md` | Fast-Forward workflow（Step 1-4） |
| `site/content/sdd/ch4-coding-agent.md` | Coding Agent workflow（Step 1-4） |
| `site/content/resources/agent-skills-standard.md` | Marketplace 安裝（Step 1-2）、Manual 安裝（Step 1-3） |
