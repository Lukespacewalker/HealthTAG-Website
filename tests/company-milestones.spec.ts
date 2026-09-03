import { expect, test } from '@playwright/test';

for (const [route, heading] of [
  ['/company/', 'จาก Proof of Concept สู่โครงสร้างพื้นฐานข้อมูลสุขภาพ'],
  ['/en/company/', 'From proof of concept to health-data infrastructure'],
]) {
  test(`${route} renders the company milestones as accessible HTML`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);

    const milestones = page.locator('#milestones');
    await expect(milestones.getByRole('heading', { level: 2 })).toHaveText(heading);
    await expect(milestones.locator('.milestone-year')).toHaveCount(7);
    await expect(milestones.locator('.year-marker time')).toHaveText(['2020', '2021', '2022', '2023', '2024', '2025', '2026']);
    await expect(milestones.locator('img')).toHaveCount(0);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('milestones preserve the confirmed relationship and recognition boundaries', async ({ page }) => {
  await page.goto('/en/company/');
  const milestones = page.locator('#milestones');

  await expect(milestones).toContainText('funded by BTFP through Mahidol University');
  await expect(milestones).toContainText('ETDA Digital Service Sandbox Certified');
  await expect(milestones).toContainText('five live institutions');
  await expect(milestones.locator('li.relationship')).not.toHaveCount(0);
  await expect(milestones.locator('li.recognition')).not.toHaveCount(0);
});
