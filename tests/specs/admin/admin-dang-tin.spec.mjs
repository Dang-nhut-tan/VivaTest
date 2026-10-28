// tests/specs/admin/admin-dang-tin.spec.mjs
// Suite kiểm thử tự động tính năng Đăng tin nội bộ trên Cổng Quản trị Admin theo chuẩn POM
// Bao gồm các kịch bản chuẩn và bộ kiểm thử giá trị biên (Boundary Value Analysis - BVA)

import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/admin/AdminLoginPage.mjs';
import { AdminNoticePage } from '../../pages/admin/AdminNoticePage.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const ADMIN_EMAIL = 'dung.demo@vi-du.test';
const ADMIN_PASS = 'Nqshndc@123';

test.describe.configure({ mode: 'serial' });

test.describe('Kiểm thử Tính năng Đăng tin nội bộ trên Admin Portal (POM & BVA)', () => {
  let context;
  let page;
  let adminLoginPage;
  let adminNoticePage;

  const randSuffix = Date.now().toString().slice(-4);
  const testNoticeTitle = `[Thông Báo] Khởi Động Phong Trào Thi Đua Q4-${randSuffix}`;
  const testNoticeBody = `Chào toàn thể anh chị em Viva! Ban Lãnh đạo phát động phong trào thi đua hoàn thành xuất sắc mục tiêu quý 4 năm 2026. Mọi chi tiết xin liên hệ phòng HCNS.\nhttps://workdemo.vivacorp.vn`;
  const testNoticeCategory = 'Sự kiện';

  test.beforeAll(async ({ browser }) => {
    // 1. Khởi tạo Desktop context cho giao diện Admin
    context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    page = await context.newPage();

    // 2. Khởi tạo Page Objects
    adminLoginPage = new AdminLoginPage(page);
    adminNoticePage = new AdminNoticePage(page);
  });

  test.afterAll(async () => {
    await context?.close();
  });

  // --- NHÓM 1: CÁC CA KIỂM THỬ LUỒNG CHÍNH ---

  test('ADM-TN-01: Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login)', async () => {
    await adminLoginPage.navigate(BASE_URL);
    await adminLoginPage.login(ADMIN_EMAIL, ADMIN_PASS);
    await adminLoginPage.expectLoginSuccess();
  });

  test('ADM-TN-02: Điều hướng đến Màn hình Tin nội bộ (#/tin-noi-bo) và kiểm tra giao diện bảng', async () => {
    await adminNoticePage.navigateList(BASE_URL);
    await expect(adminNoticePage.pageTitle).toBeVisible();
    await expect(adminNoticePage.createNoticeBtn).toBeVisible();
    await expect(adminNoticePage.noticeTable).toBeVisible();
    await expect(adminNoticePage.filterCategorySelect).toBeVisible();
  });

  test('ADM-TN-03: Mở Hộp thoại Soạn tin mới và kiểm tra các trường thông tin bắt buộc', async () => {
    await adminNoticePage.openCreateDialog();
    await expect(adminNoticePage.dialog).toBeVisible();
    await expect(adminNoticePage.categorySelect).toBeVisible();
    await expect(adminNoticePage.titleInput).toBeVisible();
    await expect(adminNoticePage.bodyInput).toBeVisible();
    await expect(adminNoticePage.pinSwitch).toBeVisible();
    await expect(adminNoticePage.dialogSaveBtn).toBeVisible();
  });

  test('ADM-TN-04: Điền thông tin Chuyên mục, Tiêu đề, Nội dung, Bật Ghim và Lưu tin mới thành công', async () => {
    await adminNoticePage.fillNoticeForm({
      category: testNoticeCategory,
      title: testNoticeTitle,
      body: testNoticeBody,
      isPinned: true
    });
    await adminNoticePage.submitDialog();
  });

  test('ADM-TN-05: Xác nhận bài tin vừa đăng xuất hiện trên Bảng danh sách với đầy đủ nhãn Ghim & Chuyên mục', async () => {
    await adminNoticePage.expectNoticeInTable(testNoticeTitle);
    await adminNoticePage.expectNoticeDetails(testNoticeTitle, {
      category: testNoticeCategory,
      isPinned: true
    });
  });

  test('ADM-TN-06: Lọc danh sách theo Chuyên mục và xác nhận tin hiển thị đúng bộ lọc', async () => {
    // Lọc theo Chuyên mục 'Sự kiện'
    await adminNoticePage.filterCategory('Sự kiện');
    await adminNoticePage.expectNoticeInTable(testNoticeTitle);

    // Lọc sang 'Văn hoá' và xác nhận tin Sự kiện không còn xuất hiện
    await adminNoticePage.filterCategory('Văn hoá');
    const rowInVanHoa = adminNoticePage.getNoticeRow(testNoticeTitle);
    await expect(rowInVanHoa).toHaveCount(0);

    // Trả lại bộ lọc 'Tất cả'
    await adminNoticePage.filterCategory('Tất cả');
    await adminNoticePage.expectNoticeInTable(testNoticeTitle);
  });

  // --- NHÓM 2: CÁC CA KIỂM THỬ GIÁ TRỊ BIÊN (BOUNDARY VALUE ANALYSIS) ---

  test('ADM-TN-BVA-01: [Biên dưới] Kiểm tra validation khi Tiêu đề rỗng hoặc chỉ chứa khoảng trắng', async () => {
    await adminNoticePage.openCreateDialog();

    // Ban đầu tiêu đề rỗng -> Nút Lưu bị vô hiệu hóa
    await adminNoticePage.expectSaveDisabled();

    // Điền chuỗi chỉ gồm khoảng trắng -> Nút Lưu vẫn bị vô hiệu hóa
    await adminNoticePage.fillTitle('     ');
    await adminNoticePage.expectSaveDisabled();

    await adminNoticePage.closeDialog();
  });

  test('ADM-TN-BVA-02: [Biên dưới hợp lệ] Tiêu đề đúng 1 ký tự được chấp nhận và kích hoạt nút Lưu', async () => {
    await adminNoticePage.openCreateDialog();

    // Điền đúng 1 ký tự
    await adminNoticePage.fillTitle('A');
    await adminNoticePage.expectSaveEnabled();

    await adminNoticePage.closeDialog();
  });

  test('ADM-TN-BVA-03: [Biên trên tối đa] Tiêu đề đạt ngưỡng 200 ký tự và chống tràn khi nhập quá 200 ký tự', async () => {
    await adminNoticePage.openCreateDialog();

    // Nhập vượt quá 200 ký tự (220 ký tự)
    const overLengthTitle = 'T'.repeat(220);
    await adminNoticePage.fillTitle(overLengthTitle);

    // Thuộc tính maxLength={200} cắt đúng 200 ký tự
    const val = await adminNoticePage.getTitleValue();
    expect(val.length).toBe(200);

    await adminNoticePage.closeDialog();
  });

  test('ADM-TN-BVA-04: [Trường tùy chọn] Đăng tin với Nội dung rỗng (Empty Body) thành công', async () => {
    const emptyBodyTitle = `[BVA-04] Tập Huấn Nghiệp Vụ ${randSuffix}`;
    await adminNoticePage.openCreateDialog();
    await adminNoticePage.fillNoticeForm({
      category: 'Đào tạo',
      title: emptyBodyTitle,
      body: '',
      isPinned: false
    });
    await adminNoticePage.submitDialog();

    // Xác nhận bài tin lưu thành công mà không bắt buộc có nội dung
    await adminNoticePage.expectNoticeInTable(emptyBodyTitle);
  });

  test('ADM-TN-BVA-05: [Ký tự đặc biệt & Unicode] Đăng tin chứa ký tự HTML, tiếng Việt có dấu, emoji và URL', async () => {
    const specialTitle = `[BVA-05] <Viva & Tea> "Khuyến Mãi" 100% ☕ #${randSuffix}`;
    const specialBody = `Đường link hướng dẫn: https://workdemo.vivacorp.vn/huong-dan`;
    await adminNoticePage.openCreateDialog();
    await adminNoticePage.fillNoticeForm({
      category: 'Văn hoá',
      title: specialTitle,
      body: specialBody,
      isPinned: false
    });
    await adminNoticePage.submitDialog();

    // Xác nhận tin hiển thị chuẩn xác trên bảng mà không bị lỗi render hay thoát HTML
    await adminNoticePage.expectNoticeInTable(specialTitle);
  });
});
