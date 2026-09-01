import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'contact-function.spec.ts',
  timeout: 15_000,
  fullyParallel: false,
  reporter: 'list',
});
