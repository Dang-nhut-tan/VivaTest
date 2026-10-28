// playwright.config.mjs
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'e2e-report/playwright-html-report', open: 'never' }],
    ['allure-playwright', {
      resultsDir: 'allure-results',
      // Chỉ hiển thị test.step nghiệp vụ. Nếu bật true, Allure còn tạo thêm
      // các step kỹ thuật (click/fill/expect...) không có ảnh riêng.
      detail: false,
      suiteTitle: true,
      environmentInfo: {
        framework: 'Playwright',
        browser: 'Google Chrome',
        baseURL: process.env.BASE_URL || 'https://workdemo.vivacorp.vn',
        platform: process.platform,
      },
    }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://workdemo.vivacorp.vn',
    channel: 'chrome',
    headless: true,
    viewport: { width: 412, height: 915 },
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    hasTouch: true,
    isMobile: true,
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'retain-on-failure',
  },
});
