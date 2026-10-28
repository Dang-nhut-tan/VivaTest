// tests/pages/ProfilePage.mjs
// Page Object Model đại diện cho Màn hình Hồ sơ nhân viên (/ho-so)

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';
import { UpdateContactSheet } from './components/UpdateContactSheet.mjs';
import { UpdateBankSheet } from './components/UpdateBankSheet.mjs';

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);

    // Khung & Thẻ nhận diện
    this.header = page.locator('[data-section="VBO-HS-01"]');
    this.heroCard = page.locator('[data-section="VBO-HS-02"]');

    // Thẻ Thông tin liên hệ (VBO-HS-04)
    this.contactCard = page.locator('[data-section="VBO-HS-04"]');
    this.contactUpdateBtn = this.contactCard.getByRole('button', { name: 'Yêu cầu cập nhật' });
    this.contactPendingBadge = this.contactCard.getByText('Chờ duyệt');

    // Thẻ Tài khoản ngân hàng (VBO-HS-14)
    this.bankCard = page.locator('[data-section="VBO-HS-14"]');
    this.bankUpdateBtn = this.bankCard.getByRole('button', { name: 'Yêu cầu cập nhật' });
    this.bankPendingBadge = this.bankCard.getByText('Chờ duyệt');

    // Các thành phần popup/sheet con
    this.contactSheet = new UpdateContactSheet(page);
    this.bankSheet = new UpdateBankSheet(page);
  }

  /**
   * Điều hướng trực tiếp đến màn hình Hồ sơ
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/ho-so?web=thu`, { waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }

  /**
   * Kiểm tra màn hình Hồ sơ đã tải thành công
   */
  async expectLoaded() {
    await expect(this.header).toBeVisible({ timeout: 12000 });
    await expect(this.contactCard).toBeVisible();
    await expect(this.bankCard).toBeVisible();
  }

  /**
   * Kiểm tra số điện thoại hiển thị trên thẻ Liên hệ
   * @param {string} expectedPhone
   */
  async expectPhoneDisplayed(expectedPhone) {
    await expect(this.contactCard.getByText(expectedPhone)).toBeVisible();
  }

  /**
   * Kiểm tra số tài khoản ngân hàng hiển thị trên thẻ Ngân hàng
   * @param {string} expectedAccount
   */
  async expectBankAccountDisplayed(expectedAccount) {
    await expect(this.bankCard.getByText(expectedAccount)).toBeVisible();
  }

  /**
   * Mở Sheet cập nhật liên hệ
   */
  async openContactUpdate() {
    await this.contactCard.scrollIntoViewIfNeeded();
    await expect(this.contactUpdateBtn).toBeVisible();
    await this.contactUpdateBtn.click();
    await this.contactSheet.expectOpen();
  }

  /**
   * Mở Sheet cập nhật ngân hàng
   */
  async openBankUpdate() {
    await this.bankCard.scrollIntoViewIfNeeded();
    await expect(this.bankUpdateBtn).toBeVisible();
    await this.bankUpdateBtn.click();
    await this.bankSheet.expectOpen();
  }

  /**
   * Kiểm tra nhãn "Chờ duyệt" xuất hiện trong thẻ Liên hệ
   */
  async expectContactPendingBadgeVisible() {
    await expect(this.contactPendingBadge.first()).toBeVisible({ timeout: 8000 });
  }

  /**
   * Kiểm tra nhãn "Chờ duyệt" xuất hiện trong thẻ Ngân hàng
   */
  async expectBankPendingBadgeVisible() {
    await expect(this.bankPendingBadge.first()).toBeVisible({ timeout: 8000 });
  }

  /**
   * Kiểm tra KHÔNG CÒN nhãn "Chờ duyệt" nào trên trang sau khi đã duyệt xong
   */
  async expectNoPendingBadges() {
    await expect(this.page.getByText('Chờ duyệt')).toHaveCount(0, { timeout: 10000 });
  }

  /**
   * Tải lại trang Hồ sơ và xác nhận UI sẵn sàng
   */
  async reload() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }
}
