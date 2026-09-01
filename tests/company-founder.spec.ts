import { expect, test } from '@playwright/test';

test('Thai Company page publishes the complete founder framework', async ({ page }) => {
  await page.goto('/company/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ข้อมูลสุขภาพเป็นของผู้ป่วย');
  await expect(page.locator('#mission-vision')).toContainText('ข้อมูลของคุณ ความยินยอมของคุณ เชื่อมถึงกันทั้งประเทศ');
  await expect(page.locator('#mission-vision')).toContainText('สร้างโครงสร้างพื้นฐานข้อมูลสุขภาพที่วางใจได้สำหรับประเทศไทย');
  await expect(page.locator('#mission-vision')).toContainText('AI ทางการแพทย์ในอนาคต');

  const values = page.locator('#values .values-list > li');
  await expect(values).toHaveCount(6);
  await expect(values.locator('h3')).toHaveText([
    'เจ้าของข้อมูลคือประชาชน',
    'ความไว้วางใจต้องมาก่อนปัญญา',
    'ข้อมูลอยู่ที่ต้นทาง',
    'มาตรฐานเปิด เชื่อมได้จริง',
    'เกิดจากหน้างานจริง',
    'ทำงานร่วมกัน ไม่ทำคนเดียว',
  ]);
  await expect(values.first()).toContainText('จำกัดขอบเขต');
  await expect(values.first()).toContainText('เพิกถอนได้');
  const founder = page.locator('#founder');
  await expect(founder).toContainText('ปัจจุบันยังปฏิบัติงานทางคลินิก');
  await expect(founder.locator('.founder-credentials')).toContainText('แพทยศาสตรบัณฑิต มหาวิทยาลัยขอนแก่น');
  await expect(founder.locator('.founder-credentials')).toContainText('National University of Singapore');
  await expect(founder.locator('.founder-credentials')).toContainText('จุฬาลงกรณ์มหาวิทยาลัย');
  await expect(page.locator('#team')).toBeVisible();
});

test('English Company page frames nationwide connection as Vision', async ({ page }) => {
  await page.goto('/en/company/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Health data belongs to the patient');
  const vision = page.locator('#mission-vision');
  await expect(vision).toContainText('Your data. Your consent. One connected Thailand.');
  await expect(vision).toContainText('We are working toward a Thailand');
  await expect(vision).toContainText('safely, transparently, and verifiably');

  const values = page.locator('#values .values-list > li');
  await expect(values).toHaveCount(6);
  await expect(values.locator('h3')).toHaveText([
    'Patient Sovereignty',
    'Trust Before Intelligence',
    'Data Stays at Source',
    'Open Standards, Real Interoperability',
    'Clinically Grounded',
    'Ecosystem, Not Ego',
  ]);
  await expect(values.first()).toContainText('limited in scope and time');
  await expect(values.first()).toContainText('revocable');
  const founder = page.locator('#founder');
  await expect(founder).toContainText('continues clinical practice');
  await expect(founder.locator('.founder-credentials')).toContainText('M.D., Khon Kaen University');
  await expect(founder.locator('.founder-credentials')).toContainText('National University of Singapore');
  await expect(founder.locator('.founder-credentials')).toContainText('Chulalongkorn University');
});

for (const route of ['/company/', '/en/company/']) {
  test(`founder framework on ${route} contains no em or en dash`, async ({ page }) => {
    await page.goto(route);
    const copy = await page.locator('main[data-founder-copy]').innerText();
    expect(copy).not.toMatch(/[—–]/);
  });
}
