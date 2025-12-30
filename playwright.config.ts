import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: '50%',
  reporter: process.env.CI
    ? [['list'], ['junit', { outputFile: 'test-results/results.xml' }]]
    : [['html'], ['list']],
  use: {
    testIdAttribute: 'data-id',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Ecommerce Development Store',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://automationteststore.com/' },
    },
  ],
});
