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

for (const route of ['/', '/en/']) {
  test(`${route} follows the approved Home information hierarchy`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator('[data-home-section]')).toHaveCount(expectedSequence.length);
    await expect.poll(async () => page.locator('[data-home-section]').evaluateAll((sections) =>
      sections.map((section) => section.getAttribute('data-home-section')),
    )).toEqual(expectedSequence);

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
