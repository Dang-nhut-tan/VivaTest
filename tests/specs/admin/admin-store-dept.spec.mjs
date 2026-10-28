// tests/specs/admin/admin-store-dept.spec.mjs
// Suite kiểm thử tự động tính năng Tạo Quán & Tạo Phòng Ban trên Cổng Quản trị Admin theo chuẩn POM
// Tích hợp kiểm thử các giá trị biên (Boundary Value Analysis - BVA)

import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/AdminLoginPage.mjs';
import { AdminStorePage } from '../../pages/admin/AdminStorePage.mjs';
import { AdminDepartmentPage } from '../../pages/admin/AdminDepartmentPage.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const ADMIN_EMAIL = 'dung.demo@vi-du.test';
const ADMIN_PASS = 'Nqshndc@123';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Tạo Quán & Tạo Phòng Ban trên Admin Portal (POM & BVA)', () => {
  let context;
  let page;
  let adminLoginPage;
  let adminStorePage;
  let adminDepartmentPage;

  const randSuffix = Date.now().toString().slice(-4);
  const testStoreName = `Quán Viva Kiểm Thử ${randSuffix}`;
  const testStoreAddress = `123 Đường Số ${randSuffix}, Phường Bến Nghé, Quận 1, TP.HCM`;
  const testDeptName = `Phòng Nghiên Cứu Auto ${randSuffix}`;

  test.beforeAll(async ({ browser }) => {
    // 1. Khởi tạo Desktop context cho giao diện Admin
    context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    page = await context.newPage();

    // 2. Khởi tạo Page Objects
    adminLoginPage = new AdminLoginPage(page);
    adminStorePage = new AdminStorePage(page);
    adminDepartmentPage = new AdminDepartmentPage(page);
  });

  test.afterAll(async () => {
    await context?.close();
  });

  // --- NHÓM 1: CÁC CA KIỂM THỬ LUỒNG CHÍNH ---

  test('ADM-SD-01: Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login)', async () => {
    await adminLoginPage.navigate(BASE_URL);
    await adminLoginPage.login(ADMIN_EMAIL, ADMIN_PASS);
    await adminLoginPage.expectLoginSuccess();
  });

  test('ADM-SD-02: Điều hướng đến Màn hình Quán & toạ độ (#/quan) và kiểm tra danh sách', async () => {
    await adminStorePage.navigateList(BASE_URL);
    await expect(adminStorePage.listTitle).toBeVisible();
    await expect(adminStorePage.createStoreLink).toBeVisible();
    await expect(adminStorePage.storeTable).toBeVisible();
  });

  test('ADM-SD-03: Mở Form Tạo quán mới (#/quan/moi) và kiểm tra các ô nhập bắt buộc', async () => {
    await adminStorePage.clickCreate();
    await expect(page).toHaveURL(/.*#\/quan\/moi/);
    await expect(adminStorePage.nameInput).toBeVisible();
    await expect(adminStorePage.addressInput).toBeVisible();
    await expect(adminStorePage.saveButton).toBeVisible();
  });

  test('ADM-SD-04: Điền thông tin và Tạo quán mới thành công', async () => {
    await adminStorePage.fillStoreForm({
      name: testStoreName,
      address: testStoreAddress,
      radius: 350
    });
    await adminStorePage.submit();
  });

  test('ADM-SD-05: Tìm kiếm và xác nhận quán vừa tạo hiển thị trên Bảng danh sách', async () => {
    await adminStorePage.searchStore(testStoreName);
    await adminStorePage.expectStoreInTable(testStoreName);
    await adminStorePage.expectStoreInTable(testStoreAddress);
  });

  test('ADM-SD-06: Điều hướng đến Màn hình Quản lý Phòng ban (#/phong-ban) và kiểm tra giao diện', async () => {
    await adminDepartmentPage.navigateList(BASE_URL);
    await expect(adminDepartmentPage.listTitle).toBeVisible();
    await expect(adminDepartmentPage.addDepartmentBtn).toBeVisible();
    await expect(adminDepartmentPage.departmentTable).toBeVisible();
  });

  test('ADM-SD-07: Mở Hộp thoại Thêm phòng ban, chọn pháp nhân, điền tên và lưu thành công', async () => {
    await adminDepartmentPage.openAddDialog();
    await adminDepartmentPage.fillDepartmentForm({
      name: testDeptName,
      companyOption: 1 // Chọn công ty đầu tiên trong danh mục
    });
    await adminDepartmentPage.submitDialog();
  });

  test('ADM-SD-08: Tìm kiếm và xác nhận phòng ban vừa tạo hiển thị trên Cây phòng ban', async () => {
    await adminDepartmentPage.searchDepartment(testDeptName);
    await adminDepartmentPage.expectDepartmentInTable(testDeptName);
  });

  // --- NHÓM 2: CÁC CA KIỂM THỬ GIÁ TRỊ BIÊN (BVA) ---

  test('ADM-SD-BVA-01: [Biên dưới bán kính] Bán kính < 50m (49m) kích hoạt lỗi validation', async () => {
    await adminStorePage.navigateCreate(BASE_URL);
    await adminStorePage.fillStoreForm({
      name: `Quán Test BVA 49m ${randSuffix}`,
      address: '123 Lê Lợi, Bến Nghé, Quận 1',
      radius: 49
    });
    await adminStorePage.clickSaveExpectingError();
    await adminStorePage.expectValidationError('Bán kính tối thiểu 50 m');
  });

  test('ADM-SD-BVA-02: [Biên trên bán kính] Bán kính > 2000m (2001m) kích hoạt lỗi validation', async () => {
    await adminStorePage.setRadius(2001);
    await adminStorePage.clickSaveExpectingError();
    await adminStorePage.expectValidationError('Bán kính tối đa 2000 m');
  });

  test('ADM-SD-BVA-03: [Biên trên tên phòng ban] Tên phòng ban > 120 ký tự kích hoạt lỗi validation', async () => {
    await adminDepartmentPage.navigateList(BASE_URL);
    await adminDepartmentPage.openAddDialog();
    await adminDepartmentPage.selectCompany(1);

    // Điền tên phòng ban dài 125 ký tự
    const overLengthDept = 'P'.repeat(125);
    await adminDepartmentPage.fillDepartmentName(overLengthDept);
    await adminDepartmentPage.clickSaveExpectingError();
    await adminDepartmentPage.expectValidationError('Tên phòng ban tối đa 120 ký tự');

    await adminDepartmentPage.closeDialog();
  });
});
