---
title: Agent Skills 標準與官方 Skills 倉庫
weight: 3
description: 介紹 Agent Skills 開放標準（agentskills.io）、Anthropic 官方 anthropics/skills 倉庫，以及在 Claude Code 與 OpenCode 中的安裝與共用機制。
showToc: true
---

## Agent Skills 開放標準

**Agent Skills** 是一種開放的跨工具技能格式，由 Anthropic 主導設計並釋出為開放標準，規範網址為 [agentskills.io](https://agentskills.io)。

### 什麼是 Agent Skills？

Agent Skills 是**資料夾形式的指令包**：一個技能就是一個目錄，目錄內含 `SKILL.md` 檔案，以 YAML frontmatter + Markdown 正文的形式定義 AI agent 應如何執行特定任務。

```
my-skill/
└── SKILL.md          ← 技能定義（必要）
    ├── YAML frontmatter（name、description 必填）
    └── Markdown 指令、步驟、範例
```

Agent 在需要某個技能時，透過原生的 `skill` 工具**按需載入**——只有在執行對應任務時才將技能內容注入 context，避免佔用不必要的 context 空間。

### 格式規範：SKILL.md

每個 `SKILL.md` 必須包含 YAML frontmatter：

```markdown
---
name: my-skill-name
description: 清楚說明此技能做什麼，以及何時使用它
license: MIT            # 選填
compatibility: opencode # 選填
---

# My Skill Name

[技能的指令內容]
```

**名稱規則**：`name` 只允許小寫字母、數字、單一連字號，且必須與目錄名稱一致。

### 支援此標準的工具

Agent Skills 格式已被 30+ 個主流 AI coding agent 採用：

| 工具 | 說明 |
|------|------|
| **Claude Code** | Anthropic 官方 coding agent（原生支援） |
| **OpenCode** | 開源 TUI coding agent（Claude 路徑相容） |
| **Cursor** | AI-first 程式碼編輯器 |
| **VS Code（GitHub Copilot）** | 微軟官方 VS Code AI 整合 |
| **Gemini CLI** | Google Gemini 命令列 agent |
| **Roo Code** | VS Code AI coding extension |
| **Goose** | Block（Square）的開源 coding agent |
| **OpenHands** | All Hands AI 的開源 agent 框架 |

> 完整支援清單請參考 [agentskills.io](https://agentskills.io)。

---

## Anthropic 官方 Skills 倉庫

**GitHub**：[https://github.com/anthropics/skills](https://github.com/anthropics/skills)

Anthropic 官方維護的範例 skills 倉庫，包含 **17 個精選 skills**，展示從創意設計到企業工作流程的各種可能性。這些 skills 分為四大類別：

### Creative & Design

| Skill | 說明 |
|-------|------|
| `algorithmic-art` | 演算法藝術生成，使用程式邏輯創作視覺作品 |
| `canvas-design` | Canvas 畫布設計，建立互動式視覺內容 |
| `theme-factory` | 主題工廠，為專案快速建立一致的視覺主題 |
| `slack-gif-creator` | 建立 Slack 用 GIF 動畫 |

### Document Skills（Source-Available）

這四個技能是 Claude.ai 文件建立功能的生產級實作，以 source-available 授權公開：

| Skill | 說明 |
|-------|------|
| `docx` | 建立與編輯 Word（.docx）文件 |
| `pdf` | 處理與生成 PDF 文件 |
| `pptx` | 建立 PowerPoint（.pptx）簡報 |
| `xlsx` | 建立與操作 Excel（.xlsx）試算表 |

### Development & Technical

| Skill | 說明 |
|-------|------|
| `claude-api` | Claude API 使用指引與最佳實踐 |
| `frontend-design` | 前端設計模式，含 UI 元件與互動設計原則 |
| `mcp-builder` | 建構 MCP（Model Context Protocol）server |
| `web-artifacts-builder` | 建構可互動的 Web artifacts |
| `webapp-testing` | Web 應用測試策略與實作 |

### Enterprise & Communication

| Skill | 說明 |
|-------|------|
| `brand-guidelines` | 品牌規範遵循，確保輸出符合品牌語調與視覺 |
| `doc-coauthoring` | 文件協作，多人協同撰寫流程 |
| `internal-comms` | 企業內部溝通，含公告、memo、報告等格式 |

### Meta

| Skill | 說明 |
|-------|------|
| `skill-creator` | **建立新 Skills 的技能**——含完整的 Skill 設計、測試、評估、與 description 最佳化工作流程 |

> **授權說明**：Creative、Development、Enterprise 類別的 skills 以 **Apache 2.0** 開源授權。Document skills（docx、pdf、pptx、xlsx）採 **source-available** 授權，可參考但不能直接用於商業產品。

---

## 安裝方式

### 方式一：Claude Code Plugin Marketplace（推薦）

這是最簡便的方式，透過 Claude Code 的 Plugin 系統一鍵安裝。

{{% steps %}}

### 加入官方 marketplace

```
/plugin marketplace add anthropics/skills
```

### 安裝 skill 套件

```
# 安裝文件技能（docx、pdf、pptx、xlsx）
/plugin install document-skills@anthropic-agent-skills

# 安裝範例技能（creative、development、enterprise 類別）
/plugin install example-skills@anthropic-agent-skills
```

安裝後，直接在對話中提及技能名稱即可使用。例如：

```
Use the PDF skill to extract form fields from path/to/form.pdf
```

{{% /steps %}}

> **注意**：Plugin 指令格式可能隨 Claude Code 版本更新而變化，請以 [anthropics/skills](https://github.com/anthropics/skills) 官方 README 為準。

### 方式二：手動安裝到共用路徑

適合想要選擇性安裝、或需要在 OpenCode 中直接使用的情境。

{{% steps %}}

### Clone 官方倉庫

```bash
git clone https://github.com/anthropics/skills.git /tmp/anthropics-skills
```

### 複製想要的 skill 到 `~/.claude/skills/`

```bash
# 建立目標目錄（若不存在）
mkdir -p ~/.claude/skills

# 複製單一 skill（以 mcp-builder 為例）
cp -r /tmp/anthropics-skills/skills/mcp-builder ~/.claude/skills/mcp-builder

# 或複製所有範例 skills
cp -r /tmp/anthropics-skills/skills/* ~/.claude/skills/
```

### 確認安裝

在 Claude Code 中，skills 會自動被發現。在 OpenCode 中，可透過以下方式確認：

```
skill({ name: "mcp-builder" })
```

{{% /steps %}}

### 方式三：建立自訂 Skill

參考 `skill-creator` skill 或 [anthropics/skills 的 template](https://github.com/anthropics/skills/tree/main/template)：

```bash
# 在全域目錄建立自訂 skill
mkdir -p ~/.claude/skills/my-skill
cat > ~/.claude/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: 說明此技能做什麼，以及何時使用它
---

# My Skill

[在此撰寫你的技能指令]
EOF
```

---

## OpenCode 與 Claude Code 的共用 Skills 路徑

這是使用兩個工具的使用者最需要了解的機制：**安裝一次，兩個工具皆可使用**。

### OpenCode 的 6 條 Skills 搜尋路徑

OpenCode 按以下優先順序掃描 skills，**包含 Claude Code 使用的路徑**：

| 優先順序 | 路徑 | 說明 |
|---------|------|------|
| 1 | `.opencode/skills/<name>/SKILL.md` | 專案級 OpenCode Skills |
| 2 | `~/.config/opencode/skills/<name>/SKILL.md` | 全域 OpenCode Skills |
| 3 | `.claude/skills/<name>/SKILL.md` | 專案級 Claude 相容路徑 ★ |
| 4 | `~/.claude/skills/<name>/SKILL.md` | 全域 Claude 相容路徑 ★ |
| 5 | `.agents/skills/<name>/SKILL.md` | 專案級 Agents 相容路徑 |
| 6 | `~/.agents/skills/<name>/SKILL.md` | 全域 Agents 相容路徑 |

**★ 標記的路徑同時被 Claude Code 使用**——這意味著：

> 將 skills 安裝到 `~/.claude/skills/`，**Claude Code 和 OpenCode 都能自動發現並使用**，無需重複設定。

### 搜尋機制

對於**專案本地路徑**（優先順序 1、3、5），OpenCode 從當前工作目錄**向上遍歷到 git 根目錄**，逐層掃描所有符合的 `skills/*/SKILL.md`。

這意味著：
- Monorepo 中不同子目錄可以有各自的 skills
- 根目錄的 skills 對所有子專案可見

### 實用建議

```
個人常用技能    → ~/.claude/skills/         全域共用，CC + OpenCode 皆可用
團隊共用技能    → .claude/skills/           納入 git，所有團隊成員共享
專案特定技能    → .opencode/skills/         OpenCode 專屬，不影響 Claude Code
```

### 權限控制

在 `opencode.json` 中可精細控制哪些 skills 允許被 agent 載入：

```json
{
  "permission": {
    "skill": {
      "*": "allow",
      "internal-*": "deny",
      "experimental-*": "ask"
    }
  }
}
```

| 權限值 | 行為 |
|--------|------|
| `allow` | skill 立即載入 |
| `deny` | 對 agent 隱藏此 skill |
| `ask` | 載入前提示使用者確認 |

---

## 與 ECC 的定位差異

本課程的 [everything-claude-code 資源頁面](/resources/everything-claude-code/) 詳細介紹了社群開源的 ECC 框架。兩者的定位有明確區別：

| 維度 | `anthropics/skills`（官方） | `everything-claude-code`（ECC） |
|------|---------------------------|--------------------------------|
| **維護者** | Anthropic 官方 | 社群（Affaan Mustafa） |
| **Skills 數量** | 17 個精選 | 102+ 個全面覆蓋 |
| **主要定位** | 示範 Skills 格式 + 生產級文件技能 | 完整開發效能強化框架 |
| **授權** | Apache 2.0（範例）+ Source-Available（文件） | MIT |
| **文件處理能力** | ★★★★★（docx、pdf、pptx、xlsx） | ★★（非主要焦點） |
| **開發工作流** | ★★（webapp-testing、frontend-design） | ★★★★★（TDD、Debug、Review、Memory...） |
| **安裝方式** | Plugin marketplace / 手動 | Plugin marketplace / 手動安裝腳本 |
| **跨工具相容** | Claude Code 原生，可共用至 OpenCode | CC + OpenCode + Cursor（廣泛） |

**使用建議：**
- 需要**文件生成能力**（Word、PDF、Excel、PowerPoint）→ 使用 `anthropics/skills` 的 Document Skills
- 需要**開發工作流優化**（TDD、Security Review、Context Engineering）→ 使用 ECC
- 兩者不互斥，可同時安裝（放在不同 skill 目錄，不會衝突）

---

## 延伸資源

- **Agent Skills 開放標準**：[agentskills.io](https://agentskills.io)
- **Anthropic 官方 Skills 倉庫**：[github.com/anthropics/skills](https://github.com/anthropics/skills)
- **OpenCode Skills 文件**（繁體中文）：[opencode.ai/docs/zh-tw/skills/](https://opencode.ai/docs/zh-tw/skills/)
- **Claude Code Skills 文件**：[code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)
- **Anthropic Engineering Blog**：[Equipping agents for the real world with Agent Skills](https://anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- **課程相關**：[everything-claude-code 資源介紹](/resources/everything-claude-code/)（ECC 框架完整介紹）

> 最後驗證日期：2026 年 3 月。官方倉庫內容持續更新，請以 [anthropics/skills](https://github.com/anthropics/skills) 為準。
