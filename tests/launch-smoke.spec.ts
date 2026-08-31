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
  '/awards/',
  '/contact/',
  '/support/',
  '/support/community-edition/user-manual/',
  '/privacy/',
  '/en/support/',
  '/en/support/community-edition/user-manual/',
  '/en/posts/',
  '/en/news/',
  '/en/articles/',
  '/en/awards/',
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
  const summary = page.locator('.mobile-nav summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-nav')).toHaveAttribute('open', '');
  await expect(page.locator('.mobile-panel a[href="/evidence/"]')).toBeVisible();
  await expect(page.locator('.mobile-panel a[href="/posts/"]')).toBeVisible();
  await expect(page.locator('.mobile-panel a[href="/contact/"]')).toBeVisible();
  await expect(page.locator('.mobile-panel a[href="/support/"]')).toBeVisible();
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
  await expect(page.locator('#community-edition')).toContainText('open source');
  await expect(page.locator('#community-edition')).toContainText('คนละผลิตภัณฑ์');
  await expect(page.locator('#community-edition a[href="/support/community-edition/user-manual/"]')).toBeVisible();
  const downloadHrefs = await page.locator('main a[href^="https://"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(downloadHrefs.length).toBeGreaterThanOrEqual(5);
  expect(downloadHrefs.every((href) => href.startsWith('https://'))).toBe(true);

  await page.goto('/en/support/');
  await expect(page.locator('#legacy')).toContainText('Not recommended for new installations');
  await expect(page.locator('#community-edition')).toContainText('Latest available manual');
  await expect(page.locator('#community-edition a[href="/en/support/community-edition/user-manual/"]')).toBeVisible();
  await expect(page.locator('a.lang')).toHaveAttribute('href', '/support/');
});

test('Community Edition manual has contents navigation and language-aware code samples', async ({ page }) => {
  await page.goto('/support/community-edition/user-manual/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('คู่มือ Community Edition');
  expect(await page.locator('.manual-toc .toc-link').count()).toBeGreaterThan(10);
  expect(await page.locator('.manual-article h2[id]').count()).toBeGreaterThanOrEqual(4);
  await expect(page.locator('pre[data-language="bash"]')).not.toHaveCount(0);
  await expect(page.locator('pre[data-language="dotenv"]')).not.toHaveCount(0);
  await expect(page.locator('pre[data-language="python"]')).toHaveCount(1);
  await expect(page.locator('.code-sample .copy-code').first()).toBeVisible();
  expect(await page.locator('.manual-article img').count()).toBeGreaterThanOrEqual(40);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/support/community-edition/user-manual/');
  await expect(page.locator('.mobile-toc')).toBeVisible();
  await page.locator('.mobile-toc summary').click();
  await expect(page.locator('.mobile-toc')).toHaveAttribute('open', '');

  await page.goto('/en/support/community-edition/user-manual/');
  await expect(page.locator('.language-note')).toContainText('source manual is available in Thai');
  await expect(page.locator('.manual-article')).toHaveAttribute('lang', 'th');
  await expect(page.locator('a.lang')).toHaveAttribute('href', '/support/community-edition/user-manual/');
});

test('repository publications support search, pagination, local details, and bilingual metadata', async ({ page }) => {
  await page.goto('/posts/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('ข่าวและบทความจาก HealthTAG');
  await expect(page.locator('.publication-card:visible')).toHaveCount(8);
  await page.locator('.publication-pagination a', { hasText: '2' }).click();
  await expect(page).toHaveURL(/\?page=2$/);
  await expect(page.locator('.publication-card:visible')).toHaveCount(8);
  await page.goBack();
  await expect(page).toHaveURL(/\/posts\/$/);
  await page.locator('input[name="q"]').fill('NFC sticker');
  await page.getByRole('button', { name: 'ค้นหา' }).click();
  await expect(page).toHaveURL(/\?q=NFC(?:\+|%20)sticker/);
  await expect(page.locator('.publication-card:visible')).toHaveCount(1);

  await page.goto('/news/digital-health-forum-2026/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Digital Health Forum 2026');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://healthtag.io/news/digital-health-forum-2026/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://healthtag.io/en/news/digital-health-forum-2026/');
  await expect(page.locator('time[datetime="2026-08-25"]')).toBeVisible();
  await expect(page.locator('time[datetime="2026-08-26"]')).toBeVisible();
  await expect(page.locator('time[datetime="2026-08-31"]')).toBeVisible();
  await expect(page.locator('a[href*="facebook.com/mihealthtag/posts/"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://pr.moph.go.th/online/index/news/346999"]')).toBeVisible();
  const firstTocLink = page.locator('.publication-toc a').first();
  await firstTocLink.focus();
  await expect(firstTocLink).toBeFocused();

  await page.goto('/en/posts/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('News and articles from HealthTAG');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('a.lang')).toHaveAttribute('href', '/posts/');

  await page.goto('/news/');
  const newsEntries = page.locator('.publication-card');
  for (let index = 0; index < await newsEntries.count(); index += 1) {
    await expect(newsEntries.nth(index).locator('img')).toHaveCount(1);
  }

  await page.goto('/awards/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('รางวัล');
  await expect(page.locator('.publication-card').first()).toBeVisible();

  await page.goto('/articles/blockchain-digital-decentralized-system/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('เบื้องหลังเทคโนโลยี Blockchain');
  const tocHref = await page.locator('.publication-toc a').first().getAttribute('href');
  expect(tocHref).toMatch(/^#\S+/);
  await expect(page.locator(tocHref!)).toHaveCount(1);
  const scrollMargin = await page.locator(tocHref!).evaluate((element) => getComputedStyle(element).scrollMarginTop);
  expect(Number.parseFloat(scrollMargin)).toBeGreaterThan(0);
  await expect(page.locator('.heading-anchor').first()).toHaveAttribute('href', /^#\S+/);
  const articleJson = JSON.parse(await page.locator('script[type="application/ld+json"]').nth(1).textContent() ?? '{}');
  expect(articleJson['@type']).toBe('Article');
  expect(articleJson.datePublished).toBe('2025-11-18');
  expect(articleJson.inLanguage).toBe('th');

  await page.goto('/awards/apicta-2022/');
  await expect(page.getByRole('heading', { name: 'รางวัลนี้ยืนยันอะไร' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'รางวัลนี้ไม่ได้ยืนยันอะไร' })).toBeVisible();
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://healthtag.io/en/awards/apicta-2022/');
});

test('PHR page explains the NFC sticker boundary in both languages', async ({ page }) => {
  await page.goto('/phr/');
  await expect(page.getByRole('heading', { name: /NFC เป็นทางเข้า PHR/ })).toBeVisible();
  await expect(page.getByText(/เวชระเบียนไม่ได้เก็บไว้บน sticker/)).toBeVisible();

  await page.goto('/en/phr/');
  await expect(page.getByText(/An NFC sticker can open the user’s PHR/)).toBeVisible();
  await expect(page.getByText(/sticker does not store the user’s clinical record/)).toBeVisible();
});

for (const route of ['/interoperability/', '/network/', '/posts/', '/en/posts/', '/articles/blockchain-digital-decentralized-system/', '/en/articles/blockchain-digital-decentralized-system/', '/awards/apicta-2022/', '/en/awards/apicta-2022/', '/contact/', '/support/', '/support/community-edition/user-manual/', '/en/support/', '/en/support/community-edition/user-manual/', '/en/evidence/']) {
  test(`basic accessibility scan passes on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
