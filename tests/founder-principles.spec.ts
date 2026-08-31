import { expect, test } from '@playwright/test';

test('Trust separates patient consent from the current authorization check', async ({ page }) => {
  await page.goto('/trust/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ข้อมูลสุขภาพเป็นของผู้ป่วย โรงพยาบาลดูแลเวชระเบียน');
  await expect(page.locator('.consent-section')).toContainText('ความยินยอมกำหนดว่าผู้ป่วยอนุญาตให้นำข้อมูลสุขภาพไปใช้หรือไม่และอย่างไร');
  await expect(page.locator('.consent-section')).toContainText('การอนุญาตสิทธิ์คือการตัดสินใจของระบบเมื่อแอปพลิเคชันขอเข้าถึง');
  await expect(page.locator('.authorization')).toContainText('15min');
  await expect(page.locator('.authorization')).toContainText('ในการทำงานปัจจุบัน');

  await page.goto('/en/trust/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Patients own their health data. Hospitals steward the records.');
  await expect(page.locator('.consent-section')).toContainText('Consent defines whether and how the patient permits health data to be used.');
  await expect(page.locator('.consent-section')).toContainText('clear scope and time limit, remain auditable, and be revocable');
  await expect(page.locator('.consent-section')).toContainText('Authorization is the system decision made when an application requests access.');
  await expect(page.locator('.authorization')).toContainText('In the current implementation');
});

test('Trust Before Intelligence is a governance principle rather than a deployed AI claim', async ({ page }) => {
  await page.goto('/en/trust/');
  const principle = page.locator('.intelligence-section');
  await expect(principle).toContainText('TRUST BEFORE INTELLIGENCE');
  await expect(principle).toContainText('provenance, patient consent, authorization, and an auditable record of access');
  await expect(principle).toContainText('The systems described on this website do not include AI training or a clinical AI pipeline.');

  await page.goto('/trust/');
  await expect(page.locator('.intelligence-section')).toContainText('ระบบที่อธิบายในเว็บไซต์นี้ยังไม่รวมการฝึก AI หรือกระบวนการ AI ทางคลินิก');
});

test('How It Works shows consent, authorization, permitted response, and audit in order', async ({ page }) => {
  await page.goto('/en/how-it-works/');
  await expect(page.locator('.system-overview')).toContainText('Clinical records stay with the hospital');
  await expect(page.getByRole('img', { name: /Conceptual architecture/ })).toBeVisible();
  await expect(page.locator('.decision-path b')).toHaveText(['Consent', 'Authorization', 'Permitted response', 'Audit']);
  await expect(page.locator('.flow li').nth(4)).toContainText('Return a permitted response');
  await expect(page.locator('.flow li').nth(4)).toContainText('hospital source system');

  await page.goto('/how-it-works/');
  await expect(page.locator('.system-overview')).toContainText('เวชระเบียนยังอยู่กับโรงพยาบาล');
  await expect(page.getByRole('img', { name: /สถาปัตยกรรมเชิงแนวคิด/ })).toBeVisible();
  await expect(page.locator('.decision-path b')).toHaveText(['ความยินยอม', 'การอนุญาตสิทธิ์', 'คำตอบตามสิทธิ์', 'ตรวจสอบย้อนหลัง']);
});

test('Interoperability explains source-held data and the open-standard rationale', async ({ page }) => {
  await page.goto('/en/interoperability/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('source-held FHIR');
  await expect(page.locator('.standards-section')).toContainText('Data stays at source');
  await expect(page.locator('.standards-section')).toContainText('different vendors communicate');
  await expect(page.locator('.standards-section')).toContainText('instead of putting clinical records on blockchain');

  await page.goto('/interoperability/');
  await expect(page.locator('.standards-section')).toContainText('ข้อมูลอยู่ที่ระบบต้นทาง');
  await expect(page.locator('.standards-section')).toContainText('ลดการพึ่งพารูปแบบเฉพาะราย');
});

test('PHR states patient ownership while preserving product and NFC boundaries', async ({ page }) => {
  await page.goto('/en/phr/');
  await expect(page.locator('.ownership-strip')).toContainText('Patients control consent and how their health data may be used.');
  await expect(page.locator('.ownership-strip')).toContainText('Hospitals store and steward the original clinical records in source systems.');
  await expect(page.locator('.screen-gallery figure')).toHaveCount(5);
  await expect(page.getByText(/An NFC sticker can open the user’s PHR/)).toBeVisible();

  await page.goto('/phr/');
  await expect(page.locator('.ownership-strip')).toContainText('ผู้ป่วยมีอำนาจเหนือความยินยอมและการใช้ข้อมูลสุขภาพ');
  await expect(page.locator('.ownership-strip')).toContainText('โรงพยาบาลจัดเก็บและดูแลเวชระเบียนต้นฉบับในระบบต้นทาง');
});

test('Network presents Ecosystem, Not Ego without changing relationship status', async ({ page }) => {
  await page.goto('/en/network/');
  await expect(page.locator('.ecosystem-principle')).toContainText('Ecosystem, not ego');
  await expect(page.locator('.ecosystem-principle')).toContainText('does not indicate a deployment unless that status is stated directly');

  await page.goto('/network/');
  await expect(page.locator('.ecosystem-principle')).toContainText('ระบบนิเวศสำคัญกว่าการยึดตัวเองเป็นศูนย์กลาง');
  await expect(page.locator('.ecosystem-principle')).toContainText('ไม่ได้หมายถึงการติดตั้งใช้งาน');
});

for (const route of ['/trust/', '/how-it-works/', '/interoperability/', '/phr/', '/network/', '/en/trust/', '/en/how-it-works/', '/en/interoperability/', '/en/phr/', '/en/network/']) {
  test(`founder copy on ${route} contains no em or en dash`, async ({ page }) => {
    await page.goto(route);
    const copy = await page.locator('[data-founder-copy]').allTextContents();
    expect(copy.length).toBeGreaterThan(0);
    expect(copy.join(' ')).not.toMatch(/[—–]/);
  });
}
