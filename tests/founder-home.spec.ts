import { expect, test } from '@playwright/test';

test('Thai home leads with the founder-confirmed vision and role boundary', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'โครงสร้างพื้นฐานข้อมูลสุขภาพที่ประเทศไทยวางใจได้',
  })).toBeVisible();
  await expect(page.getByText(/ข้อมูลสุขภาพเป็นของผู้ป่วย/).first()).toBeVisible();
  await expect(page.getByText(/เชื่อมระบบโรงพยาบาลด้วยมาตรฐานเปิด/).first()).toBeVisible();
  await expect(page.getByText(/เวชระเบียนต้นฉบับยังอยู่ในระบบต้นทางของโรงพยาบาล/).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'ดูภาพรวมแพลตฟอร์ม' })).toHaveAttribute('href', '/platform/');
  await expect(page.getByRole('link', { name: 'คุยกับ HealthTAG' }).first()).toHaveAttribute('href', '/contact/');
  await expect(page.getByRole('img', { name: /หน้าภาพรวม HealthTAG PHR/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /MU Health Wallet ร่วมจัดแสดงในงาน Digital Health Forum 2026/ })).toHaveAttribute('href', '/news/digital-health-forum-2026/');
  await expect(page).toHaveTitle('HealthTAG | โครงสร้างพื้นฐานข้อมูลสุขภาพที่ประเทศไทยวางใจได้');
});

test('English home leads with the founder-confirmed vision and role boundary', async ({ page }) => {
  await page.goto('/en/');

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Trusted health data infrastructure for Thailand',
  })).toBeVisible();
  await expect(page.getByText(/Health data belongs to the patient/).first()).toBeVisible();
  await expect(page.getByText(/connects hospital systems through open standards/).first()).toBeVisible();
  await expect(page.getByText(/original clinical records remain in hospital source systems/).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore the platform' })).toHaveAttribute('href', '/en/platform/');
  await expect(page.getByRole('link', { name: 'Talk to HealthTAG' }).first()).toHaveAttribute('href', '/en/contact/');
  await expect(page.getByRole('img', { name: /HealthTAG PHR overview/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /MU Health Wallet exhibited at Digital Health Forum 2026/ })).toHaveAttribute('href', '/en/news/digital-health-forum-2026/');
  await expect(page).toHaveTitle('HealthTAG | Trusted health data infrastructure for Thailand');
});

test('contact routes founder-relevant institution types without accepting sensitive data', async ({ page }) => {
  await page.goto('/contact/');
  const enquiry = page.locator('.topic-grid');

  await expect(enquiry.getByRole('link', { name: /ภาครัฐหรือมหาวิทยาลัย/ })).toHaveAttribute('href', /^mailto:contact@healthtag\.io\?subject=/);
  await expect(enquiry.getByRole('link', { name: /ความร่วมมือทางธุรกิจ/ })).toHaveAttribute('href', /^mailto:contact@healthtag\.io\?subject=/);
  await expect(enquiry.getByRole('link', { name: /นักลงทุนสัมพันธ์/ })).toHaveAttribute('href', /^mailto:contact@healthtag\.io\?subject=/);
  await expect(page.getByText(/โปรดอย่าส่งข้อมูลอ่อนไหว/).first()).toBeVisible();

  await page.goto('/en/contact/');
  const englishEnquiry = page.locator('.topic-grid');
  await expect(englishEnquiry.getByRole('link', { name: /Government or university/ })).toHaveAttribute('href', /^mailto:contact@healthtag\.io\?subject=/);
  await expect(englishEnquiry.getByRole('link', { name: /Business partnership/ })).toHaveAttribute('href', /^mailto:contact@healthtag\.io\?subject=/);
  await expect(englishEnquiry.getByRole('link', { name: /Investor Relations/ })).toHaveAttribute('href', /^mailto:contact@healthtag\.io\?subject=/);
});
