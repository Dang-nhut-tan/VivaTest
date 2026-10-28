// tests/specs/profile/profile-update.spec.mjs
// Kịch bản kiểm thử E2E chuẩn Page Object Model (POM) với expect rõ ràng cho từng bước

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { ProfilePage } from '../../pages/ProfilePage.mjs';
import {
  getAdminToken,
  provisionTestEmployee,
  getPendingProfileRequests,
  decideProfileUpdateRequest
} from '../../helpers/profileApiHelper.mjs';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Cập nhật Hồ sơ cá nhân (POM)', () => {
  let context;
  let page;
  let loginPage;
  let profilePage;

  let adminToken;
  let testEmp;
  let newPhone;
  let newEmail;
  const validAccount = '19036789012345';
  const validBankName = 'Techcombank';

  test.beforeAll(async ({ browser }) => {
    // 1. Khởi tạo Context Mobile cho chuỗi kịch bản nối tiếp
    context = await browser.newContext({
      viewport: { width: 412, height: 915 },
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      isMobile: true,
      hasTouch: true
    });
    page = await context.newPage();

    // Khởi tạo các Page Objects
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);

    // 2. Lấy token Admin
    adminToken = await getAdminToken();
    expect(adminToken, 'Admin Token phải hợp lệ').toBeTruthy();

    // 3. Tạo nhân viên kiểm thử độc lập
    const randSuffix = Date.now().toString().slice(-4);
    const code = `PF${randSuffix}`;
    const fullName = `Nguyễn Văn Test ${randSuffix}`;
    const phone = `0901${randSuffix}11`;
    const email = `nv.profile${randSuffix}@vivacorp.vn`;

    testEmp = await provisionTestEmployee(adminToken, {
      code,
      fullName,
      phone,
      email
    });

    expect(testEmp.empId, 'Mã ID nhân viên kiểm thử phải được cấp').toBeTruthy();

    // Chuẩn bị dữ liệu cập nhật (SĐT 10 số hợp lệ và Email)
    newPhone = `0988${code.slice(2).padStart(4, '0')}01`;
    newEmail = `updated.${code.toLowerCase()}@vivacorp.vn`;
  });

  test.afterAll(async () => {
    if (context) {
      await context.close();
    }
  });

  test('TC-01: Đăng nhập App nhân viên và mở trang Hồ sơ', async ({ baseURL }) => {
    // Bước 1: Mở trang đăng nhập
    await loginPage.navigate(baseURL);

    // Bước 2: Đăng nhập với tài khoản nhân viên vừa tạo
    await loginPage.login(testEmp.code, testEmp.password);
    await loginPage.expectLoginSuccess();

    // Bước 3: Điều hướng tới trang Hồ sơ (/ho-so)
    await profilePage.navigate(baseURL);
    await profilePage.expectLoaded();

    // Xác nhận SĐT ban đầu hiển thị đúng
    await profilePage.expectPhoneDisplayed(testEmp.phone);
  });

  test('TC-02: Gửi yêu cầu cập nhật Thông tin liên hệ (SĐT & Email)', async () => {
    // Mở Sheet cập nhật liên hệ
    await profilePage.openContactUpdate();

    // Điền SĐT mới và Email mới, sau đó bấm Gửi yêu cầu
    await profilePage.contactSheet.submitContactUpdate(newPhone, newEmail);

    // Xác nhận Sheet đã đóng
    await profilePage.contactSheet.expectClosed();

    // Kỳ vọng: Thẻ Liên hệ phải hiển thị nhãn "Chờ duyệt"
    await profilePage.expectContactPendingBadgeVisible();
  });

  test('TC-03: Kiểm tra Validation ràng buộc Số tài khoản ngân hàng (< 6 số)', async () => {
    // Mở Sheet cập nhật tài khoản ngân hàng
    await profilePage.openBankUpdate();

    // Thử nhập số TK sai quy định (1234 - chỉ 4 số)
    await profilePage.bankSheet.fillAccount('1234');
    await profilePage.bankSheet.fillBankName(validBankName);
    await profilePage.bankSheet.submit();

    // Kỳ vọng: Hệ thống phải hiển thị thông báo lỗi rõ ràng
    await profilePage.bankSheet.expectAccountValidationError();
  });

  test('TC-04: Gửi yêu cầu cập nhật Tài khoản ngân hàng hợp lệ', async () => {
    // Điền số TK hợp lệ (14 số) và tên ngân hàng, sau đó gửi yêu cầu
    await profilePage.bankSheet.submitBankUpdate(validAccount, validBankName);

    // Xác nhận Sheet đã đóng
    await profilePage.bankSheet.expectClosed();

    // Kỳ vọng: Thẻ Tài khoản ngân hàng phải hiển thị nhãn "Chờ duyệt"
    await profilePage.expectBankPendingBadgeVisible();
  });

  test('TC-05: Đối soát trực tiếp Database PostgREST API', async () => {
    // Truy vấn các yêu cầu cập nhật của nhân viên này trong DB
    const requests = await getPendingProfileRequests(testEmp.empId, adminToken);

    // Kỳ vọng: Phải có ít nhất 2 bản ghi pending (phone và bank_account)
    expect(requests.length, 'Phải có ít nhất 2 bản ghi pending trong DB').toBeGreaterThanOrEqual(2);

    const fields = requests.map(r => r.field);
    expect(fields, 'Database phải chứa yêu cầu cập nhật phone').toContain('phone');
    expect(fields, 'Database phải chứa yêu cầu cập nhật bank_account').toContain('bank_account');
  });

  test('TC-06: HR Admin phê duyệt yêu cầu -> Dữ liệu cập nhật chính thức, hết Chờ duyệt', async () => {
    // Lấy lại danh sách yêu cầu cần duyệt
    const requests = await getPendingProfileRequests(testEmp.empId, adminToken);

    // HR Admin duyệt từng yêu cầu qua RPC duyet_yeu_cau_sua_ho_so
    for (const req of requests) {
      const decision = await decideProfileUpdateRequest(req.id, adminToken, 'approve');
      expect(decision.ok, `Duyệt yêu cầu ${req.field} phải thành công`).toBe(true);
    }

    // Tải lại trang Hồ sơ nhân viên
    await profilePage.reload();

    // Kỳ vọng 1: Số điện thoại mới được cập nhật chính thức trên màn hình
    await profilePage.expectPhoneDisplayed(newPhone);

    // Kỳ vọng 2: Số tài khoản mới được cập nhật chính thức trên màn hình
    await profilePage.expectBankAccountDisplayed(validAccount);

    // Kỳ vọng 3: Toàn bộ nhãn "Chờ duyệt" đã biến mất (0 nhãn)
    await profilePage.expectNoPendingBadges();
  });
});
