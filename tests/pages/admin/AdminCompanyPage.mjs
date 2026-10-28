// tests/pages/admin/AdminCompanyPage.mjs
// Page Object Model đại diện cho Màn hình Quản lý Công ty & Hộp thoại Tạo/Sửa/Xoá Công ty (/quan-tri/#/cong-ty)
// Chuẩn hoá locators (getByRole, getByLabel, getByPlaceholder, getByText) — Tuyệt đối không dùng waitForTimeout

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class AdminCompanyPage extends BasePage {
  constructor(page) {
    super(page);

    // Danh sách công ty (#/cong-ty)
    this.listTitle = page.getByRole('heading', { name: 'Công ty', level: 4 });
    this.addCompanyBtn = page.getByRole('button', { name: 'Thêm công ty' });
    this.searchInput = page.getByPlaceholder(/Tìm theo mã hoặc tên công ty/i);
    this.companyTable = page.getByRole('table');
    this.emptyState = page.getByText('Không tìm thấy công ty phù hợp');

    // Hộp thoại thêm / sửa công ty (CompanyFormDialog)
    this.formDialog = page.getByRole('dialog');
    this.dialogTitle = this.formDialog.getByRole('heading', { level: 2 }).or(this.formDialog.locator('h2'));
    this.codeInput = this.formDialog.getByLabel('Mã công ty');
    this.nameInput = this.formDialog.getByLabel('Tên công ty (pháp nhân)');
    this.taxCodeInput = this.formDialog.getByLabel('Mã số thuế');
    this.activeSwitch = this.formDialog.getByRole('checkbox', { name: 'Đang hoạt động' });
    this.dialogSaveBtn = this.formDialog.getByRole('button', { name: 'Lưu' });
    this.dialogCancelBtn = this.formDialog.getByRole('button', { name: 'Hủy' });

    // Hộp thoại xác nhận xoá công ty (CompanyDeleteDialog / ConfirmDialog)
    this.deleteDialog = page.getByRole('dialog');
    this.deleteConfirmBtn = this.deleteDialog.getByRole('button', { name: 'Xác nhận' });
    this.deleteCancelBtn = this.deleteDialog.getByRole('button', { name: 'Hủy' });
    this.deleteContent = this.deleteDialog.locator('.MuiDialogContent-root');
  }

  /**
   * Điều hướng trực tiếp đến trang Quản lý Công ty
   * @param {string} baseUrl
   */
  async navigateList(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/quan-tri/#/cong-ty`, { waitUntil: 'domcontentloaded' });
    await expect(this.listTitle).toBeVisible({ timeout: 15000 });
  }

  /**
   * Mở hộp thoại "Thêm công ty"
   */
  async openAddDialog() {
    await expect(this.addCompanyBtn).toBeVisible({ timeout: 10000 });
    await this.addCompanyBtn.click();
    await expect(this.formDialog).toBeVisible({ timeout: 8000 });
    await expect(this.dialogTitle).toContainText('Thêm công ty');
  }

  /**
   * Điền mã công ty
   * @param {string} code
   */
  async fillCode(code) {
    await expect(this.codeInput).toBeVisible();
    await this.codeInput.fill(code);
  }

  /**
   * Điền tên công ty
   * @param {string} name
   */
  async fillName(name) {
    await expect(this.nameInput).toBeVisible();
    await this.nameInput.fill(name);
  }

  /**
   * Điền mã số thuế
   * @param {string} taxCode
   */
  async fillTaxCode(taxCode) {
    await expect(this.taxCodeInput).toBeVisible();
    await this.taxCodeInput.fill(taxCode);
  }

  /**
   * Thiết lập trạng thái đang hoạt động
   * @param {boolean} active
   */
  async setActive(active) {
    const isChecked = await this.activeSwitch.isChecked();
    if (isChecked !== active) {
      await this.activeSwitch.click();
    }
  }

  /**
   * Điền form công ty trọn gói
   * @param {object} params
   * @param {string} [params.code]
   * @param {string} params.name
   * @param {string} [params.taxCode]
   * @param {boolean} [params.isActive]
   */
  async fillCompanyForm({ code, name, taxCode, isActive = true }) {
    if (code !== undefined) {
      await this.fillCode(code);
    }
    await this.fillName(name);
    if (taxCode !== undefined) {
      await this.fillTaxCode(taxCode);
    }
    await this.setActive(isActive);
  }

  /**
   * Bấm Lưu trên form và chờ hộp thoại đóng thành công
   */
  async submitForm() {
    await expect(this.dialogSaveBtn).toBeEnabled();
    await this.dialogSaveBtn.click();
    await expect(this.formDialog).toBeHidden({ timeout: 10000 });
  }

  /**
   * Bấm Lưu và chờ lỗi validation (không đóng hộp thoại)
   */
  async clickSaveExpectingError() {
    await expect(this.dialogSaveBtn).toBeEnabled();
    await this.dialogSaveBtn.click();
  }

  /**
   * Bấm Hủy trên form
   */
  async closeForm() {
    await expect(this.dialogCancelBtn).toBeVisible();
    await this.dialogCancelBtn.click();
    await expect(this.formDialog).toBeHidden({ timeout: 5000 });
  }

  /**
   * Kiểm tra thông báo lỗi validation trên form
   * @param {string} text
   */
  async expectValidationError(text) {
    const errorEl = this.formDialog.locator('.MuiFormHelperText-root.Mui-error').filter({ hasText: text }).first();
    await expect(errorEl).toBeVisible({ timeout: 5000 });
  }

  /**
   * Tìm kiếm công ty theo từ khóa (mã hoặc tên)
   * @param {string} keyword
   */
  async searchCompany(keyword) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(keyword);
  }

  /**
   * Lấy dòng công ty trong bảng theo mã hoặc tên
   * @param {string} codeOrName
   */
  getCompanyRow(codeOrName) {
    return this.companyTable.getByRole('row').filter({ hasText: codeOrName }).first();
  }

  /**
   * Mở hộp thoại "Sửa công ty" từ dòng tương ứng
   * @param {string} codeOrName
   */
  async openEditDialog(codeOrName) {
    const row = this.getCompanyRow(codeOrName);
    await expect(row).toBeVisible({ timeout: 8000 });

    const editBtn = row.getByRole('button', { name: 'Sửa' }).or(row.locator('td').last().getByRole('button').first());
    await expect(editBtn).toBeVisible();
    await editBtn.click();

    await expect(this.formDialog).toBeVisible({ timeout: 8000 });
    await expect(this.dialogTitle).toContainText('Sửa công ty');
  }

  /**
   * Mở hộp thoại "Xoá công ty" từ dòng tương ứng
   * @param {string} codeOrName
   */
  async openDeleteDialog(codeOrName) {
    const row = this.getCompanyRow(codeOrName);
    await expect(row).toBeVisible({ timeout: 8000 });

    const deleteBtn = row.getByRole('button', { name: 'Xóa' }).or(row.locator('td').last().getByRole('button').last());
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    await expect(this.deleteDialog).toBeVisible({ timeout: 8000 });
    await expect(this.deleteDialog.getByRole('heading', { level: 2 })).toContainText('Xoá công ty');
  }

  /**
   * Xác nhận xoá công ty trong hộp thoại xác nhận
   */
  async confirmDelete() {
    await expect(this.deleteConfirmBtn).toBeEnabled();
    await this.deleteConfirmBtn.click();
    await expect(this.deleteDialog).toBeHidden({ timeout: 10000 });
  }

  /**
   * Huỷ thao tác xoá công ty
   */
  async cancelDelete() {
    await expect(this.deleteCancelBtn).toBeVisible();
    await this.deleteCancelBtn.click();
    await expect(this.deleteDialog).toBeHidden({ timeout: 5000 });
  }

  /**
   * Kiểm tra công ty hiển thị trên bảng danh sách
   * @param {string} codeOrName
   */
  async expectCompanyInTable(codeOrName) {
    const row = this.getCompanyRow(codeOrName);
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  /**
   * Kiểm tra công ty không hiển thị trên bảng danh sách (đã bị xoá)
   * @param {string} codeOrName
   */
  async expectCompanyNotInTable(codeOrName) {
    const row = this.getCompanyRow(codeOrName);
    await expect(row).toBeHidden({ timeout: 10000 });
  }

  /**
   * Kiểm tra mã số thuế hiển thị trên dòng công ty
   * @param {string} codeOrName
   * @param {string} taxCode
   */
  async expectTaxCodeInRow(codeOrName, taxCode) {
    const row = this.getCompanyRow(codeOrName);
    await expect(row).toContainText(taxCode);
  }

  /**
   * Kiểm tra trạng thái hoạt động hiển thị trên dòng công ty
   * @param {string} codeOrName
   * @param {'Đang hoạt động'|'Ngừng'} statusText
   */
  async expectStatusInRow(codeOrName, statusText) {
    const row = this.getCompanyRow(codeOrName);
    await expect(row).toContainText(statusText);
  }
}
