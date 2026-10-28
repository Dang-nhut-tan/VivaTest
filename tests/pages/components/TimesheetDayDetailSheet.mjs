// tests/pages/components/TimesheetDayDetailSheet.mjs
// Component Object Model đại diện cho Sheet chi tiết ngày công (VBO-BC-06)

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class TimesheetDayDetailSheet extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.dialog = page.getByRole('dialog');
    this.closeButton = this.dialog.getByRole('button', { name: 'Đóng' });
    this.reportButton = this.dialog.getByRole('button', { name: 'Báo sai sót' });

    // Các mục thông tin chi tiết
    this.shiftSection = this.dialog.getByText('Ca xếp');
    this.clockInLabel = this.dialog.getByText('Vào ca');
    this.clockOutLabel = this.dialog.getByText('Ra ca');
    this.estimatedHoursLabel = this.dialog.getByText('Công tạm tính');
  }

  /**
   * Kiểm tra Sheet chi tiết ngày công đã mở thành công
   * @param {string|RegExp} [datePattern]
   */
  async expectOpen(datePattern) {
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.closeButton).toBeVisible();
    await expect(this.shiftSection).toBeVisible();
    if (datePattern) {
      await expect(this.dialog).toContainText(datePattern);
    }
  }

  /**
   * Kiểm tra mã ca và giờ ca xếp hiển thị chính xác
   * @param {string} shiftCode
   */
  async expectShift(shiftCode) {
    await expect(this.dialog.locator(`text=${shiftCode}`)).toBeVisible();
  }

  /**
   * Kiểm tra giờ thực làm / công tạm tính
   * @param {string|RegExp} textPattern
   */
  async expectEstimatedHours(textPattern) {
    await expect(this.dialog).toContainText(textPattern);
  }

  /**
   * Bấm nút "Báo sai sót" để mở phiếu báo sai sót
   */
  async clickReport() {
    await expect(this.reportButton).toBeVisible();
    await this.reportButton.click();
  }

  /**
   * Đóng Sheet chi tiết ngày
   */
  async close() {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
    await expect(this.dialog).toBeHidden({ timeout: 5000 });
  }
}
