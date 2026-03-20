/**
 * E2E tests for Learning Objectives Callout feature.
 *
 * Requires Hugo dev server running at http://localhost:1313
 * Start with: hugo server --source site
 *
 * Spec: learning-objectives-callout / "學習目標區塊使用 callout shortcode 呈現"
 */
const { test, expect } = require('@playwright/test');

// Hextra callout renders as a <div> with these classes
const CALLOUT_SELECTOR = 'div.hx\\:rounded-lg';

test.describe('Learning Objectives Callout - E2E', () => {
  test.describe('SDD ch0 page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/sdd/ch0-warmup/');
    });

    test('學習目標 heading is visible on the page', async ({ page }) => {
      const heading = page.locator('h2').filter({ hasText: '學習目標' });
      await expect(heading).toBeVisible();
    });

    test('學習目標 content is wrapped in a callout div', async ({ page }) => {
      const callout = page.locator(CALLOUT_SELECTOR).first();
      await expect(callout).toBeVisible();
    });

    test('callout contains 本章結束後 intro text', async ({ page }) => {
      const callout = page.locator(CALLOUT_SELECTOR).first();
      await expect(callout).toContainText('本章結束後，你將能夠');
    });

    test('學習目標 heading appears BEFORE the callout (outside callout)', async ({ page }) => {
      // The heading should NOT be inside the callout div
      const headingInsideCallout = page
        .locator(CALLOUT_SELECTOR)
        .filter({ has: page.locator('h2', { hasText: '學習目標' }) });
      await expect(headingInsideCallout).not.toBeAttached();
    });

    test('callout contains 🎯 emoji', async ({ page }) => {
      const callout = page.locator(CALLOUT_SELECTOR).first();
      await expect(callout).toContainText('🎯');
    });
  });

  test.describe('Agent ch1 page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/agent/ch1-model-fundamentals/');
    });

    test('學習目標 heading is visible on agent ch1 page', async ({ page }) => {
      const heading = page.locator('h2').filter({ hasText: '學習目標' });
      await expect(heading).toBeVisible();
    });

    test('學習目標 content is wrapped in a callout div on agent ch1 page', async ({ page }) => {
      const callout = page.locator(CALLOUT_SELECTOR).first();
      await expect(callout).toBeVisible();
    });

    test('callout contains 本章結束後 intro text on agent ch1 page', async ({ page }) => {
      const callout = page.locator(CALLOUT_SELECTOR).first();
      await expect(callout).toContainText('本章結束後，你將能夠');
    });

    test('學習目標 heading appears BEFORE the callout on agent ch1 page (outside callout)', async ({ page }) => {
      const headingInsideCallout = page
        .locator(CALLOUT_SELECTOR)
        .filter({ has: page.locator('h2', { hasText: '學習目標' }) });
      await expect(headingInsideCallout).not.toBeAttached();
    });

    test('callout contains 🎯 emoji on agent ch1 page', async ({ page }) => {
      const callout = page.locator(CALLOUT_SELECTOR).first();
      await expect(callout).toContainText('🎯');
    });
  });
});
