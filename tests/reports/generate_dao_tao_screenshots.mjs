// 04-src/tests/reports/generate_dao_tao_screenshots.mjs
// Playwright script to capture deterministic, high-resolution test evidence screenshots for Module Đào tạo.

import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const OUT_DIR = path.resolve('04-src/tests/reports/dao-tao');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser to capture evidence screenshots...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();

  // Mock API RPC routes for reproducible UI states
  await page.route('**/rest/v1/rpc/**', async (route) => {
    const url = route.request().url();
    let postData = {};
    try {
      postData = route.request().postDataJSON() || {};
    } catch {}

    if (url.includes('lich_dao_tao_cua_toi')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
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
            },
            {
              buoi_id: 'b-002',
              tieu_de: 'Tiêu chuẩn An toàn Vệ sinh Thực phẩm',
              mo_ta: 'Cập nhật quy định kiểm thực ba bước và lưu mẫu',
              khoa_id: 'k-02',
              ten_khoa: 'ATVSTP 2026',
              bat_dau: '2026-10-29T14:00:00+07:00',
              ket_thuc: '2026-10-29T16:00:00+07:00',
              dia_diem: 'Phòng đào tạo Hội sở',
              dia_chi: 'Tầng 5, Tòa nhà Viva, Bình Thạnh',
              nguoi_day_ten: 'Phạm Thị Lan',
              trang_thai_buoi: 'MO',
              xep_id: 'xep-002',
              trang_thai: 'DA_XAC_NHAN',
              nguon: 'TAY',
              xac_nhan_luc: '2026-10-23T09:15:00+07:00',
              duoc_xac_nhan: true
            }
          ],
          gio_ban: {
            tuan: '2026-10-26',
            den_ngay: '2026-11-01',
            han_khai: '2026-10-25T23:59:59+07:00',
            con_khai_duoc: true,
            khoang: [
              { ngay: '2026-10-27', tu_gio: '08:00', den_gio: '12:00', ghi_chu: 'Học văn bằng 2' },
              { ngay: '2026-10-29', tu_gio: '14:00', den_gio: '17:00', ghi_chu: 'Khám sức khỏe' }
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
        body: JSON.stringify({
          tuan_mac_dinh: '2026-10-26',
          khoa_chon_duoc: [
            { id: 'k-01', ten: 'Kỹ năng pha chế Barista Pro' },
            { id: 'k-02', ten: 'Tiêu chuẩn An toàn Vệ sinh Thực phẩm' },
            { id: 'k-03', ten: 'Kỹ năng Phục vụ & CSKH' }
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

    if (url.includes('so_hoc_cua_toi')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          tom_tat: {
            so_khoa_xong: 4,
            so_chung_nhan_con_hieu_luc: 3,
            so_buoi_da_hoc: 12,
            phut_hoc_truc_tiep: 1440,
            gio_hoc_truc_tuyen_giay: 7200,
            diem_tb: 8.8
          },
          khoa_da_xong: [
            { khoa_id: 'k-01', ten: 'Pha chế Barista Cơ bản', cap_luc: '2026-05-15', het_han: '2027-05-15', diem: 9.0, con_hieu_luc: true, so_lan: 1 },
            { khoa_id: 'k-02', ten: 'An toàn Vệ sinh Thực phẩm', cap_luc: '2026-01-10', het_han: '2027-01-10', diem: 8.5, con_hieu_luc: true, so_lan: 1 }
          ],
          buoi_da_hoc: [
            {
              buoi_id: 'b-09',
              tieu_de: 'Thực hành Espresso chuẩn Ý',
              mo_ta: 'Căn chỉnh cỡ xay và áp suất',
              bat_dau: '2026-09-10T09:00:00+07:00',
              ket_thuc: '2026-09-10T11:30:00+07:00',
              dia_diem: 'Hội sở Viva',
              trang_thai_buoi: 'DONG',
              xep_id: 'x-09',
              diem_danh_luc: '2026-09-10T09:05:00+07:00'
            }
          ],
          huy_hieu: [
            { id: 'h-01', ten: 'Barista Đồng', moTa: 'Hoàn thành 3 bài học pha chế xuất sắc', dat_luc: '2026-06-01' }
          ],
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

    return route.continue();
  });

  // 1. Authenticate via demo
  console.log('Navigating to login...');
  await page.goto('https://workdemo.vivacorp.vn/dang-nhap?web=thu', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[type="password"]', { timeout: 10000 });
  await page.fill('input[type="password"]', 'ThuNghiem@2026');
  await page.click("button:has-text('Tiếp tục')");
  await page.waitForTimeout(1500);

  // Close modal if present
  try {
    const modalBtn = page.locator("button:has-text('Đã hiểu'), button:has-text('Đóng')").first();
    if (await modalBtn.isVisible({ timeout: 2000 })) {
      await modalBtn.click();
      await page.waitForTimeout(500);
    }
  } catch {}

  // TC-DT-001: Lịch của tôi
  console.log('Capturing TC-DT-001...');
  await page.goto('https://workdemo.vivacorp.vn/lich-dao-tao?tab=lich', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'TC-DT-001-lich-cua-toi.png'), scale: 'css' });

  // TC-DT-002: Đã xác nhận
  console.log('Capturing TC-DT-002...');
  try {
    const btnXacNhan = page.locator("button:has-text('Xác nhận tham gia')").first();
    if (await btnXacNhan.isVisible({ timeout: 2000 })) {
      await btnXacNhan.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.log('Confirm button interaction notice:', e.message);
  }
  await page.screenshot({ path: path.join(OUT_DIR, 'TC-DT-002-da-xac-nhan.png'), scale: 'css' });

  // TC-DT-003: Khai giờ bận
  console.log('Capturing TC-DT-003...');
  await page.goto('https://workdemo.vivacorp.vn/lich-dao-tao?tab=gio_ban', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'TC-DT-003-khai-gio-ban.png'), scale: 'css' });

  // TC-DT-004: Lỗi chồng giờ bận
  console.log('Capturing TC-DT-004...');
  try {
    const btnThemKhoang = page.locator("button:has-text('Thêm khoảng bận')").first();
    if (await btnThemKhoang.isVisible({ timeout: 2000 })) {
      await btnThemKhoang.click();
      await page.waitForTimeout(500);
      const timeInputs = page.locator('input[type="time"]');
      if (await timeInputs.count() >= 2) {
        await timeInputs.nth(0).fill('08:00');
        await timeInputs.nth(1).fill('11:00');
      }
      const btnLuu = page.locator("button:has-text('Lưu giờ bận')").first();
      if (await btnLuu.isVisible({ timeout: 1000 })) {
        await btnLuu.click();
        await page.waitForTimeout(500);
      }
    }
  } catch (e) {
    console.log('Overlapping interval notice:', e.message);
  }
  await page.screenshot({ path: path.join(OUT_DIR, 'TC-DT-004-loi-chong-gio.png'), scale: 'css' });

  // TC-DT-006: Sheet đăng ký khóa học
  console.log('Capturing TC-DT-006...');
  await page.goto('https://workdemo.vivacorp.vn/lich-dao-tao?tab=lich', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  try {
    const btnDangKy = page.locator("button:has-text('Đăng ký học'), button:has-text('Đăng ký khóa học'), button:has-text('Tự đăng ký')").first();
    if (await btnDangKy.isVisible({ timeout: 2000 })) {
      await btnDangKy.click();
      await page.waitForTimeout(800);
    }
  } catch (e) {
    console.log('Register sheet button notice:', e.message);
  }
  await page.screenshot({ path: path.join(OUT_DIR, 'TC-DT-006-sheet-dang-ky.png'), scale: 'css' });

  // TC-DT-008: Nhân viên quán
  console.log('Capturing TC-DT-008...');
  await page.goto('https://workdemo.vivacorp.vn/lich-dao-tao?tab=quan', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  try {
    const checkboxes = page.locator('input[type="checkbox"]');
    if (await checkboxes.count() > 0) {
      await checkboxes.first().check();
      await page.waitForTimeout(400);
    }
  } catch (e) {}
  await page.screenshot({ path: path.join(OUT_DIR, 'TC-DT-008-nhan-vien-quan.png'), scale: 'css' });

  // TC-DT-011: Sổ đã học
  console.log('Capturing TC-DT-011...');
  await page.goto('https://workdemo.vivacorp.vn/hoc-tap/so-hoc', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT_DIR, 'TC-DT-011-so-hoc.png'), scale: 'css' });

  // TC-DT-020: Ngoại lệ Chưa mở đường / 404
  console.log('Capturing TC-DT-020...');
  await page.goto('https://workdemo.vivacorp.vn/lich-dao-tao-duong-khong-ton-tai', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT_DIR, 'TC-DT-020-chua-mo-duong.png'), scale: 'css' });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Execution error:', err);
  process.exit(1);
});
