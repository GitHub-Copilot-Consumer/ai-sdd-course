# Spec: ch6-opencode-rules-setup

## Purpose

定義 Ch6 新增的「OpenCode Rules 設定」段落需求，涵蓋專案級、全域/個人級規則，以及透過 `opencode.json` 引用外部規則檔的設定方式。

## ADDED Requirements

### Requirement: Ch6 新增「OpenCode Rules 設定」獨立段落

`ch6-team.md` SHALL 在「專案結構標準化」段落之後、「導入 Roadmap」段落之前，新增一個 H2 標題「## OpenCode Rules 設定」段落。

#### Scenario: 讀者瀏覽 Ch6 頁面目錄

- **WHEN** 讀者瀏覽 Ch6 頁面的 TOC
- **THEN** TOC SHALL 包含「OpenCode Rules 設定」項目，且其位置在「專案結構標準化」之後、「導入 Roadmap」之前

### Requirement: 說明專案級 AGENTS.md 的用途與提交規範

「OpenCode Rules 設定」段落 SHALL 說明在專案根目錄建立 `AGENTS.md` 的用途，並明確指出該檔案 SHALL 提交至 Git 供全團隊共享。段落 SHALL 包含一個使用 Hugo + OpenSpec 情境的 `AGENTS.md` 範例程式碼區塊，範例 SHALL 包含以下項目：
1. 專案技術說明（語言、框架）
2. 目錄結構說明
3. 開發規範（至少 2 條）

#### Scenario: 讀者閱讀 AGENTS.md 說明

- **WHEN** 讀者閱讀「OpenCode Rules 設定」段落
- **THEN** 段落 SHALL 包含一個完整的 AGENTS.md 範例程式碼區塊（使用 markdown code fence，語言標記為 `markdown`）

#### Scenario: 範例涵蓋專案情境

- **WHEN** 讀者查看 AGENTS.md 範例
- **THEN** 範例 SHALL 使用與課程一致的 Hugo + OpenSpec 情境，而非泛用佔位符

### Requirement: 說明個人/全域規則的預留空間

「OpenCode Rules 設定」段落 SHALL 說明 `~/.config/opencode/AGENTS.md` 的用途：個人化設定（如偏好的程式碼風格、個人 Prompt 習慣），該檔案 SHALL 說明其不提交至 Git，用於預留個人彈性。

#### Scenario: 讀者了解個人設定位置

- **WHEN** 讀者閱讀個人規則說明
- **THEN** 段落 SHALL 明確標示路徑 `~/.config/opencode/AGENTS.md`，並說明「不提交至 Git」

### Requirement: 說明 opencode.json instructions 欄位引用外部規則

「OpenCode Rules 設定」段落 SHALL 說明如何使用 `opencode.json` 的 `instructions` 欄位引用現有文件作為規則來源。段落 SHALL 包含一個 `opencode.json` 範例程式碼區塊，範例 SHALL 展示：
1. 引用 glob 模式（如 `openspec/specs/*/spec.md`）
2. 引用具體路徑（如 `CONTRIBUTING.md`）

#### Scenario: 讀者查看 opencode.json 範例

- **WHEN** 讀者查看 opencode.json 範例
- **THEN** 範例 SHALL 為合法 JSON，包含 `$schema` 欄位與 `instructions` 陣列，且 instructions 陣列 SHALL 包含至少一個 glob 模式路徑

#### Scenario: 讀者理解引用複用價值

- **WHEN** 讀者閱讀 opencode.json instructions 說明
- **THEN** 段落 SHALL 說明此方式「不需要將規則複製到 AGENTS.md，可直接複用現有文件」的優點
