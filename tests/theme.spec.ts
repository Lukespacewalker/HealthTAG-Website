import { expect, test, type Page } from '@playwright/test';

const storageKey = 'healthtag-theme';
const controllerTimeout = { timeout: 1_000 };

async function openThemeMenu(page: Page) {
  const trigger = page.locator('.desktop-nav [data-theme-trigger]');
  await expect(trigger).toBeVisible();
  await trigger.click();
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

test('bootstrap keeps saved theme active but manual controls hidden when the external controller fails', async ({ page }) => {
  await page.addInitScript(key => localStorage.setItem(key, 'dark'), storageKey);
  await page.route('**/*', async route => {
    if (route.request().resourceType() === 'script') {
      await route.abort();
      return;
    }
    await route.continue();
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark', controllerTimeout);
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark', controllerTimeout);
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await expect(page.locator('[data-theme-control]')).toHaveCount(2);
  await expect(page.locator('[data-theme-control]').first()).toBeHidden();
  await expect(page.locator('main')).toBeVisible();
});

test('storage read exceptions preserve Auto bootstrap and controller behavior', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, 'getItem', {
      configurable: true,
      value: () => { throw new DOMException('Storage denied', 'SecurityError'); },
    });
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'auto', controllerTimeout);
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  await expect(page.locator('.desktop-nav [data-theme-trigger]')).toBeVisible(controllerTimeout);
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

test('Light selection and returning to Auto update the complete browser theme contract', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/en/');
  const control = await openThemeMenu(page);
  const trigger = control.locator('[data-theme-trigger]');
  await control.locator('[data-theme-option="light"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'light');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f6f8fc');
  await expect(trigger.locator('[data-theme-trigger-label]')).toHaveText('Light');
  await expect(trigger).toHaveAccessibleName('Appearance: Light');

  await trigger.click();
  await control.locator('[data-theme-option="auto"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'auto');
  await expect(control.locator('[data-theme-option="auto"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(trigger.locator('[data-theme-trigger-label]')).toHaveText('Auto');
  await expect(trigger).toHaveAccessibleName('Appearance: Auto');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0b1423');
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

test('keyboard selection closes the menu and returns focus to its trigger', async ({ page }) => {
  await page.goto('/en/');
  const control = await openThemeMenu(page);
  const trigger = control.locator('[data-theme-trigger]');
  const dark = control.locator('[data-theme-option="dark"]');
  await dark.focus();
  await dark.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
  await expect(control).not.toHaveAttribute('open', '');
  await expect(trigger).toBeFocused();
});

test('storage write exceptions still apply selection and restore focus', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    Object.defineProperty(Storage.prototype, 'setItem', {
      configurable: true,
      value: () => { throw new DOMException('Storage denied', 'SecurityError'); },
    });
  });
  const control = await openThemeMenu(page);
  const trigger = control.locator('[data-theme-trigger]');
  await control.locator('[data-theme-option="light"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light', controllerTimeout);
  await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'light');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f6f8fc');
  await expect(trigger.locator('[data-theme-trigger-label]')).toHaveText('สว่าง');
  await expect(trigger).toHaveAccessibleName('รูปแบบการแสดงผล: สว่าง');
  await expect(control).not.toHaveAttribute('open', '');
  await expect(trigger).toBeFocused();
});

for (const mode of ['desktop', 'mobile'] as const) {
  test(`Escape from a focused ${mode} theme option closes its own menu and restores trigger focus`, async ({ page }) => {
    await page.setViewportSize(mode === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 900 });
    await page.goto('/en/');
    if (mode === 'mobile') await page.locator('.mobile-nav > summary').click();
    const control = page.locator(`.${mode === 'mobile' ? 'mobile-utilities' : 'desktop-nav'} [data-theme-control]`);
    const trigger = control.locator('[data-theme-trigger]');
    await trigger.click();
    await control.locator('[data-theme-option="dark"]').focus();
    await page.keyboard.press('Escape');
    await expect(control).not.toHaveAttribute('open', '');
    await expect(trigger).toBeFocused();
    if (mode === 'mobile') await expect(page.locator('.mobile-nav')).toHaveAttribute('open', '');
  });
}

test('navigation visibility and topology panel styling remain responsive', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/how-it-works/');
  await expect(page.locator('.mobile-nav')).toBeHidden();
  await expect(page.locator('.desktop-nav')).toBeVisible();
  const topology = page.locator('.topology-card');
  await expect(topology).toHaveCSS('border-top-width', '1px');
  await expect(topology).toHaveCSS('border-top-left-radius', '28px');
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(page.locator('.mobile-nav')).toBeHidden();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.mobile-nav')).toBeVisible();
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

for (const [route, language, preference] of [['/', 'EN', 'อัตโนมัติ'], ['/en/', 'TH', 'Auto']] as const) {
  test(`${route} compact mobile utilities preserve hamburger geometry and readable labels`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const hamburgerBars = page.locator('.mobile-nav > summary > span');
    await expect(hamburgerBars).toHaveCount(3);
    const barGeometry = await hamburgerBars.evaluateAll(elements => elements.map(element => {
      const box = element.getBoundingClientRect();
      return { width: box.width, height: box.height };
    }));
    expect(barGeometry).toEqual([
      { width: 20, height: 2 },
      { width: 20, height: 2 },
      { width: 20, height: 2 },
    ]);

    await page.locator('.mobile-nav > summary').click();
    const utilities = page.locator('.mobile-utility-controls');
    await expect(utilities.locator('.language-switch')).toHaveText(language);
    const trigger = utilities.locator('[data-theme-trigger]');
    const label = trigger.locator('[data-theme-trigger-label]');
    await expect(label).toHaveText(preference);
    const geometry = await trigger.evaluate(element => {
      const box = element.getBoundingClientRect();
      const labelBox = element.querySelector<HTMLElement>('[data-theme-trigger-label]')!.getBoundingClientRect();
      return { width: box.width, height: box.height, labelWidth: labelBox.width, labelHeight: labelBox.height };
    });
    expect(geometry.width).toBeGreaterThanOrEqual(44);
    expect(geometry.height).toBeGreaterThanOrEqual(44);
    expect(geometry.labelWidth).toBeGreaterThan(20);
    expect(geometry.labelHeight).toBeGreaterThan(2);
  });
}

for (const route of ['/', '/en/']) {
  test(`${route} desktop language and appearance utilities share outlined controls and fit at 1200px`, async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(route);
    const nav = page.locator('.desktop-nav');
    await expect(nav).toBeVisible();
    const controls = [nav.locator('.language-switch'), nav.locator('[data-theme-trigger]')];
    for (const control of controls) {
      const geometry = await control.evaluate(element => {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return {
          width: box.width,
          height: box.height,
          borderWidth: style.borderTopWidth,
          borderRadius: style.borderTopLeftRadius,
        };
      });
      expect(geometry.width).toBeGreaterThanOrEqual(44);
      expect(geometry.height).toBeGreaterThanOrEqual(44);
      expect(geometry.borderWidth).toBe('1px');
      expect(Number.parseFloat(geometry.borderRadius)).toBeGreaterThanOrEqual(10);
      await control.hover();
      await expect(control).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      await control.focus();
      await expect(control).toHaveCSS('outline-width', '3px');
    }
    expect(await page.locator('.site-header .nav').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
  });
}
