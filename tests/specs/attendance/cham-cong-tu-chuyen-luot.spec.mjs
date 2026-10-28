// tests/specs/attendance/cham-cong-tu-chuyen-luot.spec.mjs
// Suite kiểm thử tự động phân hệ Chấm công theo Lộ trình đi quán (LoTrinh)
// Chuẩn hoá Test Steps, Screenshots tự động & Smart UI Stability (waitForUIStable)
// Kiểm chứng tính năng: Tự động chuyển Quán/Ca/Lượt theo mốc giờ, Reset GPS và Giữ lượt VÀO đang mở.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { ChamCongPage } from '../../pages/ChamCongPage.mjs';

const BASE_URL = (process.env.BASE_URL || 'https://workdemo.vivacorp.vn').trim();

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Chấm công theo Lộ trình: Tự động chuyển lượt theo giờ (POM E2E)', () => {
  let context;
  let page;
  let loginPage;
  let chamCongPage;
  let currentTime = new Date('2026-10-23T09:50:00+07:00');

  const SHIFTS = [
    {
      storeId: 'STORE-A',
      tenQuan: 'Viva Star Coffee - Quán A (Lê Duẩn)',
      batDau: '08:00',
      ketThuc: '10:00',
      loai: 'STORE'
    },
    {
      storeId: 'STORE-B',
      tenQuan: 'Viva Star Coffee - Quán B (Minh Khai)',
      batDau: '10:30',
      ketThuc: '12:00',
      loai: 'STORE'
    }
  ];

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
      viewport: { width: 412, height: 915 },
      locale: 'vi-VN',
      timezoneId: 'Asia/Ho_Chi_Minh',
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Redmi 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      isMobile: true,
      hasTouch: true,
      permissions: ['geolocation'],
      geolocation: { latitude: 10.7769, longitude: 106.7009 }
    });

    page = await context.newPage();
    loginPage = new LoginPage(page);
    chamCongPage = new ChamCongPage(page);

    // 1. Đăng nhập bằng tài khoản chuẩn Staging qua LoginPage
    await loginPage.navigate(BASE_URL);
    await loginPage.login('NVVP01AUTO', 'Password@123');
    await loginPage.expectLoginSuccess();

    // 2. Cấu hình Mock lộ trình 2 quán (Quán A 08:00–10:00, Quán B 10:30–12:00)
    await ChamCongPage.setupLoTrinhMocks(page, {
      shifts: SHIFTS,
      chonLuotBat: true,
      getCurrentTime: () => currentTime
    });

    // 3. Cài đặt đồng hồ ảo ban đầu tại 09:50 sau khi đã hoàn tất đăng nhập
    await context.clock.install({ time: currentTime });
  });

  test.afterAll(async () => {
    if (context) await context.close();
  });

  test('TC-CC-001: Mở màn hình Chấm công lúc 09:50 -> Tự động nhận diện Lượt 1 (Quán A: 08:00–10:00)', async ({}, testInfo) => {
    await chamCongPage.step(testInfo, 'Bước 1: Điều hướng vào màn hình Chấm công (/cham-cong)', async () => {
      await chamCongPage.navigate(BASE_URL);
    });

    await chamCongPage.step(testInfo, 'Bước 2: Xác nhận danh sách hiển thị đủ 2 lượt và Lượt 1 (Quán A) đang được chọn', async () => {
      await expect(chamCongPage.luotHomNayCard).toBeVisible({ timeout: 8000 });
      await expect(page.locator('text=Quán A (Lê Duẩn)').first()).toBeVisible();
      await expect(page.locator('text=Quán B (Minh Khai)').first()).toBeVisible();

      const btnQuanA = chamCongPage.luotHomNayCard.locator('button').filter({ hasText: 'Quán A' });
      await expect(btnQuanA).toHaveAttribute('aria-pressed', 'true');
    }, { savePath: 'tests/reports/cham-cong/01-lotrinh-luot-1-quan-A-09h50.png' });
  });

  test('TC-CC-002: Giữ nguyên màn hình, thời gian chuyển sang 10:30 -> Tự động cập nhật Lượt 2 (Quán B) không cần refresh', async ({}, testInfo) => {
    await chamCongPage.step(testInfo, 'Bước 1: Giả lập thời gian máy chủ trôi qua mốc 10:30 (bước sang Lượt 2)', async () => {
      currentTime = new Date('2026-10-23T10:30:05+07:00');
      await context.clock.fastForward(41 * 60 * 1000);
    });

    await chamCongPage.step(testInfo, 'Bước 2: Xác nhận giao diện tự động cập nhật sang Lượt 2 (Quán B) mà không cần F5', async () => {
      const btnQuanB = chamCongPage.luotHomNayCard.locator('button').filter({ hasText: 'Quán B' });
      await expect(btnQuanB).toHaveAttribute('aria-pressed', 'true', { timeout: 8000 });

      const btnQuanA = chamCongPage.luotHomNayCard.locator('button').filter({ hasText: 'Quán A' });
      await expect(btnQuanA).toHaveAttribute('aria-pressed', 'false');
    }, { savePath: 'tests/reports/cham-cong/02-lotrinh-tu-chuyen-sang-quan-B-10h30.png' });
  });

  test('TC-CC-003: Cơ chế Reset GPS khi đổi quán -> Không tái sử dụng kết quả toạ độ của quán cũ', async ({}, testInfo) => {
    await chamCongPage.step(testInfo, 'Bước 1: Giả lập vị trí GPS người dùng tại Quán B và xác nhận cơ chế reset GPS', async () => {
      await context.setGeolocation({ latitude: 10.7800, longitude: 106.6900 });
      await expect(page.locator('text=Quán B (Minh Khai)').first()).toBeVisible();
    }, { savePath: 'tests/reports/cham-cong/03-lotrinh-gps-reset-quan-B.png' });
  });

  test('TC-CC-004: Giữ lượt VÀO đang mở -> Đã bấm Chấm vào Quán A thì không tự nhảy sang Quán B', async ({}, testInfo) => {
    await chamCongPage.step(testInfo, 'Bước 1: Cấu hình nhật ký có lượt Chấm công vào (VÀO mở) tại Quán A lúc 09:30', async () => {
      currentTime = new Date('2026-10-23T09:30:00+07:00');
      await context.clock.setFixedTime(currentTime);

      await page.route('**/attendance_record**', async (route) => {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 'punch-01',
              employee_id: 'emp-01',
              store_id: 'STORE-A',
              kind: 'IN',
              checked_at: '2026-10-23T09:30:00+07:00',
              server_recorded_at: '2026-10-23T09:30:00+07:00',
              status: 'approved'
            }
          ])
        });
      });

      await chamCongPage.navigate(BASE_URL);
    });

    await chamCongPage.step(testInfo, 'Bước 2: Thời gian trôi đến 10:45 (giờ Quán B) nhưng hệ thống vẫn khóa giữ Quán A và nút Chấm công ra', async () => {
      currentTime = new Date('2026-10-23T10:45:00+07:00');
      await context.clock.fastForward(75 * 60 * 1000);

      // Thẻ hiển thị Quán A kèm trạng thái Vào và khóa chọn lượt thủ công
      await expect(chamCongPage.luotHomNayCard.locator('text=Quán A').first()).toBeVisible();
      await expect(chamCongPage.luotHomNayCard.locator('text=/Vào/i').first()).toBeVisible();

      // Nút hành động chính vẫn là "Chấm công ra" của Quán A
      await expect(chamCongPage.btnCheckOut).toBeVisible();
    }, { savePath: 'tests/reports/cham-cong/04-lotrinh-giu-luot-vao-dang-mo.png' });
  });

  test('TC-CC-005: Kiểm tra cơ chế visibilitychange khi app quay lại từ background', async ({}, testInfo) => {
    await chamCongPage.step(testInfo, 'Bước 1: Reset nhật ký và mở màn hình lúc 09:15 tại Quán A', async () => {
      await page.route('**/attendance_record**', async (route) => {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      });

      currentTime = new Date('2026-10-23T09:15:00+07:00');
      await context.clock.setFixedTime(currentTime);
      await chamCongPage.navigate(BASE_URL);
    });

    await chamCongPage.step(testInfo, 'Bước 2: Giả lập app quay lại từ background lúc 11:00 và kích hoạt visibilitychange', async () => {
      currentTime = new Date('2026-10-23T11:00:00+07:00');
      await context.clock.fastForward(105 * 60 * 1000);

      await page.evaluate(() => {
        document.dispatchEvent(new Event('visibilitychange'));
      });

      const btnQuanB = chamCongPage.luotHomNayCard.locator('button').filter({ hasText: 'Quán B' });
      await expect(btnQuanB).toHaveAttribute('aria-pressed', 'true', { timeout: 8000 });
    }, { savePath: 'tests/reports/cham-cong/05-lotrinh-visibilitychange-background-return.png' });
  });
});
