import { expect, test } from '@playwright/test';

const featuredSlugs = [
  'who-thailand-trusted-phr-workshop-2026',
  'digital-health-forum-2026',
];

for (const locale of ['th', 'en'] as const) {
  const prefix = locale === 'en' ? '/en' : '';

  test(`${locale} home separates two featured stories from three latest stories`, async ({ page }) => {
    await page.goto(`${prefix}/`);

    const featured = page.locator('.home-news-section .featured-story');
    const latest = page.locator('.home-news-section .latest-news-list > a');
    await expect(featured).toHaveCount(2);
    await expect(latest).toHaveCount(3);

    for (const slug of featuredSlugs) {
      await expect(featured.locator(`a[href="${prefix}/news/${slug}/"]`).first()).toBeVisible();
      await expect(page.locator(`.home-news-section .latest-news-list > a[href="${prefix}/news/${slug}/"]`)).toHaveCount(0);
    }
  });

  test(`${locale} news index features the selected stories without repeating them`, async ({ page }) => {
    await page.goto(`${prefix}/news/`);

    const featured = page.locator('.publication-featured-card');
    const browser = page.locator('.publication-card-list');
    await expect(featured).toHaveCount(2);

    for (const slug of featuredSlugs) {
      await expect(featured.locator(`a[href="${prefix}/news/${slug}/"]`).first()).toBeVisible();
      await expect(browser.locator(`a[href="${prefix}/news/${slug}/"]`)).toHaveCount(0);
    }
  });

  test(`${locale} featured news layouts fit a narrow viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });

    for (const route of [`${prefix}/`, `${prefix}/news/`, `${prefix}/news/${featuredSlugs[0]}/`]) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }

    await expect(page.locator('.publication-gallery img')).toHaveCount(2);
  });
}
