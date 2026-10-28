// tests/specs/feedback/phan-anh.spec.mjs
// Suite kiểm thử tự động Tính năng Phản Ánh Đứng Tên và Ẩn Danh theo chuẩn POM (Page Object Model)

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { PhanAnhPage } from '../../pages/PhanAnhPage.mjs';
import { TraCuuPhanAnhPage } from '../../pages/TraCuuPhanAnhPage.mjs';
import { getAdminToken, provisionTestEmployee, getEmployeeToken, lookupGrievanceByCode, getOwnGrievances } from '../../helpers/phanAnhApiHelper.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Gửi Phản Ánh Đứng Tên và Ẩn Danh (POM)', () => {
  let context;
  let page;
  let loginPage;
  let phanAnhPage;
  let traCuuPage;

  let adminToken;
  let testEmp;
  let employeeToken;

  const randSuffix = Date.now().toString().slice(-4);
  const anonContent = `Phản ánh ẩn danh (${randSuffix}): Máy lạnh khu vực làm việc phát tiếng kêu lớn, đề nghị bảo trì.`;
  const namedContent = `Phản ánh đứng tên (${randSuffix}): Đề xuất mở rộng gói khám sức khỏe định kỳ cho nhân viên văn phòng.`;
  let capturedAnonTicketCode = '';

  test.beforeAll(async ({ browser }) => {
    // 1. Khởi tạo Context Mobile (Google Pixel 7)
    context = await browser.newContext({
      viewport: { width: 412, height: 915 },
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      isMobile: true,
      hasTouch: true
    });
    page = await context.newPage();

    // 2. Khởi tạo Page Objects
    loginPage = new LoginPage(page);
    phanAnhPage = new PhanAnhPage(page);
    traCuuPage = new TraCuuPhanAnhPage(page);

    // 3. Chuẩn bị nhân viên kiểm thử mới trên Staging
    adminToken = await getAdminToken();
    expect(adminToken, 'Admin Token phải hợp lệ').toBeTruthy();

    const code = `PA${randSuffix}`;
    const fullName = `Nguyễn Văn Phản Ánh ${randSuffix}`;
    const phone = `0905${randSuffix}33`;
    const email = `nv.phananh${randSuffix}@vivacorp.vn`;

    testEmp = await provisionTestEmployee(adminToken, {
      code,
      fullName,
      phone,
      email,
      password: 'Password@123'
    });

    employeeToken = await getEmployeeToken(testEmp.code, testEmp.password);
    expect(employeeToken, 'Token nhân viên phải hợp lệ').toBeTruthy();
  });

  test.afterAll(async () => {
    await context?.close();
  });

  test('PA-01: Đăng nhập App nhân viên, mở màn hình Gửi phản ánh & kiểm tra validation danh tính', async ({ baseURL }) => {
    // 1. Đăng nhập
    await loginPage.navigate(baseURL);
    await loginPage.login(testEmp.code, testEmp.password);
    await loginPage.expectLoginSuccess();

    // 2. Mở trang Gửi phản ánh
    await phanAnhPage.navigate(baseURL);

    // Kiểm tra các thành phần cốt lõi hiện diện
    await expect(phanAnhPage.channelPhanAnhBtn).toBeVisible();
    await expect(phanAnhPage.channelGopYBtn).toBeVisible();
    await expect(phanAnhPage.identityAnonymousBtn).toBeVisible();
    await expect(phanAnhPage.identityNamedBtn).toBeVisible();
    await expect(phanAnhPage.categorySection).toBeVisible();
    await expect(phanAnhPage.contentTextarea).toBeVisible();

    // Chưa chọn danh tính -> nút Gửi bị vô hiệu hóa
    await phanAnhPage.expectSubmitDisabled();
    await phanAnhPage.expectStatusHint(/Chọn Ẩn danh hoặc Đứng tên để gửi/);
  });

  test('PA-02: Validation bắt buộc nội dung sự việc', async () => {
    // Đã chọn danh tính và phân loại nhưng chưa nhập nội dung
    await phanAnhPage.selectIdentity('NAMED');
    await phanAnhPage.selectCategory('Công việc');

    // Nút Gửi vẫn bị vô hiệu hoá
    await phanAnhPage.expectSubmitDisabled();
  });

  test('PA-03: Gửi phản ánh ẨN DANH thành công & kiểm tra cơ chế bảo mật', async () => {
    // Chọn Ẩn danh
    await phanAnhPage.selectIdentity('ANONYMOUS');

    // Kiểm tra bảng cam kết bảo mật cho chế độ ẩn danh
    await expect(phanAnhPage.transparencyPanel).toBeVisible();
    await expect(phanAnhPage.transparencyPanel).toContainText('Không gửi kèm');
    await expect(phanAnhPage.transparencyPanel).toContainText('Họ tên, mã nhân viên');

    // Chọn phân loại & điền nội dung
    await phanAnhPage.selectCategory('Công việc');
    await phanAnhPage.fillContent(anonContent);

    // Nút Gửi đã sáng
    await phanAnhPage.expectSubmitEnabled();
    await phanAnhPage.submit();

    // Màn hình kết quả VBO-PA-07
    await phanAnhPage.expectSubmitSuccess();

    // Lấy mã vé ẩn danh (XXXX-XXXX-XXXX)
    capturedAnonTicketCode = await phanAnhPage.getAnonymousTicketCode();
    expect(capturedAnonTicketCode, 'Mã vé ẩn danh phải có đúng định dạng').toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);

    // Kiểm tra ràng buộc bảo mật: Phải xác nhận đã lưu mã vé mới cho phép chuyển tiếp
    await expect(phanAnhPage.trackNowButton).toBeDisabled();
    await expect(phanAnhPage.backToProfileButton).toBeDisabled();

    // Tích chọn xác nhận
    await phanAnhPage.confirmSavedTicketCode();
    await expect(phanAnhPage.trackNowButton).toBeEnabled();
    await expect(phanAnhPage.backToProfileButton).toBeEnabled();
  });

  test('PA-04: Tra cứu phản ánh ẨN DANH bằng mã vé và đối soát thông tin', async () => {
    // Bấm chuyển sang màn hình tra cứu
    await phanAnhPage.clickTrackNow();
    await expect(page).toHaveURL(/\/phan-anh\/tra-cuu/);

    // Nhập mã vé ẩn danh vừa tạo
    await traCuuPage.lookupByCode(capturedAnonTicketCode);

    // Kiểm tra chi tiết hiển thị
    await traCuuPage.expectLookupDetails({
      ticketCode: capturedAnonTicketCode,
      isAnonymous: true,
      statusText: 'Đã gửi · chờ tiếp nhận',
      content: anonContent
    });

    // Đối soát trực tiếp qua Backend API
    const apiLookup = await lookupGrievanceByCode(capturedAnonTicketCode, employeeToken);
    expect(apiLookup.ok).toBe(true);
    expect(apiLookup.anDanh).toBe(true);
    expect(apiLookup.noiDung).toBe(anonContent);
    expect(apiLookup.trangThai).toBe('DA_GUI');

    // Quay lại trạng thái ban đầu của trang tra cứu
    await traCuuPage.resetLookup();
  });

  test('PA-05: Gửi phản ánh ĐỨNG TÊN thành công & kiểm tra tính minh bạch', async () => {
    // Quay lại trang gửi phản ánh
    await phanAnhPage.navigate(BASE_URL);

    // Chọn Đứng tên
    await phanAnhPage.selectIdentity('NAMED');

    // Chọn phân loại Chế độ phúc lợi & điền nội dung
    await phanAnhPage.selectCategory('Chế độ phúc lợi');
    await phanAnhPage.fillContent(namedContent);

    // Gửi phản ánh
    await phanAnhPage.expectSubmitEnabled();
    await phanAnhPage.submit();

    // Màn hình kết quả VBO-PA-07
    await phanAnhPage.expectSubmitSuccess();

    // Với phản ánh đứng tên:
    // 1. Có thông báo xanh lưu vào tài khoản
    await expect(phanAnhPage.resultSection).toContainText(/Phản ánh đã lưu vào tài khoản của bạn/);

    // 2. Không có checkbox bắt buộc lưu mã vé
    await expect(phanAnhPage.confirmSavedCheckbox).toHaveCount(0);

    // 3. Hai nút chuyển tiếp được kích hoạt sẵn ngay lập tức
    await expect(phanAnhPage.viewMyGrievancesButton).toBeEnabled();
    await expect(phanAnhPage.backToProfileButton).toBeEnabled();
  });

  test('PA-06: Xem phản ánh ĐỨNG TÊN trong danh sách "Phản ánh của tôi"', async () => {
    // Bấm nút "Xem Phản ánh của tôi"
    await phanAnhPage.clickViewMyGrievances();
    await expect(page).toHaveURL(/\/phan-anh\/tra-cuu/);

    // Kiểm tra có danh mục phản ánh đứng tên
    await traCuuPage.expectMyGrievanceItemExists(namedContent);

    // Mở rộng item và xác nhận nội dung
    await traCuuPage.verifyMyGrievanceContent(namedContent);

    // Đối soát qua Backend API
    const ownGrievances = await getOwnGrievances(employeeToken);
    expect(Array.isArray(ownGrievances)).toBe(true);
    const found = ownGrievances.find((g) => g.noiDung === namedContent);
    expect(found, 'Phản ánh đứng tên phải có trong danh sách API phan_anh_cua_toi').toBeTruthy();
    expect(found.trangThai).toBe('DA_GUI');
  });

  test('PA-07: Xác nhận bảo mật danh tính: Phản ánh ẨN DANH không có trong "Phản ánh của tôi"', async () => {
    // Phản ánh ẩn danh tuyệt đối không được lộ trong danh sách "Phản ánh của tôi"
    await traCuuPage.expectAnonymousGrievanceNotListed(anonContent);

    // Đối soát Backend API
    const ownGrievances = await getOwnGrievances(employeeToken);
    const anonFound = ownGrievances.find((g) => g.noiDung === anonContent);
    expect(anonFound, 'Phản ánh ẩn danh TUYỆT ĐỐI KHÔNG xuất hiện trong kết quả API phan_anh_cua_toi').toBeUndefined();
  });
});
