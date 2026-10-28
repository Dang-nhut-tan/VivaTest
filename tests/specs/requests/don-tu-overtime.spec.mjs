// tests/specs/requests/don-tu-overtime.spec.mjs
// Kịch bản kiểm thử E2E: Kiểm tra trường "Tăng ca tới mấy giờ" bị khóa khi chưa có ca kèm thông báo giải thích
// Chuẩn hoá Test Steps, Screenshots tự động & Smart UI Stability (waitForUIStable)
// Chạy trên cấu hình điện thoại Redmi 13 (Viewport 412x915)

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { DonTuPage } from '../../pages/DonTuPage.mjs';

const BASE_URL = (process.env.BASE_URL || 'https://workdemo.vivacorp.vn').trim();

test.describe('Kiểm thử UX Biểu mẫu Tăng ca (Redmi 13 - Overtime Form)', () => {
  let context;
  let page;
  let loginPage;
  let donTuPage;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      viewport: { width: 412, height: 915 },
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Redmi 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      isMobile: true,
      hasTouch: true
    });
    page = await context.newPage();
    loginPage = new LoginPage(page);
    donTuPage = new DonTuPage(page);
  });

  test.afterEach(async () => {
    await context?.close();
  });

  test('TC-DTU-009: Ô "Tăng ca tới mấy giờ" bị khóa khi chưa có ca làm việc kèm câu thông báo giải thích nguyên nhân rõ ràng', async ({}, testInfo) => {
    await loginPage.step(testInfo, 'Bước 1: Đăng nhập tài khoản nhân viên (NVVP01AUTO)', async () => {
      await loginPage.navigate(BASE_URL);
      await loginPage.login('NVVP01AUTO', 'Password@123');
    });

    await donTuPage.step(testInfo, 'Bước 2: Mở màn hình Đơn từ (/don-tu)', async () => {
      await donTuPage.navigate(BASE_URL);
      await donTuPage.expectLoaded();
    });

    await donTuPage.step(testInfo, 'Bước 3: Mở Sheet Tạo đơn và chọn "Tăng ca"', async () => {
      await donTuPage.openCreateSheet();
      await donTuPage.createSheet.selectOvertime();
      await donTuPage.overtimeSheet.expectOpen();
    });

    await donTuPage.step(testInfo, 'Bước 4: Xác nhận trường giờ bị khóa và câu giải thích hiển thị rõ ràng', async () => {
      await donTuPage.overtimeSheet.expectOvertimeTimeFieldLocked(
        /chưa có ca.*quản lý/i
      );
    }, { savePath: 'tests/reports/don-tu/overtime-locked-reason-redmi13.png' });
  });
});
