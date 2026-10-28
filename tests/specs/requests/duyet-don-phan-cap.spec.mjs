// tests/specs/requests/duyet-don-phan-cap.spec.mjs
// Suite kiểm thử tự động Luồng Duyệt Đơn Phân Cấp (Multi-Level Approval Hierarchy) theo chuẩn POM
// Kiểm chứng toàn diện: Nhân viên quán -> Quản lý quán; Nhân viên VP -> Trưởng phòng; Trưởng phòng xin nghỉ -> CEO duyệt; Chặn tự duyệt; Quyền phó quản lý.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.mjs';
import { DuyetDonPage } from '../../pages/DuyetDonPage.mjs';

const BASE_URL = (process.env.BASE_URL || 'https://workdemo.vivacorp.vn').trim();

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Luồng Duyệt Đơn Phân Cấp VivaOffice (POM & Approval Hierarchy)', () => {
  let context;
  let page;
  let loginPage;
  let duyetDonPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({
      viewport: { width: 412, height: 915 },
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      isMobile: true,
      hasTouch: true
    });
    page = await context.newPage();
    loginPage = new LoginPage(page);
    duyetDonPage = new DuyetDonPage(page);

    // Đăng nhập một lần duy nhất bằng tài khoản chuẩn Staging
    await loginPage.navigate(BASE_URL);
    await loginPage.login('NVVP01AUTO', 'Password@123');
    await loginPage.expectLoginSuccess();
  });

  test.afterAll(async () => {
    await context?.close();
  });

  test('TC-DD-01: Nhân viên quán gửi đơn -> Quản lý quán (STORE_MANAGER) duyệt đơn thành công', async () => {
    // 1. Cấu hình Mock cho Quản lý quán
    await DuyetDonPage.setupApprovalMocks(page, {
      viewerRole: 'STORE_MANAGER',
      viewerEmployeeId: '22222222-2222-4222-8222-222222222222',
      viewerStoreId: 'store-q1',
      viewerFullName: 'Trần Quản Lý',
      employeeNamesMap: {
        'emp-store-01': 'Nguyễn Văn Pha Chế Quán 1'
      },
      userRolesMap: {
        'emp-store-01': ['EMPLOYEE']
      },
      requests: [
        {
          id: 'req-leave-01',
          employee_id: 'emp-store-01',
          store_id: 'store-q1',
          leave_type: 'ANNUAL',
          start_date: '2026-11-02',
          end_date: '2026-11-03',
          reason: 'Nghỉ phép thường niên giải quyết việc gia đình',
          status: 'pending',
          submitted_at: '2026-10-23T08:00:00Z',
          approved_by: null,
          rejected_by: null,
          reject_reason: null
        }
      ]
    });

    // 2. Điều hướng tới /duyet-don
    await duyetDonPage.navigate(BASE_URL);

    // Kỳ vọng: Thấy thẻ đơn của nhân viên quán mình và có nút "Duyệt"
    await duyetDonPage.expectRequestCardVisible(/Nguyễn Văn Pha Chế Quán 1/i);
    await duyetDonPage.approveFirstRequest(/Nguyễn Văn Pha Chế Quán 1/i);
  });

  test('TC-DD-02: Phó quản lý quán (DEPUTY_MANAGER) có quyền xem nhưng KHÔNG được duyệt (Read-only Guard)', async () => {
    // 1. Cấu hình Mock cho Phó quản lý quán
    await DuyetDonPage.setupApprovalMocks(page, {
      viewerRole: 'DEPUTY_MANAGER',
      viewerEmployeeId: '66666666-6666-4666-8666-666666666666',
      viewerStoreId: 'store-q1',
      viewerFullName: 'Đặng Phó Quản Lý',
      employeeNamesMap: {
        'emp-store-01': 'Nguyễn Văn Pha Chế Quán 1'
      },
      userRolesMap: {
        'emp-store-01': ['EMPLOYEE']
      },
      requests: [
        {
          id: 'req-leave-02',
          employee_id: 'emp-store-01',
          store_id: 'store-q1',
          leave_type: 'ANNUAL',
          start_date: '2026-11-05',
          end_date: '2026-11-06',
          reason: 'Xin nghỉ phép cá nhân',
          status: 'pending',
          submitted_at: '2026-10-23T08:00:00Z',
          approved_by: null,
          rejected_by: null,
          reject_reason: null
        }
      ]
    });

    // 2. Mở /duyet-don
    await duyetDonPage.navigate(BASE_URL);

    // Kỳ vọng: Nút Duyệt và Từ chối bị vô hiệu hoá (disabled)
    const approveBtn = page.getByRole('button', { name: 'Duyệt', exact: true }).first();
    await expect(approveBtn).toBeDisabled();

    // Hiển thị lý do chỉ xem của Phó quản lý
    await expect(page.getByText(/phó quản lý|chỉ xem|quản lý chính/i)).toBeVisible();
  });

  test('TC-DD-03: Nhân viên văn phòng gửi đơn -> Trưởng phòng (DEPT_HEAD) duyệt đơn trong tab Đơn nhân viên', async () => {
    // 1. Cấu hình Mock cho Trưởng phòng
    await DuyetDonPage.setupApprovalMocks(page, {
      viewerRole: 'DEPT_HEAD',
      viewerEmployeeId: '88888888-8888-4888-8888-888888888888',
      viewerStoreId: null, // Khối văn phòng
      viewerFullName: 'Đặng Trưởng Phòng',
      employeeNamesMap: {
        'emp-office-01': 'Lê Văn Phòng (Chuyên viên Marketing)'
      },
      userRolesMap: {
        'emp-office-01': ['EMPLOYEE']
      },
      requests: [
        {
          id: 'req-leave-03',
          employee_id: 'emp-office-01',
          store_id: null,
          leave_type: 'ANNUAL',
          start_date: '2026-11-10',
          end_date: '2026-11-11',
          reason: 'Nghỉ giải quyết việc gia đình',
          status: 'pending',
          submitted_at: '2026-10-23T08:00:00Z',
          approved_by: null,
          rejected_by: null,
          reject_reason: null
        }
      ]
    });

    // 2. Mở /duyet-don
    await duyetDonPage.navigate(BASE_URL);

    // Kỳ vọng: Thấy 2 tab của Trưởng phòng (SPEC-DD-04 & VBO-DD-08)
    await expect(duyetDonPage.deptHeadTabs).toBeVisible();
    await duyetDonPage.selectPanel('phong-ban');

    // Thấy đơn nhân sự phòng mình và duyệt thành công
    await duyetDonPage.expectRequestCardVisible(/Lê Văn Phòng/i);
    await duyetDonPage.approveFirstRequest(/Lê Văn Phòng/i);
  });

  test('TC-DD-04: Trưởng phòng xin nghỉ phép -> Hệ thống chặn tự duyệt (Đơn của tôi không có nút Duyệt)', async () => {
    // 1. Cấu hình Mock: Đơn do chính Trưởng phòng gửi
    await DuyetDonPage.setupApprovalMocks(page, {
      viewerRole: 'DEPT_HEAD',
      viewerEmployeeId: '88888888-8888-4888-8888-888888888888',
      viewerStoreId: null,
      viewerFullName: 'Đặng Trưởng Phòng',
      employeeNamesMap: {
        '88888888-8888-4888-8888-888888888888': 'Đặng Trưởng Phòng'
      },
      userRolesMap: {
        '88888888-8888-4888-8888-888888888888': ['DEPT_HEAD']
      },
      requests: [
        {
          id: 'req-leave-dh',
          employee_id: '88888888-8888-4888-8888-888888888888', // Chính người đang xem
          store_id: null,
          leave_type: 'ANNUAL',
          start_date: '2026-11-15',
          end_date: '2026-11-16',
          reason: 'Trưởng phòng xin nghỉ phép việc cá nhân',
          status: 'pending',
          submitted_at: '2026-10-23T08:00:00Z',
          approved_by: null,
          rejected_by: null,
          reject_reason: null
        }
      ]
    });

    // 2. Mở /duyet-don
    await duyetDonPage.navigate(BASE_URL);

    // Kỳ vọng 1: Tại ngăn "Đơn nhân viên phòng", đơn của chính mình BỊ LỌC BỎ theo quy tắc laDonCuaToi
    await duyetDonPage.selectPanel('phong-ban');
    await expect(page.getByText(/Trưởng phòng xin nghỉ phép/i)).toBeHidden();

    // Kỳ vọng 2: Chuyển sang ngăn "Đơn của tôi", thấy đơn của mình nhưng KHÔNG CÓ nút Duyệt/Từ chối
    await duyetDonPage.selectPanel('cua-toi');
    await duyetDonPage.expectNoApprovalButtons();
  });

  test('TC-DD-05: CEO đăng nhập -> Hệ thống thu hẹp bộ lọc, chỉ hiện đơn Trưởng phòng và ẩn đơn nhân viên thường', async () => {
    // 1. Cấu hình Mock cho CEO: có cả đơn nhân viên quán và đơn của Trưởng phòng
    await DuyetDonPage.setupApprovalMocks(page, {
      viewerRole: 'CEO',
      viewerEmployeeId: '99999999-9999-4999-8999-999999999999',
      viewerStoreId: null,
      viewerFullName: 'Nguyễn Tổng Giám Đốc',
      employeeNamesMap: {
        'emp-store-01': 'Nguyễn Văn Pha Chế Quán 1',
        '88888888-8888-4888-8888-888888888888': 'Đặng Trưởng Phòng Kế Hoạch'
      },
      userRolesMap: {
        'emp-store-01': ['EMPLOYEE'],
        '88888888-8888-4888-8888-888888888888': ['DEPT_HEAD']
      },
      requests: [
        {
          id: 'req-leave-store',
          employee_id: 'emp-store-01',
          store_id: 'store-q1',
          leave_type: 'ANNUAL',
          start_date: '2026-11-20',
          end_date: '2026-11-21',
          reason: 'Đơn nhân viên quán',
          status: 'pending',
          submitted_at: '2026-10-23T08:00:00Z',
          approved_by: null,
          rejected_by: null,
          reject_reason: null
        },
        {
          id: 'req-leave-dh-ceo',
          employee_id: '88888888-8888-4888-8888-888888888888',
          store_id: null,
          leave_type: 'ANNUAL',
          start_date: '2026-11-22',
          end_date: '2026-11-23',
          reason: 'Trưởng phòng xin nghỉ phép công tác gia đình',
          status: 'pending',
          submitted_at: '2026-10-23T08:00:00Z',
          approved_by: null,
          rejected_by: null,
          reject_reason: null
        }
      ]
    });

    // 2. Mở /duyet-don
    await duyetDonPage.navigate(BASE_URL);

    // Kỳ vọng 1: Banner thu hẹp việc của CEO hiển thị rõ ràng (SPEC-DD-07)
    await duyetDonPage.expectCeoFilterBannerVisible();

    // Kỳ vọng 2: Đơn của nhân viên quán bị ẩn (vì đã có Quản lý quán duyệt)
    await expect(page.getByText('Đơn nhân viên quán')).toBeHidden();

    // Kỳ vọng 3: Đơn của Trưởng phòng Đặng Trưởng Phòng hiển thị
    await duyetDonPage.expectRequestCardVisible(/Đặng Trưởng Phòng/i);
  });

  test('TC-DD-06: CEO phê duyệt đơn xin nghỉ phép của Trưởng phòng thành công', async () => {
    // 1. Cấu hình Mock CEO duyệt đơn Trưởng phòng
    await DuyetDonPage.setupApprovalMocks(page, {
      viewerRole: 'CEO',
      viewerEmployeeId: '99999999-9999-4999-8999-999999999999',
      viewerStoreId: null,
      viewerFullName: 'Nguyễn Tổng Giám Đốc',
      employeeNamesMap: {
        '88888888-8888-4888-8888-888888888888': 'Đặng Trưởng Phòng Kế Hoạch'
      },
      userRolesMap: {
        '88888888-8888-4888-8888-888888888888': ['DEPT_HEAD']
      },
      requests: [
        {
          id: 'req-leave-dh-ceo-2',
          employee_id: '88888888-8888-4888-8888-888888888888',
          store_id: null,
          leave_type: 'ANNUAL',
          start_date: '2026-11-25',
          end_date: '2026-11-26',
          reason: 'Trưởng phòng xin nghỉ phép cuối năm',
          status: 'pending',
          submitted_at: '2026-10-23T08:00:00Z',
          approved_by: null,
          rejected_by: null,
          reject_reason: null
        }
      ]
    });

    // 2. Mở /duyet-don
    await duyetDonPage.navigate(BASE_URL);

    // Kỳ vọng: CEO duyệt đơn của Trưởng phòng thành công
    await duyetDonPage.expectRequestCardVisible(/Đặng Trưởng Phòng/i);
    await duyetDonPage.approveFirstRequest(/Đặng Trưởng Phòng/i);
  });
});
