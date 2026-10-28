// tests/pages/BangCongPage.mjs
// Page Object Model đại diện cho Màn hình Bảng công (/bang-cong) trên VivaOffice App

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';
import { TimesheetDayDetailSheet } from './components/TimesheetDayDetailSheet.mjs';
import { PayExplainSheet } from './components/PayExplainSheet.mjs';

export class BangCongPage extends BasePage {
  constructor(page) {
    super(page);

    // Header & điều hướng trên cùng (VBO-BC-01)
    this.header = page.locator('[data-section="VBO-BC-01"]');
    this.backButton = page.getByRole('button', { name: 'Quay lại' });
    this.explainButton = page.getByRole('button', { name: 'Cách tính công' });

    // Thanh chọn kỳ công & trạng thái (VBO-BC-02)
    this.periodNav = page.locator('[data-section="VBO-BC-02"]');
    this.prevPeriodBtn = page.getByRole('button', { name: 'Kỳ trước' });
    this.nextPeriodBtn = page.getByRole('button', { name: 'Kỳ sau' });

    // Thẻ tổng cuối kỳ (VBO-BC-03 & VBO-BC-05)
    this.summaryCard = page.locator('[data-section="VBO-BC-03"]');
    this.overtimeBand = page.locator('[data-section="VBO-BC-05"]');

    // Lưới lịch chấm công (VBO-BC-04)
    this.calendarGrid = page.locator('[data-section="VBO-BC-04"]');

    // Sheets con
    this.dayDetailSheet = new TimesheetDayDetailSheet(page);
    this.payExplainSheet = new PayExplainSheet(page);
  }

  /**
   * Điều hướng trực tiếp đến màn hình Bảng công
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/bang-cong?web=thu`, { waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }

  /**
   * Kiểm tra màn hình Bảng công đã tải thành công các khối dữ liệu
   */
  async expectLoaded() {
    await expect(this.header).toBeVisible({ timeout: 15000 });
    await expect(this.periodNav).toBeVisible({ timeout: 10000 });
    await expect(this.summaryCard).toBeVisible({ timeout: 10000 });
  }

  /**
   * Kiểm tra lưới lịch chấm công hiển thị khi kỳ có dữ liệu
   */
  async expectCalendarGrid() {
    await expect(this.calendarGrid).toBeVisible({ timeout: 10000 });
  }

  /**
   * Kiểm tra thông tin kỳ công hiển thị chứa nhãn hoặc khoảng ngày mong đợi
   * @param {string|RegExp} pattern
   */
  async expectPeriodContains(pattern) {
    await expect(this.periodNav).toContainText(pattern);
  }

  /**
   * Lấy toàn bộ văn bản của khối chọn kỳ công (nhãn kỳ, khoảng ngày, trạng thái)
   * @returns {Promise<string>}
   */
  async getPeriodText() {
    return (await this.periodNav.innerText()).trim();
  }

  /**
   * Bấm chuyển về kỳ công trước đó
   */
  async goToPrevPeriod() {
    await expect(this.prevPeriodBtn).toBeVisible();
    const oldText = await this.getPeriodText();
    await this.prevPeriodBtn.click();
    // Chờ kỳ công thay đổi nội dung mà không dùng waitForTimeout
    await expect(this.periodNav).not.toHaveText(oldText, { timeout: 6000 }).catch(() => {});
  }

  /**
   * Bấm chuyển sang kỳ công tiếp theo
   */
  async goToNextPeriod() {
    await expect(this.nextPeriodBtn).toBeVisible();
    const oldText = await this.getPeriodText();
    await this.nextPeriodBtn.click();
    // Chờ kỳ công thay đổi nội dung mà không dùng waitForTimeout
    await expect(this.periodNav).not.toHaveText(oldText, { timeout: 6000 }).catch(() => {});
  }

  /**
   * Kiểm tra thẻ KPI tổng kết hiển thị các chỉ số công (ngày công, giờ thường,...)
   * @param {string|RegExp} pattern
   */
  async expectSummaryContains(pattern) {
    await expect(this.summaryCard).toContainText(pattern);
  }

  /**
   * Lấy phần tử ô ngày trên lưới lịch theo số ngày (VD: ngày 16)
   * @param {number|string} dayNumber
   */
  getDayCell(dayNumber) {
    return this.calendarGrid.getByRole('button', { name: new RegExp(`^Ngày\\s+${dayNumber},`) });
  }

  /**
   * Bấm vào ô ngày trên lưới lịch để mở Sheet chi tiết ngày
   * @param {number|string} dayNumber
   */
  async clickDayCell(dayNumber) {
    const cell = this.getDayCell(dayNumber);
    await expect(cell).toBeVisible({ timeout: 6000 });
    await cell.click();
  }

  /**
   * Mở sheet "Cách tính ngày công" từ header
   */
  async openPayExplain() {
    await expect(this.explainButton).toBeVisible();
    await this.explainButton.click();
    await this.payExplainSheet.expectOpen();
  }
}
