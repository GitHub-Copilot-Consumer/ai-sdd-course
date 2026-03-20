/**
 * E2E tests for mobile sidebar navigation.
 *
 * Verifies that the sidebar shows chapter page links on both mobile and desktop.
 * On mobile (< 768px), the hamburger menu opens an overlay sidebar.
 * On desktop (>= 768px), the sidebar is always visible.
 *
 * Requires Hugo dev server running at http://localhost:1313
 * Start with: hugo server --source site
 */
const { test, expect } = require('@playwright/test');

const LESSON_URL = '/sdd/ch0-warmup/';

// All chapter URLs expected in the sidebar, in weight order
const CHAPTER_LINKS = [
  '/sdd/ch0-warmup/',
  '/sdd/ch1-vibe-coding/',
  '/sdd/ch2-mvp-to-spec/',
  '/sdd/ch3-openspec/',
  '/sdd/ch4-coding-agent/',
  '/sdd/ch5-verify-observe/',
  '/sdd/ch6-team/',
];

const MOBILE_VIEWPORT = { width: 375, height: 812 };
const DESKTOP_VIEWPORT = { width: 1280, height: 800 };

test.describe('Mobile Sidebar Navigation - E2E', () => {
  test.describe('mobile (375px) - sidebar shows chapter links', () => {
    test.use({ viewport: MOBILE_VIEWPORT });

    test('hamburger menu opens sidebar with chapter links', async ({ page }) => {
      await page.goto(LESSON_URL);

      // Open mobile sidebar via hamburger button
      const hamburger = page.locator('.hextra-hamburger-menu');
      await expect(hamburger).toBeVisible();
      await hamburger.click();

      const sidebar = page.locator('.hextra-sidebar-container');

      // Sidebar should now be visible (transform slid in)
      await expect(sidebar).toBeVisible();

      // Each chapter link must be present in the sidebar
      for (const href of CHAPTER_LINKS) {
        const link = sidebar.locator(`a[href="${href}"]`);
        await expect(link).toBeAttached();
      }
    });

    test('mobile sidebar chapter links appear in correct weight order', async ({ page }) => {
      await page.goto(LESSON_URL);

      const hamburger = page.locator('.hextra-hamburger-menu');
      await hamburger.click();

      const sidebar = page.locator('.hextra-sidebar-container');
      const links = sidebar.locator('a[href^="/sdd/"]');
      const hrefs = await links.evaluateAll(anchors =>
        anchors.map(a => a.getAttribute('href'))
      );

      // Filter to only chapter hrefs we care about (exclude e.g. /lessons/ index)
      const chapterHrefs = hrefs.filter(h => CHAPTER_LINKS.includes(h));

      // Verify each expected chapter appears, in order
      expect(chapterHrefs).toEqual(
        expect.arrayContaining(CHAPTER_LINKS)
      );

      // Verify order: each link's position must be <= the next link's position
      const positions = CHAPTER_LINKS.map(href => chapterHrefs.indexOf(href));
      for (let i = 0; i < positions.length - 1; i++) {
        expect(positions[i]).toBeLessThan(positions[i + 1]);
      }
    });
  });

  test.describe('desktop (1280px) - sidebar unaffected', () => {
    test.use({ viewport: DESKTOP_VIEWPORT });

    test('desktop sidebar shows chapter links without hamburger interaction', async ({ page }) => {
      await page.goto(LESSON_URL);

      const sidebar = page.locator('.hextra-sidebar-container');
      await expect(sidebar).toBeVisible();

      // Hamburger button should not be visible on desktop
      const hamburger = page.locator('.hextra-hamburger-menu');
      await expect(hamburger).not.toBeVisible();

      // Each chapter link must be present in the visible sidebar
      for (const href of CHAPTER_LINKS) {
        const link = sidebar.locator(`a[href="${href}"]`);
        await expect(link).toBeAttached();
      }
    });
  });
});
