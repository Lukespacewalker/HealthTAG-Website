import { expect, test } from '@playwright/test';

const legacyCardRoutes = [
  ['tanawat', 'Tanawat Udom'],
  ['dechowat', 'Dechowat Promda, M.D.'],
  ['tanapon', 'Tanapon Inprasit'],
  ['Kornnaphat', 'Kornnaphat Khumphuak'],
  ['Pensirinapang', 'Pensirinapang Jaitaboot'],
  ['purin', 'Purin Janbai'],
] as const;

for (const [slug, name] of legacyCardRoutes) {
  test(`renders the legacy employee card /card/${slug}/`, async ({ page }) => {
    const response = await page.goto(`/card/${slug}/`);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
    await expect(page.locator('.portrait-ring img')).toBeVisible();
    await expect(page.getByRole('link', { name: /อีเมล/ })).toHaveAttribute('href', /^mailto:.+@healthtag\.io$/i);
  });
}

test('provides an English alternate for a card', async ({ page }) => {
  await page.goto('/en/card/tanawat/');
  await expect(page.getByRole('heading', { level: 1, name: 'Tanawat Udom' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('link[rel="alternate"][hreflang="th"]')).toHaveAttribute('href', 'https://healthtag.io/card/tanawat/');
});
