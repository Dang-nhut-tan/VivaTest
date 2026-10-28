// tests/pages/components/AttendanceConfirmSheet.mjs
// Component Object Model đại diện cho Sheet "Đơn xác nhận công" (VBO-DT-10)

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class AttendanceConfirmSheet extends BasePage {
  constructor(page) {
    super(page);

    // Dialog bao phủ toàn bộ Sheet
    this.dialog = page.getByRole('dialog').filter({ hasText: 'Đơn xác nhận công' });
    this.title = this.dialog.getByText('Đơn xác nhận công', { exact: false });

    // Trường ngày xác nhận
    this.dateInput = this.dialog.locator('input[type="date"]');

    // Nhóm radio lý do xác nhận công
    this.reasonRadios = this.dialog.locator('input[type="radio"][name="xac-nhan-cong-ly-do"]');

    // Khu vực giờ thực tế (VBO-DT-14)
    this.timeSection = this.dialog.locator('[data-section="VBO-DT-14"]');
    this.timeInInput = this.timeSection.locator('> div > div').filter({ hasText: /Giờ vào thực tế/i }).locator('input[type="time"]');
    this.timeOutInput = this.timeSection.locator('> div > div').filter({ hasText: /Giờ ra thực tế/i }).locator('input[type="time"]');

    // Cảnh báo hướng dẫn / validation thiếu mốc giờ
    this.missingTimeAlert = this.dialog.locator('div[style*="font-size: 12"]').or(this.dialog.locator('text=/thì phải điền/i'));

    // Trường mô tả chi tiết
    this.detailsTextarea = this.dialog.locator('textarea');

    // Nút hành động
    this.submitButton = this.dialog.getByRole('button', { name: /Gửi.*quản lý/i });
    this.laterButton = this.dialog.getByRole('button', { name: 'Để sau' });

    // Khối báo lỗi gửi từ máy chủ
    this.serverErrorAlert = this.dialog.locator('div[style*="var(--negative-soft)"]');
  }

  /**
   * Kiểm tra Sheet Xác nhận công đã mở
   */
  async expectOpen() {
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.title).toBeVisible();
    await expect(this.dateInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Kiểm tra Sheet Xác nhận công đã đóng
   */
  async expectClosed() {
    await expect(this.dialog).toBeHidden({ timeout: 8000 });
  }

  /**
   * Điền ngày cần xác nhận (định dạng YYYY-MM-DD)
   * @param {string} dateIso
   */
  async fillDate(dateIso) {
    await expect(this.dateInput).toBeVisible();
    await this.dateInput.fill(dateIso);
  }

  /**
   * Chọn lý do xác nhận công
   * @param {string} reasonCodeOrLabel ví dụ: 'QUEN_CHAM_VAO', 'Quên chấm công vào', 'APP_LOI', 'App lỗi'...
   */
  async selectReason(reasonCodeOrLabel) {
    const labelMapping = {
      QUEN_CHAM_VAO: 'Quên chấm công vào',
      QUEN_CHAM_RA: 'Quên chấm công ra',
      CHAM_RA_SOM: 'Bấm nhầm — chấm ra sớm',
      APP_LOI: 'App lỗi / máy không chấm được',
      SAU_NUA_DEM: 'Ca vắt đêm, chấm sau 00:00',
      DI_TRE: 'Đi trễ',
      VE_SOM: 'Về sớm',
    };

    const targetText = labelMapping[reasonCodeOrLabel] || reasonCodeOrLabel;
    const radioLabel = this.dialog.locator('label').filter({ hasText: targetText });
    await expect(radioLabel).toBeVisible();
    await radioLabel.click();
  }

  /**
   * Điền giờ vào thực tế (HH:mm)
   * @param {string} timeIn
   */
  async fillTimeIn(timeIn) {
    await expect(this.timeInInput).toBeVisible();
    await this.timeInInput.fill(timeIn);
  }

  /**
   * Điền giờ ra thực tế (HH:mm)
   * @param {string} timeOut
   */
  async fillTimeOut(timeOut) {
    await expect(this.timeOutInput).toBeVisible();
    await this.timeOutInput.fill(timeOut);
  }

  /**
   * Điền nội dung chi tiết lý do
   * @param {string} note
   */
  async fillDetails(note) {
    await expect(this.detailsTextarea).toBeVisible();
    await this.detailsTextarea.fill(note);
  }

  /**
   * Kiểm tra nút Gửi quản lý đang bị vô hiệu hoá (disabled)
   */
  async expectSubmitDisabled() {
    await expect(this.submitButton).toBeDisabled();
  }

  /**
   * Kiểm tra nút Gửi quản lý đã sẵn sàng (enabled)
   */
  async expectSubmitEnabled() {
    await expect(this.submitButton).toBeEnabled();
  }

  /**
   * Kiểm tra cảnh báo thiếu mốc giờ hiển thị đúng
   * @param {string|RegExp} pattern
   */
  async expectMissingTimeWarning(pattern) {
    if (pattern) {
      await expect(this.missingTimeAlert).toContainText(pattern);
    } else {
      await expect(this.missingTimeAlert).toBeVisible();
    }
  }

  /**
   * Bấm nút Gửi quản lý
   */
  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  /**
   * Bấm nút Để sau (Huỷ/Đóng)
   */
  async close() {
    await expect(this.laterButton).toBeVisible();
    await this.laterButton.click();
    await this.expectClosed();
  }

  /**
   * Điền đầy đủ và gửi Đơn xác nhận công trọn gói
   * @param {object} param0
   * @param {string} [param0.date]
   * @param {string} param0.reason
   * @param {string} [param0.timeIn]
   * @param {string} [param0.timeOut]
   * @param {string} param0.note
   */
  async submitAttendanceConfirm({ date, reason, timeIn, timeOut, note }) {
    if (date) {
      await this.fillDate(date);
    }
    await this.selectReason(reason);
    if (timeIn && await this.timeInInput.isVisible()) {
      await this.fillTimeIn(timeIn);
    }
    if (timeOut && await this.timeOutInput.isVisible()) {
      await this.fillTimeOut(timeOut);
    }
    if (note) {
      await this.fillDetails(note);
    }
    await this.submit();
  }
}
