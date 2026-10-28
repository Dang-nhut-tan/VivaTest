// tests/specs/admin/admin-nghi-viec.spec.mjs
// Suite kiểm thử tự động tính năng Cho nhân sự nghỉ việc trên Admin Portal theo chuẩn POM
// Bao gồm luồng nghiệp vụ hoàn chỉnh và bộ kiểm thử giá trị biên (Boundary Value Analysis - BVA)

import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/AdminLoginPage.mjs';
import { AdminPersonnelPage } from '../../pages/admin/AdminPersonnelPage.mjs';
import { getAdminToken, provisionTestEmployee } from '../../helpers/profileApiHelper.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const ADMIN_EMAIL = 'dung.demo@vi-du.test';
const ADMIN_PASS = 'Nqshndc@123';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Cho nhân sự nghỉ việc trên Admin Portal (POM & BVA)', () => {
  let context;
  let page;
  let adminLoginPage;
  let adminPersonnelPage;

  const randSuffix = Date.now().toString().slice(-4);
  const testEmpCode = `NV_OFF_${randSuffix}`;
  const testEmpName = `Lê Văn Test Nghỉ Việc ${randSuffix}`;
  const testEmpPhone = `0989${randSuffix.padStart(6, '0')}`.slice(0, 10);
  const testEmpEmail = `offboard.${randSuffix}@vivatest.vn`;

  test.beforeAll(async ({ browser }) => {
    // 1. Tạo nhân viên kiểm thử mới qua API để chuẩn bị cho ca kiểm thử nghỉ việc
    const adminToken = await getAdminToken();
    await provisionTestEmployee(adminToken, {
      code: testEmpCode,
      fullName: testEmpName,
      phone: testEmpPhone,
      email: testEmpEmail
    });

    // 2. Khởi tạo Desktop context cho giao diện Admin
    context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    page = await context.newPage();

    // 3. Khởi tạo Page Objects
    adminLoginPage = new AdminLoginPage(page);
    adminPersonnelPage = new AdminPersonnelPage(page);
  });

  test.afterAll(async () => {
    await context?.close();
  });

  // --- NHÓM 1: CÁC CA KIỂM THỬ ĐIỀU HƯỚNG & KHỞI TẠO ---

  test('ADM-NV-01: Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login)', async () => {
    await adminLoginPage.navigate(BASE_URL);
    await adminLoginPage.login(ADMIN_EMAIL, ADMIN_PASS);
    await adminLoginPage.expectLoginSuccess();
  });

  test('ADM-NV-02: Điều hướng đến Màn hình Nhân sự (#/nhan-su) và kiểm tra giao diện bảng', async () => {
    await adminPersonnelPage.navigateList(BASE_URL);
    await expect(adminPersonnelPage.pageTitle).toBeVisible();
    await expect(adminPersonnelPage.searchInput).toBeVisible();
    await expect(adminPersonnelPage.personnelTable).toBeVisible();
  });

  test('ADM-NV-03: Tìm kiếm nhân viên kiểm thử và mở Menu thao tác 3 chấm', async () => {
    await adminPersonnelPage.searchEmployee(testEmpCode);
    const row = adminPersonnelPage.getEmployeeRow(testEmpCode);
    await expect(row).toBeVisible();
    await adminPersonnelPage.openActionMenu(testEmpCode);
    await expect(adminPersonnelPage.resignMenuItem).toBeVisible();
    await page.keyboard.press('Escape');
  });

  test('ADM-NV-04: Mở Hộp thoại Cho nghỉ việc và kiểm tra giao diện cảnh báo một chiều', async () => {
    await adminPersonnelPage.openResignDialog(testEmpCode);
    await expect(adminPersonnelPage.resignDialog).toBeVisible();
    await expect(adminPersonnelPage.warningAlert).toContainText('KHÔNG đăng nhập được vào app nữa');
    await expect(adminPersonnelPage.lastDayInput).toBeVisible();
    await expect(adminPersonnelPage.reasonInput).toBeVisible();
    await expect(adminPersonnelPage.confirmResignBtn).toBeVisible();
  });

  // --- NHÓM 2: CÁC CA KIỂM THỬ GIÁ TRỊ BIÊN (BVA) ---

  test('ADM-NV-BVA-01: [Biên dưới] Lý do để trống hoặc chỉ có khoảng trắng -> Nút xác nhận bị vô hiệu', async () => {
    // Ban đầu ô lý do trống -> Nút xác nhận disabled
    await adminPersonnelPage.expectConfirmDisabled();

    // Nhập toàn khoảng trắng -> Nút xác nhận vẫn disabled
    await adminPersonnelPage.fillReason('     ');
    await adminPersonnelPage.expectConfirmDisabled();
  });

  test('ADM-NV-BVA-02: [Biên dưới hợp lệ] Điền lý do hợp lệ -> Nút xác nhận được kích hoạt', async () => {
    await adminPersonnelPage.fillReason('Nhân viên có nguyện vọng nghỉ việc cá nhân');
    await adminPersonnelPage.expectConfirmEnabled();
  });

  test('ADM-NV-BVA-03: [Biên ngày nghỉ] Đặt ngày nghỉ việc ở tương lai -> Kích hoạt lỗi validation', async () => {
    // Ngày tương lai (ngày mai)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const futureDateStr = tomorrow.toISOString().slice(0, 10);

    await adminPersonnelPage.setLastDay(futureDateStr);
    await adminPersonnelPage.expectDateValidationError('không được sau hôm nay');
    await adminPersonnelPage.expectConfirmDisabled();

    // Trả lại ngày hôm nay
    const todayStr = new Date().toISOString().slice(0, 10);
    await adminPersonnelPage.setLastDay(todayStr);
    await adminPersonnelPage.expectConfirmEnabled();
  });

  // --- NHÓM 3: XÁC NHẬN NGHỈ VIỆC & ĐỐI SOÁT HỆ QUẢ ---

  test('ADM-NV-05: Điền thông tin hợp lệ và thực hiện Cho nghỉ việc thành công', async () => {
    await adminPersonnelPage.fillReason('Nhân viên hoàn tất thủ tục bàn giao và xin thôi việc');
    await adminPersonnelPage.submitResign();
  });

  test('ADM-NV-06: Đối soát trạng thái nhân viên trên bảng chuyển sang "Đã nghỉ việc"', async () => {
    await adminPersonnelPage.searchEmployee(testEmpCode);
    await adminPersonnelPage.expectEmployeeStatus(testEmpCode, 'Đã nghỉ việc');
  });

  test('ADM-NV-07: Xác nhận mục "Cho nghỉ việc" trong Menu thao tác đã bị ẩn đối với nhân viên đã nghỉ', async () => {
    await adminPersonnelPage.expectResignMenuItemVisible(testEmpCode, false);
  });
});
