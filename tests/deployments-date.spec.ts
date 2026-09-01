import { expect, test } from '@playwright/test';

test('publishes the owner-confirmed Khian Sa start date in Thai', async ({ page }) => {
  await page.goto('/deployments/#khian-sa');

  await expect(page.locator('#khian-sa')).toContainText('เริ่มใช้งาน HealthTAG FHIR Transformer เมื่อ 1 มิถุนายน 2025');
});

test('publishes the owner-confirmed Khian Sa start date in English', async ({ page }) => {
  await page.goto('/en/deployments/#khian-sa');

  await expect(page.locator('#khian-sa')).toContainText('has used HealthTAG FHIR Transformer since 1 June 2025');
});
