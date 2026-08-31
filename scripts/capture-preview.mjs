import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'docs', 'launch-hardening', 'screenshots');
const baseUrl = process.env.PREVIEW_BASE_URL ?? 'http://127.0.0.1:41740';
const captures = [
  ['interoperability-desktop.jpg', '/interoperability/', 1440, 1000],
  ['trust-desktop.jpg', '/trust/', 1440, 1000],
  ['network-desktop.jpg', '/network/', 1440, 1000],
  ['home-mobile.jpg', '/', 390, 844],
  ['contact-mobile.jpg', '/contact/', 390, 844],
  ['publications-desktop.jpg', '/posts/', 1440, 1000],
  ['publication-article-en-desktop.jpg', '/en/articles/blockchain-digital-decentralized-system/', 1440, 1000],
  ['publication-article-th-mobile.jpg', '/articles/why-ncds-are-thailands-hidden-crisis/', 390, 844],
  ['publication-award-th-mobile.jpg', '/awards/apicta-2022/', 320, 844],
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch();
for (const [filename, route, width, height] of captures) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll((images) => images.forEach((image) => ((image).loading = 'eager')));
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForFunction(() => [...document.images].every((image) => image.complete), undefined, { timeout: 15_000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outputDir, filename), fullPage: true, type: 'jpeg', quality: 82 });
  await page.close();
  console.log(`Captured ${filename}`);
}
await browser.close();
