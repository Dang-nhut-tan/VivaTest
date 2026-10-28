// tests/specs/requests/don-tu.spec.mjs
// Kịch bản kiểm thử E2E chuẩn Page Object Model (POM) cho Đơn từ & Xác nhận công (bổ sung công)

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { DonTuPage } from '../../pages/DonTuPage.mjs';
import {
  getAdminToken,
  provisionTestEmployee,
  getAttendanceConfirmRequests,
  getLeaveRequests,
  decideAttendanceConfirmRequest,
  decideLeaveRequest
} from '../../helpers/donTuApiHelper.mjs';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Đơn từ & Đơn xác nhận công (POM)', () => {
  let context;
  let page;
  let loginPage;
  let donTuPage;

  let adminToken;
  let testEmp;

  const yesterdayIso = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  // Ngày nghỉ phép từ hôm nay + 3 ngày đến + 4 ngày
  const targetFromDate = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
  const targetToDate = new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10);

  const leaveReason = 'Nghỉ giải quyết việc gia đình cá nhân';
  const confirmNote = 'Quên chấm công buổi sáng do vội vào họp dự án';
  const pastTimeIn = '08:30';

  test.beforeAll(async ({ browser }) => {
    // 1. Khởi tạo Context Mobile (Google Pixel 7)
    context = await browser.newContext({
      viewport: { width: 412, height: 915 },
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      isMobile: true,
      hasTouch: true
    });
    page = await context.newPage();

    // 2. Khởi tạo các Page Objects
    loginPage = new LoginPage(page);
    donTuPage = new DonTuPage(page);

    // 3. Lấy token Admin
    adminToken = await getAdminToken();
    expect(adminToken, 'Admin Token phải hợp lệ').toBeTruthy();

    // 4. Cấp tài khoản nhân viên kiểm thử mới
    const randSuffix = Date.now().toString().slice(-4);
    const code = `DT${randSuffix}`;
    const fullName = `Nguyễn Văn Đơn Từ ${randSuffix}`;
    const phone = `0903${randSuffix}22`;
    const email = `nv.dontu${randSuffix}@vivacorp.vn`;

    testEmp = await provisionTestEmployee(adminToken, {
      code,
      fullName,
      phone,
      email
    });

    expect(testEmp.empId, 'Mã ID nhân viên kiểm thử phải được cấp').toBeTruthy();
  });

  test.afterAll(async () => {
    if (context) {
      await context.close();
    }
  });

  test('TC-01: Đăng nhập App nhân viên và mở màn hình Đơn từ (/don-tu)', async ({ baseURL }) => {
    // Bước 1: Mở trang đăng nhập
    await loginPage.navigate(baseURL);

    // Bước 2: Đăng nhập với tài khoản nhân viên vừa tạo
    await loginPage.login(testEmp.code, testEmp.password);
    await loginPage.expectLoginSuccess();

    // Bước 3: Điều hướng tới trang Đơn từ (/don-tu)
    await donTuPage.navigate(baseURL);
    await donTuPage.expectLoaded();

    // Kỳ vọng: Nhân viên mới chưa có đơn nào -> hiển thị "Bạn chưa gửi đơn nào"
    await expect(donTuPage.myRequestsContainer).toContainText(/chưa gửi đơn nào/i);
  });

  test('TC-02: Kiểm tra Validation form Đơn xin nghỉ phép (Chặn gửi khi thiếu Lý do)', async () => {
    // Bước 1: Bấm nút "Tạo đơn"
    await donTuPage.openCreateSheet();

    // Bước 2: Chọn loại đơn "Nghỉ phép"
    await donTuPage.createSheet.selectLeaveRequest();
    await donTuPage.leaveSheet.expectOpen();

    // Bước 3: Chưa nhập lý do (đang để trống)
    // Kỳ vọng: Nút "Gửi đơn nghỉ" phải bị vô hiệu hoá (disabled)
    await donTuPage.leaveSheet.expectSubmitDisabled();

    // Bước 4: Đóng sheet nghỉ phép
    await donTuPage.leaveSheet.close();
  });

  test('TC-03: Gửi Đơn xin nghỉ phép hợp lệ (Leave Request)', async () => {
    // Bước 1: Mở lại sheet Tạo đơn và chọn Nghỉ phép
    await donTuPage.openCreateSheet();
    await donTuPage.createSheet.selectLeaveRequest();
    await donTuPage.leaveSheet.expectOpen();

    // Bước 2: Điền đầy đủ thông tin: Phép năm, khoảng ngày nghỉ, lý do
    await donTuPage.leaveSheet.fillDateRange(targetFromDate, targetToDate);
    await donTuPage.leaveSheet.fillReason(leaveReason);

    // Kỳ vọng: Nút gửi đã sẵn sàng (enabled)
    await donTuPage.leaveSheet.expectSubmitEnabled();

    // Bước 3: Bấm nút "Gửi đơn nghỉ"
    await donTuPage.leaveSheet.submit();

    // Kỳ vọng 1: Sheet gửi đơn tự động đóng
    await donTuPage.leaveSheet.expectClosed();

    // Kỳ vọng 2: Đơn xuất hiện trong danh sách "Đơn của tôi" với trạng thái "Chờ duyệt"
    await donTuPage.expectRequestCardVisible({
      typeTitle: /Nghỉ.*phép/i,
      statusText: 'Chờ duyệt'
    });
  });

  test('TC-04: Kiểm tra Validation Đơn xác nhận công (Chọn "Quên chấm công vào" mà chưa nhập Giờ vào thực tế)', async () => {
    // Bước 1: Bấm nút "Tạo đơn"
    await donTuPage.openCreateSheet();

    // Bước 2: Chọn loại đơn "Xác nhận công"
    await donTuPage.createSheet.selectAttendanceConfirm();
    await donTuPage.attendanceConfirmSheet.expectOpen();

    // Bước 3: Chọn lý do "Quên chấm công vào" (để trống ô Giờ vào thực tế)
    await donTuPage.attendanceConfirmSheet.selectReason('QUEN_CHAM_VAO');

    // Kỳ vọng 1: Hệ thống hiển thị câu hướng dẫn chỉ rõ mốc giờ bắt buộc
    await donTuPage.attendanceConfirmSheet.expectMissingTimeWarning(/phải điền.*Giờ vào thực tế/i);

    // Kỳ vọng 2: Nút "Gửi cho Quản lý" bị vô hiệu hoá (disabled)
    await donTuPage.attendanceConfirmSheet.expectSubmitDisabled();

    // Bước 4: Đóng sheet xác nhận công
    await donTuPage.attendanceConfirmSheet.close();
  });

  test('TC-05: Gửi Đơn xác nhận công bổ sung hợp lệ (Attendance Confirm Request)', async () => {
    // Bước 1: Mở lại sheet Tạo đơn và chọn Xác nhận công
    await donTuPage.openCreateSheet();
    await donTuPage.createSheet.selectAttendanceConfirm();
    await donTuPage.attendanceConfirmSheet.expectOpen();

    // Bước 2: Điền form hợp lệ: Ngày công, lý do, giờ vào thực tế, mô tả chi tiết
    await donTuPage.attendanceConfirmSheet.submitAttendanceConfirm({
      date: yesterdayIso,
      reason: 'QUEN_CHAM_VAO',
      timeIn: pastTimeIn,
      note: confirmNote
    });

    // Kỳ vọng 1: Sheet xác nhận công tự động đóng
    await donTuPage.attendanceConfirmSheet.expectClosed();

    // Đồng bộ danh sách
    await donTuPage.reload();

    // Kỳ vọng 2: Đơn xuất hiện trong danh sách "Đơn của tôi" với trạng thái "Chờ duyệt"
    await donTuPage.expectRequestCardVisible({
      typeTitle: /Xác.*nhận công/i,
      statusText: 'Chờ duyệt'
    });
  });

  test('TC-06: Mở biểu mẫu Xác nhận công trực tiếp qua URL query param (?don=xac-nhan-cong)', async ({ baseURL }) => {
    // Điều hướng trực tiếp tới URL hỗ trợ Deep-link / Quick-link
    await donTuPage.navigateDirectAttendanceConfirm(baseURL);

    // Kỳ vọng: Sheet Xác nhận công tự động mở sẵn
    await donTuPage.attendanceConfirmSheet.expectOpen();

    // Đóng sheet lại để trả trạng thái màn hình bình thường
    await donTuPage.attendanceConfirmSheet.close();
  });

  test('TC-07: Đối soát Database PostgREST API (Xác nhận các bản ghi đã lưu vào DB kho thật)', async () => {
    // 1. Kiểm tra bảng `leave_request`
    const leaveRequests = await getLeaveRequests(testEmp.empId, adminToken);
    expect(leaveRequests.length, 'Phải có ít nhất 1 bản ghi đơn nghỉ phép trong DB').toBeGreaterThanOrEqual(1);

    const targetLeave = leaveRequests.find(r => r.reason.includes(leaveReason) || r.reason.includes('gia đình'));
    expect(targetLeave, 'Phải tìm thấy đơn nghỉ phép vừa gửi trong DB').toBeTruthy();
    expect(targetLeave.status, 'Trạng thái ban đầu của đơn nghỉ phép phải là pending').toBe('pending');
    expect(targetLeave.start_date).toBe(targetFromDate);

    // 2. Kiểm tra bảng `attendance_confirm_request`
    const confirmRequests = await getAttendanceConfirmRequests(testEmp.empId, adminToken);
    expect(confirmRequests.length, 'Phải có ít nhất 1 bản ghi đơn xác nhận công trong DB').toBeGreaterThanOrEqual(1);

    const targetConfirm = confirmRequests.find(r => r.reason_code === 'QUEN_CHAM_VAO');
    expect(targetConfirm, 'Phải tìm thấy đơn xác nhận công vừa gửi trong DB').toBeTruthy();
    expect(targetConfirm.status, 'Trạng thái ban đầu của đơn xác nhận công phải là pending').toBe('pending');
    expect(targetConfirm.work_date).toBe(yesterdayIso);
  });

  test('TC-08: Quản lý / HR phê duyệt các đơn từ -> Màn hình cập nhật trạng thái "Đã duyệt"', async () => {
    // 1. Lấy ID đơn từ DB
    const leaveRequests = await getLeaveRequests(testEmp.empId, adminToken);
    const targetLeave = leaveRequests.find(r => r.status === 'pending');
    expect(targetLeave, 'Phải có đơn nghỉ phép pending để duyệt').toBeTruthy();

    const confirmRequests = await getAttendanceConfirmRequests(testEmp.empId, adminToken);
    const targetConfirm = confirmRequests.find(r => r.status === 'pending');
    expect(targetConfirm, 'Phải có đơn xác nhận công pending để duyệt').toBeTruthy();

    // 2. Quản lý / HR duyệt Đơn nghỉ phép
    await decideLeaveRequest(targetLeave.id, adminToken, 'approved', 'Duyệt đơn nghỉ phép qua Automation');

    // 3. Quản lý / HR duyệt Đơn xác nhận công
    await decideAttendanceConfirmRequest(targetConfirm.id, adminToken, 'approved');

    // 4. Tải lại màn hình Đơn từ
    await donTuPage.reload();

    // Kỳ vọng 1: Đơn nghỉ phép chuyển sang trạng thái "Đã duyệt"
    await donTuPage.expectRequestCardVisible({
      typeTitle: /Nghỉ.*phép/i,
      statusText: 'Đã duyệt'
    });

    // Kỳ vọng 2: Đơn xác nhận công chuyển sang trạng thái "Đã duyệt"
    await donTuPage.expectRequestCardVisible({
      typeTitle: /Xác.*nhận công/i,
      statusText: 'Đã duyệt'
    });
  });
});
