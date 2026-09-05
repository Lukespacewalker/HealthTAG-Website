import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function ready(page: Page, route = '/') {
  await page.goto(route);
  await page.locator('[data-three-hero]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-network-hero]')).toHaveAttribute('data-hero-state', 'ready');
}

async function instrumentWebGL(page: Page) {
  await page.addInitScript(() => {
    const state = { contexts: 0, draws: 0 };
    Object.assign(window, { __heroGpu: state });
    const seen = new WeakSet<HTMLCanvasElement>();
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value: function (this: HTMLCanvasElement, ...args: unknown[]) {
        const result = Reflect.apply(original, this, args);
        if ((args[0] === 'webgl' || args[0] === 'webgl2') && result && !seen.has(this)) {
          seen.add(this);
          state.contexts += 1;
        }
        return result;
      },
    });
    for (const prototype of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
      for (const name of ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced']) {
        const originalDraw = Object.getOwnPropertyDescriptor(prototype, name)?.value;
        if (!originalDraw) continue;
        Object.defineProperty(prototype, name, {
          configurable: true,
          value: function (...args: unknown[]) {
            state.draws += 1;
            return Reflect.apply(originalDraw, this, args);
          },
        });
      }
    }
  });
}
const gpu = (page: Page) => page.evaluate(() => (window as Window & { __heroGpu: { contexts: number; draws: number } }).__heroGpu);

for (const route of ['/', '/en/']) {
  test(`${route} has one renderer, keyboard steps, and accessible controls`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await instrumentWebGL(page);
    await ready(page, route);
    const hero = page.locator('[data-network-hero]');
    expect((await gpu(page)).contexts).toBe(1);
    const controls = hero.locator('[data-hero-phase]');
    await controls.first().focus();
    await expect(hero).toHaveAttribute('data-motion', 'paused');
    await page.waitForTimeout(2600);
    await expect(hero).toHaveAttribute('data-phase', '0');
    await controls.first().press('End');
    await expect(controls.nth(3)).toBeFocused();
    await expect(hero).toHaveAttribute('data-phase', '3');
    await controls.nth(3).press('ArrowRight');
    await expect(controls.first()).toBeFocused();
    await expect(hero).toHaveAttribute('data-phase', '0');
    expect((await new AxeBuilder({ page }).include('[data-network-hero]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    expect(errors).toEqual([]);
  });

  for (const width of [320, 390, 768, 1440, 3840]) {
    test(`${route} studio hero at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: width > 2000 ? 1200 : 960 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await ready(page, route);
      const hero = page.locator('[data-network-hero]');
      await expect(hero).toHaveAttribute('data-phase', '3');
      await expect(hero.locator('[data-hero-motion-toggle]')).toBeHidden();
      const copy = await hero.locator('.hero-copy').boundingBox();
      const art = await hero.locator('.hero-art').boundingBox();
      expect(copy).not.toBeNull();
      expect(art).not.toBeNull();
      if (!copy || !art) throw new Error('Hero layout missing');
      if (width > 900) expect(art.x).toBeGreaterThanOrEqual(copy.x + copy.width);
      else expect(art.y).toBeGreaterThanOrEqual(copy.y + copy.height);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await hero.screenshot({ path: testInfo.outputPath(`hero-${width}.png`), animations: 'disabled' });
      if (width === 1440) {
        for (let phase = 0; phase < 4; phase += 1) {
          await hero.locator('[data-hero-phase]').nth(phase).click();
          await expect(hero).toHaveAttribute('data-phase', String(phase));
          await hero.screenshot({ path: testInfo.outputPath(`phase-${phase}.png`), animations: 'disabled' });
        }
      }
    });
  }
}

test('pause stops GPU work; resize redraws without restarting playback', async ({ page }) => {
  await instrumentWebGL(page);
  await ready(page);
  const hero = page.locator('[data-network-hero]');
  await hero.locator('[data-hero-motion-toggle]').click();
  await expect(hero).toHaveAttribute('data-motion', 'paused');
  await page.waitForTimeout(150);
  const paused = await gpu(page);
  await page.waitForTimeout(350);
  expect((await gpu(page)).draws).toBe(paused.draws);
  const phase = await hero.getAttribute('data-phase');
  await page.setViewportSize({ width: 390, height: 960 });
  await expect.poll(async () => (await gpu(page)).draws).toBeGreaterThan(paused.draws);
  await expect(hero).toHaveAttribute('data-phase', phase!);
  await expect(hero).toHaveAttribute('data-motion', 'paused');
  await page.setViewportSize({ width: 1440, height: 1000 });
  expect((await gpu(page)).contexts).toBe(1);
  await expect(hero.locator('canvas')).toHaveCount(1);
});

test('autoplay finishes once and restarts only on explicit replay', async ({ page }) => {
  await ready(page);
  const hero = page.locator('[data-network-hero]');
  await expect(hero).toHaveAttribute('data-phase', '3', { timeout: 15000 });
  await expect(hero).toHaveAttribute('data-motion', 'paused', { timeout: 5000 });
  await expect(hero.locator('[data-motion-label]')).toHaveText('เล่นลำดับภาพอีกครั้ง');
  await page.waitForTimeout(2500);
  await expect(hero).toHaveAttribute('data-phase', '3');
  await hero.locator('[data-hero-motion-toggle]').click();
  await expect(hero).toHaveAttribute('data-phase', '0');
  await expect(hero).toHaveAttribute('data-motion', 'playing');
});

test('offscreen rendering stops and page lifecycle does not stack renderers', async ({ page }) => {
  await instrumentWebGL(page);
  await ready(page);
  const hero = page.locator('[data-network-hero]');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(hero).toHaveAttribute('data-motion', 'paused');
  await page.waitForTimeout(150);
  const stopped = await gpu(page);
  await page.waitForTimeout(350);
  expect((await gpu(page)).draws).toBe(stopped.draws);
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })));
  await expect(hero.locator('canvas')).toHaveCount(0);
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
  await hero.locator('[data-three-hero]').scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute('data-hero-state', 'ready');
  await expect(hero.locator('canvas')).toHaveCount(1);
  expect((await gpu(page)).contexts).toBe(2);
});

test('WebGL initialization failure keeps the poster and working text controls', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value: function (this: HTMLCanvasElement, ...args: unknown[]) {
        return String(args[0]).includes('webgl') ? null : Reflect.apply(original, this, args);
      },
    });
  });
  await page.goto('/');
  const hero = page.locator('[data-network-hero]');
  await hero.locator('[data-three-hero]').scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute('data-hero-state', 'fallback');
  await expect(hero.locator('[data-hero-poster]')).toBeVisible();
  await expect(hero.locator('canvas')).toHaveCount(0);
  await hero.locator('[data-hero-phase]').nth(3).click();
  await expect(hero).toHaveAttribute('data-phase', '3');
  await hero.screenshot({ path: testInfo.outputPath('webgl-fallback.png') });
});

test('lost context returns to the poster without an automatic retry loop', async ({ page }) => {
  await instrumentWebGL(page);
  await ready(page);
  const hero = page.locator('[data-network-hero]');
  await hero.locator('canvas').evaluate((canvas) => {
    const gl = (canvas as HTMLCanvasElement).getContext('webgl2');
    const extension = gl?.getExtension('WEBGL_lose_context');
    if (!extension) throw new Error('WEBGL_lose_context unavailable');
    extension.loseContext();
  });
  await expect(hero).toHaveAttribute('data-hero-state', 'fallback');
  await expect(hero.locator('[data-hero-poster]')).toBeVisible();
  await expect(hero.locator('canvas')).toHaveCount(0);
  await page.waitForTimeout(300);
  expect((await gpu(page)).contexts).toBe(1);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const route of ['/', '/en/']) {
    test(`${route} retains artwork, headline and working links`, async ({ page }, testInfo) => {
      await page.goto(route);
      const hero = page.locator('[data-network-hero]');
      await expect(hero.locator('[data-hero-poster]')).toBeVisible();
      await expect(hero.locator('h1')).toBeVisible();
      await expect(hero.locator('canvas')).toHaveCount(0);
      await expect(hero.locator('[data-hero-motion-toggle]')).toBeHidden();
      await hero.screenshot({ path: testInfo.outputPath('no-javascript.png') });
      await hero.locator('.hero-actions a').first().click();
      await expect(page).toHaveURL(new RegExp(`${route === '/' ? '' : '/en'}/platform/$`));
    });
  }
});
