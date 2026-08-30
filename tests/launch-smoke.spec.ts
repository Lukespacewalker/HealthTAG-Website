import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/interoperability/',
  '/how-it-works/',
  '/trust/',
  '/deployments/',
  '/network/',
  '/phr/',
  '/company/',
  '/evidence/',
  '/contact/',
  '/privacy/',
];

for (const width of [320, 390, 768, 1440]) {
  test(`key pages fit ${width}px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 900 : 1000 });
    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route} should load`).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} overflows by ${overflow}px at ${width}px`).toBeLessThanOrEqual(0);
    }
  });
}

test('lazy and responsive images decode on image-heavy pages', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of ['/', '/network/', '/company/']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.locator('img').evaluateAll((images) => images.forEach((image) => ((image as HTMLImageElement).loading = 'eager')));
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForFunction(() => [...document.images].every((image) => image.complete), undefined, { timeout: 15_000 });
    const brokenImages = await page.locator('img').evaluateAll((images) => images
      .map((image) => image as HTMLImageElement)
      .filter((image) => image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src));
    expect(brokenImages, `${route} has broken images`).toEqual([]);
  }
});

test('Thai headings preserve safe line boxes for tone marks', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const route of ['/', '/interoperability/', '/trust/', '/network/', '/contact/']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.locator('h1, h2, h3').evaluateAll((headings) => headings.map((heading) => {
      const style = getComputedStyle(heading);
      return { text: heading.textContent?.trim(), ratio: Number.parseFloat(style.lineHeight) / Number.parseFloat(style.fontSize) };
    }));
    for (const metric of metrics) expect(metric.ratio, `${route}: unsafe Thai line-height for “${metric.text}”`).toBeGreaterThanOrEqual(1.2);
  }
});

test('mobile navigation works with keyboard and exposes launch routes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const summary = page.locator('.mobile-nav summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-nav')).toHaveAttribute('open', '');
  await expect(page.locator('.mobile-panel a[href="/evidence/"]')).toBeVisible();
  await expect(page.locator('.mobile-panel a[href="/contact/"]')).toBeVisible();
  await expect(page.locator('.mobile-panel a[href="/privacy/"]')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.locator('.mobile-nav')).not.toHaveAttribute('open', '');
});

test('focus treatment and reduced-motion preference are respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  const outline = await page.locator('.skip-link').evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe('none');
  const scrollBehavior = await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior);
  expect(scrollBehavior).toBe('auto');
});

test('contact flow prepares an email draft without claiming submission', async ({ page }) => {
  await page.goto('/contact/');
  await page.locator('select[name="enquiry"]').selectOption({ label: 'การเชื่อมต่อระบบทางเทคนิค' });
  await page.locator('input[name="name"]').fill('ผู้ทดสอบ');
  await page.locator('input[name="email"]').fill('test@example.com');
  await page.locator('textarea[name="message"]').fill('ต้องการหารือการเชื่อมต่อระบบด้วยข้อมูลสังเคราะห์');
  await page.getByRole('button', { name: 'เตรียมอีเมล' }).click();
  await expect(page.locator('[data-contact-status]')).toContainText('ข้อความยังไม่ถูกส่ง');
});

for (const route of ['/interoperability/', '/network/', '/contact/', '/en/evidence/']) {
  test(`basic accessibility scan passes on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
