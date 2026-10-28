// tests/pages/DuyetDonPage.mjs
// Page Object Model đại diện cho Màn hình Duyệt đơn (/duyet-don) trên VivaOffice App

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';

export class DuyetDonPage extends BasePage {
  constructor(page) {
    super(page);

    // Header & Điều hướng
    this.header = page.locator('[data-section="VBO-DD-01"]');
    this.title = page.getByRole('heading', { name: /duyệt đơn/i }).or(page.getByText('Duyệt đơn').first());
    this.backButton = page.getByRole('button', { name: 'Quay lại' });

    // Ngăn Trưởng phòng (SPEC-DD-04 & VBO-DD-08)
    this.deptHeadTabs = page.locator('[data-section="VBO-DD-08"]');
    this.deptStaffTab = this.deptHeadTabs.getByRole('button', { name: /đơn nhân viên/i });
    this.myRequestsTab = this.deptHeadTabs.getByRole('button', { name: /đơn của tôi/i });

    // Bộ lọc loại đơn
    this.filterAll = page.getByRole('button', { name: 'Tất cả' });
    this.filterLeave = page.getByRole('button', { name: 'Nghỉ phép' });
    this.filterShiftSwap = page.getByRole('button', { name: 'Đổi ca' });
    this.filterOvertime = page.getByRole('button', { name: 'Tăng ca' });
    this.filterAttendanceConfirm = page.getByRole('button', { name: 'Xác nhận công' });
    this.filterLocation = page.getByRole('button', { name: 'Đổi địa điểm' });

    // Danh sách đơn & Trạng thái rỗng
    this.requestsList = page.locator('[data-section="VBO-DD-03"]');
    this.emptyState = page.getByText(/không có đơn nào khớp bộ lọc/i);

    // Cảnh báo & Thu hẹp CEO (SPEC-DD-07)
    this.ceoBanner = page.getByText(/chỉ hiện đơn của các trưởng phòng ban/i);
    this.warningBanner = page.locator('[data-section="VBO-DD-09"]');

    // Thao tác duyệt & từ chối
    this.approveButtons = page.getByRole('button', { name: 'Duyệt', exact: true });
    this.rejectButtons = page.getByRole('button', { name: 'Từ chối', exact: true });

    // Sheet từ chối (VBO-DD-06)
    this.rejectSheet = page.locator('[data-section="VBO-DD-06"]');
    this.rejectReasonInput = page.getByRole('textbox', { name: /lý do/i });
    this.confirmRejectButton = page.getByRole('button', { name: 'Xác nhận từ chối' });
    this.cancelRejectButton = this.rejectSheet.getByRole('button', { name: 'Quay lại' });
  }

  /**
   * Điều hướng trực tiếp tới màn hình Duyệt đơn
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/duyet-don?web=thu`, { waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }

  /**
   * Kiểm tra màn hình đã tải xong các thành phần cơ bản
   */
  async expectLoaded() {
    await expect(this.page).toHaveURL(/.*\/duyet-don/);
    await expect(this.title).toBeVisible({ timeout: 10000 });
  }

  /**
   * Chọn tab Ngăn trưởng phòng (Đơn nhân viên phòng vs Đơn của tôi)
   * @param {'phong-ban' | 'cua-toi'} panel
   */
  async selectPanel(panel) {
    await expect(this.deptHeadTabs).toBeVisible({ timeout: 5000 });
    if (panel === 'phong-ban') {
      await this.deptStaffTab.click();
    } else {
      await this.myRequestsTab.click();
    }
  }

  /**
   * Kiểm tra thẻ đơn cụ thể có xuất hiện trên danh sách
   * @param {string|RegExp} pattern
   */
  async expectRequestCardVisible(pattern) {
    const card = this.requestsList.filter({ hasText: pattern }).first();
    await expect(card).toBeVisible({ timeout: 8000 });
    return card;
  }

  /**
   * Duyệt đơn đầu tiên hoặc đơn khớp nội dung
   * @param {string|RegExp} [matchText]
   */
  async approveFirstRequest(matchText) {
    let card = this.requestsList;
    if (matchText) {
      card = this.requestsList.filter({ hasText: matchText }).first();
    }
    const btn = card.getByRole('button', { name: 'Duyệt', exact: true }).first();
    await expect(btn).toBeVisible({ timeout: 5000 });
    await expect(btn).toBeEnabled({ timeout: 5000 });
    await btn.click();

    // Xác nhận không xuất hiện toast báo lỗi "Yêu cầu không hợp lệ"
    await expect(this.page.getByText(/yêu cầu không hợp lệ/i)).toBeHidden();
  }

  /**
   * Kiểm tra thông báo duyệt thành công xuất hiện trên màn hình
   */
  async expectApprovalSuccessToast() {
    const toast = this.page.getByText(/đã duyệt/i).first();
    await expect(toast).toBeVisible({ timeout: 8000 });
    await expect(this.page.getByText(/yêu cầu không hợp lệ/i)).toBeHidden();
  }

  /**
   * Kiểm tra thông báo từ chối thành công xuất hiện trên màn hình
   */
  async expectRejectSuccessToast() {
    const toast = this.page.getByText(/đã từ chối/i).first();
    await expect(toast).toBeVisible({ timeout: 5000 });
  }

  /**
   * Từ chối đơn đầu tiên và nhập lý do bắt buộc
   * @param {string} reason
   * @param {string|RegExp} [matchText]
   */
  async rejectFirstRequest(reason, matchText) {
    let card = this.requestsList;
    if (matchText) {
      card = this.requestsList.filter({ hasText: matchText }).first();
    }
    const btn = card.getByRole('button', { name: 'Từ chối', exact: true }).first();
    await expect(btn).toBeVisible({ timeout: 5000 });
    await expect(btn).toBeEnabled({ timeout: 5000 });
    await btn.click();

    // Điền lý do bắt buộc trong Sheet
    await expect(this.rejectSheet).toBeVisible({ timeout: 5000 });
    await this.rejectReasonInput.fill(reason);
    await expect(this.confirmRejectButton).toBeEnabled();
    await this.confirmRejectButton.click();
  }

  /**
   * Kiểm tra thông báo chỉ hiện đơn trưởng phòng của CEO
   */
  async expectCeoFilterBannerVisible() {
    await expect(this.ceoBanner).toBeVisible({ timeout: 8000 });
  }

  /**
   * Kiểm tra không có nút duyệt (dành cho tự duyệt hoặc quyền read-only)
   */
  async expectNoApprovalButtons() {
    await expect(this.approveButtons).toHaveCount(0);
    await expect(this.rejectButtons).toHaveCount(0);
  }

  /**
   * Cấu hình giả lập Mock API đa cấp phê duyệt (Store Manager, Dept Head, CEO, Read-Only)
   * @param {import('@playwright/test').Page} page
   * @param {object} scenarioConfig
   */
  static async setupApprovalMocks(page, scenarioConfig = {}) {
    const DEFAULT_ROLE_IDS = {
      STORE_MANAGER: '22222222-2222-4222-8222-222222222222',
      DEPUTY_MANAGER: '66666666-6666-4666-8666-666666666666',
      DEPT_HEAD: '88888888-8888-4888-8888-888888888888',
      CEO: '99999999-9999-4999-8999-999999999999'
    };

    const {
      viewerRole = 'STORE_MANAGER',
      viewerEmployeeId = DEFAULT_ROLE_IDS[viewerRole] || '22222222-2222-4222-8222-222222222222',
      viewerStoreId = (viewerRole === 'STORE_MANAGER' || viewerRole === 'DEPUTY_MANAGER') ? 'store-q1' : null,
      viewerFullName = 'Người duyệt kiểm thử',
      requests = [],
      userRolesMap = {},
      employeeNamesMap = {}
    } = scenarioConfig;

    const mockRequests = JSON.parse(JSON.stringify(requests));

    // Cập nhật session storage và localStorage để RequireRole nhận diện đúng vai trò
    try {
      await page.evaluate(({ role, empId }) => {
        for (const storage of [window.localStorage, window.sessionStorage]) {
          try {
            const raw = storage.getItem('viva.bo.session.v1');
            if (raw) {
              const data = JSON.parse(raw);
              if (data?.user) {
                data.user.role = role;
                data.user.roles = [role];
                data.user.id = empId;
                storage.setItem('viva.bo.session.v1', JSON.stringify(data));
              }
            }
          } catch {}
        }
      }, { role: viewerRole, empId: viewerEmployeeId });
    } catch {}

    await page.unrouteAll({ behavior: 'ignoreErrors' }).catch(() => {});
    await page.route((url) => url.pathname.includes('/api/'), async (route) => {
      const pathname = route.request().url();
      const method = route.request().method();

      // 0. App User
      if (pathname.includes('/app_user')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{ id: viewerEmployeeId, employee_id: viewerEmployeeId }])
        });
      }

      // 1. Employee Assignment / myScope
      if (pathname.includes('/employment_assignment')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 'assign-01',
              employee_id: viewerEmployeeId,
              store_id: viewerStoreId,
              department_id: viewerStoreId ? null : 'dept-01',
              is_primary: true,
              valid_from: '2026-01-01',
              valid_to: null
            }
          ])
        });
      }

      // 1b. Store Info
      if (pathname.includes('/store')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: viewerStoreId || 'store-01',
              name: viewerStoreId ? 'Quán Cà Phê Viva Q1' : 'Khối Văn Phòng'
            }
          ])
        });
      }

      // 2. Employee Names
      if (pathname.includes('/employee?')) {
        const rows = Object.entries(employeeNamesMap).map(([id, name]) => ({
          id,
          full_name: name,
          employee_code: `CODE-${id}`
        }));
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(rows)
        });
      }

      // 3. User Roles lookup (locDonTheoVaiNguoiGui & docLaiVai)
      if (pathname.includes('/user_role')) {
        const rows = [
          {
            employee_id: viewerEmployeeId,
            role: viewerRole,
            store_id: viewerStoreId,
            area_id: null
          }
        ];
        for (const [empId, roles] of Object.entries(userRolesMap)) {
          for (const r of roles) {
            rows.push({
              employee_id: empId,
              role: r,
              store_id: null,
              area_id: null
            });
          }
        }
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(rows)
        });
      }

      // 4. Leave Request
      if (pathname.includes('/leave_request')) {
        if (method === 'PATCH') {
          try {
            const patchData = route.request().postDataJSON();
            if (patchData?.status) {
              for (const r of mockRequests) {
                if (pathname.includes(r.id)) {
                  r.status = patchData.status;
                  if (patchData.reject_reason) r.reject_reason = patchData.reject_reason;
                  if (patchData.rejected_by) r.rejected_by = patchData.rejected_by;
                }
              }
            }
          } catch {}
          return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([{ id: 'mock-updated', status: 'approved' }])
          });
        }
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockRequests)
        });
      }

      // 4b. RPC duyet_don_nghi (Hàm kho phê duyệt nghỉ phép - SPEC-PH-69 & YC-64)
      if (pathname.includes('duyet_don_nghi')) {
        let reqId = 'req-leave-01';
        try {
          const postData = route.request().postDataJSON();
          if (postData?.p_id || postData?.id) reqId = postData.p_id || postData.id;
        } catch {}
        const matched = mockRequests.find(r => r.id === reqId);
        if (matched) matched.status = 'approved';
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            ok: true,
            donId: reqId,
            daApDungTuTruoc: false,
            soNgayTruPhep: 2,
            soNgayKhongLuong: 0,
            canhBao: ''
          })
        });
      }

      // 4c. RPC duyet_doi_ca (Hàm kho phê duyệt đổi ca - SPEC-CA-60)
      if (pathname.includes('duyet_doi_ca')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            ok: true,
            daXuLyTruocDo: false,
            soDongLichDaDoi: 1
          })
        });
      }

      // 4d. RPC duyet_doi_dia_diem
      if (pathname.includes('duyet_doi_dia_diem')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            ok: true
          })
        });
      }

      // 5. Other requests (shift swap, overtime, confirm, location)
      if (
        pathname.includes('/shift_change_request') ||
        pathname.includes('/overtime_request') ||
        pathname.includes('/attendance_confirm_request') ||
        pathname.includes('/employee_location_change_request') ||
        pathname.includes('/work_location_change_day') ||
        pathname.includes('/saturday_swap_request') ||
        pathname.includes('/salary_advance_request')
      ) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      }

      // 6. Approval notify
      if (pathname.includes('/approval_notify')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      }

      // Pass-through anything else
      return route.continue();
    });
  }
}
