/**
 * Tests for everything-claude-code resource page.
 *
 * Covers spec scenarios from:
 * - everything-claude-code-resource: 頁面存在、frontmatter 欄位、GitHub URL、
 *   核心元件名稱、安裝說明段落、OpenCode 整合區塊
 */

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.resolve(__dirname, '../../content/resources/everything-claude-code.md');

let content;

beforeAll(() => {
  content = fs.readFileSync(FILE_PATH, 'utf-8');
});

// ─── Scenario: 頁面檔案存在 ───────────────────────────────────────────────────

describe('everything-claude-code-resource: 頁面檔案存在', () => {
  test('everything-claude-code.md 檔案存在於 resources 目錄', () => {
    expect(fs.existsSync(FILE_PATH)).toBe(true);
  });
});

// ─── Scenario: frontmatter 欄位完整 ──────────────────────────────────────────

describe('everything-claude-code-resource: frontmatter 欄位完整', () => {
  test('包含 title 欄位且不為空', () => {
    expect(content).toMatch(/^---[\s\S]*?title:\s*.+/m);
  });

  test('包含 weight: 2', () => {
    expect(content).toMatch(/^---[\s\S]*?weight:\s*2/m);
  });

  test('包含 description 欄位且不為空', () => {
    expect(content).toMatch(/^---[\s\S]*?description:\s*.+/m);
  });

  test('包含 showToc: true', () => {
    expect(content).toMatch(/^---[\s\S]*?showToc:\s*true/m);
  });
});

// ─── Scenario: 包含 GitHub URL ────────────────────────────────────────────────

describe('everything-claude-code-resource: 包含 GitHub URL', () => {
  test('頁面包含 everything-claude-code GitHub URL', () => {
    expect(content).toContain('https://github.com/affaan-m/everything-claude-code');
  });
});

// ─── Scenario: 包含五個核心元件名稱 ──────────────────────────────────────────

describe('everything-claude-code-resource: 五個核心元件均出現在頁面中', () => {
  test('包含 Skills', () => {
    expect(content).toContain('Skills');
  });

  test('包含 Hooks', () => {
    expect(content).toContain('Hooks');
  });

  test('包含 Commands', () => {
    expect(content).toContain('Commands');
  });

  test('包含 Rules', () => {
    expect(content).toContain('Rules');
  });

  test('包含 Instincts', () => {
    expect(content).toContain('Instincts');
  });
});

// ─── Scenario: 包含安裝說明段落 ───────────────────────────────────────────────

describe('everything-claude-code-resource: 安裝方式說明', () => {
  test('包含 npm install 指令（Plugin 安裝）', () => {
    expect(content).toContain('npm install');
  });

  test('包含手動安裝說明', () => {
    expect(content).toMatch(/手動安裝|手動/);
  });
});

// ─── Scenario: 包含 OpenCode 整合區塊 ────────────────────────────────────────

describe('everything-claude-code-resource: OpenCode 整合區塊', () => {
  test('頁面中存在 OpenCode 整合相關區塊標題', () => {
    expect(content).toMatch(/OpenCode/);
  });

  test('包含至少兩個使用場景或範例', () => {
    // 場景以「場景」、「使用場景」或「範例」等詞出現至少兩次，或有 Skills/Hooks 使用範例描述
    const skillsScenario = /Skills.*整合|整合.*Skills/s.test(content);
    const hooksScenario = /Hooks.*自動化|自動化.*Hooks/s.test(content);
    const scenarioCount = [skillsScenario, hooksScenario].filter(Boolean).length;
    expect(scenarioCount).toBeGreaterThanOrEqual(2);
  });
});
