import { expect, test } from '@playwright/test';

test.describe('grouped desktop navigation', () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  test('opens groups from the keyboard and marks the current group and page', async ({ page }) => {
    await page.goto('/trust/');

    const desktopNav = page.locator('.desktop-nav');
    await expect(desktopNav).toBeVisible();
    const currentGroup = desktopNav.locator('.desktop-nav-group[data-current="true"]');
    await expect(currentGroup.locator(':scope > summary')).toHaveText('แพลตฟอร์ม');
    await expect(currentGroup.locator(':scope > summary')).toHaveAttribute('aria-current', 'true');

    const summary = currentGroup.locator(':scope > summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(currentGroup).toHaveAttribute('open', '');

    const currentLink = currentGroup.locator('a[aria-current="page"]');
    await expect(currentLink).toHaveAttribute('href', '/trust/');
    await expect(currentLink).toHaveText('ความยินยอม ความไว้วางใจ และสิทธิ์เข้าถึง');
  });

  for (const [route, href, groupLabel] of [
    ['/posts/', '/posts/', 'ข่าวและบทความ'],
    ['/news/', '/news/', 'ข่าวและบทความ'],
    ['/articles/', '/articles/', 'ข่าวและบทความ'],
    ['/awards/', '/awards/', 'ข่าวและบทความ'],
    ['/en/posts/', '/en/posts/', 'News & articles'],
    ['/en/news/', '/en/news/', 'News & articles'],
    ['/en/articles/', '/en/articles/', 'News & articles'],
    ['/en/awards/', '/en/awards/', 'News & articles'],
  ]) {
    test(`${route} has one exact current publication link`, async ({ page }) => {
      await page.goto(route);
      const desktopNav = page.locator('.desktop-nav');
      const currentGroup = desktopNav.locator('.desktop-nav-group[data-current="true"]');
      await expect(currentGroup.locator(':scope > summary')).toHaveText(groupLabel);
      await expect(desktopNav.locator('a[aria-current="page"]')).toHaveCount(1);
      await expect(desktopNav.locator('a[aria-current="page"]')).toHaveAttribute('href', href);
    });
  }

  test('marks support and contact utilities independently', async ({ page }) => {
    await page.goto('/support/');
    await expect(page.locator('.desktop-nav-utilities a[aria-current="page"]')).toHaveAttribute('href', '/support/');

    await page.goto('/contact/');
    await expect(page.locator('.desktop-nav-utilities a[aria-current="page"]')).toHaveAttribute('href', '/contact/');
  });
});

test.describe('grouped mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('exposes Home, grouped links, utilities, and the current page', async ({ page }) => {
    await page.goto('/news/');
    await page.locator('.mobile-nav > summary').click();

    const nav = page.locator('.mobile-panel nav');
    await expect(nav.getByRole('link', { name: 'หน้าแรก', exact: true })).toHaveAttribute('href', '/');
    await expect(nav.locator('.mobile-nav-group')).toHaveCount(4);

    const currentGroup = nav.locator('.mobile-nav-group[data-current="true"]');
    await expect(currentGroup).toHaveAttribute('open', '');
    await expect(currentGroup.locator(':scope > summary')).toHaveText('ข่าวและบทความ');
    await expect(currentGroup.locator(':scope > summary')).toHaveAttribute('aria-current', 'true');
    await expect(currentGroup.locator('a[aria-current="page"]')).toHaveAttribute('href', '/news/');

    await expect(nav.getByRole('link', { name: 'ศูนย์ช่วยเหลือ', exact: true })).toHaveAttribute('href', '/support/');
    await expect(nav.getByRole('link', { name: 'ความเป็นส่วนตัวของเว็บไซต์', exact: true })).toHaveAttribute('href', '/privacy/');
    await expect(nav.getByRole('link', { name: 'English', exact: true })).toHaveAttribute('href', '/en/news/');
    await expect(nav.getByRole('link', { name: 'คุยกับ HealthTAG', exact: true })).toHaveAttribute('href', '/contact/');
  });

  test('uses the same About section links as the footer', async ({ page }) => {
    await page.goto('/en/company/');
    await page.locator('.mobile-nav > summary').click();

    const mobileAbout = page.locator('.mobile-nav-group[data-current="true"]');
    await expect(mobileAbout.locator('a[href="/en/company/#mission-vision"]')).toHaveText('Mission & vision');
    await expect(page.locator('footer a[href="/en/company/#mission-vision"]')).toHaveText('Mission & vision');
    await expect(page.locator('footer a[href="/en/company/#values"]')).toHaveText('Values');
    await expect(page.locator('footer a[href="/en/company/#founder"]')).toHaveText('Founder');
    await expect(page.locator('footer a[href="/en/company/#team"]')).toHaveText('Team');
  });
});

test('Thai desktop navigation fits before the mobile breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto('/');

  const desktopNav = page.locator('.desktop-nav');
  await expect(desktopNav).toBeVisible();
  const fits = await page.locator('.site-header .nav').evaluate((element) => element.scrollWidth <= element.clientWidth);
  expect(fits).toBe(true);
});

for (const width of [900, 1100]) {
  test(`grouped mobile navigation replaces desktop navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    await expect(page.locator('.desktop-nav')).not.toBeVisible();
    await expect(page.locator('.mobile-nav')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
