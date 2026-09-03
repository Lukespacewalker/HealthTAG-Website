import { expect, test } from '@playwright/test';

for (const route of ['/', '/en/']) {
  test(`${route} mounts the flagship health data network hero`, async ({ page }) => {
    await page.goto(route);
    const hero = page.locator('[data-network-hero]');
    await expect(hero.locator('.hero-network-flagship-canvas')).toHaveCount(1);

    const controls = hero.locator('[data-hero-phase]');
    await controls.nth(2).click();
    await expect(hero).toHaveAttribute('data-phase', '2');
    await expect(controls.nth(2)).toHaveAttribute('aria-pressed', 'true');
  });
}

test('flagship hero resolves to the final audit state for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const hero = page.locator('[data-network-hero]');
  await expect(hero.locator('.hero-network-flagship-canvas')).toHaveCount(1);
  await expect(hero).toHaveAttribute('data-phase', '3');
  await expect(hero.locator('[data-hero-phase]').nth(3)).toHaveAttribute('aria-pressed', 'true');
});
