// tests/specs/auth/auth-phone-forgot.spec.mjs
// Suite kiểm thử tự động Tính năng Đăng nhập bằng Số điện thoại & Quên mật khẩu theo chuẩn POM

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { QuenMatKhauPage } from '../../pages/QuenMatKhauPage.mjs';
import {
  getAdminToken,
  provisionTestEmployee,
  loginWithPhoneApi,
  requestPasswordResetApi
} from '../../helpers/authExtApiHelper.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Đăng nhập bằng SĐT & Quên mật khẩu (POM)', () => {
  let context;
  let page;
  let loginPage;
  let quenMatKhauPage;

  let adminToken;
  let testEmp;

  const randSuffix = Date.now().toString().slice(-4);
  const testPhone = `0906${randSuffix}77`;

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
    quenMatKhauPage = new QuenMatKhauPage(page);

    // 3. Cấp tài khoản nhân viên kiểm thử mới có SĐT
    adminToken = await getAdminToken();
    expect(adminToken, 'Admin Token phải hợp lệ').toBeTruthy();

    testEmp = await provisionTestEmployee(adminToken, {
      code: `AU${randSuffix}`,
      fullName: `Nguyễn Văn Xác Thực ${randSuffix}`,
      phone: testPhone,
      email: `nv.xacthuc${randSuffix}@vivacorp.vn`,
      password: 'Password@123'
    });

    expect(testEmp.empId).toBeTruthy();
  });

  test.afterAll(async () => {
    await context?.close();
  });

  test('AUTH-01: Đăng nhập thành công bằng Số điện thoại qua Tab Số điện thoại (VBO-DN-09)', async ({ baseURL }) => {
    await loginPage.navigate(baseURL);

    // Kiểm tra các thành phần của form đăng nhập
    await expect(loginPage.tabEmployeeCode).toBeVisible();
    await expect(loginPage.tabPhone).toBeVisible();

    // Chuyển sang Tab "Số điện thoại"
    await loginPage.selectTab('SDT');
    await expect(loginPage.phoneInput).toBeVisible();

    // Điền Số điện thoại và Mật khẩu
    await loginPage.fillPhone(testPhone);
    await loginPage.fillPassword(testEmp.password);
    await loginPage.clickLogin();
    await loginPage.handleUnknownDeviceWarning();

    // Xác nhận đăng nhập thành công vào trang chủ
    await loginPage.expectLoginSuccess();

    // Đối soát API GoTrue
    const apiLogin = await loginWithPhoneApi(testPhone, testEmp.password);
    expect(apiLogin.access_token, 'Đăng nhập API bằng SĐT phải trả về access_token hợp lệ').toBeTruthy();
  });

  test('AUTH-02: Đăng xuất tài khoản và quay về trang Đăng nhập', async () => {
    // Xóa session storage và local storage để đăng xuất sạch
    await page.evaluate(() => {
      globalThis.localStorage?.clear();
      globalThis.sessionStorage?.clear();
    });
    await page.goto(`${BASE_URL}/dang-nhap?web=thu`, { waitUntil: 'domcontentloaded' });
    await expect(loginPage.employeeCodeInput).toBeVisible({ timeout: 10000 });
  });

  test('AUTH-03: Điều hướng từ trang Đăng nhập sang trang Quên mật khẩu (/quen-mat-khau)', async () => {
    // Bấm link "Quên mật khẩu"
    await loginPage.clickForgotPassword();

    // Xác nhận đã đến trang /quen-mat-khau
    await expect(page).toHaveURL(/\/quen-mat-khau/);
    await expect(quenMatKhauPage.title).toBeVisible();
    await expect(quenMatKhauPage.subtitle).toBeVisible();
    await expect(quenMatKhauPage.identifierInput).toBeVisible();
  });

  test('AUTH-04: Kiểm tra Validation form Quên mật khẩu (Chặn gửi khi ô trống)', async () => {
    // Ô định danh rỗng -> nút Gửi yêu cầu bị vô hiệu hóa
    await quenMatKhauPage.expectSubmitDisabled();

    // Nhập giá trị bất kỳ -> nút Gửi yêu cầu sáng lên
    await quenMatKhauPage.fillIdentifier('TEST');
    await quenMatKhauPage.expectSubmitEnabled();

    // Xóa trắng -> nút lại bị vô hiệu hóa
    await quenMatKhauPage.fillIdentifier('');
    await quenMatKhauPage.expectSubmitDisabled();
  });

  test('AUTH-05: Gửi yêu cầu Quên mật khẩu bằng Số điện thoại & xác nhận câu thông báo an toàn', async () => {
    // Điền Số điện thoại của nhân viên
    await quenMatKhauPage.fillIdentifier(testPhone);
    await quenMatKhauPage.submit();

    // Xác nhận giao diện hiển thị câu thông báo chuẩn bảo mật
    await quenMatKhauPage.expectSuccessNotice();

    // Bấm "Quay lại đăng nhập" và kiểm tra điều hướng về /dang-nhap
    await quenMatKhauPage.clickBackToSignIn();
    await expect(page).toHaveURL(/\/dang-nhap/);
  });

  test('AUTH-06: Gửi yêu cầu Quên mật khẩu bằng Mã nhân viên & đối soát Backend API', async () => {
    // Mở lại trang quên mật khẩu
    await quenMatKhauPage.navigate(BASE_URL);

    // Điền Mã nhân viên
    await quenMatKhauPage.fillIdentifier(testEmp.code);
    await quenMatKhauPage.submit();

    // Xác nhận kết quả thành công trên UI
    await quenMatKhauPage.expectSuccessNotice();

    // Đối soát trực tiếp qua Backend API RPC xin_dat_lai_mat_khau
    const apiResult = await requestPasswordResetApi(testEmp.code);
    expect(apiResult.ok, 'RPC xin_dat_lai_mat_khau phải trả về ok = true').toBe(true);
  });
});
