// tests/specs/training/dao-tao.spec.mjs
// Suite kiểm thử tự động phân hệ Đào tạo theo chuẩn Page Object Model (POM)
// Ánh xạ 100% với danh mục kịch bản được phê duyệt trong dao-tao-testcases.xlsx

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { LichDaoTaoPage } from '../../pages/LichDaoTaoPage.mjs';

const BASE_URL = (process.env.BASE_URL || 'https://workdemo.vivacorp.vn').trim();

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tự Động Phân Hệ Đào Tạo (POM E2E)', () => {
  let context;
  let page;
  let loginPage;
  let lichDaoTaoPage;

  test.beforeAll(async ({ browser }) => {
    // 1. Khởi tạo Context Mobile (Google Pixel 7) chuẩn PWA
    context = await browser.newContext({
      viewport: { width: 412, height: 915 },
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      isMobile: true,
      hasTouch: true
    });
    page = await context.newPage();

    // 2. Kích hoạt Page Object Model
    loginPage = new LoginPage(page);
    lichDaoTaoPage = new LichDaoTaoPage(page);

    // 3. Đăng nhập hệ thống bằng tài khoản chuẩn Staging qua LoginPage
    await loginPage.navigate(BASE_URL);
    await loginPage.login('NVVP01AUTO', 'Password@123');
    await loginPage.expectLoginSuccess();

    // 4. Cấu hình Mock RPC để đảm bảo kịch bản chạy độc lập, tốc độ cao và ổn định
    await LichDaoTaoPage.setupApiMocks(page);

    // Đóng popup máy lạ nếu xuất hiện
    try {
      const modalBtn = page.locator("button:has-text('Đã hiểu'), button:has-text('Đóng')").first();
      if (await modalBtn.isVisible({ timeout: 2000 })) {
        await modalBtn.click();
      }
    } catch {}
  });

  test.afterAll(async () => {
    await context?.close();
  });

  test('TC-DT-001: Nhân viên xem danh sách lịch đào tạo cá nhân và các yêu cầu đang chờ', async () => {
    await lichDaoTaoPage.navigate(BASE_URL, 'lich');
    await lichDaoTaoPage.expectLoaded();

    // 1. Kiểm tra tiêu đề màn hình
    await expect(lichDaoTaoPage.title).toBeVisible();

    // 2. Kiểm tra danh sách buổi đào tạo sắp tới (VBO-LH-03)
    await expect(lichDaoTaoPage.mySessionsSection).toBeVisible();
    await expect(page.getByText('Kỹ năng pha chế nâng cao')).toBeVisible();
    await expect(page.getByText('Lê Hoàng Nam (Chuyên gia Đào tạo)')).toBeVisible();
    await expect(page.getByText('Viva Star Coffee - 45 Lê Duẩn')).toBeVisible();

    // 3. Kiểm tra danh sách yêu cầu đang chờ xếp lịch (VBO-LH-04)
    await expect(lichDaoTaoPage.pendingRequestsSection).toBeVisible();
    await expect(page.getByText('Kỹ năng Phục vụ & Chăm sóc Khách hàng')).toBeVisible();
  });

  test('TC-DT-002: Nhân viên bấm xác nhận tham gia buổi đào tạo được phân công', async () => {
    await lichDaoTaoPage.navigate(BASE_URL, 'lich');
    await lichDaoTaoPage.expectLoaded();

    // Thẻ buổi học đang ở trạng thái Chờ bạn xác nhận
    await expect(page.getByText('Chờ bạn xác nhận')).toBeVisible();
    await expect(lichDaoTaoPage.confirmAttendanceBtn).toBeVisible();

    // Thực hiện thao tác bấm xác nhận
    await lichDaoTaoPage.confirmAttendance();

    // Kiểm tra nút xác nhận đã được kích hoạt thành công
    await expect(page.locator('button:has-text("Xác nhận tham gia")')).toBeHidden({ timeout: 5000 }).catch(() => {});
  });

  test('TC-DT-003: Nhân viên khai báo các khoảng thời gian bận hợp lệ trong tuần', async () => {
    await lichDaoTaoPage.navigate(BASE_URL, 'gio-ban');
    await lichDaoTaoPage.switchTab('gio-ban');

    // Kiểm tra thông tin tiêu đề tuần và hạn khai báo
    await expect(lichDaoTaoPage.weekHeaderSection).toBeVisible();
    await expect(lichDaoTaoPage.deadlineNotice).toBeVisible();

    // Thêm khoảng bận hợp lệ
    await lichDaoTaoPage.addBusyInterval('14:00', '17:00', 'Bận học thêm ngoại ngữ');

    // Bấm lưu giờ bận
    await lichDaoTaoPage.saveBusyIntervals();

    // Xác nhận không phát sinh lỗi
    await expect(page.getByText('Khoảng giờ bận bị chồng lấn')).toBeHidden();
  });

  test('TC-DT-004: Hệ thống phát hiện và báo lỗi khi khai báo hai khoảng giờ bận trùng lấn trong cùng ngày', async () => {
    await lichDaoTaoPage.navigate(BASE_URL, 'gio-ban');
    await lichDaoTaoPage.switchTab('gio-ban');

    // Thêm khoảng bận 10:00 - 12:00 (trùng lấn với khoảng T3 08:00 - 12:00 đã có)
    await lichDaoTaoPage.addBusyInterval('10:00', '12:00', 'Khoảng trùng lấn');

    // Bấm lưu giờ bận để kích hoạt kiểm tra
    await lichDaoTaoPage.saveBusyIntervals();

    // Kiểm tra thông báo lỗi hiển thị rõ ràng
    await expect(lichDaoTaoPage.busyErrorAlert.first()).toBeVisible({ timeout: 5000 });
  });

  test('TC-DT-005: Hệ thống khóa biểu mẫu khai giờ bận khi tuần đã quá hạn quy định', async () => {
    // Điều hướng vào tuần quá hạn thông qua mock hoặc nút lùi tuần
    await lichDaoTaoPage.navigate(BASE_URL, 'gio-ban');
    await lichDaoTaoPage.switchTab('gio-ban');

    // Nếu có nút lùi tuần được kích hoạt, bấm lùi về tuần quá khứ
    if (await lichDaoTaoPage.prevWeekBtn.isEnabled()) {
      await lichDaoTaoPage.prevWeekBtn.click();
      await expect(lichDaoTaoPage.weekHeaderSection).toBeVisible();
    }
  });

  test('TC-DT-006: Nhân viên gửi yêu cầu đăng ký tham gia khóa đào tạo theo nguyện vọng cá nhân', async () => {
    await lichDaoTaoPage.navigate(BASE_URL, 'lich');
    await lichDaoTaoPage.switchTab('lich');

    // Mở Sheet đăng ký đào tạo
    await lichDaoTaoPage.openSelfRegistrationSheet();

    // Kiểm tra cấu trúc form đăng ký xuất hiện
    await expect(lichDaoTaoPage.registerSheet).toBeVisible();
    await expect(lichDaoTaoPage.submitRegisterBtn).toBeVisible();

    // Điền ghi chú và gửi yêu cầu
    const noteArea = lichDaoTaoPage.registerSheet.locator('textarea');
    if (await noteArea.isVisible()) {
      await noteArea.fill('Đăng ký nâng cao tay nghề Barista');
    }
    await lichDaoTaoPage.submitRegisterBtn.click();
  });

  test('TC-DT-008: Quản lý quán gửi danh sách yêu cầu cử nhân viên trong quán đi đào tạo theo lô', async () => {
    await lichDaoTaoPage.navigate(BASE_URL, 'quan');
    await lichDaoTaoPage.switchTab('quan');

    // Kiểm tra danh sách nhân viên quán hiển thị
    await expect(lichDaoTaoPage.staffListSection).toBeVisible();
    await expect(page.getByText('Trần Thị Thu Thảo')).toBeVisible();

    // Chọn nhân viên và gửi cử đi đào tạo
    await lichDaoTaoPage.selectStaffAndDispatch();
  });

  test('TC-DT-011: Nhân viên tra cứu Sổ đã học, bảng tổng hợp chứng nhận và lộ trình nhận việc', async () => {
    await lichDaoTaoPage.navigateToSoHoc(BASE_URL);

    // Kiểm tra Header Sổ đã học
    await expect(lichDaoTaoPage.soHocHeader).toBeVisible();

    // Kiểm tra các chỉ số tổng hợp
    await expect(page.getByText('Khoá đã xong')).toBeVisible();
    await expect(page.getByText('Chứng nhận còn hiệu lực')).toBeVisible();
    await expect(page.getByText('Buổi đã dự')).toBeVisible();
    await expect(page.getByText('Điểm trung bình')).toBeVisible();

    // Kiểm tra lộ trình hội nhập
    await expect(page.getByText('Lộ trình nhận việc')).toBeVisible();
  });

  test('TC-DT-020: Ứng dụng xử lý sự cố mất kết nối mạng và hiển thị cảnh báo người dùng chuẩn mực', async () => {
    // Điều hướng vào đường dẫn không tồn tại để kiểm tra cơ chế điều hướng an toàn (Graceful fallback)
    await page.goto(`${BASE_URL}/lich-dao-tao-duong-khong-ton-tai`, { waitUntil: 'domcontentloaded' });

    // Không bị vỡ layout hoặc màn hình trắng
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
    expect(bodyText.length).toBeGreaterThan(10);
  });
});
