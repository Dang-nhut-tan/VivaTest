// tests/helpers/authHelper.mjs
// Helper hỗ trợ nạp session đăng nhập (storageState + sessionStorage) vào Context hoặc Page

import fs from 'node:fs';
import path from 'node:path';

/**
 * Nạp trạng thái đăng nhập (đặc biệt là sessionStorage chứa token) vào Page
 * Hàm này dùng `page.addInitScript` để bơm token vào sessionStorage trước khi JS ứng dụng chạy.
 *
 * @param {import('@playwright/test').Page|import('@playwright/test').BrowserContext} target
 * @param {'admin'|'employee'} role
 */
export async function applySession(target, role = 'employee') {
  const filePath = path.resolve(`playwright/.auth/${role}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`[applySession] Không tìm thấy file session tại: ${filePath}`);
    return;
  }

  const authData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (authData.sessionStorage) {
    await target.addInitScript((storage) => {
      for (const [key, value] of Object.entries(storage)) {
        try {
          window.sessionStorage.setItem(key, value);
        } catch (e) {
          console.error('[applySession] Lỗi set item vào sessionStorage:', e);
        }
      }
    }, authData.sessionStorage);
  }
}
