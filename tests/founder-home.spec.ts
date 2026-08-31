import { expect, test } from '@playwright/test';

test('Thai home leads with the founder-confirmed vision and role boundary', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'ข้อมูลของคุณ ความยินยอมของคุณ เชื่อมถึงกันทั้งประเทศ',
  })).toBeVisible();
  await expect(page.getByText(/ข้อมูลสุขภาพเป็นของผู้ป่วย/).first()).toBeVisible();
  await expect(page.getByText(/HealthTAG PHR แสดงข้อมูลสุขภาพที่มีอยู่และได้รับอนุญาต/).first()).toBeVisible();
  await expect(page.getByText(/โรงพยาบาลยังจัดเก็บและดูแลเวชระเบียนต้นฉบับในระบบต้นทาง/).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'ดูหน้าจอ PHR' })).toHaveAttribute('href', '/phr/');
  await expect(page.getByRole('link', { name: 'ดูเส้นทางข้อมูลมายัง PHR' })).toHaveAttribute('href', '/how-it-works/');
  await expect(page.getByRole('img', { name: /หน้าภาพรวม HealthTAG PHR/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /MU Health Wallet ร่วมจัดแสดงในงาน Digital Health Forum 2026/ })).toHaveAttribute('href', '/news/digital-health-forum-2026/');
  await expect(page).toHaveTitle('HealthTAG | ข้อมูลของคุณ ความยินยอมของคุณ เชื่อมถึงกันทั้งประเทศ');
});

test('English home leads with the founder-confirmed vision and role boundary', async ({ page }) => {
  await page.goto('/en/');

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Your data. Your consent. One connected Thailand.',
  })).toBeVisible();
  await expect(page.getByText(/Health data belongs to the patient/).first()).toBeVisible();
  await expect(page.getByText(/HealthTAG PHR presents the health information available and permitted/).first()).toBeVisible();
  await expect(page.getByText(/Hospitals continue to store and steward the original clinical records/).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore the PHR' })).toHaveAttribute('href', '/en/phr/');
  await expect(page.getByRole('link', { name: 'See how data reaches the PHR' })).toHaveAttribute('href', '/en/how-it-works/');
  await expect(page.getByRole('img', { name: /HealthTAG PHR overview/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /MU Health Wallet exhibited at Digital Health Forum 2026/ })).toHaveAttribute('href', '/en/news/digital-health-forum-2026/');
  await expect(page).toHaveTitle('HealthTAG | Your data. Your consent. One connected Thailand.');
});

test('contact routes founder-relevant institution types without accepting sensitive data', async ({ page }) => {
  await page.goto('/contact/');
  const enquiry = page.locator('select[name="enquiry"]');

  await expect(enquiry.locator('option', { hasText: 'ภาครัฐ / หน่วยงานสาธารณะ' })).toHaveCount(1);
  await expect(enquiry.locator('option', { hasText: 'มหาวิทยาลัย / งานวิจัย' })).toHaveCount(1);
  await expect(enquiry.locator('option', { hasText: 'ความร่วมมือกับภาคอุตสาหกรรม' })).toHaveCount(1);
  await expect(page.getByText(/โปรดอย่าส่งข้อมูลอ่อนไหว/).first()).toBeVisible();

  await page.goto('/en/contact/');
  const englishEnquiry = page.locator('select[name="enquiry"]');
  await expect(englishEnquiry.locator('option', { hasText: 'Government / Public Sector' })).toHaveCount(1);
  await expect(englishEnquiry.locator('option', { hasText: 'University / Research' })).toHaveCount(1);
  await expect(englishEnquiry.locator('option', { hasText: 'Industry Partnership' })).toHaveCount(1);
});
