import { expect, test } from '@playwright/test';

const currentTeam = [
  'Suttisak Denduangchai',
  'Tanapon Inprasit',
  'Tanawat Udom',
  'Purin Janbai',
  'Pensirinapang Jaitaboot',
  'Kornnaphat Khumphuak',
  'Aumphon Kaewatsadorn',
];

const formerTeam = [
  'Tanasit Klubtavee',
  'Akkarachai Kaewsakul',
  'Chatchawan Sudsoom',
];

for (const [route, heading, founderName] of [
  ['/company/', 'ทีมงานปัจจุบัน', 'นพ.เดโชวัต พรมดา'],
  ['/en/company/', 'Current team', 'Dechowat Promda, M.D.'],
]) {
  test(`${route} publishes the current HealthTAG roster`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
    await expect(page.locator('#team').getByText(founderName, { exact: true })).toBeVisible();

    for (const name of currentTeam) {
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    }

    for (const name of formerTeam) {
      await expect(page.locator('main')).not.toContainText(name);
    }

    await expect(page.locator('.portrait-card img')).toHaveCount(8);
    await expect(page.locator('main')).not.toContainText('Previous contributors');
    await expect(page.locator('main')).not.toContainText('ผู้ร่วมงานในช่วงก่อนหน้า');
  });

  test(`${route} renders every team portrait with transparent corners`, async ({ page }) => {
    await page.goto(route);
    const portraits = page.locator('.portrait-card img');
    await expect(portraits).toHaveCount(8);
    for (let index = 0; index < await portraits.count(); index += 1) {
      await portraits.nth(index).scrollIntoViewIfNeeded();
    }
    await portraits.evaluateAll((images) => Promise.all(
      images.map((image) => (image as HTMLImageElement).decode()),
    ));

    const cornerAlpha = await portraits.evaluateAll((images) => images.map((image) => {
      const portrait = image as HTMLImageElement;
      const canvas = document.createElement('canvas');
      canvas.width = portrait.naturalWidth;
      canvas.height = portrait.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return [];
      context.drawImage(portrait, 0, 0);
      const corners = [
        [0, 0],
        [canvas.width - 1, 0],
        [0, canvas.height - 1],
        [canvas.width - 1, canvas.height - 1],
      ];
      return corners.map(([x, y]) => context.getImageData(x, y, 1, 1).data[3]);
    }));

    for (const portraitCorners of cornerAlpha) {
      expect(portraitCorners.every((alpha) => alpha <= 40)).toBe(true);
    }
  });
}
