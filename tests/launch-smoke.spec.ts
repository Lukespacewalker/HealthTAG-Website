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
  '/posts/',
  '/news/',
  '/articles/',
  '/contact/',
  '/support/',
  '/privacy/',
  '/en/support/',
  '/en/posts/',
  '/en/news/',
  '/en/articles/',
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
  for (const route of ['/', '/network/', '/company/', '/posts/', '/support/', '/en/posts/', '/en/support/']) {
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
  for (const route of ['/', '/interoperability/', '/trust/', '/network/', '/posts/', '/contact/', '/support/']) {
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
  const summary = page.locator('.mobile-nav > summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-nav')).toHaveAttribute('open', '');

  const proofGroup = page.locator('.mobile-nav-group', { hasText: 'ผลงานและหลักฐาน' });
  await proofGroup.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-panel a[href="/evidence/"]')).toBeVisible();

  const publicationsGroup = page.locator('.mobile-nav-group', { hasText: 'ข่าวและบทความ' });
  await publicationsGroup.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-panel a[href="/posts/"]')).toBeVisible();
  await expect(page.locator('.mobile-panel a[href="/contact/"]')).toBeVisible();
  await expect(page.locator('.mobile-panel a[href="/support/"]')).toBeVisible();
  await expect(page.locator('.mobile-panel a[href="/privacy/"]')).toBeVisible();
  await summary.focus();
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

test('network relationships are presented as current network relationships', async ({ page }) => {
  await page.goto('/network/');
  await expect(page.locator('body')).not.toContainText('เครือข่ายในอดีต');
  await expect(page.locator('.relationship-badge', { hasText: 'เครือข่าย' }).first()).toBeVisible();
  await page.goto('/en/network/');
  await expect(page.locator('body')).not.toContainText('Historical Network');
  await expect(page.locator('.relationship-badge', { hasText: 'Network' }).first()).toBeVisible();
});

test('support separates the recommended and legacy reader paths', async ({ page }) => {
  await page.goto('/support/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ตั้งค่าเครื่องอ่าน HealthTAG');
  await expect(page.locator('#recommended')).toContainText('Driver 3.8');
  await expect(page.locator('#recommended')).toContainText('Silicon Craft ADR12');
  await expect(page.locator('#legacy')).toContainText('ไม่แนะนำสำหรับการติดตั้งใหม่');
  await expect(page.locator('#legacy details')).not.toHaveAttribute('open', '');
  const downloadHrefs = await page.locator('main a[href^="https://"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(downloadHrefs.length).toBeGreaterThanOrEqual(5);
  expect(downloadHrefs.every((href) => href.startsWith('https://'))).toBe(true);

  await page.goto('/en/support/');
  await expect(page.locator('#legacy')).toContainText('Not recommended for new installations');
  await expect(page.locator('a.lang')).toHaveAttribute('href', '/support/');
});

test('news and articles use verified dates, bilingual copy, and traceable sources', async ({ page }) => {
  await page.goto('/posts/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ข่าวและบทความจาก HealthTAG');
  await expect(page.locator('.featured-media img')).toHaveAttribute('alt', /Digital Health Forum 2026/);
  await expect(page.locator('time[datetime="2026-08-25"]')).toBeVisible();
  await expect(page.locator('a[href*="facebook.com/mihealthtag/posts/"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://pr.moph.go.th/online/index/news/346999"]')).toBeVisible();
  await expect(page.locator('time[datetime="2020-04-14"]')).toBeVisible();
  await expect(page.getByText(/10 พฤษภาคม 2564/).first()).toBeVisible();
  await expect(page.getByText(/Self-Isolation Tracking Wristband/).first()).toBeVisible();
  await expect(page.getByText(/NFC sticker ซึ่งเป็นหนึ่งในทางเข้า PHR/)).toBeVisible();
  await expect(page.locator('body')).not.toContainText('26 พฤษภาคม 2569');
  await expect(page.locator('body')).not.toContainText('1อ่าน');

  await page.goto('/en/posts/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('News and articles from HealthTAG');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('a.lang')).toHaveAttribute('href', '/posts/');
  await expect(page.getByText('Thai', { exact: true }).first()).toBeVisible();
  await expect(page.locator('body')).not.toContainText('1read');

  await page.goto('/news/');
  const newsEntries = page.locator('.publication-entry');
  for (let index = 0; index < await newsEntries.count(); index += 1) {
    const imageCount = await newsEntries.nth(index).locator('.publication-media img').count();
    expect(imageCount, `news item ${index + 1} should have 1 to 3 images`).toBeGreaterThanOrEqual(1);
    expect(imageCount).toBeLessThanOrEqual(3);
  }
});

test('PHR page explains the NFC sticker boundary in both languages', async ({ page }) => {
  await page.goto('/phr/');
  await expect(page.getByRole('heading', { name: /NFC เป็นทางเข้า PHR/ })).toBeVisible();
  await expect(page.getByText(/เวชระเบียนไม่ได้เก็บไว้บน sticker/)).toBeVisible();

  await page.goto('/en/phr/');
  await expect(page.getByText(/An NFC sticker can open the user’s PHR/)).toBeVisible();
  await expect(page.getByText(/sticker does not store the user’s clinical record/)).toBeVisible();
});

for (const route of [
  '/',
  '/company/',
  '/trust/',
  '/phr/',
  '/interoperability/',
  '/network/',
  '/posts/',
  '/contact/',
  '/support/',
  '/en/',
  '/en/company/',
  '/en/trust/',
  '/en/phr/',
  '/en/posts/',
  '/en/support/',
  '/en/evidence/',
]) {
  test(`basic accessibility scan passes on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
