// tests/pages/admin/AdminLoginPage.mjs
// Page Object Model đại diện cho Màn hình Đăng nhập Quản trị Admin (/quan-tri/#/login)
// Tuyệt đối không dùng waitForTimeout — chỉ dùng Web-First Assertions

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class AdminLoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.identifierInput = page.getByLabel('Mã nhân viên hoặc email').or(page.getByRole('textbox', { name: 'Mã nhân viên hoặc email' }));
    this.passwordInput = page.getByLabel('Mật khẩu', { exact: true });
    this.loginButton = page.getByRole('button', { name: 'Đăng nhập', exact: true });
    this.errorMessage = page.getByRole('alert');
  }

  /**
   * Điều hướng đến trang Đăng nhập Quản trị
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/quan-tri/#/login`, { waitUntil: 'domcontentloaded' });
    await expect(this.identifierInput).toBeVisible({ timeout: 15000 });
  }

  /**
   * Điền mã nhân viên hoặc email quản trị
   * @param {string} identifier
   */
  async fillIdentifier(identifier) {
    await expect(this.identifierInput).toBeVisible();
    await this.identifierInput.fill(identifier);
  }

  /**
   * Điền mật khẩu quản trị
   * @param {string} password
   */
  async fillPassword(password) {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
  }

  /**
   * Bấm nút Đăng nhập
   */
  async clickLogin() {
    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }

  /**
   * Quy trình đăng nhập trọn gói vào Quản trị
   * @param {string} identifier
   * @param {string} password
   */
  async login(identifier, password) {
    await this.fillIdentifier(identifier);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Xác nhận đăng nhập thành công vào Dashboard Quản trị (tự động xử lý nếu gặp rate-limit 429 mà không dùng sleep)
   * @param {number} timeout
   */
  async expectLoginSuccess(timeout = 35000) {
    const rateLimitAlert = this.page.getByRole('alert').filter({ hasText: /quá nhanh/i });
    if (await rateLimitAlert.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Chờ cảnh báo rate-limit biến mất và thử bấm lại
      await expect(rateLimitAlert).toBeHidden({ timeout: 15000 }).catch(() => {});
      if (await this.loginButton.isEnabled().catch(() => false)) {
        await this.loginButton.click().catch(() => {});
      }
    }
    await expect(this.page).toHaveURL(/.*#\/dashboard/, { timeout });
  }
}
