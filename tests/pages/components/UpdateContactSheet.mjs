// tests/pages/components/UpdateContactSheet.mjs
// Component Object đại diện cho Sheet cập nhật thông tin liên hệ (VBO-HS-06)

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class UpdateContactSheet extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.dialog = page.getByRole('dialog');
    this.title = this.dialog.getByText('Yêu cầu cập nhật liên hệ');
    this.phoneInput = this.dialog.getByRole('textbox', { name: /số điện thoại/i });
    this.emailInput = this.dialog.getByRole('textbox', { name: /email/i });
    this.submitButton = this.dialog.getByRole('button', { name: 'Gửi yêu cầu' });
  }

  /**
   * Kiểm tra Sheet đã mở ra và hiển thị đầy đủ tiêu đề, nút bấm
   */
  async expectOpen() {
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.title).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Điền số điện thoại mới
   * @param {string} phone
   */
  async fillPhone(phone) {
    await expect(this.phoneInput).toBeVisible();
    await this.phoneInput.fill(phone);
  }

  /**
   * Điền email mới
   * @param {string} email
   */
  async fillEmail(email) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
  }

  /**
   * Bấm nút "Gửi yêu cầu"
   */
  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  /**
   * Điền form và gửi yêu cầu trọn gói
   * @param {string} phone
   * @param {string} email
   */
  async submitContactUpdate(phone, email) {
    await this.fillPhone(phone);
    await this.fillEmail(email);
    await this.submit();
  }

  /**
   * Kiểm tra Sheet đã đóng sau khi gửi thành công
   */
  async expectClosed() {
    await expect(this.dialog).toBeHidden({ timeout: 10000 });
  }
}
