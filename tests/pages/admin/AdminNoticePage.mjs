// tests/pages/admin/AdminNoticePage.mjs
// Page Object Model đại diện cho Màn hình Quản lý Tin nội bộ & Soạn tin mới (/quan-tri/#/tin-noi-bo)
// Chuẩn hoá locators (getByRole, getByLabel) — Tuyệt đối không dùng waitForTimeout

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class AdminNoticePage extends BasePage {
  constructor(page) {
    super(page);

    // Danh sách Tin nội bộ (#/tin-noi-bo)
    this.pageTitle = page.getByRole('heading', { name: /Tin nội bộ/i, level: 4 });
    this.createNoticeBtn = page.getByRole('button', { name: 'Soạn tin mới' });
    this.noticeTable = page.getByRole('table');
    this.tableRows = page.getByRole('row');

    // Bộ lọc chuyên mục tại trang danh sách
    this.filterCategorySelect = page.locator('[data-section="VADM-AD-17-01"]').locator('.MuiSelect-select');

    // Hộp thoại Soạn / Sửa tin (Dialog VADM-AD-17-02)
    this.dialog = page.getByRole('dialog');
    this.dialogTitle = this.dialog.getByRole('heading', { level: 2 }).or(this.dialog.locator('h2'));
    this.categorySelect = this.dialog.locator('.MuiSelect-select').first();
    this.titleInput = this.dialog.getByLabel('Tiêu đề');
    this.bodyInput = this.dialog.getByLabel('Nội dung');
    this.variantSelect = this.dialog.getByLabel('Loại tin');
    this.pinSwitch = this.dialog.getByRole('checkbox', { name: /Ghim lên đầu/i });
    this.dialogSaveBtn = this.dialog.getByRole('button', { name: 'Lưu' });
    this.dialogCancelBtn = this.dialog.getByRole('button', { name: 'Hủy' });
  }

  /**
   * Điều hướng trực tiếp đến trang Quản lý Tin nội bộ
   * @param {string} baseUrl
   */
  async navigateList(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/quan-tri/#/tin-noi-bo`, { waitUntil: 'domcontentloaded' });
    await expect(this.pageTitle).toBeVisible({ timeout: 15000 });
  }

  /**
   * Mở hộp thoại "Soạn tin mới"
   */
  async openCreateDialog() {
    await expect(this.createNoticeBtn).toBeVisible();
    await this.createNoticeBtn.click();
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.dialogTitle).toContainText('Soạn tin mới');
  }

  /**
   * Chọn Chuyên mục trong Dialog soạn tin
   * @param {string} categoryLabel Ví dụ: 'Văn hoá', 'Đào tạo', 'Sự kiện', 'Nhân sự'
   */
  async selectCategory(categoryLabel) {
    await expect(this.categorySelect).toBeVisible();
    await this.categorySelect.click();

    const option = this.page.getByRole('option', { name: categoryLabel }).first();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await expect(option).toBeHidden({ timeout: 5000 });
  }

  /**
   * Điền tiêu đề bài tin
   * @param {string} title
   */
  async fillTitle(title) {
    await expect(this.titleInput).toBeVisible();
    await this.titleInput.fill(title);
  }

  /**
   * Điền nội dung bài tin
   * @param {string} body
   */
  async fillBody(body) {
    await expect(this.bodyInput).toBeVisible();
    await this.bodyInput.fill(body);
  }

  /**
   * Bật/tắt ghim bài tin lên đầu
   * @param {boolean} enable
   */
  async setPin(enable = true) {
    await expect(this.pinSwitch).toBeVisible();
    const isChecked = await this.pinSwitch.isChecked();
    if (isChecked !== enable) {
      await this.pinSwitch.click();
    }
  }

  /**
   * Điền toàn bộ thông tin bài tin trong Hộp thoại Soạn tin
   * @param {object} params
   * @param {string} [params.category] 'Văn hoá' | 'Đào tạo' | 'Sự kiện' | 'Nhân sự'
   * @param {string} params.title
   * @param {string} [params.body]
   * @param {boolean} [params.isPinned]
   */
  async fillNoticeForm({ category, title, body, isPinned = false }) {
    if (category) {
      await this.selectCategory(category);
    }
    await this.fillTitle(title);
    if (body) {
      await this.fillBody(body);
    }
    if (isPinned) {
      await this.setPin(true);
    }
  }

  /**
   * Bấm Lưu trên Hộp thoại và chờ hộp thoại đóng lại
   */
  async submitDialog() {
    await expect(this.dialogSaveBtn).toBeEnabled();
    await this.dialogSaveBtn.click();
    await expect(this.dialog).toBeHidden({ timeout: 12000 });
  }

  /**
   * Lọc danh sách tin theo chuyên mục trên bảng
   * @param {string} categoryLabel 'Tất cả' | 'Văn hoá' | 'Đào tạo' | 'Sự kiện' | 'Nhân sự'
   */
  async filterCategory(categoryLabel) {
    await expect(this.filterCategorySelect).toBeVisible();
    await this.filterCategorySelect.click();

    const option = this.page.getByRole('option', { name: categoryLabel }).first();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await expect(option).toBeHidden({ timeout: 5000 });
  }

  /**
   * Lấy hàng chứa tiêu đề bài tin
   * @param {string} title
   */
  getNoticeRow(title) {
    return this.tableRows.filter({ hasText: title }).first();
  }

  /**
   * Xác nhận bài tin hiển thị trong bảng
   * @param {string} title
   */
  async expectNoticeInTable(title) {
    const row = this.getNoticeRow(title);
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  /**
   * Kiểm tra thông tin chi tiết của hàng bài tin (Chuyên mục, Ghim)
   * @param {string} title
   * @param {object} options
   * @param {string} [options.category]
   * @param {boolean} [options.isPinned]
   */
  async expectNoticeDetails(title, { category, isPinned = false } = {}) {
    const row = this.getNoticeRow(title);
    await expect(row).toBeVisible();
    if (category) {
      await expect(row).toContainText(category);
    }
    if (isPinned) {
      const pinBadge = row.locator('span, .MuiChip-root').filter({ hasText: 'Ghim' }).first();
      await expect(pinBadge).toBeVisible();
    }
  }

  /**
   * Đóng hộp thoại soạn tin bằng nút Hủy
   */
  async closeDialog() {
    await expect(this.dialogCancelBtn).toBeVisible();
    await this.dialogCancelBtn.click();
    await expect(this.dialog).toBeHidden({ timeout: 5000 });
  }

  /**
   * Kiểm tra nút Lưu bị vô hiệu hóa (Disabled)
   */
  async expectSaveDisabled() {
    await expect(this.dialogSaveBtn).toBeDisabled();
  }

  /**
   * Kiểm tra nút Lưu được bật (Enabled)
   */
  async expectSaveEnabled() {
    await expect(this.dialogSaveBtn).toBeEnabled();
  }

  /**
   * Xóa sạch nội dung ô Tiêu đề
   */
  async clearTitle() {
    await this.titleInput.clear();
  }

  /**
   * Lấy giá trị hiện tại của ô Tiêu đề
   * @returns {Promise<string>}
   */
  async getTitleValue() {
    return await this.titleInput.inputValue();
  }
}
