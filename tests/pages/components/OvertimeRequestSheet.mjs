// tests/pages/components/OvertimeRequestSheet.mjs
// Component Object Model đại diện cho Sheet "Gửi đơn tăng ca" (VBO-DT-09)

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class OvertimeRequestSheet extends BasePage {
  constructor(page) {
    super(page);

    this.sheet = page.locator('[data-section="VBO-DT-09"]');
    this.title = page.getByRole('heading', { name: /gửi đơn tăng ca/i }).or(page.getByText('Gửi đơn tăng ca'));
    this.closeButton = this.sheet.locator('button[aria-label="Đóng"]').or(page.getByRole('button', { name: 'Đóng' }));
    this.backButton = page.getByRole('button', { name: 'Quay lại' });

    // Mục 1: Ca đã xếp
    this.shiftsNotice = page.locator('div:has-text("1. Ca đã xếp của bạn")');

    // Mục 3: Tăng ca tới mấy giờ (VBO-DT-17 & VBO-DT-17.1)
    this.timeRangeSection = page.locator('[data-section="VBO-DT-17"]').or(page.locator('div:has-text("3. Tăng ca tới mấy giờ")')).first();
    this.fromTimeBox = this.timeRangeSection.locator('> div').first();
    this.untilButton = this.sheet.locator('button[disabled]').first();
    this.lockReasonNote = page.locator('[data-section="VBO-DT-17.1"]').or(page.getByText(/Tuần này bạn chưa có ca nào đã xếp/i)).first();

    // Nút Gửi đơn
    this.submitButton = page.getByRole('button', { name: 'Gửi đơn', exact: true });
  }

  /**
   * Kiểm tra Sheet Gửi đơn tăng ca đã mở
   */
  async expectOpen() {
    await expect(this.title).toBeVisible({ timeout: 8000 });
    await expect(this.timeRangeSection).toBeVisible();
  }

  /**
   * Kiểm tra ô chọn giờ tăng ca bị khóa kèm thông báo lý do rõ ràng
   * @param {string|RegExp} [expectedReason]
   */
  async expectOvertimeTimeFieldLocked(expectedReason) {
    await expect(this.untilButton).toBeDisabled();
    if (expectedReason) {
      await expect(this.lockReasonNote).toContainText(expectedReason);
    }
  }

  /**
   * Đóng Sheet
   */
  async close() {
    if (await this.closeButton.isVisible()) {
      await this.closeButton.click();
    } else if (await this.backButton.isVisible()) {
      await this.backButton.click();
    }
  }
}
