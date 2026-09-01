import { expect, test } from '@playwright/test';

for (const [route, lang, alternate, heading] of [
  ['/platform/', 'th', '/en/platform/', 'เชื่อมข้อมูลสุขภาพ โดยเวชระเบียนยังอยู่กับโรงพยาบาล'],
  ['/en/platform/', 'en', '/platform/', 'Connect health data while hospitals keep the clinical records'],
  ['/investors/', 'th', '/en/investors/', 'โครงสร้างพื้นฐานข้อมูลสุขภาพสำหรับการแลกเปลี่ยนตามสิทธิ์'],
  ['/en/investors/', 'en', '/investors/', 'Health data infrastructure for authorized exchange'],
]) {
  test(`${route} has localized metadata and no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);

    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://healthtag.io${route}`);
    await expect(page.locator(`link[rel="alternate"][hreflang="${lang === 'en' ? 'th' : 'en'}"]`)).toHaveAttribute('href', `https://healthtag.io${alternate}`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test.describe('platform overview', () => {
  test('routes each capability to its canonical detail page', async ({ page }) => {
    await page.goto('/en/platform/');

    const index = page.getByRole('navigation', { name: 'On this page' });
    for (const target of ['#overview', '#capabilities', '#operating-model', '#hospital-leaders', '#it-teams', '#evidence']) {
      await expect(index.locator(`a[href="${target}"]`)).toHaveCount(1);
    }

    const capabilities = page.locator('.capability-list');
    await expect(capabilities.getByRole('heading', { level: 3 })).toHaveCount(4);
    await expect(capabilities.locator('a[href="/en/interoperability/"]')).toHaveCount(1);
    await expect(capabilities.locator('a[href="/en/phr/"]')).toHaveCount(1);
    await expect(capabilities.locator('a[href="/en/trust/"]')).toHaveCount(2);
  });

  test('uses native disclosure for the text transcript and technical detail', async ({ page }) => {
    await page.goto('/platform/');

    const transcript = page.locator('.diagram-transcript');
    await transcript.locator('summary').click();
    await expect(transcript.locator('li')).toHaveCount(4);

    const details = page.locator('.it-detail');
    await details.locator('summary').click();
    await expect(details.locator('dt')).toHaveCount(3);
    await expect(details.locator('a[target="_blank"]')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders the complete disclosure content when JavaScript is disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/platform/');

    await expect(page.locator('.diagram-transcript li')).toHaveCount(4);
    await expect(page.locator('.it-detail dd')).toHaveCount(3);
    await expect(page.locator('.technical-links a')).toHaveCount(3);
    await context.close();
  });

  test('keeps relationship types and source links visible', async ({ page }) => {
    await page.goto('/en/platform/');

    await expect(page.locator('.deployment-proof .proof-type')).toHaveText('Deployment');
    await expect(page.locator('.proof-grid .proof-type')).toHaveText(['Programme', 'Award', 'Sandbox']);
    await expect(page.locator('.proof-grid a[target="_blank"]')).toHaveCount(3);
  });
});

test.describe('investor overview', () => {
  test('shows public proof, business-model categories, and an IR route', async ({ page }) => {
    await page.goto('/en/investors/');

    await expect(page.locator('.evidence-grid article')).toHaveCount(4);
    await expect(page.locator('.evidence-grid .record-type')).toHaveText(['Programme', 'Award', 'Sandbox', 'Strategic Collaboration']);
    await expect(page.locator('.business-list h3')).toHaveText(['Connectivity services', 'Usage services', 'Infrastructure projects']);
    await expect(page.locator('#contact-investors a[href="/en/contact/"]')).toHaveText('Contact investor relations');
  });

  test('does not publish financial figures or unsupported compliance language', async ({ page }) => {
    await page.goto('/en/investors/');
    const publicCopy = await page.locator('main').innerText();

    expect(publicCopy).not.toMatch(/\b(?:revenue|valuation|contract)\s*(?:of|is|was|:)?\s*[฿$€£¥]?\d/i);
    expect(publicCopy).not.toMatch(/certified|certification|compliant|compliance|regulatory approval/i);
  });
});
