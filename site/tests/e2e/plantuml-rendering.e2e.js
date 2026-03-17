/**
 * E2E tests for PlantUML diagram rendering.
 *
 * Requires Hugo dev server running at http://localhost:1313
 * Start with: hugo server --source site
 *
 * Spec: plantuml-rendering / "課程頁面包含 PlantUML 圖表範例"
 */
const { test, expect } = require('@playwright/test');

test.describe('PlantUML Rendering - E2E', () => {
  test('ch2 lesson page renders plantuml diagram as SVG', async ({ page }) => {
    await page.goto('/lessons/ch2-mvp-to-spec/');
    // The PlantUML render hook should embed <svg> elements in the page
    const svgElements = page.locator('svg');
    await expect(svgElements.first()).toBeVisible();
  });

  test('ch3 lesson page renders plantuml diagram as SVG', async ({ page }) => {
    await page.goto('/lessons/ch3-openspec/');
    const svgElements = page.locator('svg');
    await expect(svgElements.first()).toBeVisible();
  });

  test('plantuml diagram SVG has non-zero dimensions', async ({ page }) => {
    await page.goto('/lessons/ch2-mvp-to-spec/');
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();
    const box = await svg.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);
  });

  test('plantuml diagram is not showing raw plantuml source as text', async ({ page }) => {
    await page.goto('/lessons/ch2-mvp-to-spec/');
    // If rendering failed, the page would show @startuml raw text
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).not.toContain('@startuml');
  });
});
