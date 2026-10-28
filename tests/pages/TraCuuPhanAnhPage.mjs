// tests/pages/TraCuuPhanAnhPage.mjs
// Page Object Model đại diện cho Màn hình Tra cứu & Danh sách Phản ánh của tôi (/phan-anh/tra-cuu)

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';

export class TraCuuPhanAnhPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Header & Frame
    this.frameHeader = page.locator('[data-section="VBO-TP-01"]');
    this.backButton = page.getByRole('button', { name: 'Quay lại' }).or(this.frameHeader.getByRole('button').first());

    // Khối nhập mã vé tra cứu (VBO-TP-02)
    this.codeEntrySection = page.locator('[data-section="VBO-TP-02"]');
    this.ticketCodeInput = page.getByPlaceholder('Ví dụ: AB23-CD45-EF67');
    this.lookupButton = this.codeEntrySection.getByRole('button', { name: /Tra cứu/i }).or(this.codeEntrySection.getByRole('button'));

    // Khối kết quả tra cứu chi tiết bằng mã vé (VBO-TP-03)
    this.ticketDetailSection = page.locator('[data-section="VBO-TP-03"]');
    this.ticketCodeDisplay = this.ticketDetailSection.getByText(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    this.senderIdentityLabel = this.ticketDetailSection.getByText(/Gửi ẩn danh|Gửi nêu danh/);
    this.detailContentParagraph = this.ticketDetailSection.locator('p');
    this.resetLookupButton = page.getByRole('button', { name: /Tra cứu mã khác|Tra mã khác/i });

    // Khối "Phản ánh của tôi" (VBO-TP-06)
    this.myGrievancesSection = page.locator('[data-section="VBO-TP-06"]');
    this.myGrievancesTitle = page.getByText('Phản ánh của tôi');
    this.myGrievancesList = this.myGrievancesSection;
    this.emptyState = this.myGrievancesSection.getByText(/chưa gửi phản ánh nêu danh tính nào/i);
  }

  /**
   * Điều hướng trực tiếp đến trang Tra cứu phản ánh (/phan-anh/tra-cuu)
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/phan-anh/tra-cuu`, { waitUntil: 'domcontentloaded' });
    await expect(this.ticketCodeInput).toBeVisible({ timeout: 10000 });
  }

  /**
   * Điền mã vé và thực hiện Tra cứu
   * @param {string} ticketCode
   */
  async lookupByCode(ticketCode) {
    await expect(this.ticketCodeInput).toBeVisible();
    await this.ticketCodeInput.fill(ticketCode);
    await expect(this.lookupButton).toBeEnabled();
    await this.lookupButton.click();
    await expect(this.ticketDetailSection).toBeVisible({ timeout: 10000 });
  }

  /**
   * Xác thực thông tin chi tiết của phản ánh sau khi tra cứu bằng mã vé
   * @param {object} params
   * @param {string} [params.ticketCode]
   * @param {boolean} [params.isAnonymous]
   * @param {string} [params.statusText]
   * @param {string} [params.content]
   */
  async expectLookupDetails({ ticketCode, isAnonymous, statusText = 'Đã gửi · chờ tiếp nhận', content }) {
    await expect(this.ticketDetailSection).toBeVisible();

    if (ticketCode) {
      await expect(this.ticketCodeDisplay).toHaveText(ticketCode.toUpperCase().replace(/[^A-Z0-9-]/g, ''));
    }

    if (typeof isAnonymous === 'boolean') {
      const expectedLabel = isAnonymous ? 'Gửi ẩn danh' : 'Gửi nêu danh';
      await expect(this.senderIdentityLabel).toContainText(expectedLabel);
    }

    if (statusText) {
      await expect(this.ticketDetailSection).toContainText(statusText);
    }

    if (content) {
      await expect(this.detailContentParagraph).toContainText(content);
    }
  }

  /**
   * Bấm nút "Tra mã khác" để quay về ô nhập mã vé và danh sách "Phản ánh của tôi"
   */
  async resetLookup() {
    await expect(this.resetLookupButton).toBeVisible();
    await this.resetLookupButton.click();
    await expect(this.codeEntrySection).toBeVisible({ timeout: 5000 });
  }

  /**
   * Kiểm tra một phản ánh đứng tên có xuất hiện trong danh sách "Phản ánh của tôi" hay không
   */
  async expectMyGrievanceItemExists() {
    await expect(this.myGrievancesSection).toBeVisible();
    const item = this.myGrievancesSection.getByRole('button').filter({ hasText: /Đã gửi · chờ tiếp nhận|Đang xử lý|Đã có kết luận|Từ chối/ });
    await expect(item.first()).toBeVisible({ timeout: 10000 });
  }

  /**
   * Mở rộng (expand) một phản ánh trong "Phản ánh của tôi" và kiểm tra nội dung
   * @param {string} contentSnippet
   */
  async verifyMyGrievanceContent(contentSnippet) {
    await expect(this.myGrievancesSection).toBeVisible();
    const toggleBtn = this.myGrievancesSection.getByRole('button').first();
    await toggleBtn.click();

    const contentP = this.myGrievancesSection.locator('p').filter({ hasText: contentSnippet });
    await expect(contentP).toBeVisible({ timeout: 5000 });
  }

  /**
   * Xác nhận tính bảo mật: Phản ánh Ẩn danh KHÔNG xuất hiện trong danh sách "Phản ánh của tôi"
   * @param {string} anonContentSnippet
   */
  async expectAnonymousGrievanceNotListed(anonContentSnippet) {
    await expect(this.myGrievancesSection).toBeVisible();
    const count = await this.myGrievancesSection.locator('p').filter({ hasText: anonContentSnippet }).count();
    expect(count, 'Phản ánh ẩn danh TUYỆT ĐỐI KHÔNG ĐƯỢC xuất hiện trong Phản ánh của tôi').toBe(0);
  }
}
