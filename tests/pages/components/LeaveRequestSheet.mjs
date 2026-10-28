// tests/pages/components/LeaveRequestSheet.mjs
// Component Object Model đại diện cho Sheet "Gửi đơn nghỉ phép" (VBO-DT-05)

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class LeaveRequestSheet extends BasePage {
  constructor(page) {
    super(page);

    // Dialog bao phủ toàn bộ Sheet
    this.dialog = page.getByRole('dialog').filter({ hasText: 'Gửi đơn nghỉ phép' });
    this.title = this.dialog.getByText('Gửi đơn nghỉ phép');

    // Khu vực chọn loại nghỉ phép (LeaveTypeChips)
    this.typeChipsContainer = this.dialog.getByText('Nghỉ phép năm').first();

    // Các trường ngày
    this.fromDateInput = this.dialog.locator('input[type="date"]').nth(0);
    this.toDateInput = this.dialog.locator('input[type="date"]').nth(1);

    // Trường lý do
    this.reasonInput = this.dialog.getByRole('textbox', { name: /lý do/i });

    // Nút hành động
    this.submitButton = this.dialog.getByRole('button', { name: /Gửi.*đơn/i });
    this.backButton = this.dialog.getByRole('button', { name: 'Quay lại' });

    // Thông báo lỗi nếu có
    this.errorMessage = this.dialog.locator('span[style*="var(--negative)"]');
  }

  /**
   * Kiểm tra Sheet Đơn nghỉ phép đã mở
   */
  async expectOpen() {
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.title).toBeVisible();
    await expect(this.fromDateInput).toBeVisible();
    await expect(this.reasonInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Kiểm tra Sheet Đơn nghỉ phép đã đóng
   */
  async expectClosed() {
    await expect(this.dialog).toBeHidden({ timeout: 8000 });
  }

  /**
   * Chọn loại nghỉ phép bằng nhãn chip
   * @param {string} typeLabel ví dụ: 'Nghỉ phép năm', 'Nghỉ việc riêng', 'Nghỉ ốm'...
   */
  async selectLeaveType(typeLabel) {
    const chipBtn = this.dialog.getByRole('button', { name: typeLabel }).or(this.dialog.locator('button').filter({ hasText: typeLabel }));
    await expect(chipBtn).toBeVisible();
    await chipBtn.click();
  }

  /**
   * Điền khoảng ngày nghỉ
   * @param {string} fromDateIso YYYY-MM-DD
   * @param {string} [toDateIso] YYYY-MM-DD (nếu không truyền sẽ dùng fromDateIso)
   */
  async fillDateRange(fromDateIso, toDateIso) {
    await expect(this.fromDateInput).toBeVisible();
    await this.fromDateInput.fill(fromDateIso);

    const hasToDate = await this.toDateInput.isVisible().catch(() => false);
    if (hasToDate && toDateIso) {
      await this.toDateInput.fill(toDateIso);
    }
  }

  /**
   * Điền lý do xin nghỉ
   * @param {string} reason
   */
  async fillReason(reason) {
    await expect(this.reasonInput).toBeVisible();
    await this.reasonInput.fill(reason);
  }

  /**
   * Kiểm tra nút Gửi đơn nghỉ đang bị vô hiệu hoá
   */
  async expectSubmitDisabled() {
    await expect(this.submitButton).toBeDisabled();
  }

  /**
   * Kiểm tra nút Gửi đơn nghỉ đã sẵn sàng
   */
  async expectSubmitEnabled() {
    await expect(this.submitButton).toBeEnabled();
  }

  /**
   * Bấm nút Gửi đơn nghỉ
   */
  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  /**
   * Bấm nút Quay lại để đóng
   */
  async close() {
    await expect(this.backButton).toBeVisible();
    await this.backButton.click();
    await this.expectClosed();
  }

  /**
   * Điền đầy đủ và gửi Đơn nghỉ phép trọn gói
   * @param {object} param0
   * @param {string} [param0.typeLabel]
   * @param {string} param0.fromDate
   * @param {string} [param0.toDate]
   * @param {string} param0.reason
   */
  async submitLeaveRequest({ typeLabel, fromDate, toDate, reason }) {
    if (typeLabel) {
      await this.selectLeaveType(typeLabel);
    }
    await this.fillDateRange(fromDate, toDate || fromDate);
    await this.fillReason(reason);
    await this.submit();
  }
}
