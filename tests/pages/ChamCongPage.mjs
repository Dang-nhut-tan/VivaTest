// tests/pages/ChamCongPage.mjs
// Page Object Model đại diện cho Màn hình Chấm công (/cham-cong)
// Hỗ trợ kiểm thử Lịch đi quán (LoTrinh), tự động chuyển lượt, reset GPS và Page Visibility.

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';

export class ChamCongPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Header & Khung
    this.header = page.locator('[data-section="VBO-CC-01"]');
    this.title = page.getByRole('banner').getByText('Chấm công').or(page.locator('header').getByText('Chấm công'));

    // Thẻ "Lượt hôm nay" (VBO-CL-02)
    this.luotHomNayCard = page.locator('[data-section="VBO-CL-02"]');
    this.luotButtons = this.luotHomNayCard.locator('button');
    this.activeLuotButton = this.luotHomNayCard.locator('button[aria-pressed="true"]');

    // Thẻ Pill Lượt hiện tại trên Card chấm (VBO-CL-06)
    this.pillLuot = page.locator('[data-section="VBO-CL-06"]');

    // Thẻ trạng thái chính (VBO-CC-03)
    this.mainCard = page.locator('[data-section="VBO-CC-03"]');
    this.storeNameText = this.mainCard.locator('span, div').filter({ hasText: /Viva Star Coffee/i }).first();
    this.shiftTimeText = this.mainCard.locator('span, div').filter({ hasText: /\d{2}:\d{2}\s*–\s*\d{2}:\d{2}/ }).first();

    // Nút hành động Chấm công
    this.btnCheckIn = page.getByRole('button', { name: /Chấm công vào/i });
    this.btnCheckOut = page.getByRole('button', { name: /Chấm công ra/i });

    // Hộp xác nhận chấm công (Modal/Sheet)
    this.confirmCheckInBtn = page.getByRole('button', { name: /Xác nhận chấm công vào/i });
    this.confirmCheckOutBtn = page.getByRole('button', { name: /Xác nhận chấm công ra/i });

    // Thông báo trạng thái GPS & vị trí
    this.gpsReadyText = page.locator('text=Đang ở trong vùng');
    this.gpsLoadingCard = page.locator('text=Đang lấy vị trí');
  }

  /**
   * Điều hướng vào màn hình Chấm công
   * @param {string} baseUrl
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/cham-cong?web=thu`, { waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }

  /**
   * Kiểm tra màn hình đã tải xong
   */
  async expectLoaded() {
    await expect(this.title).toBeVisible({ timeout: 10000 });
  }

  /**
   * Kiểm tra thông tin lượt đang chọn
   * @param {string} storeName Tên quán
   * @param {string} timeRange Khoảng giờ (vd: "08:00–10:00")
   */
  async expectActiveShift(storeName, timeRange) {
    if (storeName) {
      await expect(this.page.locator(`text=${storeName}`).first()).toBeVisible({ timeout: 6000 });
    }
    if (timeRange) {
      await expect(this.page.locator(`text=${timeRange}`).first()).toBeVisible({ timeout: 6000 });
    }
  }

  /**
   * Thiết lập API Mocks cho phân hệ Chấm công theo lộ trình đi quán
   * @param {import('@playwright/test').Page} page
   * @param {object} config
   */
  static async setupLoTrinhMocks(page, config = {}) {
    const {
      shifts = [
        { storeId: 'STORE-A', tenQuan: 'Viva Star Coffee - Quán A (Lê Duẩn)', batDau: '08:00', ketThuc: '10:00', loai: 'STORE' },
        { storeId: 'STORE-B', tenQuan: 'Viva Star Coffee - Quán B (Minh Khai)', batDau: '10:30', ketThuc: '12:00', loai: 'STORE' }
      ],
      punchesToday = [],
      chonLuotBat = true
    } = config;

    await page.route('**/api/**', async (route) => {
      const url = route.request().url();

      // Đồng hồ máy chủ (/api/dong-ho)
      if (url.includes('dong-ho')) {
        const timeVal = typeof config.getCurrentTime === 'function' ? config.getCurrentTime() : (config.currentTime || new Date('2026-10-23T09:50:00+07:00'));
        return route.fulfill({
          status: 200,
          headers: {
            'Date': timeVal.toUTCString(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Date'
          }
        });
      }

      // 0. Hồ sơ nhân viên (employee)
      if (url.includes('/api/employee')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{
            id: '00000000-0000-4000-8000-000000000001',
            employee_code: 'VG900001',
            full_name: 'Nguyễn Văn Thử Nghiệm',
            job_title: 'Nhân viên Phục vụ',
            joined_on: '2026-01-01',
            contract_label: 'Chính thức',
            store_or_dept: 'Viva Star Coffee - Quán A (Lê Duẩn)',
            personal_phone: '0901234567',
            email: 'thunghiem@viva.vn',
            work_group: 'STORE',
            status: 'active',
            gps_exempt: true,
            photo_exempt: true
          }])
        });
      }

      // 0b. Phân công nơi làm việc (employment_assignment)
      if (url.includes('/api/employment_assignment')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{
            id: 'assign-01',
            employee_id: '00000000-0000-4000-8000-000000000001',
            store_id: 'STORE-A',
            department_id: null,
            is_primary: true
          }])
        });
      }

      // 0c. Xếp ca hôm nay (schedule_assignment)
      if (url.includes('/api/schedule_assignment')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      }

      // 1. Cầu dao chọn lượt (ot_policy_van_hanh)
      if (url.includes('ot_policy_van_hanh')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{ id: 'default', chon_luot_thu_cong: chonLuotBat }])
        });
      }

      // 2. Cấu hình lộ trình hôm nay (cau_hinh_lo_trinh_cua_toi)
      if (url.includes('cau_hinh_lo_trinh_cua_toi')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            ok: true,
            coLoTrinhHomNay: true,
            chanMemBat: true,
            tinhGioDiChuyenBat: true,
            loiTatSoLan: 3,
            loiTatPhut: 15,
            diemDungHomNay: shifts
          })
        });
      }

      // 3. Thông tin toạ độ nơi làm việc theo điểm dừng (store info)
      if (url.includes('/api/store') || url.includes('store?')) {
        const isStoreA = url.includes('STORE-A');
        const storeData = isStoreA
          ? {
              id: 'STORE-A',
              store_code: 'VSC-01',
              store_name: 'Viva Star Coffee - Quán A (Lê Duẩn)',
              latitude: 10.7769,
              longitude: 106.7009,
              geofence_radius_meters: 150,
              status: 'active'
            }
          : {
              id: 'STORE-B',
              store_code: 'VSC-02',
              store_name: 'Viva Star Coffee - Quán B (Minh Khai)',
              latitude: 10.7800,
              longitude: 106.6900,
              geofence_radius_meters: 150,
              status: 'active'
            };

        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([storeData])
        });
      }

      // 4. Lịch sử chấm công hôm nay (attendance_record)
      if (url.includes('attendance_record')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(punchesToday)
        });
      }

      // Tiếp tục các request khác bình thường
      return route.continue();
    });
  }
}
