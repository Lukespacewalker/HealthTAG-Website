import { expect, test } from '@playwright/test';

const expectedSequence = [
  'hero',
  'proof',
  'news',
  'responsibilities',
  'capabilities',
  'audiences',
  'deployments',
  'phr',
  'founder',
  'contact',
];

test.describe('static Home information hierarchy', () => {
  // This contract is about Astro-rendered HTML, not client-side behavior.
  // Keep WebGL/Three.js out of the assertion path so CI load cannot starve
  // page.evaluate polling on software-rendered headless Chromium.
  test.use({ javaScriptEnabled: false });

  for (const route of ['/', '/en/']) {
    test(`${route} follows the approved Home information hierarchy`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });

      const sections = page.locator('[data-home-section]');
      await expect(sections).toHaveCount(expectedSequence.length);
      for (const [index, sectionName] of expectedSequence.entries()) {
        await expect(sections.nth(index)).toHaveAttribute('data-home-section', sectionName);
      }

      await expect(page.locator('[data-home-section="hero"] .hero-actions a')).toHaveCount(2);
      await expect(page.locator('[data-home-section="proof"] .trust-bar-list > li')).toHaveCount(6);
      await expect(page.locator('[data-home-section="proof"] .trust-bar-type')).toHaveCount(6);
      await expect(page.locator('[data-home-section="news"] .featured-story')).toHaveCount(2);
      await expect(page.locator('[data-home-section="news"] .latest-news-list > a')).toHaveCount(3);
      await expect(page.locator('[data-home-section="responsibilities"] article')).toHaveCount(3);
      await expect(page.locator('[data-home-section="capabilities"] article')).toHaveCount(4);
      await expect(page.locator('[data-home-section="audiences"] nav > a')).toHaveCount(4);
      await expect(page.locator('[data-home-section="deployments"] article')).toHaveCount(3);
      await expect(page.locator('[data-home-section="phr"] img')).toBeVisible();
      await expect(page.locator('[data-home-section="founder"]')).toBeVisible();
      await expect(page.locator('[data-home-section="contact"] a[href$="/contact/"]')).toBeVisible();
    });
  }
});

test('navigation exposes the Platform overview and Investors without overstating the posts index', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const desktopNav = page.locator('.desktop-nav');
  await expect(desktopNav.locator('a[href="/platform/"]')).toHaveText('ภาพรวมแพลตฟอร์ม');
  await expect(desktopNav.locator('a[href="/investors/"]')).toHaveText('ข้อมูลสำหรับนักลงทุน');
  await expect(desktopNav.locator('a[href="/posts/"]')).toHaveText('รวมข่าวและบทความ');

  await page.goto('/en/');
  await expect(desktopNav.locator('a[href="/en/platform/"]')).toHaveText('Platform overview');
  await expect(desktopNav.locator('a[href="/en/investors/"]')).toHaveText('Investors');
  await expect(desktopNav.locator('a[href="/en/posts/"]')).toHaveText('News & articles overview');
});
