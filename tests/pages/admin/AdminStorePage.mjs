// tests/pages/admin/AdminStorePage.mjs
// Page Object Model đại diện cho Màn hình Quản lý Quán & Tạo Quán (/quan-tri/#/quan)
// Chuẩn hoá locators (getByRole, getByLabel, getByPlaceholder) — Tuyệt đối không dùng waitForTimeout

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class AdminStorePage extends BasePage {
  constructor(page) {
    super(page);

    // Danh sách quán (#/quan)
    this.listTitle = page.getByRole('heading', { name: /Quán & toạ độ/i, level: 4 });
    this.createStoreLink = page.getByRole('link', { name: 'Thêm quán' });
    this.searchInput = page.getByPlaceholder(/Tìm kiếm/i);
    this.storeTable = page.getByRole('table');

    // Form thêm quán (#/quan/moi)
    this.createTitle = page.getByRole('heading', { level: 4, name: 'Thêm quán' }).or(page.getByText('Thêm quán'));
    this.nameInput = page.getByLabel('Tên quán').or(page.locator('input[name="name"]'));
    this.addressInput = page.getByLabel('Địa chỉ').or(page.locator('input[name="address"]'));
    this.radiusInput = page.getByLabel('Bán kính').or(page.locator('input[name="radiusM"]'));
    this.pasteCoordInput = page.getByLabel('Dán toạ độ từ Google Maps');
    this.readCoordBtn = page.getByRole('button', { name: 'Đọc toạ độ' });
    this.saveButton = page.getByRole('button', { name: 'Lưu' });
    this.cancelButton = page.getByRole('button', { name: 'Hủy' });
  }

  /**
   * Điều hướng trực tiếp đến Danh sách quán
   * @param {string} baseUrl
   */
  async navigateList(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/quan-tri/#/quan`, { waitUntil: 'domcontentloaded' });
    await expect(this.listTitle).toBeVisible({ timeout: 15000 });
  }

  /**
   * Điều hướng trực tiếp đến Form Thêm quán mới
   * @param {string} baseUrl
   */
  async navigateCreate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/quan-tri/#/quan/moi`, { waitUntil: 'domcontentloaded' });
    await expect(this.nameInput).toBeVisible({ timeout: 15000 });
  }

  /**
   * Bấm nút "Thêm quán" từ trang danh sách
   */
  async clickCreate() {
    await expect(this.createStoreLink).toBeVisible();
    await this.createStoreLink.click();
    await expect(this.nameInput).toBeVisible({ timeout: 10000 });
  }

  /**
   * Điền thông tin vào form tạo quán
   * @param {object} params
   * @param {string} params.name
   * @param {string} params.address
   * @param {number} [params.radius]
   * @param {string} [params.coordinates]
   */
  async fillStoreForm({ name, address, radius, coordinates }) {
    await expect(this.nameInput).toBeVisible();
    await this.nameInput.fill(name);

    await expect(this.addressInput).toBeVisible();
    await this.addressInput.fill(address);

    if (radius) {
      await expect(this.radiusInput).toBeVisible();
      await this.radiusInput.fill(radius.toString());
    }

    if (coordinates) {
      await expect(this.pasteCoordInput).toBeVisible();
      await this.pasteCoordInput.fill(coordinates);
      await this.readCoordBtn.click();
    }
  }

  /**
   * Bấm Lưu form tạo quán
   */
  async submit() {
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
    await expect(this.page).toHaveURL(/.*#\/quan(?!\/moi)/, { timeout: 15000 });
  }

  /**
   * Tìm kiếm quán trên danh sách
   * @param {string} name
   */
  async searchStore(name) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(name);
  }

  /**
   * Kiểm tra quán hiển thị trong bảng danh sách
   * @param {string} name
   */
  async expectStoreInTable(name) {
    const row = this.storeTable.getByRole('row').filter({ hasText: name });
    await expect(row).toBeVisible({ timeout: 10000 });
  }

  /**
   * Thay đổi giá trị bán kính chấm công
   * @param {number|string} value
   */
  async setRadius(value) {
    await expect(this.radiusInput).toBeVisible();
    await this.radiusInput.fill(value.toString());
  }

  /**
   * Bấm Lưu form và chờ lỗi validation (không chuyển trang)
   */
  async clickSaveExpectingError() {
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
  }

  /**
   * Kiểm tra thông báo lỗi validation trên form quán
   * @param {string} text
   */
  async expectValidationError(text) {
    const errorEl = this.page.locator('.MuiFormHelperText-root.Mui-error').filter({ hasText: text }).first();
    await expect(errorEl).toBeVisible();
  }
}
