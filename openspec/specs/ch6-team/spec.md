# Spec: ch6-team

## Purpose

Define the requirements for Ch6 (Team), renamed from ch5-team, incorporating the Greenfield → Brownfield narrative into the team adoption roadmap and adding a full lifecycle retrospective as the course conclusion.

## Requirements

### Requirement: ch5-team.md 重新命名為 ch6-team.md 並更新 weight
`ch5-team.md` SHALL 重新命名為 `ch6-team.md`，front matter 中的 `weight` SHALL 從 `6` 更新為 `7`。舊檔案 SHALL 被刪除。

#### Scenario: 更名後舊檔不存在
- **WHEN** 更名完成後
- **THEN** `site/content/lessons/ch5-team.md` SHALL 不存在，`site/content/lessons/ch6-team.md` SHALL 存在且 weight 為 7

### Requirement: Ch6 導入 Roadmap 反映新的 Greenfield → Brownfield 流程

Ch6 的「Week 1–2：工具安裝與觀念對齊」段落 SHALL 更新，在行動項目表格中新增「建立並推送專案 `AGENTS.md`，設定 OpenCode 公共規則」一列，其負責角色為 Tech Lead，交付物為「`AGENTS.md` PR 合入 main branch」。Roadmap 的描述 SHALL 反映新課程流程（Ch0–Ch2 為 Greenfield，Ch3–Ch5 為 Brownfield SDD）。

#### Scenario: 學習者閱讀導入 Roadmap

- **WHEN** 學習者閱讀 Ch6 的 Week 1–2 行動項目表格
- **THEN** 表格 SHALL 包含 Greenfield/Brownfield 分界的說明，且 SHALL 包含一列關於建立 AGENTS.md 的行動項目，負責角色為 Tech Lead

#### Scenario: 工作坊議程涵蓋新章節內容

- **WHEN** 學習者閱讀 Week 1–2 工作坊議程說明
- **THEN** 議程說明 SHALL 涵蓋 Ch0–Ch5 的完整課程範圍，包含 Greenfield/Brownfield 分界概念

### Requirement: Ch6 新增完整生命週期回顧段落
Ch6 SHALL 新增一個「完整生命週期回顧」段落作為課程結尾，以視覺化方式呈現從 Greenfield Vibe Coding → MVP → Brownfield SDD → 持續演進的完整路徑。

#### Scenario: 學習者閱讀課程結尾
- **WHEN** 學習者閱讀 Ch6 末尾
- **THEN** SHALL 有一個 ASCII 圖示或視覺化段落，回顧整個課程學到的完整生命週期
