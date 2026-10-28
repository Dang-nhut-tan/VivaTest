// tests/pages/LichDaoTaoPage.mjs
// Page Object Model đại diện cho Màn hình Lịch đào tạo (/lich-dao-tao) và Sổ đã học (/hoc-tap/so-hoc)
// Tuân thủ triệt để nguyên tắc BasePage: Zero hardcoded sleep, User-facing Locators, Web-First Assertions

import { expect } from '@playwright/test';
import { BasePage } from './BasePage.mjs';

export class LichDaoTaoPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Header & Khung chính
    this.title = page.getByRole('heading', { name: 'Lịch đào tạo' }).or(page.getByText('Lịch đào tạo', { exact: true }));
    this.tabList = page.locator('[data-section="VBO-LH-02"]');

    // 3 Tab điều hướng
    this.tabLichCuaToi = page.getByRole('tab', { name: /Lịch của tôi/i });
    this.tabGioBan = page.getByRole('tab', { name: /Giờ bận/i });
    this.tabNhanVienQuan = page.getByRole('tab', { name: /Nhân viên quán/i });

    // ── Tab 1: Lịch của tôi (VBO-LH-03, VBO-LH-04, VBO-LH-05)
    this.mySessionsSection = page.locator('[data-section="VBO-LH-03"]');
    this.sessionCards = this.mySessionsSection.locator('article, [data-section="the-buoi-hoc"]');
    this.confirmAttendanceBtn = page.getByRole('button', { name: 'Xác nhận tham gia' });
    this.pendingRequestsSection = page.locator('[data-section="VBO-LH-04"]');
    this.openRegisterBtn = page.locator('[data-section="VBO-LH-05"]').getByRole('button', { name: /Đăng ký/i });

    // ── Tab 2: Khai giờ bận (VBO-LH-07, VBO-LH-08, VBO-LH-09)
    this.weekHeaderSection = page.locator('[data-section="VBO-LH-07"]');
    this.weekTitle = this.weekHeaderSection.locator('h2');
    this.prevWeekBtn = this.weekHeaderSection.locator('button').first();
    this.nextWeekBtn = this.weekHeaderSection.locator('button').last();
    this.deadlineNotice = this.weekHeaderSection.getByText(/Hạn khai:/i);
    this.pastDeadlineNotice = this.weekHeaderSection.getByText(/Đã quá hạn khai/i);

    this.busyIntervalsSection = page.locator('[data-section="VBO-LH-08"]');
    this.busyRows = this.busyIntervalsSection.locator('> div, > article');
    this.addIntervalBtn = page.getByRole('button', { name: /Thêm khoảng/i });
    this.saveBusyIntervalsBtn = page.getByRole('button', { name: 'Lưu giờ bận' });
    this.busyErrorAlert = page.getByRole('alert').or(page.getByText(/chồng lên nhau|chồng lấn|sai khoảng|quá hạn/i));

    // ── Tab 3: Nhân viên quán (VBO-LH-10, VBO-LH-11)
    this.staffListSection = page.locator('[data-section="VBO-LH-10"]');
    this.selectAllStaffBtn = this.staffListSection.getByRole('button', { name: /Chọn tất cả|Bỏ chọn/i });
    this.staffCheckboxes = this.staffListSection.locator('input[type="checkbox"]');

    this.staffDispatchSection = page.locator('[data-section="VBO-LH-11"]');
    this.staffCourseSelect = this.staffDispatchSection.locator('select').first();
    this.staffWeekSelect = this.staffDispatchSection.locator('select').nth(1);
    this.staffNoteTextarea = this.staffDispatchSection.locator('textarea');
    this.submitStaffDispatchBtn = this.staffDispatchSection.getByRole('button', { name: /Gửi yêu cầu|Chọn nhân viên/i });

    // ── Bottom Sheets (VBO-LH-06, VBO-LH-12)
    this.registerSheet = page.locator('[data-section="VBO-LH-06"]');
    this.submitRegisterBtn = page.getByRole('button', { name: /Gửi đăng ký|Gửi yêu cầu/i });
    this.cancelRequestSheet = page.locator('[data-section="VBO-LH-12"]');
    this.confirmCancelBtn = page.getByRole('button', { name: 'Xác nhận huỷ' });

    // ── Sổ đã học (/hoc-tap/so-hoc)
    this.soHocHeader = page.getByRole('heading', { name: 'Sổ đã học' }).or(page.getByText('Sổ đã học', { exact: true }));
    this.soHocSummarySection = page.locator('main').first();
  }

  /**
   * Điều hướng đến màn hình Lịch đào tạo (/lich-dao-tao)
   * @param {string} baseUrl
   * @param {'lich'|'gio-ban'|'quan'} tab
   */
  async navigate(baseUrl = 'https://workdemo.vivacorp.vn', tab = 'lich') {
    await this.page.goto(`${baseUrl}/lich-dao-tao?tab=${tab}&web=thu`, { waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }

  /**
   * Điều hướng đến màn hình Sổ đã học (/hoc-tap/so-hoc)
   * @param {string} baseUrl
   */
  async navigateToSoHoc(baseUrl = 'https://workdemo.vivacorp.vn') {
    await this.page.goto(`${baseUrl}/hoc-tap/so-hoc?web=thu`, { waitUntil: 'domcontentloaded' });
    await expect(this.soHocHeader).toBeVisible({ timeout: 10000 });
  }

  /**
   * Kiểm tra giao diện Lịch đào tạo đã tải thành công
   */
  async expectLoaded() {
    await expect(this.title).toBeVisible({ timeout: 12000 });
    await expect(this.tabList).toBeVisible();
  }

  /**
   * Chuyển tab trên màn hình Lịch đào tạo
   * @param {'lich'|'gio-ban'|'quan'} tabName
   */
  async switchTab(tabName) {
    if (tabName === 'gio-ban') {
      await this.tabGioBan.click();
      await expect(this.tabGioBan).toHaveAttribute('aria-selected', 'true');
    } else if (tabName === 'quan') {
      await this.tabNhanVienQuan.click();
      await expect(this.tabNhanVienQuan).toHaveAttribute('aria-selected', 'true');
    } else {
      await this.tabLichCuaToi.click();
      await expect(this.tabLichCuaToi).toHaveAttribute('aria-selected', 'true');
    }
  }

  /**
   * Bấm xác nhận tham gia buổi học
   */
  async confirmAttendance() {
    await expect(this.confirmAttendanceBtn).toBeVisible({ timeout: 5000 });
    await this.confirmAttendanceBtn.click();
  }

  /**
   * Thêm một khoảng giờ bận trong tuần
   * @param {string} fromTime '10:00'
   * @param {string} toTime '12:00'
   * @param {string} note 'Bận việc riêng'
   */
  async addBusyInterval(fromTime = '10:00', toTime = '12:00', note = '') {
    await expect(this.addIntervalBtn).toBeVisible({ timeout: 5000 });
    await this.addIntervalBtn.click();

    const fromSelect = this.page.getByRole('combobox', { name: 'Từ' }).last();
    await fromSelect.selectOption(fromTime);

    const toSelect = this.page.getByRole('combobox', { name: 'Đến' }).last();
    await toSelect.selectOption(toTime);

    if (note) {
      const noteInput = this.busyIntervalsSection.locator('input[type="text"]').last();
      if (await noteInput.isVisible()) {
        await noteInput.fill(note);
      }
    }
  }

  /**
   * Lưu các khoảng giờ bận
   */
  async saveBusyIntervals() {
    await expect(this.saveBusyIntervalsBtn).toBeVisible();
    await this.saveBusyIntervalsBtn.click();
  }

  /**
   * Mở Bottom Sheet tự đăng ký khóa học cá nhân
   */
  async openSelfRegistrationSheet() {
    await expect(this.openRegisterBtn).toBeVisible({ timeout: 5000 });
    await this.openRegisterBtn.click();
    await expect(this.registerSheet).toBeVisible({ timeout: 5000 });
  }

  /**
   * Cử nhân viên quán đi đào tạo theo lô
   */
  async selectStaffAndDispatch() {
    await this.switchTab('quan');
    await expect(this.staffListSection).toBeVisible({ timeout: 10000 });
    if (await this.selectAllStaffBtn.isVisible()) {
      await this.selectAllStaffBtn.click();
    }
    await expect(this.submitStaffDispatchBtn).toBeEnabled({ timeout: 5000 });
    await this.submitStaffDispatchBtn.click();
  }

  /**
   * Mock API RPC để chạy kịch bản độc lập, ổn định và nhanh chóng
   * @param {import('@playwright/test').Page} page
   * @param {object} customOverrides
   */
  static async setupApiMocks(page, customOverrides = {}) {
    await page.route((url) => url.pathname.includes('/rpc/'), async (route) => {
      const url = route.request().url();
      let postData = {};
      try {
        postData = route.request().postDataJSON() || {};
      } catch {}

      if (url.includes('lich_dao_tao_cua_toi')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(customOverrides.lichCuaToi || {
            hom_nay: '2026-10-26',
            la_quan_ly: true,
            lich: [
              {
                buoi_id: 'b-001',
                tieu_de: 'Kỹ năng pha chế nâng cao',
                mo_ta: 'Thực hành các công thức Cold Brew và Latte Art',
                khoa_id: 'k-01',
                ten_khoa: 'Pha chế Barista Pro',
                bat_dau: '2026-10-27T08:30:00+07:00',
                ket_thuc: '2026-10-27T11:30:00+07:00',
                dia_diem: 'Viva Star Coffee - 45 Lê Duẩn',
                dia_chi: '45 Lê Duẩn, P. Bến Nghé, Quận 1, TP.HCM',
                nguoi_day_ten: 'Lê Hoàng Nam (Chuyên gia Đào tạo)',
                trang_thai_buoi: 'MO',
                xep_id: 'xep-001',
                trang_thai: 'DA_XEP',
                nguon: 'TU_DONG',
                duoc_xac_nhan: true
              }
            ],
            gio_ban: {
              tuan: '2026-10-26',
              den_ngay: '2026-11-01',
              han_khai: '2026-10-25T23:59:59+07:00',
              con_khai_duoc: true,
              khoang: [
                { ngay: '2026-10-27', tu_gio: '08:00', den_gio: '12:00', ghi_chu: 'Học văn bằng 2' }
              ]
            },
            yeu_cau: [
              {
                id: 'yc-01',
                khoa_id: 'k-03',
                ten_khoa: 'Kỹ năng Phục vụ & Chăm sóc Khách hàng',
                tuan: '2026-10-26',
                nguon: 'TU_DANG_KY',
                nguoi_gui_ten: 'Nguyễn Văn Thử Nghiệm',
                lyDoChuaXepCau: 'Đang chờ điều phối giảng viên'
              }
            ]
          })
        });
      }

      if (url.includes('nhan_vien_cho_dao_tao_cua_toi')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(customOverrides.nhanVienQuan || {
            tuan_mac_dinh: '2026-10-26',
            khoa_chon_duoc: [
              { id: 'k-01', ten: 'Kỹ năng pha chế Barista Pro' },
              { id: 'k-02', ten: 'Tiêu chuẩn An toàn Vệ sinh Thực phẩm' }
            ],
            nhan_vien: [
              {
                employee_id: 'emp-01',
                ma_nv: 'NV00101',
                ho_ten: 'Trần Thị Thu Thảo',
                ten_quan: 'Viva Star Coffee - Lê Duẩn',
                la_nguoi_moi: true,
                so_buoi_da_hoc: 2,
                da_khai_gio_ban_tuan_toi: true,
                yeu_cau_cho: []
              },
              {
                employee_id: 'emp-02',
                ma_nv: 'NV00102',
                ho_ten: 'Nguyễn Văn Minh',
                ten_quan: 'Viva Star Coffee - Lê Duẩn',
                la_nguoi_moi: false,
                so_buoi_da_hoc: 5,
                da_khai_gio_ban_tuan_toi: false,
                yeu_cau_cho: []
              }
            ]
          })
        });
      }

      if (url.includes('xac_nhan_buoi')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ xep_id: postData.p_xep_id || 'xep-001', trang_thai: 'DA_XAC_NHAN', da_doi: true })
        });
      }

      if (url.includes('khai_gio_ban')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ da_doi: true, so_khoang: (postData.p_khoang || []).length })
        });
      }

      if (url.includes('dang_ky_dao_tao')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ id: 'yc-moi-01', da_tao: true })
        });
      }

      if (url.includes('gui_yeu_cau_dao_tao')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ tuan: postData.p_tuan || '2026-10-26', so_nhan_vien: (postData.p_nhan_vien || []).length, bo_qua: [] })
        });
      }

      if (url.includes('so_hoc_cua_toi')) {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(customOverrides.soHoc || {
            tom_tat: {
              so_khoa_xong: 4,
              so_chung_nhan_con_hieu_luc: 3,
              so_buoi_da_hoc: 12,
              phut_hoc_truc_tiep: 1440,
              gio_hoc_truc_tuyen_giay: 7200,
              diem_tb: 8.8
            },
            khoa_da_xong: [
              { khoa_id: 'k-01', ten: 'Pha chế Barista Cơ bản', cap_luc: '2026-05-15', het_han: '2027-05-15', diem: 9.0, con_hieu_luc: true, so_lan: 1 }
            ],
            buoi_da_hoc: [],
            huy_hieu: [],
            hoi_nhap: {
              ten_lo_trinh: 'Lộ trình Hội nhập Nhân viên Mới',
              trang_thai: 'Đang thực hiện',
              bat_dau: '2026-10-01',
              han: '2026-11-01',
              so_viec: 10,
              so_viec_xong: 8
            }
          })
        });
      }

      return route.continue();
    });
  }
}
