// tests/pages/components/PayExplainSheet.mjs
// Component Object Model đại diện cho Sheet giải thích cách tính ngày công (VBO-BC-09)

import { expect } from '@playwright/test';
import { BasePage } from '../BasePage.mjs';

export class PayExplainSheet extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.dialog = page.getByRole('dialog');
    this.title = this.dialog.getByText('Cách tính ngày công');
    this.closeButton = this.dialog.getByRole('button', { name: 'Đóng' });
  }

  /**
   * Kiểm tra Sheet giải thích tính công đã mở thành công
   */
  async expectOpen() {
    await expect(this.dialog).toBeVisible({ timeout: 8000 });
    await expect(this.title).toBeVisible();
    await expect(this.closeButton).toBeVisible();
  }

  /**
   * Đóng Sheet giải thích
   */
  async close() {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
    await expect(this.dialog).toBeHidden({ timeout: 5000 });
  }
}
