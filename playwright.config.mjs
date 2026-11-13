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
  projects: [
    // 1. Setup Project: Đăng nhập 1 lần duy nhất, lưu session vào .auth/*.json
    {
      name: 'setup',
      testDir: './tests/setup',
      testMatch: /.*\.setup\.mjs/,
    },
    // 2. Admin Portal: Chạy giao diện quản trị desktop, nạp session admin
    {
      name: 'admin-portal',
      testDir: './tests/specs/admin',
      dependencies: ['setup'],
      use: {
        viewport: { width: 1280, height: 800 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        isMobile: false,
        hasTouch: false,
        storageState: 'playwright/.auth/admin.json',
      },
    },
    // 3. Mobile Employee App: Chạy các nghiệp vụ nhân viên, nạp session employee
    {
      name: 'employee-mobile',
      testDir: './tests/specs',
      testIgnore: ['**/admin/**', '**/auth/**'],
      dependencies: ['setup'],
      use: {
        viewport: { width: 412, height: 915 },
        isMobile: true,
        hasTouch: true,
        storageState: 'playwright/.auth/employee.json',
      },
    },
    // 4. Auth Specs: Kiểm thử trực tiếp form đăng nhập/quên mật khẩu (KHÔNG nạp storageState)
    {
      name: 'auth-flows',
      testDir: './tests/specs/auth',
      use: {
        viewport: { width: 412, height: 915 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
