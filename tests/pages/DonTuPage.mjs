// tests/pages/DonTuPage.mjs
// Page Object Model đại diện cho Màn hình Đơn từ (/don-tu)

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';
import { CreateRequestSheet } from './components/CreateRequestSheet.mjs';
import { AttendanceConfirmSheet } from './components/AttendanceConfirmSheet.mjs';
import { LeaveRequestSheet } from './components/LeaveRequestSheet.mjs';
import { OvertimeRequestSheet } from './components/OvertimeRequestSheet.mjs';

export class DonTuPage extends BasePage {
  constructor(page) {
    super(page);

    // Khung & Tiêu đề
    this.header = page.locator('[data-section="VBO-DT-01"]');
    this.title = page.getByRole('heading', { name: 'Đơn từ' }).or(page.getByText('Đơn từ', { exact: true }));

    // Nút "Tạo đơn" (VBO-DT-02)
    this.createSection = page.locator('[data-section="VBO-DT-02"]');
    this.createButton = this.createSection.locator('button').filter({ hasText: /Tạo.*đơn/i });

    // Khu vực "Đơn của tôi" (VBO-DT-04)
    this.myRequestsTitle = page.getByText('Đơn của tôi');
    this.myRequestsContainer = page.locator('[data-section="VBO-DT-04"]');
    this.requestCards = this.myRequestsContainer.locator('> div');

    // Các Sheets biểu mẫu con
    this.createSheet = new CreateRequestSheet(page);
    this.attendanceConfirmSheet = new AttendanceConfirmSheet(page);
    this.leaveSheet = new LeaveRequestSheet(page);
    this.overtimeSheet = new OvertimeRequestSheet(page);
  }

  /**
   * Điều hướng đến màn hình Đơn từ (/don-tu)
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/don-tu?web=thu`, { waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }

  /**
   * Điều hướng trực tiếp mở sheet Xác nhận công qua URL param
   * @param {string} baseUrl
   */
  async navigateDirectAttendanceConfirm(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/don-tu?don=xac-nhan-cong&web=thu`, { waitUntil: 'domcontentloaded' });
    await this.attendanceConfirmSheet.expectOpen();
  }

  /**
   * Kiểm tra màn hình Đơn từ đã tải đầy đủ
   */
  async expectLoaded() {
    await expect(this.header).toBeVisible({ timeout: 12000 });
    await expect(this.createButton).toBeVisible();
    await expect(this.myRequestsTitle).toBeVisible();
    await expect(this.myRequestsContainer).toBeVisible();
  }

  /**
   * Mở Sheet Tạo đơn
   */
  async openCreateSheet() {
    await expect(this.createButton).toBeVisible();
    await this.createButton.click();
    await this.createSheet.expectOpen();
  }

  /**
   * Kiểm tra trong danh sách Đơn của tôi có một đơn khớp với loại và trạng thái mong muốn
   * @param {object} param0
   * @param {string|RegExp} param0.typeTitle ví dụ: /Xác.*nhận công/i hoặc /Nghỉ.*phép/i
   * @param {string|RegExp} [param0.statusText] ví dụ: 'Chờ duyệt', 'Đã duyệt'
   * @param {string|RegExp} [param0.summarySubstr] chuỗi tóm tắt hiển thị trong card
   */
  async expectRequestCardVisible({ typeTitle, statusText, summarySubstr }) {
    await expect(this.myRequestsContainer).toBeVisible();

    let cardLocator = this.requestCards.filter({ hasText: typeTitle });
    if (summarySubstr) {
      cardLocator = cardLocator.filter({ hasText: summarySubstr });
    }

    const firstCard = cardLocator.first();
    await expect(firstCard, `Phải tìm thấy thẻ đơn loại "${typeTitle}"`).toBeVisible({ timeout: 10000 });

    if (statusText) {
      const statusChip = firstCard.locator('span').filter({ hasText: statusText });
      await expect(statusChip, `Thẻ đơn phải có trạng thái "${statusText}"`).toBeVisible();
    }
  }

  /**
   * Lấy số lượng thẻ đơn trong danh sách
   * @returns {Promise<number>}
   */
  async getRequestCount() {
    return await this.requestCards.count();
  }

  /**
   * Tải lại trang và chờ dữ liệu mới
   */
  async reload() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }
}
