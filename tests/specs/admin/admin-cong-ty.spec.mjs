// tests/specs/admin/admin-cong-ty.spec.mjs
// Suite kiểm thử tự động tính năng Tạo - Sửa - Xóa Công ty (Pháp nhân) trên Admin Portal theo chuẩn POM
// Bao gồm luồng nghiệp vụ CRUD hoàn chỉnh và bộ kiểm thử giá trị biên (Boundary Value Analysis - BVA)

import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/AdminLoginPage.mjs';
import { AdminCompanyPage } from '../../pages/admin/AdminCompanyPage.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const ADMIN_EMAIL = 'dung.demo@vi-du.test';
const ADMIN_PASS = 'Nqshndc@123';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Quản lý Công ty (Tạo - Sửa - Xóa) trên Admin Portal (POM & BVA)', () => {
  let context;
  let page;
  let adminLoginPage;
  let adminCompanyPage;

  const randSuffix = Date.now().toString().slice(-4);
  const testCompanyCode = `CO_${randSuffix}`;
  const testCompanyName = `Công ty TNHH Viva E2E Test ${randSuffix}`;
  const testTaxCode10 = '0317609954';
  const updatedCompanyName = `Công ty Cổ phần Viva E2E Updated ${randSuffix}`;
  const updatedTaxCode13 = '0317609954-001';

  test.beforeAll(async ({ browser }) => {
    // 1. Khởi tạo Desktop context cho giao diện Admin
    context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    page = await context.newPage();

    // 2. Khởi tạo Page Objects
    adminLoginPage = new AdminLoginPage(page);
    adminCompanyPage = new AdminCompanyPage(page);
  });

  test.afterAll(async () => {
    await context?.close();
  });

  // --- NHÓM 1: ĐIỀU HƯỚNG & KHỞI TẠO GIAO DIỆN ---

  test('ADM-CO-01: Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login)', async () => {
    await adminLoginPage.navigate(BASE_URL);
    await adminLoginPage.login(ADMIN_EMAIL, ADMIN_PASS);
    await adminLoginPage.expectLoginSuccess();
  });

  test('ADM-CO-02: Điều hướng tới Màn hình Công ty (#/cong-ty) và kiểm tra giao diện bảng', async () => {
    await adminCompanyPage.navigateList(BASE_URL);
    await expect(adminCompanyPage.listTitle).toBeVisible();
    await expect(adminCompanyPage.addCompanyBtn).toBeVisible();
    await expect(adminCompanyPage.searchInput).toBeVisible();
    await expect(adminCompanyPage.companyTable).toBeVisible();
  });

  test('ADM-CO-03: Mở Hộp thoại "Thêm công ty" và kiểm tra các trường nhập liệu', async () => {
    await adminCompanyPage.openAddDialog();
    await expect(adminCompanyPage.dialogTitle).toContainText('Thêm công ty');
    await expect(adminCompanyPage.codeInput).toBeVisible();
    await expect(adminCompanyPage.nameInput).toBeVisible();
    await expect(adminCompanyPage.taxCodeInput).toBeVisible();
    await expect(adminCompanyPage.activeSwitch).toBeVisible();
    await expect(adminCompanyPage.dialogSaveBtn).toBeVisible();
  });

  // --- NHÓM 2: KIỂM THỬ GIÁ TRỊ BIÊN (BVA) ---

  test('ADM-CO-BVA-01: [BVA] Mã công ty < 2 ký tự hoặc chứa ký tự đặc biệt -> Hiển thị cảnh báo định dạng mã', async () => {
    // Điền mã 1 ký tự (biên dưới vi phạm length < 2)
    await adminCompanyPage.fillCode('A');
    await adminCompanyPage.fillName('Công ty Test BVA');
    await adminCompanyPage.clickSaveExpectingError();
    await adminCompanyPage.expectValidationError('Viết HOA không dấu, chỉ chữ - số - gạch');

    // Điền mã chứa ký tự không hợp lệ (@#$)
    await adminCompanyPage.fillCode('TEST@CO');
    await adminCompanyPage.clickSaveExpectingError();
    await adminCompanyPage.expectValidationError('Viết HOA không dấu, chỉ chữ - số - gạch');
  });

  test('ADM-CO-BVA-02: [BVA] Tên công ty để trống -> Hiển thị cảnh báo "Vui lòng nhập tên công ty"', async () => {
    await adminCompanyPage.fillCode(testCompanyCode);
    await adminCompanyPage.fillName('');
    await adminCompanyPage.clickSaveExpectingError();
    await adminCompanyPage.expectValidationError('Vui lòng nhập tên công ty');
  });

  test('ADM-CO-BVA-03: [BVA] Mã số thuế sai quy cách (5 số) -> Hiển thị cảnh báo định dạng MST', async () => {
    await adminCompanyPage.fillName(testCompanyName);
    await adminCompanyPage.fillTaxCode('12345');
    await adminCompanyPage.clickSaveExpectingError();
    await adminCompanyPage.expectValidationError('Để trống được — 10 số, hoặc 13 số');

    // Đóng hộp thoại sau kiểm thử BVA để chuẩn bị luồng thêm chính thức
    await adminCompanyPage.closeForm();
  });

  // --- NHÓM 3: TẠO CÔNG TY MỚI (CREATE) ---

  test('ADM-CO-04: Thêm công ty mới hợp lệ thành công với MST 10 số', async () => {
    await adminCompanyPage.openAddDialog();
    await adminCompanyPage.fillCompanyForm({
      code: testCompanyCode,
      name: testCompanyName,
      taxCode: testTaxCode10,
      isActive: true,
    });
    await adminCompanyPage.submitForm();
  });

  test('ADM-CO-05: Đối soát công ty mới tạo hiển thị trên bảng danh sách với thông tin chuẩn xác', async () => {
    await adminCompanyPage.searchCompany(testCompanyCode);
    await adminCompanyPage.expectCompanyInTable(testCompanyCode);
    await adminCompanyPage.expectTaxCodeInRow(testCompanyCode, testTaxCode10);
    await adminCompanyPage.expectStatusInRow(testCompanyCode, 'Đang hoạt động');
  });

  // --- NHÓM 4: SỬA THÔNG TIN CÔNG TY (UPDATE) ---

  test('ADM-CO-06: Mở Hộp thoại Sửa công ty, cập nhật tên và mã số thuế 13 số thành công', async () => {
    await adminCompanyPage.openEditDialog(testCompanyCode);
    await expect(adminCompanyPage.dialogTitle).toContainText('Sửa công ty');

    // Cập nhật tên mới và MST dạng 13 số
    await adminCompanyPage.fillCompanyForm({
      name: updatedCompanyName,
      taxCode: updatedTaxCode13,
      isActive: true,
    });
    await adminCompanyPage.submitForm();
  });

  test('ADM-CO-07: Đối soát thông tin công ty sau cập nhật hiển thị chính xác trên bảng danh sách', async () => {
    await adminCompanyPage.searchCompany(testCompanyCode);
    await adminCompanyPage.expectCompanyInTable(updatedCompanyName);
    await adminCompanyPage.expectTaxCodeInRow(testCompanyCode, updatedTaxCode13);
  });

  // --- NHÓM 5: XOÁ CÔNG TY (DELETE) ---

  test('ADM-CO-08: Mở Hộp thoại Xoá công ty và thực hiện Xác nhận xoá thành công', async () => {
    await adminCompanyPage.openDeleteDialog(testCompanyCode);
    await expect(adminCompanyPage.deleteDialog).toBeVisible();
    await expect(adminCompanyPage.deleteContent).toContainText('chưa có phòng ban hoặc quán nào đứng tên — xoá được');
    await adminCompanyPage.confirmDelete();
  });

  test('ADM-CO-09: Đối soát công ty đã bị xoá hoàn toàn khỏi bảng danh sách', async () => {
    await adminCompanyPage.searchCompany(testCompanyCode);
    await adminCompanyPage.expectCompanyNotInTable(testCompanyCode);
  });
});
