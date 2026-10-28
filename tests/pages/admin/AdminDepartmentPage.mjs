// tests/pages/admin/AdminDepartmentPage.mjs
// Page Object Model đại diện cho Màn hình Quản lý Phòng ban & Hộp thoại Tạo Phòng ban (/quan-tri/#/phong-ban)
// Chuẩn hoá locators (getByRole, getByLabel, getByPlaceholder) — Tuyệt đối không dùng waitForTimeout

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class AdminDepartmentPage extends BasePage {
  constructor(page) {
    super(page);

    // Danh sách & Cây phòng ban (#/phong-ban)
    this.listTitle = page.getByRole('heading', { name: 'Phòng ban', level: 4 });
    this.addDepartmentBtn = page.getByRole('button', { name: 'Thêm phòng ban' });
    this.searchInput = page.getByPlaceholder(/Tìm theo tên phòng ban/i);
    this.departmentTable = page.getByRole('table');

    // Hộp thoại thêm/sửa phòng ban (Dialog)
    this.dialog = page.getByRole('dialog');
    this.dialogTitle = this.dialog.getByRole('heading', { level: 2 }).or(this.dialog.locator('h2'));
    this.companySelect = this.dialog.getByLabel('Công ty (pháp nhân)');
    this.nameInput = this.dialog.getByLabel('Tên phòng ban');
    this.parentSelect = this.dialog.getByLabel('Phòng cha');
    this.operationsSwitch = this.dialog.getByRole('checkbox', { name: 'Phòng Vận hành' });
    this.dialogSaveBtn = this.dialog.getByRole('button', { name: 'Lưu' });
    this.dialogCancelBtn = this.dialog.getByRole('button', { name: 'Hủy' });
  }

  /**
   * Điều hướng trực tiếp đến trang Quản lý Phòng ban
   * @param {string} baseUrl
   */
  async navigateList(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/quan-tri/#/phong-ban`, { waitUntil: 'domcontentloaded' });
    await expect(this.listTitle).toBeVisible({ timeout: 15000 });
  }

  /**
   * Mở hộp thoại "Thêm phòng ban"
   */
  async openAddDialog() {
    await expect(this.addDepartmentBtn).toBeVisible();
    await this.addDepartmentBtn.click();
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.dialogTitle).toContainText('Thêm phòng ban');
  }

  /**
   * Chọn pháp nhân công ty trong dropdown
   * @param {number|string} optionIdentifier Tên công ty hoặc index (mặc định lấy dòng đầu tiên có giá trị)
   */
  async selectCompany(optionIdentifier = 1) {
    await expect(this.companySelect).toBeVisible();
    await this.companySelect.click();

    const options = this.page.getByRole('option');
    await expect(options.first()).toBeVisible({ timeout: 5000 });

    if (typeof optionIdentifier === 'string') {
      const option = this.page.getByRole('option', { name: optionIdentifier }).first();
      await expect(option).toBeVisible();
      await option.click();
    } else {
      // Chọn theo thứ tự (index 0 là "Chưa gán công ty", index 1 là công ty đầu tiên)
      const option = options.nth(optionIdentifier);
      await expect(option).toBeVisible();
      await option.click();
    }
    // Chờ menu dropdown đóng lại mà không dùng sleep
    await expect(this.dialog).toBeVisible();
  }

  /**
   * Điền tên phòng ban mới
   * @param {string} name
   */
  async fillDepartmentName(name) {
    await expect(this.nameInput).toBeVisible();
    await this.nameInput.fill(name);
  }

  /**
   * Điền form tạo phòng ban trọn gói
   * @param {object} params
   * @param {string} params.name
   * @param {number|string} [params.companyOption]
   */
  async fillDepartmentForm({ name, companyOption = 1 }) {
    await this.selectCompany(companyOption);
    await this.fillDepartmentName(name);
  }

  /**
   * Bấm Lưu trên hộp thoại
   */
  async submitDialog() {
    await expect(this.dialogSaveBtn).toBeEnabled();
    await this.dialogSaveBtn.click();
    await expect(this.dialog).toBeHidden({ timeout: 10000 });
  }

  /**
   * Tìm kiếm phòng ban theo tên
   * @param {string} name
   */
  async searchDepartment(name) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(name);
  }

  /**
   * Kiểm tra phòng ban hiển thị trên bảng cây phòng ban
   * @param {string} name
   */
  async expectDepartmentInTable(name) {
    const row = this.departmentTable.getByRole('row').filter({ hasText: name }).first();
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  /**
   * Bấm nút Hủy để đóng hộp thoại
   */
  async closeDialog() {
    await expect(this.dialogCancelBtn).toBeVisible();
    await this.dialogCancelBtn.click();
    await expect(this.dialog).toBeHidden({ timeout: 5000 });
  }

  /**
   * Bấm Lưu và chờ thông báo lỗi xác thực form
   */
  async clickSaveExpectingError() {
    await expect(this.dialogSaveBtn).toBeEnabled();
    await this.dialogSaveBtn.click();
  }

  /**
   * Kiểm tra thông báo lỗi validation trên form phòng ban
   * @param {string} text
   */
  async expectValidationError(text) {
    const errorEl = this.dialog.locator('.MuiFormHelperText-root.Mui-error').filter({ hasText: text }).first();
    await expect(errorEl).toBeVisible();
  }
}
