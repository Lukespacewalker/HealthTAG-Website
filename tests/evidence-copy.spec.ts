import { expect, test } from '@playwright/test';

for (const route of ['/evidence/', '/en/evidence/']) {
  test(`${route} presents each record as one source-led summary`, async ({ page }) => {
    await page.goto(route);

    const entries = page.locator('.evidence-entry');
    await expect(entries).toHaveCount(13);

    for (const entry of await entries.all()) {
      await expect(entry.locator('.evidence-summary')).toHaveCount(1);
      await expect(entry.locator('.claim-block')).toHaveCount(0);
      await expect(entry.locator('.source-link').first()).toBeVisible();
    }

    const sirirajDetails = route.startsWith('/en/')
      ? '/en/news/siriraj-5g-smart-hospital/'
      : '/news/siriraj-5g-smart-hospital/';
    await expect(page.locator(`#siriraj-5g-smart-hospital a[href="${sirirajDetails}"]`)).toBeVisible();
  });
}
