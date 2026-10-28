// tests/pages/PhanAnhPage.mjs
// Page Object Model đại diện cho Màn hình Gửi Phản Ánh / Góp Ý (/phan-anh)

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';

export class PhanAnhPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Header & Frame
    this.frameHeader = page.locator('[data-section="VBO-PA-01"]');
    this.titleText = page.locator('[data-section="VBO-PA-01"] h1, [data-section="VBO-PA-01"] span').first();
    this.trackNavButton = page.getByRole('button', { name: 'Theo dõi' });

    // Kênh gửi (VBO-PA-12)
    this.channelPhanAnhBtn = page.getByRole('button', { name: /Phản ánh/i }).filter({ hasText: 'Kể lại chuyện đã và đang xảy ra' });
    this.channelGopYBtn = page.getByRole('button', { name: /Góp ý/i }).filter({ hasText: 'Đề xuất làm cho tốt hơn' });

    // Danh tính (VBO-PA-03)
    this.identityAnonymousBtn = page.getByRole('button', { name: /Ẩn danh/i }).filter({ hasText: 'Không gửi kèm danh tính' });
    this.identityNamedBtn = page.getByRole('button', { name: /Đứng tên/i }).filter({ hasText: 'Bộ phận tiếp nhận có thể liên hệ' });

    // Phân loại (VBO-PA-11)
    this.categorySection = page.locator('[data-section="VBO-PA-11"]');
    this.categoryChips = page.locator('[data-section="VBO-PA-11"] button');

    // Nội dung sự việc (VBO-PA-04)
    this.contentSection = page.locator('[data-section="VBO-PA-04"]');
    this.contentTextarea = page.locator('[data-section="VBO-PA-04"] textarea');
    this.contentCharCount = page.locator('[data-section="VBO-PA-04"] span').filter({ hasText: /\d+\/500/ });

    // Chân form & nút Gửi (VBO-PA-05)
    this.footerSection = page.locator('[data-section="VBO-PA-05"]');
    this.statusHint = page.locator('[data-section="VBO-PA-05"] > span');
    this.submitButton = page.locator('[data-section="VBO-PA-05"] button');

    // Bảng cam kết bảo mật Ẩn danh (VBO-PA-02)
    this.transparencyPanel = page.locator('[data-section="VBO-PA-02"]');

    // Màn hình kết quả sau khi gửi (VBO-PA-07)
    this.resultSection = page.locator('[data-section="VBO-PA-07"]');
    this.resultTitle = page.locator('[data-section="VBO-PA-07"]').getByText(/Đã gửi phản ánh|Đã gửi góp ý/);
    this.copyTicketButton = page.getByRole('button', { name: /Sao chép/i });
    this.confirmSavedCheckbox = page.locator('[data-section="VBO-PA-07"] input[type="checkbox"]');
    this.backToProfileButton = page.getByRole('button', { name: 'Về Hồ sơ' });
    this.trackNowButton = page.getByRole('button', { name: /Tra cứu \/ theo dõi phản ánh/i });
    this.viewMyGrievancesButton = page.getByRole('button', { name: /Xem Phản ánh của tôi/i });
  }

  /**
   * Điều hướng trực tiếp đến trang Gửi phản ánh (/phan-anh)
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/phan-anh`, { waitUntil: 'domcontentloaded' });
    await expect(this.channelPhanAnhBtn).toBeVisible({ timeout: 10000 });
  }

  /**
   * Chọn kênh gửi: Phản ánh hoặc Góp ý
   * @param {'PHAN_ANH'|'GOP_Y'} channel
   */
  async selectChannel(channel = 'PHAN_ANH') {
    if (channel === 'GOP_Y') {
      await expect(this.channelGopYBtn).toBeVisible();
      await this.channelGopYBtn.click();
      await expect(this.channelGopYBtn).toHaveAttribute('aria-pressed', 'true');
    } else {
      await expect(this.channelPhanAnhBtn).toBeVisible();
      await this.channelPhanAnhBtn.click();
      await expect(this.channelPhanAnhBtn).toHaveAttribute('aria-pressed', 'true');
    }
  }

  /**
   * Chọn hình thức danh tính: Ẩn danh hoặc Đứng tên
   * @param {'ANONYMOUS'|'NAMED'} identity
   */
  async selectIdentity(identity) {
    if (identity === 'ANONYMOUS') {
      await expect(this.identityAnonymousBtn).toBeVisible();
      await this.identityAnonymousBtn.click();
      await expect(this.identityAnonymousBtn).toHaveAttribute('aria-pressed', 'true');
    } else {
      await expect(this.identityNamedBtn).toBeVisible();
      await this.identityNamedBtn.click();
      await expect(this.identityNamedBtn).toHaveAttribute('aria-pressed', 'true');
    }
  }

  /**
   * Chọn phân loại phản ánh theo tên hiển thị (VD: 'Công việc', 'Vệ sinh', 'Chế độ phúc lợi')
   * @param {string} categoryName
   */
  async selectCategory(categoryName) {
    await expect(this.categorySection).toBeVisible();
    const chip = this.categoryChips.filter({ hasText: categoryName });
    await expect(chip).toBeVisible();
    await chip.click();
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
  }

  /**
   * Nhập nội dung sự việc
   * @param {string} text
   */
  async fillContent(text) {
    await expect(this.contentTextarea).toBeVisible();
    await this.contentTextarea.fill(text);
  }

  /**
   * Kiểm tra nút Gửi có đang bị vô hiệu hoá (disabled)
   */
  async expectSubmitDisabled() {
    await expect(this.submitButton).toBeDisabled();
  }

  /**
   * Kiểm tra nút Gửi đã sẵn sàng bấm (enabled)
   */
  async expectSubmitEnabled() {
    await expect(this.submitButton).toBeEnabled();
  }

  /**
   * Kiểm tra câu gợi ý trạng thái dưới chân form
   * @param {string|RegExp} expectedText
   */
  async expectStatusHint(expectedText) {
    await expect(this.statusHint).toContainText(expectedText);
  }

  /**
   * Bấm nút Gửi phản ánh / Góp ý
   */
  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  /**
   * Kiểm tra màn hình kết quả sau khi gửi thành công
   */
  async expectSubmitSuccess() {
    await expect(this.resultSection).toBeVisible({ timeout: 10000 });
    await expect(this.resultTitle).toBeVisible();
  }

  /**
   * Đọc mã vé hiển thị trên màn hình kết quả (đối với chế độ Ẩn danh)
   * @returns {Promise<string>}
   */
  async getAnonymousTicketCode() {
    await expect(this.resultSection).toBeVisible();
    // Mã vé có định dạng 12 ký tự: XXXX-XXXX-XXXX
    const codeLocator = this.resultSection.locator('span').filter({ hasText: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/ });
    await expect(codeLocator).toBeVisible();
    return (await codeLocator.textContent()).trim();
  }

  /**
   * Đánh dấu checkbox xác nhận đã lưu mã vé (chỉ có ở chế độ Ẩn danh)
   */
  async confirmSavedTicketCode() {
    await expect(this.confirmSavedCheckbox).toBeVisible();
    await this.confirmSavedCheckbox.check();
    await expect(this.confirmSavedCheckbox).toBeChecked();
  }

  /**
   * Bấm nút "Tra cứu / theo dõi phản ánh" (màn hình kết quả Ẩn danh)
   */
  async clickTrackNow() {
    await expect(this.trackNowButton).toBeEnabled();
    await this.trackNowButton.click();
  }

  /**
   * Bấm nút "Xem Phản ánh của tôi" (màn hình kết quả Đứng tên)
   */
  async clickViewMyGrievances() {
    await expect(this.viewMyGrievancesButton).toBeEnabled();
    await this.viewMyGrievancesButton.click();
  }

  /**
   * Bấm nút "Về Hồ sơ"
   */
  async clickBackToProfile() {
    await expect(this.backToProfileButton).toBeEnabled();
    await this.backToProfileButton.click();
  }
}
