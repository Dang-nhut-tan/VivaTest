// tests/pages/admin/AdminPersonnelPage.mjs
// Page Object Model đại diện cho Màn hình Quản lý Nhân sự & Hộp thoại Cho nghỉ việc (/quan-tri/#/nhan-su)
// Chuẩn hoá locators (getByRole, getByLabel, getByPlaceholder) — Tuyệt đối không dùng waitForTimeout

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class AdminPersonnelPage extends BasePage {
  constructor(page) {
    super(page);

    // Màn hình danh sách nhân sự (#/nhan-su)
    this.pageTitle = page.getByRole('heading', { name: 'Nhân sự', level: 4 });
    this.searchInput = page.getByPlaceholder(/Tìm theo tên/i).or(page.getByPlaceholder(/Tìm/i));
    this.personnelTable = page.getByRole('table');
    this.tableRows = page.getByRole('row');

    // Menu thao tác 3 chấm (PersonnelRowMenu)
    this.actionMenu = page.getByRole('menu');
    this.editMenuItem = this.actionMenu.getByRole('menuitem', { name: 'Sửa' });
    this.resignMenuItem = this.actionMenu.getByRole('menuitem', { name: 'Cho nghỉ việc' });
    this.deleteMenuItem = this.actionMenu.getByRole('menuitem', { name: 'Xoá' });

    // Hộp thoại Cho nghỉ việc (PersonnelResignDialog)
    this.resignDialog = page.getByRole('dialog');
    this.resignDialogTitle = this.resignDialog.getByRole('heading', { level: 2 }).or(this.resignDialog.locator('h2'));
    this.warningAlert = this.resignDialog.getByRole('alert').first();
    this.lastDayInput = this.resignDialog.locator('input[type="date"]').first();
    this.lastDayHelper = this.resignDialog.locator('.MuiFormHelperText-root').first();
    this.reasonInput = this.resignDialog.getByLabel(/Lý do/i);
    this.confirmResignBtn = this.resignDialog.getByRole('button', { name: 'Xác nhận cho nghỉ việc' });
    this.cancelBtn = this.resignDialog.getByRole('button', { name: 'Hủy' });
  }

  /**
   * Điều hướng trực tiếp đến trang Quản lý Nhân sự
   * @param {string} baseUrl
   */
  async navigateList(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/quan-tri/#/nhan-su`, { waitUntil: 'domcontentloaded' });
    await expect(this.pageTitle).toBeVisible({ timeout: 15000 });
    await expect(this.personnelTable).toBeVisible({ timeout: 15000 });
  }

  /**
   * Tìm kiếm nhân sự theo tên hoặc mã nhân viên
   * @param {string} keyword
   */
  async searchEmployee(keyword) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(keyword);
  }

  /**
   * Lấy dòng bảng chứa nhân sự theo tên hoặc mã
   * @param {string} nameOrCode
   */
  getEmployeeRow(nameOrCode) {
    return this.tableRows.filter({ hasText: nameOrCode }).first();
  }

  /**
   * Mở Menu thao tác (3 chấm) của dòng nhân sự
   * @param {string} nameOrCode
   */
  async openActionMenu(nameOrCode) {
    const row = this.getEmployeeRow(nameOrCode);
    await expect(row).toBeVisible({ timeout: 10000 });
    const actionBtn = row.getByRole('button', { name: 'Thao tác' });
    await expect(actionBtn).toBeVisible();
    await actionBtn.click();
    await expect(this.actionMenu).toBeVisible({ timeout: 5000 });
  }

  /**
   * Mở Hộp thoại Cho nghỉ việc từ Menu thao tác của nhân sự
   * @param {string} nameOrCode
   */
  async openResignDialog(nameOrCode) {
    await this.openActionMenu(nameOrCode);
    await expect(this.resignMenuItem).toBeVisible();
    await this.resignMenuItem.click();
    await expect(this.resignDialog).toBeVisible({ timeout: 8000 });
    await expect(this.resignDialogTitle).toContainText('Cho nghỉ việc');
  }

  /**
   * Điền lý do cho nghỉ việc
   * @param {string} reason
   */
  async fillReason(reason) {
    await expect(this.reasonInput).toBeVisible();
    await this.reasonInput.fill(reason);
  }

  /**
   * Xóa nội dung ô lý do
   */
  async clearReason() {
    await expect(this.reasonInput).toBeVisible();
    await this.reasonInput.clear();
  }

  /**
   * Thay đổi ngày làm việc cuối cùng
   * @param {string} dateStr YYYY-MM-DD
   */
  async setLastDay(dateStr) {
    await expect(this.lastDayInput).toBeVisible();
    await this.lastDayInput.fill(dateStr);
  }

  /**
   * Điền form cho nghỉ việc trọn gói
   * @param {object} params
   * @param {string} [params.lastDay]
   * @param {string} params.reason
   */
  async fillResignForm({ lastDay, reason }) {
    if (lastDay) {
      await this.setLastDay(lastDay);
    }
    if (reason !== undefined) {
      await this.fillReason(reason);
    }
  }

  /**
   * Bấm nút Xác nhận cho nghỉ việc và chờ hộp thoại đóng
   */
  async submitResign() {
    await expect(this.confirmResignBtn).toBeEnabled();
    await this.confirmResignBtn.click();
    await expect(this.resignDialog).toBeHidden({ timeout: 12000 });
  }

  /**
   * Đóng hộp thoại Cho nghỉ việc bằng nút Hủy
   */
  async closeResignDialog() {
    await expect(this.cancelBtn).toBeVisible();
    await this.cancelBtn.click();
    await expect(this.resignDialog).toBeHidden({ timeout: 5000 });
  }

  /**
   * Kiểm tra nút Xác nhận cho nghỉ việc bị vô hiệu hóa (disabled)
   */
  async expectConfirmDisabled() {
    await expect(this.confirmResignBtn).toBeDisabled();
  }

  /**
   * Kiểm tra nút Xác nhận cho nghỉ việc được kích hoạt (enabled)
   */
  async expectConfirmEnabled() {
    await expect(this.confirmResignBtn).toBeEnabled();
  }

  /**
   * Kiểm tra thông báo lỗi validation của ô ngày làm việc cuối cùng
   * @param {string} errorText
   */
  async expectDateValidationError(errorText) {
    await expect(this.lastDayHelper).toContainText(errorText);
  }

  /**
   * Đối soát trạng thái nhân sự trên bảng danh sách
   * @param {string} nameOrCode
   * @param {string} statusLabel 'Chính thức' | 'Thử việc' | 'Đã nghỉ việc'
   */
  async expectEmployeeStatus(nameOrCode, statusLabel) {
    const row = this.getEmployeeRow(nameOrCode);
    await expect(row).toBeVisible({ timeout: 10000 });
    const statusBadge = row.locator('.MuiChip-root, .MuiLabel-root, span').filter({ hasText: statusLabel }).first();
    await expect(statusBadge).toBeVisible({ timeout: 8000 });
  }

  /**
   * Kiểm tra mục "Cho nghỉ việc" trong Menu thao tác có hiển thị hay bị ẩn
   * @param {string} nameOrCode
   * @param {boolean} isVisible
   */
  async expectResignMenuItemVisible(nameOrCode, isVisible) {
    await this.openActionMenu(nameOrCode);
    if (isVisible) {
      await expect(this.resignMenuItem).toBeVisible();
    } else {
      await expect(this.resignMenuItem).toHaveCount(0);
    }
    // Đóng menu bằng cách click ra ngoài
    await this.page.keyboard.press('Escape');
  }
}
