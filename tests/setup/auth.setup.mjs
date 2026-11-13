// tests/setup/auth.setup.mjs
// Setup project chạy 1 lần duy nhất trước toàn bộ test suite để lưu trạng thái phiên đăng nhập (storageState)
// Giúp các test sau này vào thẳng trang nghiệp vụ mà không cần đăng nhập qua UI

import { test as setup, expect } from '@playwright/test';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage.mjs';
import { LoginPage } from '../pages/LoginPage.mjs';
import { getAdminToken } from '../helpers/profileApiHelper.mjs';
import { ensureTimesheetEmployee } from '../helpers/bangCongApiHelper.mjs';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const ADMIN_EMAIL = 'dung.demo@vi-du.test';
const ADMIN_PASS = 'Nqshndc@123';
const AUTH_DIR = path.resolve('playwright/.auth');

const adminAuthFile = path.join(AUTH_DIR, 'admin.json');
const employeeAuthFile = path.join(AUTH_DIR, 'employee.json');

setup.beforeAll(() => {
  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
  }
});

setup('Authenticate as Admin Portal', async ({ page }) => {
  const adminLoginPage = new AdminLoginPage(page);

  await adminLoginPage.navigate(BASE_URL);
  await adminLoginPage.login(ADMIN_EMAIL, ADMIN_PASS);
  await adminLoginPage.expectLoginSuccess();

  // 1. Trích xuất sessionStorage (VivaOffice Admin lưu token tại sessionStorage 'viva-admin-auth-session')
  const sessionStorageData = await page.evaluate(() => ({ ...sessionStorage }));

  // 2. Lưu storageState chuẩn của Playwright (cookies + localStorage)
  await page.context().storageState({ path: adminAuthFile });

  // 3. Đóng gói thêm sessionStorage vào file JSON
  const rawData = JSON.parse(fs.readFileSync(adminAuthFile, 'utf8'));
  rawData.sessionStorage = sessionStorageData;
  fs.writeFileSync(adminAuthFile, JSON.stringify(rawData, null, 2), 'utf8');
});

setup('Authenticate as Mobile App Employee', async ({ page }) => {
  // 1. Đảm bảo tài khoản NVVP01AUTO tồn tại qua API
  const adminToken = await getAdminToken();
  const testEmp = await ensureTimesheetEmployee(adminToken);

  // 2. Đăng nhập 1 lần duy nhất để lấy session
  const loginPage = new LoginPage(page);
  await loginPage.navigate(BASE_URL);
  await loginPage.login(testEmp.employeeCode, testEmp.password);
  await loginPage.expectLoginSuccess();

  // 1. Trích xuất sessionStorage (Mobile App lưu session tại 'viva.bo.session.v1')
  const sessionStorageData = await page.evaluate(() => ({ ...sessionStorage }));

  // 2. Lưu storageState chuẩn của Playwright (cookies + localStorage)
  await page.context().storageState({ path: employeeAuthFile });

  // 3. Đóng gói thêm sessionStorage vào file JSON
  const rawData = JSON.parse(fs.readFileSync(employeeAuthFile, 'utf8'));
  rawData.sessionStorage = sessionStorageData;
  fs.writeFileSync(employeeAuthFile, JSON.stringify(rawData, null, 2), 'utf8');
});
