// tests/pages/LoginPage.mjs
// Page Object Model đại diện cho Màn hình Đăng nhập App Nhân viên (/dang-nhap)

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.employeeCodeInput = page.getByRole('textbox', { name: 'Mã nhân viên' });
    this.phoneInput = page.getByRole('textbox', { name: 'Số điện thoại' });
    this.passwordInput = page.getByRole('textbox', { name: 'Mật khẩu' });
    this.loginButton = page.getByRole('button', { name: 'Đăng nhập', exact: true });
    this.continueButton = page.getByRole('button', { name: 'Tiếp tục' });

    // Tab định danh (VBO-DN-09)
    this.tabEmployeeCode = page.getByRole('tab', { name: 'Mã nhân viên' });
    this.tabPhone = page.getByRole('tab', { name: 'Số điện thoại' });

    // Lối phụ (VBO-DN-04)
    this.forgotPasswordLink = page.locator('[data-section="VBO-DN-04"]').getByRole('button', { name: 'Quên mật khẩu' });
  }

  /**
   * Điều hướng đến trang đăng nhập với cờ ?web=thu
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/dang-nhap?web=thu`, { waitUntil: 'domcontentloaded' });
    await expect(this.employeeCodeInput).toBeVisible({ timeout: 10000 });
  }

  /**
   * Điền mã nhân viên
   * @param {string} code
   */
  async fillEmployeeCode(code) {
    await expect(this.employeeCodeInput).toBeVisible();
    await this.employeeCodeInput.fill(code);
  }

  /**
   * Điền mật khẩu
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
   * Xử lý popup cảnh báo "Bạn đang dùng một máy lạ" nếu xuất hiện
   */
  async handleUnknownDeviceWarning() {
    try {
      await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.continueButton.click();
    } catch {
      // Bỏ qua nếu không xuất hiện popup cảnh báo máy lạ
    }
  }

  /**
   * Quy trình đăng nhập trọn gói bằng mã nhân viên
   * @param {string} code
   * @param {string} password
   */
  async login(code, password) {
    await this.selectTab('MA_NV');
    await this.fillEmployeeCode(code);
    await this.fillPassword(password);
    await this.clickLogin();
    await this.handleUnknownDeviceWarning();
  }

  /**
   * Chọn tab định danh đăng nhập: 'MA_NV' hoặc 'SDT'
   * @param {'MA_NV'|'SDT'} tab
   */
  async selectTab(tab = 'MA_NV') {
    if (tab === 'SDT') {
      await expect(this.tabPhone).toBeVisible();
      await this.tabPhone.click();
      await expect(this.tabPhone).toHaveAttribute('aria-selected', 'true');
    } else {
      await expect(this.tabEmployeeCode).toBeVisible();
      await this.tabEmployeeCode.click();
      await expect(this.tabEmployeeCode).toHaveAttribute('aria-selected', 'true');
    }
  }

  /**
   * Điền số điện thoại vào ô nhập
   * @param {string} phone
   */
  async fillPhone(phone) {
    await expect(this.phoneInput).toBeVisible();
    await this.phoneInput.fill(phone);
  }

  /**
   * Quy trình đăng nhập trọn gói bằng số điện thoại
   * @param {string} phone
   * @param {string} password
   */
  async loginWithPhone(phone, password) {
    await this.selectTab('SDT');
    await this.fillPhone(phone);
    await this.fillPassword(password);
    await this.clickLogin();
    await this.handleUnknownDeviceWarning();
  }

  /**
   * Bấm vào đường dẫn "Quên mật khẩu"
   */
  async clickForgotPassword() {
    await expect(this.forgotPasswordLink).toBeVisible();
    await this.forgotPasswordLink.click();
  }

  /**
   * Kiểm tra xác nhận đã chuyển hướng thành công vào Trang chủ
   */
  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/.*\/trang-chu/, { timeout: 15000 });
  }
}

