import { expect, test } from '@playwright/test';

for (const [route, sourceText, contextText] of [
  ['/evidence/', 'Zipevent ระบุว่างาน KBTG Techtopia', 'HealthTAG ยืนยันว่า นพ.เดโชวัต พรมดา มีกำหนดร่วมเสวนา'],
  ['/en/evidence/', 'Zipevent lists KBTG Techtopia', 'HealthTAG confirms that Dechowat Promda, M.D. is scheduled to join the panel'],
]) {
  test(`${route} labels KBTG Techtopia as an upcoming event`, async ({ page }) => {
    await page.goto(route);

    const event = page.locator('#kbtg-techtopia-2026');
    await expect(event).toBeVisible();
    await expect(event).toContainText(sourceText);
    await expect(event).toContainText(contextText);
    await expect(event.locator('time')).toHaveAttribute('datetime', '2026-09-16');
    await expect(event.locator('a[href="https://www.zipeventapp.com/e/kbtg-techtopia-2026"]')).toBeVisible();
  });
}
