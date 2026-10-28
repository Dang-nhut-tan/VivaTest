// tests/pages/components/UpdateBankSheet.mjs
// Component Object đại diện cho Sheet cập nhật tài khoản ngân hàng nhận lương (VBO-HS-15)

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class UpdateBankSheet extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.dialog = page.getByRole('dialog');
    this.title = this.dialog.getByText('Cập nhật tài khoản ngân hàng');
    this.accountInput = this.dialog.getByRole('textbox', { name: /số tài khoản/i });
    this.bankNameInput = this.dialog.getByRole('textbox', { name: /tên ngân hàng/i });
    this.submitButton = this.dialog.getByRole('button', { name: 'Gửi yêu cầu' });
    this.accountError = this.dialog.getByText('Số tài khoản phải gồm 6–20 chữ số');
    this.bankNameError = this.dialog.getByText('Tên ngân hàng không được để trống');
  }

  /**
   * Kiểm tra Sheet đã mở ra và hiển thị đầy đủ
   */
  async expectOpen() {
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.title).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Điền số tài khoản ngân hàng
   * @param {string} account
   */
  async fillAccount(account) {
    await expect(this.accountInput).toBeVisible();
    await this.accountInput.fill(account);
  }

  /**
   * Điền tên ngân hàng
   * @param {string} bankName
   */
  async fillBankName(bankName) {
    await expect(this.bankNameInput).toBeVisible();
    await this.bankNameInput.fill(bankName);
  }

  /**
   * Bấm nút "Gửi yêu cầu"
   */
  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  /**
   * Điền form và gửi yêu cầu hợp lệ trọn gói
   * @param {string} account
   * @param {string} bankName
   */
  async submitBankUpdate(account, bankName) {
    await this.fillAccount(account);
    await this.fillBankName(bankName);
    await this.submit();
  }

  /**
   * Kiểm tra thông báo lỗi ràng buộc định dạng số tài khoản (6–20 chữ số)
   */
  async expectAccountValidationError() {
    await expect(this.accountError).toBeVisible({ timeout: 5000 });
  }

  /**
   * Kiểm tra thông báo lỗi để trống tên ngân hàng
   */
  async expectBankNameValidationError() {
    await expect(this.bankNameError).toBeVisible({ timeout: 5000 });
  }

  /**
   * Kiểm tra Sheet đã đóng sau khi gửi thành công
   */
  async expectClosed() {
    await expect(this.dialog).toBeHidden({ timeout: 10000 });
  }
}
