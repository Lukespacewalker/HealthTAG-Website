import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { builtRoutes } from '../scripts/built-routes.mjs';

const routes: string[] = builtRoutes();

// Audit every built page. Repeated link components share their interaction checks
// only when their ancestry, descendants and rendered colors/type match.
const checked = new Set<string>();
for (const theme of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    for (const route of routes) {
      test(`link contrast ${theme} ${width}px ${route}`, async ({ page }) => {
        test.setTimeout(120_000);
        await page.addInitScript(theme => localStorage.setItem('healthtag-theme', theme), theme);
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const response = await page.goto(route);
        expect(response?.status(), route).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        expect(await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(
          theme === 'dark' ? 'rgb(11, 20, 35)' : 'rgb(246, 248, 252)',
        );
        const scan = async (selector?: string) => {
          const builder = new AxeBuilder({ page }).withRules(['color-contrast', 'link-in-text-block']);
          if (selector) builder.include(selector);
          const result = await builder.analyze();
          return result.violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) }));
        };
        expect(await scan()).toEqual([]);
        const links = page.locator('a[href]');
        const count = await links.count();
        for (let i = 0; i < count; i += 1) {
          const link = links.nth(i);
          if (!await link.isVisible()) continue;
          const signature = await link.evaluate(el => {
            const shape = (node: Element) => {
              const css = getComputedStyle(node);
              return [node.tagName, node.className, ...Array.from(node.attributes).filter(a => a.name.startsWith('data-') || ['aria-current', 'target', 'rel', 'role', 'style'].includes(a.name)).map(a => `${a.name}=${a.value}`), css.color, css.backgroundColor, css.backgroundImage, css.fontSize, css.fontWeight].join('|');
            };
            const lineage: string[] = [];
            for (let node: Element | null = el; node; node = node.parentElement) lineage.push(shape(node));
            const index = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
            return index + lineage.join('>') + Array.from(el.querySelectorAll('*')).map(shape).join('>');
          });
          const key = `${theme}:${width}:${signature}`;
          if (checked.has(key)) continue;
          checked.add(key);
          await link.evaluate(el => { el.setAttribute('data-contrast-probe', ''); el.scrollIntoView({ block: 'center' }); });
          if (!await link.evaluate(el => el.classList.contains('skip-link'))) {
            await link.hover({ timeout: 3000 });
            expect(await scan('[data-contrast-probe]'), `${route}: hover ${await link.innerText()}`).toEqual([]);
          }
          await page.mouse.move(0, 0);
          await page.keyboard.press('Tab');
          await link.focus();
          expect(await link.evaluate(el => el.matches(':focus-visible'))).toBe(true);
          expect(await scan('[data-contrast-probe]'), `${route}: focus ${await link.innerText()}`).toEqual([]);
          await link.evaluate(el => { el.removeAttribute('data-contrast-probe'); (el as HTMLElement).blur(); });
        }
      });
    }
  }
}

for (const theme of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    for (const route of ['/', '/en/']) {
      test(`open navigation link contrast ${theme} ${width}px ${route}`, async ({ page }) => {
        await page.addInitScript(theme => localStorage.setItem('healthtag-theme', theme), theme);
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        if (width === 390) await page.locator('.mobile-nav > summary').click();
        const groups = page.locator(width === 390 ? '.mobile-nav-group' : '.desktop-nav-group');
        for (let i = 0; i < await groups.count(); i += 1) {
          const group = groups.nth(i);
          await group.locator(':scope > summary').click();
          const links = group.locator('a[href]');
          for (let j = 0; j < await links.count(); j += 1) {
            const link = links.nth(j);
            await link.evaluate(el => el.setAttribute('data-menu-probe', ''));
            for (const state of ['hover', 'focus']) {
              if (state === 'hover') await link.hover();
              else { await page.mouse.move(0, 0); await page.keyboard.press('Tab'); await link.focus(); }
              const result = await new AxeBuilder({ page }).include('[data-menu-probe]').withRules(['color-contrast']).analyze();
              expect(result.violations, `${state}: ${await link.innerText()}`).toEqual([]);
            }
            await link.evaluate(el => el.removeAttribute('data-menu-probe'));
          }
          await group.locator(':scope > summary').click();
        }
      });
    }
  }
}

test('focused links have contrasting light and dark indicator bands', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const [name, selector] of [['dark', '.hero-actions a'], ['light', '.footer-main nav a']]) {
    const link = page.locator(selector).first();
    await link.scrollIntoViewIfNeeded();
    await page.keyboard.press('Tab');
    await link.focus();
    const indicator = () => link.evaluate(el => {
      const style = getComputedStyle(el);
      return { visible: el.matches(':focus-visible'), color: style.outlineColor, width: style.outlineWidth, shadow: style.boxShadow };
    });
    // Wait for the browser's focus transition, including reduced-motion's
    // near-zero duration, to be painted before sampling the final indicator.
    await expect.poll(indicator).toMatchObject({ visible: true, width: '3px' });
    expect((await indicator()).shadow).not.toBe('none');
    await page.screenshot({ path: testInfo.outputPath(`focus-${name}.png`) });
  }
});
