// tests/specs/attendance/bang-cong.spec.mjs
// Suite kiểm thử tự động Màn hình Bảng công (/bang-cong) theo chuẩn POM và assertions rõ ràng (expect)

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { BangCongPage } from '../../pages/BangCongPage.mjs';
import { getAdminToken, ensureTimesheetEmployee } from '../../helpers/bangCongApiHelper.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Xem Bảng Công (POM)', () => {
  let context;
  let page;
  let loginPage;
  let bangCongPage;
  let testEmp;

  test.beforeAll(async ({ browser }) => {
    // 1. Khởi tạo Context Mobile
    context = await browser.newContext({
      viewport: { width: 412, height: 915 },
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      isMobile: true,
      hasTouch: true
    });
    page = await context.newPage();

    // 2. Khởi tạo Page Objects
    loginPage = new LoginPage(page);
    bangCongPage = new BangCongPage(page);

    // 3. Đảm bảo nhân viên kiểm thử và dữ liệu ngày công tồn tại
    const adminToken = await getAdminToken();
    expect(adminToken, 'Admin Token phải hợp lệ').toBeTruthy();

    testEmp = await ensureTimesheetEmployee(adminToken);
    expect(testEmp.employeeCode).toBe('NVVP01AUTO');

    // 4. Đăng nhập vào App
    await loginPage.navigate(BASE_URL);
    await loginPage.login(testEmp.employeeCode, testEmp.password);
    await loginPage.expectLoginSuccess();

    // 5. Điều hướng vào màn hình Bảng công
    await bangCongPage.navigate(BASE_URL);
  });

  test.afterAll(async () => {
    await context?.close();
  });

  test('BC-01: Tải giao diện Bảng công & Kiểm tra Header và Thanh chọn kỳ công (VBO-BC-01 & VBO-BC-02)', async () => {
    // Kiểm tra header và các khối chính
    await bangCongPage.expectLoaded();
    await expect(bangCongPage.header).toContainText('Bảng công');

    // Kiểm tra thông tin kỳ công
    const periodText = await bangCongPage.getPeriodText();
    expect(periodText).toMatch(/Kỳ T(10|11)\/2026/);

    // Nếu hệ thống đang ở kỳ T11/2026, chuyển về kỳ trước (T10/2026) có dữ liệu ngày công chuẩn bị (16/10)
    if (periodText.includes('Kỳ T11/2026')) {
      await bangCongPage.goToPrevPeriod();
    }
    await bangCongPage.expectPeriodContains('Kỳ T10/2026');
    await bangCongPage.expectPeriodContains('21/09 – 20/10');
  });

  test('BC-02: Kiểm tra Thẻ tổng kết công cuối kỳ (VBO-BC-03 & VBO-BC-05)', async () => {
    await expect(bangCongPage.summaryCard).toBeVisible();

    // Kiểm tra các chỉ số tổng kết: Ngày công, Giờ thường, Giờ đêm, OT ngày, OT đêm, Nghỉ phép
    await bangCongPage.expectSummaryContains('Ngày công');
    await bangCongPage.expectSummaryContains('1 ngày');
    await bangCongPage.expectSummaryContains('Giờ thường');
    await bangCongPage.expectSummaryContains('Giờ đêm');
    await bangCongPage.expectSummaryContains('OT ngày');
    await bangCongPage.expectSummaryContains('OT đêm');
    await bangCongPage.expectSummaryContains('Phép đã dùng');

    // Kiểm tra hàng làm thêm cộng dồn (VBO-BC-05)
    await expect(bangCongPage.overtimeBand).toBeVisible();
    await expect(bangCongPage.overtimeBand).toContainText('Làm thêm · kỳ công');
    await expect(bangCongPage.overtimeBand).toContainText('Làm thêm · tháng DL');
  });

  test('BC-03: Kiểm tra Lưới lịch chấm công & Ký hiệu công ngày 16 (VBO-BC-04)', async () => {
    await expect(bangCongPage.calendarGrid).toBeVisible();

    // Kiểm tra 7 cột thứ trong tuần (T2 -> CN)
    const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    for (const wd of weekdays) {
      await expect(bangCongPage.calendarGrid.getByText(wd, { exact: true })).toBeVisible();
    }

    // Kiểm tra ô ngày 16 có ký hiệu mã công X
    const cell16 = bangCongPage.getDayCell(16);
    await expect(cell16).toBeVisible();
    await expect(cell16).toContainText('16');
    await expect(cell16).toContainText('X');
  });

  test('BC-04: Mở Sheet chi tiết ngày công và kiểm tra thông tin ca & giờ làm (VBO-BC-06)', async () => {
    // Bấm ô ngày 16
    await bangCongPage.clickDayCell(16);

    // Sheet chi tiết mở lên
    await bangCongPage.dayDetailSheet.expectOpen(/16\/10\/2026/);
    await bangCongPage.dayDetailSheet.expectShift('VP-HC1');
    await expect(bangCongPage.dayDetailSheet.clockInLabel).toBeVisible();
    await expect(bangCongPage.dayDetailSheet.clockOutLabel).toBeVisible();
    await expect(bangCongPage.dayDetailSheet.estimatedHoursLabel).toBeVisible();

    // Đóng sheet chi tiết
    await bangCongPage.dayDetailSheet.close();
  });

  test('BC-05: Chuyển đổi qua lại giữa các kỳ công (Kỳ trước / Kỳ sau) qua PeriodNav', async () => {
    // Bấm chuyển sang kỳ trước
    await bangCongPage.goToPrevPeriod();
    await bangCongPage.expectPeriodContains('Kỳ T09/2026');
    await bangCongPage.expectPeriodContains('21/08 – 20/09');

    // Bấm chuyển lại kỳ sau (về kỳ hiện tại)
    await bangCongPage.goToNextPeriod();
    await bangCongPage.expectPeriodContains('Kỳ T10/2026');
    await bangCongPage.expectPeriodContains('21/09 – 20/10');
  });

  test('BC-06: Mở và đóng Sheet giải thích cách tính ngày công (VBO-BC-09)', async () => {
    // Mở sheet giải thích từ header
    await bangCongPage.openPayExplain();
    await bangCongPage.payExplainSheet.expectOpen();

    // Đóng sheet giải thích
    await bangCongPage.payExplainSheet.close();
  });
});
