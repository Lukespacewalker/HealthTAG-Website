import { expect, test } from '@playwright/test';

const currentTeam = [
  'Dechowat Promda',
  'Suttisak Denduangchai',
  'Tanasit Klubtavee',
  'Tanapon Inprasit',
  'Tanawat Udom',
  'Purin Janbai',
  'Pensirinapang Jaitaboot',
  'Kornnaphat Khumphuak',
  'Aumphon Kaewatsadorn',
  'Akkarachai Kaewsakul',
  'Chatchawan Sudsoom',
];

for (const [route, heading] of [['/company/', 'ทีมงานปัจจุบัน'], ['/en/company/', 'Current team']]) {
  test(`${route} publishes the current HealthTAG roster`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();

    for (const name of currentTeam) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }

    await expect(page.locator('.portrait-card img')).toHaveCount(8);
    await expect(page.locator('main')).not.toContainText('Previous contributors');
    await expect(page.locator('main')).not.toContainText('ผู้ร่วมงานในช่วงก่อนหน้า');
  });
}
