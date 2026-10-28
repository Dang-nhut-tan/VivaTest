// tests/specs/auth/dang-nhap-ponytail.spec.mjs
// Test suite Đăng nhập VivaOffice - Tối ưu hoá theo triết lý Ponytail:
// Chuẩn hoá Test Steps, Screenshots tự động & Kiểm tra Smart UI Stability (waitForUIStable)

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';

test.describe('Kiểm thử Đăng nhập VivaOffice (Ponytail Mode)', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(BASE_URL);
  });

  test('TC-01: Form đăng nhập hiển thị đầy đủ components theo Graphify AST', async ({ page }, testInfo) => {
    await loginPage.step(testInfo, 'Bước 1: Kiểm tra 2 tab định danh (Mã NV & SĐT)', async () => {
      await expect(loginPage.tabEmployeeCode).toBeVisible();
      await expect(loginPage.tabPhone).toBeVisible();
    });

    await loginPage.step(testInfo, 'Bước 2: Kiểm tra các trường nhập liệu và nút Đăng nhập', async () => {
      await expect(loginPage.employeeCodeInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });

    await loginPage.step(testInfo, 'Bước 3: Kiểm tra lối phụ Quên mật khẩu', async () => {
      await expect(loginPage.forgotPasswordLink).toBeVisible();
    });
  });

  test('TC-02: Đổi qua lại giữa Tab Mã nhân viên và Tab Số điện thoại (VBO-DN-09)', async ({ page }, testInfo) => {
    await loginPage.step(testInfo, 'Bước 1: Chuyển sang Tab Số điện thoại và xác nhận form', async () => {
      await loginPage.selectTab('SDT');
      await expect(loginPage.phoneInput).toBeVisible();
      await expect(loginPage.employeeCodeInput).not.toBeVisible();
    });

    await loginPage.step(testInfo, 'Bước 2: Quay lại Tab Mã nhân viên và xác nhận form', async () => {
      await loginPage.selectTab('MA_NV');
      await expect(loginPage.employeeCodeInput).toBeVisible();
      await expect(loginPage.phoneInput).not.toBeVisible();
    });
  });

  test('TC-03: Chuyển hướng sang màn Quên mật khẩu (/quen-mat-khau) qua VBO-DN-04', async ({ page }, testInfo) => {
    await loginPage.step(testInfo, 'Bước 1: Bấm nút Quên mật khẩu và xác nhận URL chuyển hướng', async () => {
      await loginPage.clickForgotPassword();
      await expect(page).toHaveURL(/\/quen-mat-khau/);
    });
  });
});
