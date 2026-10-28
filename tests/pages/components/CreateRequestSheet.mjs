// tests/pages/components/CreateRequestSheet.mjs
// Component Object Model đại diện cho Sheet "Tạo đơn" (VBO-DT-11)

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class CreateRequestSheet extends BasePage {
  constructor(page) {
    super(page);

    this.dialog = page.getByRole('dialog').filter({ hasText: 'Chọn loại đơn bạn muốn gửi' });
    this.sheetTitle = this.dialog.getByRole('heading', { name: 'Tạo đơn' }).or(this.dialog.getByText('Tạo đơn', { exact: true }));

    // Các nút chọn loại đơn bên trong dialog
    this.leaveRequestBtn = this.dialog.locator('button').filter({ hasText: /Nghỉ.*phép/i });
    this.attendanceConfirmBtn = this.dialog.locator('button').filter({ hasText: /Xác.*nhận công/i });
    this.shiftSwapBtn = this.dialog.locator('button').filter({ hasText: /Đổi.*ca/i });
    this.saturdaySwapBtn = this.dialog.locator('button').filter({ hasText: /Đổi.*lịch.*thứ.*7/i });
    this.overtimeBtn = this.dialog.locator('button').filter({ hasText: /Tăng.*ca/i });
    this.advanceSalaryBtn = this.dialog.locator('button').filter({ hasText: /Ứng.*lương/i });
    this.locationChangeBtn = this.dialog.locator('button').filter({ hasText: /Đổi.*địa.*điểm/i });

    // Nút đóng sheet
    this.closeButton = this.dialog.locator('button[aria-label="Đóng"]').or(this.dialog.locator('button').filter({ hasText: /Đóng/i }));
  }

  /**
   * Kiểm tra Sheet Tạo đơn đã mở và hiển thị danh mục loại đơn
   */
  async expectOpen() {
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.leaveRequestBtn).toBeVisible();
    await expect(this.attendanceConfirmBtn).toBeVisible();
  }

  /**
   * Kiểm tra Sheet đã đóng
   */
  async expectClosed() {
    await expect(this.dialog).toBeHidden({ timeout: 8000 });
  }

  /**
   * Chọn loại đơn "Nghỉ phép"
   */
  async selectLeaveRequest() {
    await expect(this.leaveRequestBtn).toBeVisible();
    await this.leaveRequestBtn.click();
    await this.expectClosed();
  }

  /**
   * Chọn loại đơn "Xác nhận công" (Bổ sung công)
   */
  async selectAttendanceConfirm() {
    await expect(this.attendanceConfirmBtn).toBeVisible();
    await this.attendanceConfirmBtn.click();
    await this.expectClosed();
  }

  /**
   * Chọn loại đơn "Tăng ca"
   */
  async selectOvertime() {
    await expect(this.overtimeBtn).toBeVisible();
    await this.overtimeBtn.click();
    await this.expectClosed();
  }

  /**
   * Đóng sheet
   */
  async close() {
    if (await this.closeButton.isVisible()) {
      await this.closeButton.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.expectClosed();
  }
}
