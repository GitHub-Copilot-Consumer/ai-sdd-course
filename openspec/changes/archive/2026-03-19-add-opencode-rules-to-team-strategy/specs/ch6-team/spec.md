# Spec: ch6-team (delta)

## MODIFIED Requirements

### Requirement: Ch6 導入 Roadmap 反映新的 Greenfield → Brownfield 流程

Ch6 的「Week 1–2：工具安裝與觀念對齊」段落 SHALL 更新，在行動項目表格中新增「建立並推送專案 `AGENTS.md`，設定 OpenCode 公共規則」一列，其負責角色為 Tech Lead，交付物為「`AGENTS.md` PR 合入 main branch」。Roadmap 的描述 SHALL 反映新課程流程（Ch0–Ch2 為 Greenfield，Ch3–Ch5 為 Brownfield SDD）。

#### Scenario: 學習者閱讀導入 Roadmap

- **WHEN** 學習者閱讀 Ch6 的 Week 1–2 行動項目表格
- **THEN** 表格 SHALL 包含 Greenfield/Brownfield 分界的說明，且 SHALL 包含一列關於建立 AGENTS.md 的行動項目，負責角色為 Tech Lead

#### Scenario: 工作坊議程涵蓋新章節內容

- **WHEN** 學習者閱讀 Week 1–2 工作坊議程說明
- **THEN** 議程說明 SHALL 涵蓋 Ch0–Ch5 的完整課程範圍，包含 Greenfield/Brownfield 分界概念
