/**
 * Tests for GitHub Actions deploy workflow configuration.
 *
 * Covers spec scenarios from:
 * - github-pages-ci-config: baseURL injection, Go environment
 * - github-pages-deploy: workflow file structure, build command, deploy target
 */

const fs = require('fs');
const path = require('path');

const WORKFLOW_PATH = path.resolve(__dirname, '../../../.github/workflows/deploy.yml');

let workflowContent;

beforeAll(() => {
  workflowContent = fs.readFileSync(WORKFLOW_PATH, 'utf-8');
});

describe('github-pages-ci-config: baseURL injection', () => {
  test('workflow defines GITHUB_PAGES_URL environment variable', () => {
    expect(workflowContent).toContain('GITHUB_PAGES_URL');
  });

  test('build step uses -b flag to override baseURL', () => {
    expect(workflowContent).toMatch(/-b \$\{\{ env\.GITHUB_PAGES_URL \}\}/);
  });

  test('build command is hugo -s site/ --minify with -b flag', () => {
    expect(workflowContent).toContain('hugo -s site/ --minify');
    expect(workflowContent).toContain('-b ${{ env.GITHUB_PAGES_URL }}');
  });
});

describe('github-pages-ci-config: Go environment for Hugo Module', () => {
  test('workflow includes setup-go@v5 step', () => {
    expect(workflowContent).toContain('actions/setup-go@v5');
  });

  test('go-version is 1.21', () => {
    expect(workflowContent).toContain("go-version: '1.21'");
  });

  test('setup-go step appears before Hugo setup step', () => {
    const goSetupIndex = workflowContent.indexOf('actions/setup-go@v5');
    const hugoSetupIndex = workflowContent.indexOf('peaceiris/actions-hugo@v2');
    expect(goSetupIndex).toBeGreaterThan(-1);
    expect(hugoSetupIndex).toBeGreaterThan(-1);
    expect(goSetupIndex).toBeLessThan(hugoSetupIndex);
  });
});

describe('github-pages-deploy: workflow file structure', () => {
  test('workflow file exists', () => {
    expect(fs.existsSync(WORKFLOW_PATH)).toBe(true);
  });

  test('trigger is push to main branch', () => {
    expect(workflowContent).toContain('branches:');
    expect(workflowContent).toContain('main');
  });

  test('checkout uses submodules: false', () => {
    expect(workflowContent).toContain('submodules: false');
  });

  test('hugo-version is 0.120.4', () => {
    expect(workflowContent).toContain("hugo-version: '0.120.4'");
  });
});

describe('github-pages-deploy: deploy target', () => {
  test('publish_dir is ./site/public', () => {
    expect(workflowContent).toContain('publish_dir: ./site/public');
  });

  test('github_token uses GITHUB_TOKEN secret', () => {
    expect(workflowContent).toContain('github_token: ${{ secrets.GITHUB_TOKEN }}');
  });

  test('uses peaceiris/actions-gh-pages@v3', () => {
    expect(workflowContent).toContain('peaceiris/actions-gh-pages@v3');
  });
});
