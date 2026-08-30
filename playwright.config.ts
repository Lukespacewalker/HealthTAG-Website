import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  fullyParallel: false,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:41739',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'node scripts/serve-dist.mjs --port 41739',
    url: 'http://127.0.0.1:41739/interoperability/',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
