import { expect, test, type Page } from '@playwright/test';

const storageKey = 'healthtag-theme';

async function openThemeMenu(page: Page) {
  await page.locator('.desktop-nav [data-theme-trigger]').click();
  return page.locator('.desktop-nav [data-theme-control]');
}

test('auto resolves before paint and follows operating-system changes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'auto');
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'light');
});

test('explicit selection persists and ignores later operating-system changes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/en/');
  const control = await openThemeMenu(page);
  await control.locator('[data-theme-option="dark"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBe('dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
});

test('invalid storage falls back to auto and exposes accurate accessible state', async ({ page }) => {
  await page.addInitScript(key => localStorage.setItem(key, 'sepia'), storageKey);
  await page.goto('/');
  const control = await openThemeMenu(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'auto');
  await expect(control.locator('[data-theme-option="auto"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(control.locator('[data-theme-option="light"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(control.locator('[data-theme-option="dark"]')).toHaveAttribute('aria-pressed', 'false');
});

test('mobile navigation contains working language and appearance controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/support/');
  await page.locator('.mobile-nav > summary').click();
  await expect(page.locator('.mobile-utilities .language-switch')).toHaveText('EN');
  await page.locator('.mobile-utilities [data-theme-trigger]').click();
  await page.locator('.mobile-utilities [data-theme-option="dark"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
});
