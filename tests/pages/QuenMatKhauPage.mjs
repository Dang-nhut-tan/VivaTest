// tests/pages/QuenMatKhauPage.mjs
// Page Object Model đại diện cho Màn hình Quên Mật Khẩu (/quen-mat-khau)

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';

export class QuenMatKhauPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Header & Shell (VBO-QM-01)
    this.headerSection = page.locator('[data-section="VBO-QM-01"]');
    this.title = page.getByRole('heading', { level: 1 }).or(page.getByText('Quên mật khẩu'));
    this.subtitle = page.getByText('Nhập mã nhân viên hoặc số điện thoại của bạn');

    // Biểu mẫu yêu cầu (VBO-QM-02)
    this.formSection = page.locator('[data-section="VBO-QM-02"]');
    this.identifierInput = page.getByRole('textbox').first();
    this.submitButton = page.getByRole('button', { name: /Gửi yêu cầu/i });
    this.backToSignInLink = page.getByRole('button', { name: 'Quay lại đăng nhập' });

    // Khối kết quả gửi thông báo chung (VBO-QM-03)
    this.resultSection = page.locator('[data-section="VBO-QM-03"]');
    this.statusNotice = page.getByRole('status').or(page.locator('p[role="status"]'));
    this.backToSignInButton = this.resultSection.getByRole('button', { name: 'Quay lại đăng nhập' });
  }

  /**
   * Điều hướng trực tiếp đến trang Quên mật khẩu (/quen-mat-khau)
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/quen-mat-khau`, { waitUntil: 'domcontentloaded' });
    await expect(this.identifierInput).toBeVisible({ timeout: 10000 });
  }

  /**
   * Nhập định danh (Mã nhân viên hoặc Số điện thoại)
   * @param {string} identifier
   */
  async fillIdentifier(identifier) {
    await expect(this.identifierInput).toBeVisible();
    await this.identifierInput.fill(identifier);
  }

  /**
   * Kiểm tra nút Gửi yêu cầu bị vô hiệu hóa khi chưa nhập thông tin
   */
  async expectSubmitDisabled() {
    await expect(this.submitButton).toBeDisabled();
  }

  /**
   * Kiểm tra nút Gửi yêu cầu đã sẵn sàng bấm
   */
  async expectSubmitEnabled() {
    await expect(this.submitButton).toBeEnabled();
  }

  /**
   * Bấm nút Gửi yêu cầu
   */
  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  /**
   * Xác thực thông báo thành công sau khi gửi yêu cầu
   */
  async expectSuccessNotice() {
    await expect(this.resultSection).toBeVisible({ timeout: 10000 });
    await expect(this.statusNotice).toBeVisible();
    await expect(this.statusNotice).toContainText(/Yêu cầu đã gửi tới phòng Nhân sự/i);
  }

  /**
   * Bấm nút Quay lại đăng nhập
   */
  async clickBackToSignIn() {
    await expect(this.backToSignInButton).toBeVisible();
    await this.backToSignInButton.click();
  }
}
