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

test('flagship scene progressively moves right on ultra-wide desktops', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const canvas = page.locator('.hero-network-flagship-canvas');
  await expect(canvas).toHaveCount(1);

  const translateX = async () => canvas.evaluate((element) => {
    const transform = getComputedStyle(element).transform;
    if (transform === 'none') return 0;
    return new DOMMatrixReadOnly(transform).m41;
  });

  await expect.poll(translateX).toBeLessThan(1);

  await page.setViewportSize({ width: 3840, height: 2160 });
  await expect.poll(translateX).toBeGreaterThan(850);
  await expect.poll(translateX).toBeLessThanOrEqual(960);
});
