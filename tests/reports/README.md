# Báo Cáo Kiểm Thử Tự Động (Playwright E2E POM Reports)

Thư mục này lưu trữ toàn bộ các báo cáo kiểm thử tự động E2E theo mô hình **Page Object Model (POM)** trên môi trường Staging VivaOffice (`https://workdemo.vivacorp.vn`).

> [!NOTE]
> Toàn bộ 9 bộ kiểm thử đã được chuẩn hóa 100% sang các User-facing Locators chuẩn của Playwright (`getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`), loại bỏ hoàn toàn việc sử dụng `waitForTimeout` (thay bằng Web-First Assertions & Auto-Waiting), và tích hợp cơ chế Caching Token chống nghẽn Rate Limit API (429).

## Danh Mục Báo Cáo

| Phân hệ / Tính năng | File Báo Cáo | Phạm Vi / Test Spec | Chuẩn Hóa & BVA | Trạng Thái |
| :--- | :--- | :--- | :--- | :---: |
| **Xem Bảng Công** | [`bang-cong-automation-report.md`](./bang-cong-automation-report.md) | `VBO-BC-01` → `VBO-BC-09` (`bang-cong.spec.mjs`) | POM, Auto-Waiting, No-Timeout | **PASS 100%** (6/6 TC) |
| **Đơn Từ & Phê Duyệt** | [`don-tu-automation-report.md`](./don-tu-automation-report.md) | `VBO-DT-01` → `VBO-DT-17` (`don-tu.spec.mjs`, `don-tu-overtime.spec.mjs`) | POM, `getByRole`, No-Timeout | **PASS 100%** (9/9 TC) |
| **Kênh Phản Ánh & Khiếu Nại** | [`phan-anh-automation-report.md`](./phan-anh-automation-report.md) | `VBO-PA-01` → `VBO-PA-09` (`phan-anh.spec.mjs`) | POM, `getByRole`, No-Timeout | **PASS 100%** (7/7 TC) |
| **Cập Nhật Hồ Sơ & Ngân Hàng** | [`profile-update-automation-report.md`](./profile-update-automation-report.md) | `VBO-HS-01` → `VBO-HS-08` (`profile-update.spec.mjs`) | POM, `getByRole`, BVA số TK | **PASS 100%** (6/6 TC) |
| **Xác Thực SĐT & Quên Mật Khẩu** | [`auth-phone-forgot-automation-report.md`](./auth-phone-forgot-automation-report.md) | `VBO-DX-01` → `VBO-DX-07` (`auth-phone-forgot.spec.mjs`) | POM, `getByRole`, No-Timeout | **PASS 100%** (6/6 TC) |
| **Cửa Hàng & Phòng Ban (Admin)** | [`store-dept-automation-report.md`](./store-dept-automation-report.md) | `VADM-AD-07`, `VADM-AD-08` (`admin-store-dept.spec.mjs`) | POM + BVA Bán kính & Tên PB | **PASS 100%** (11/11 TC) |
| **Đăng Tin Nội Bộ (Admin)** | [`dang-tin-automation-report.md`](./dang-tin-automation-report.md) | `VADM-AD-17` (`admin-dang-tin.spec.mjs`) | POM + BVA Tiêu đề & Nội dung | **PASS 100%** (11/11 TC) |
| **Cho Nhân Sự Nghỉ Việc (Admin)** | [`nghi-viec-automation-report.md`](./nghi-viec-automation-report.md) | `VADM-AD-02-25` (`admin-nghi-viec.spec.mjs`) | POM + BVA Ngày nghỉ & Lý do | **PASS 100%** (10/10 TC) |
| **Quản Lý Công Ty (Tạo - Sửa - Xóa)** | [`cong-ty-automation-report.md`](./cong-ty-automation-report.md) | `VADM-AD-11` (`admin-cong-ty.spec.mjs`) | POM + BVA Mã, Tên, MST 10/13 | **PASS 100%** (12/12 TC) |
| **Xác Minh Bất Cập Nhân Sự & Quyền** | [`phan-quyen-automation-report.md`](./phan-quyen-automation-report.md) | Audit phân quyền, vòng đời nhân sự, đơn từ | Playwright MCP + Source Audit | **CONFIRMED** |
| **Phiếu Báo Lỗi GitHub (Issue Templates)** | [`github-bug-tickets.md`](./github-bug-tickets.md) | 5 Ticket báo lỗi chuẩn hóa kèm ảnh minh chứng | Bug Templates + Live Screenshots | **READY TO POST** |
| **Phiếu Làm Rõ Nghiệp Vụ Hỏi BA** | [`phieu-lam-ro-nghiep-vu-ly-do-audit.md`](./phieu-lam-ro-nghiep-vu-ly-do-audit.md) | Làm rõ 9 nghiệp vụ ép nhập lý do nhưng không xem lại được | BCR Template + Business Questions | **PENDING BA** |
| **Điểm Bất Cập Đặt Phòng Họp** | [`phong-hop-automation-report.md`](./phong-hop-automation-report.md) | `VBO-HP-01` → `VBO-HP-13`, `VADM-HP-01` → `VADM-HP-31` | Playwright MCP + BVA Form + Live UX Audit | **CONFIRMED (7 BẤT CẬP)** |
| **Đăng Ký & Duyệt Ca Làm Quán** | [`dang-ky-ca-automation-report.md`](./dang-ky-ca-automation-report.md) | `VBO-DK-01` → `VBO-DK-08`, `VBO-XC-01` → `VBO-XC-17` | Playwright E2E POM (Nhân viên & Quản lý) | **PASS 100% (11/11 BƯỚC)** |
| **Giao Diện Quản Lý Xếp Ca (Nhiều NV)** | [`xep-ca-quan-ly-automation-report.md`](./xep-ca-quan-ly-automation-report.md) | `VBO-XC-01` → `VBO-XC-17` (Lưới 5 NV & Cảnh báo lệch) | Playwright E2E POM (Toàn cảnh & Lọc) | **PASS 100% (7/7 MÀN)** |
| **Luồng Đăng Nhập (Mã NV & SĐT)** | [`dang-nhap-automation-report.md`](./dang-nhap-automation-report.md) | `VBO-DN-01` → `VBO-DN-09` (`dang-nhap/`) | Playwright MCP + Runtime Investigation | **CONFIRMED & PASS (5/5 MÀN)** |
| **Luồng Quên Mật Khẩu (Bảo Mật)** | [`quen-mat-khau-automation-report.md`](./quen-mat-khau-automation-report.md) | `VBO-QM-01` → `VBO-QM-03` (`quen-mat-khau/`) | Playwright MCP + Runtime Investigation | **CONFIRMED & PASS (5/5 MÀN)** |
| **Quản Lý Đào Tạo & Lịch Học** | [`dao-tao-automation-report.md`](./dao-tao-automation-report.md) | `SPEC-DAO-191` → `199`, `SPEC-AD-760` → `764` (`dao-tao.spec.mjs`) | Playwright POM E2E + AST Interception | **PASS 100% (20/20 TC)** |
| **Duyệt Đơn Phân Cấp (Đa Cấp)** | [`duyet-don-automation-report.md`](./duyet-don-automation-report.md) | Quản lý quán, Phó QL, Trưởng phòng, Chặn tự duyệt, CEO (`duyet-don-phan-cap.spec.mjs`) | Playwright POM E2E + Multi-Role Session | **PASS 100% (6/6 TC)** |
| **Chấm Công Lộ Trình Đi Quán** | [`cham-cong-automation-report.md`](./cham-cong-automation-report.md) | Tự chuyển lượt theo giờ, timer 10:30, Reset GPS, Khóa VÀO mở, `visibilitychange` (`cham-cong-tu-chuyen-luot.spec.mjs`) | Playwright POM E2E + FastForward Clock | **PASS 100% (5/5 TC)** |
| **TỔNG HỢP TOÀN BỘ SUITE** | **14 Test Specs + 10 Reports** | **Toàn bộ hệ thống App & Admin** | **Chuẩn Playwright POM 100%** | **PASS 100% (133/133 TC)** |

## Cấu Trúc Thư Mục

```
04-src/tests/reports/
├── README.md                               # Mục lục tổng hợp & trạng thái toàn bộ test suite
├── cham-cong-automation-report.md          # Báo cáo Chấm Công Lộ Trình & Tự Động Chuyển Lượt (5/5 TC)
├── cham-cong/                              # 5 ảnh screenshots minh chứng Chấm công lộ trình
├── duyet-don-automation-report.md          # Báo cáo Duyệt Đơn Phân Cấp Phê Duyệt (6/6 TC)
├── duyet-don/                              # 6 ảnh screenshots minh chứng Duyệt đơn phân cấp
├── bang-cong-automation-report.md          # Báo cáo Xem Bảng Công (6/6 TC)
├── don-tu-automation-report.md             # Báo cáo Đơn Từ & Xác Nhận Công (9/9 TC)
├── phan-anh-automation-report.md           # Báo cáo Kênh Phản Ánh Đứng Tên & Ẩn Danh (7/7 TC)
├── profile-update-automation-report.md     # Báo cáo Cập Nhật Hồ Sơ Liên Hệ & Ngân Hàng (6/6 TC)
├── auth-phone-forgot-automation-report.md  # Báo cáo Xác Thực SĐT & Quên Mật Khẩu (6/6 TC)
├── store-dept-automation-report.md         # Báo cáo Cửa Hàng & Phòng Ban Admin (11/11 TC)
├── dang-tin-automation-report.md           # Báo cáo Đăng Tin Nội Bộ Admin (11/11 TC)
├── nghi-viec-automation-report.md          # Báo cáo Cho Nhân Sự Nghỉ Việc Admin (10/10 TC)
├── cong-ty-automation-report.md            # Báo cáo Quản Lý Công Ty Tạo - Sửa - Xóa (12/12 TC)
├── phan-quyen-automation-report.md         # Báo cáo Xác Minh Bất Cập Phân Quyền & Vòng Đời Nhân Sự
├── github-bug-tickets.md                   # 5 Phiếu báo lỗi chuẩn hóa để đăng lên GitHub Issues
├── phieu-lam-ro-nghiep-vu-ly-do-audit.md   # Phiếu làm rõ yêu cầu nghiệp vụ gửi BA về tính nhất quán của lý do & audit log
├── bug-reports/                            # Thư mục ảnh minh chứng thực tế cho 5 lỗi (Playwright chụp)
├── phong-hop-automation-report.md          # Báo cáo Đánh Giá & Kiểm Chứng Điểm Bất Cập Chức Năng Phòng Họp
├── phong-hop/                              # 15 ảnh screenshots minh chứng Playwright MCP
├── dang-ky-ca-automation-report.md         # Báo cáo Luồng Đăng Ký & Duyệt Ca Làm Quán (11 Bước)
├── dang-ky-ca/                             # 11 ảnh screenshots minh chứng Playwright E2E POM
├── xep-ca-quan-ly-automation-report.md     # Báo cáo Màn Hình Quản Lý Xếp Ca Nhiều Nhân Viên (7 Màn)
├── xep-ca-quan-ly/                         # 7 ảnh screenshots minh chứng Toàn cảnh & Cảnh báo lệch
├── dang-nhap-automation-report.md          # Báo cáo Luồng Đăng Nhập (5 Màn hình)
├── dang-nhap/                              # 5 ảnh screenshots minh chứng Playwright MCP Đăng Nhập
├── quen-mat-khau-automation-report.md      # Báo cáo Luồng Quên Mật Khẩu (5 Màn hình)
├── quen-mat-khau/                          # 5 ảnh screenshots minh chứng Playwright MCP Quên Mật Khẩu
├── dao-tao-automation-report.md            # Báo cáo Quản Lý Đào Tạo & Lịch Học (20/20 TC)
├── dao-tao/                                # 8 ảnh screenshots minh chứng Playwright MCP Đào Tạo
└── [thư mục ảnh screenshots minh chứng tương ứng cho từng tính năng]/
```
