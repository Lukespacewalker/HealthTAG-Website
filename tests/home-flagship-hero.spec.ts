import { expect, test } from '@playwright/test';

for (const route of ['/', '/en/']) {
  test(`${route} mounts only the flagship health data network renderer`, async ({ page }) => {
    await page.goto(route);
    const hero = page.locator('[data-network-hero]');
    await expect(hero.locator('.hero-network-canvas')).toHaveCount(1);
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
  await expect(hero.locator('.hero-network-canvas')).toHaveCount(1);
  await expect(hero.locator('.hero-network-flagship-canvas')).toHaveCount(1);
  await expect(hero).toHaveAttribute('data-phase', '3');
  await expect(hero.locator('[data-hero-phase]').nth(3)).toHaveAttribute('aria-pressed', 'true');
});

test('keyboard focus hands phase timing to the user', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('[data-network-hero]');
  const controls = hero.locator('[data-hero-phase]');
  await expect(hero.locator('.hero-network-flagship-canvas')).toHaveCount(1);

  await controls.nth(1).focus();
  await controls.nth(1).press('Enter');
  await expect(hero).toHaveAttribute('data-phase', '1');
  await page.waitForTimeout(3900);
  await expect(hero).toHaveAttribute('data-phase', '1');
});

test('flagship canvas stays aligned with its host on ultra-wide desktops', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const host = page.locator('[data-three-hero]');
  const canvas = page.locator('.hero-network-flagship-canvas');
  await expect(canvas).toHaveCount(1);

  const canvasAlignment = async () => page.evaluate(() => {
    const hostElement = document.querySelector<HTMLElement>('[data-three-hero]');
    const canvasElement = document.querySelector<HTMLCanvasElement>('.hero-network-flagship-canvas');
    if (!hostElement || !canvasElement) return { maxEdgeDelta: Number.NaN, transform: '' };
    const hostRect = hostElement.getBoundingClientRect();
    const canvasRect = canvasElement.getBoundingClientRect();
    return {
      maxEdgeDelta: Math.max(
        Math.abs(canvasRect.left - hostRect.left),
        Math.abs(canvasRect.top - hostRect.top),
        Math.abs(canvasRect.right - hostRect.right),
        Math.abs(canvasRect.bottom - hostRect.bottom),
      ),
      transform: getComputedStyle(canvasElement).transform,
    };
  });

  await expect(host).toBeVisible();
  await expect.poll(async () => (await canvasAlignment()).maxEdgeDelta).toBeLessThanOrEqual(1);
  await expect.poll(async () => (await canvasAlignment()).transform).toBe('none');

  await page.setViewportSize({ width: 3840, height: 1200 });
  await expect.poll(async () => (await canvasAlignment()).maxEdgeDelta).toBeLessThanOrEqual(1);
  await expect.poll(async () => (await canvasAlignment()).transform).toBe('none');
});
