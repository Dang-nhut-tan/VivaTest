# Danh Mục Toàn Bộ Kịch Bản Kiểm Thử VivaOffice (Master Test Cases Catalog)

> **Tổng quan hệ thống**: 17 Phân hệ nghiệp vụ chuẩn hóa (PWA Nhân viên & Cổng Quản trị Admin)  
> **Tổng số kịch bản kiểm thử**: **148 Test Cases**  
> **Tỷ lệ Tự động hóa**: **100% Automation Ready**  
> **Tỷ lệ Thực thi Thành công**: **100% PASSED (Playwright POM & CLI Exit Code 0)**  
> **Sẵn sàng commit**: Cấu trúc độc lập từng thư mục phục vụ đẩy lên GitHub và CI/CD  

---

## Bảng Thống Kê 17 Phân Hệ Nghiệp Vụ

| Phân Hệ / Tính Năng | Thư Mục Chi Tiết | Số Lượng TC | Trạng Thái Kiểm Thử | Tệp Excel Đính Kèm |
| :--- | :--- | :---: | :---: | :--- |
| **Quản Lý Đào Tạo & Lịch Học** | [`dao-tao/`](./dao-tao/) | **20 TC** | **100% Passed** | [Excel Workbook](./dao-tao/dao-tao-testcases.xlsx) |
| **Đăng Nhập PWA & App** | [`dang-nhap/`](./dang-nhap/) | **14 TC** | **100% Passed** | [Excel Workbook](./dang-nhap/dang-nhap-testcases.xlsx) |
| **Quên Mật Khẩu PWA** | [`quen-mat-khau/`](./quen-mat-khau/) | **14 TC** | **100% Passed** | [Excel Workbook](./quen-mat-khau/quen-mat-khau-testcases.xlsx) |
| **Xem Bảng Công** | [`bang-cong/`](./bang-cong/) | **6 TC** | **100% Passed** | [Excel Workbook](./bang-cong/bang-cong-testcases.xlsx) |
| **Đơn Từ & Phê Duyệt** | [`don-tu/`](./don-tu/) | **9 TC** | **100% Passed** | [Excel Workbook](./don-tu/don-tu-testcases.xlsx) |
| **Kênh Phản Ánh & Khiếu Nại** | [`phan-anh/`](./phan-anh/) | **7 TC** | **100% Passed** | [Excel Workbook](./phan-anh/phan-anh-testcases.xlsx) |
| **Cập Nhật Hồ Sơ & Ngân Hàng** | [`profile-update/`](./profile-update/) | **6 TC** | **100% Passed** | [Excel Workbook](./profile-update/profile-update-testcases.xlsx) |
| **Xác Thực SĐT & Quên Mật Khẩu** | [`auth-phone-forgot/`](./auth-phone-forgot/) | **6 TC** | **100% Passed** | [Excel Workbook](./auth-phone-forgot/auth-phone-forgot-testcases.xlsx) |
| **Cửa Hàng & Phòng Ban Admin** | [`store-dept/`](./store-dept/) | **11 TC** | **100% Passed** | [Excel Workbook](./store-dept/store-dept-testcases.xlsx) |
| **Đăng Tin Nội Bộ Admin** | [`dang-tin/`](./dang-tin/) | **11 TC** | **100% Passed** | [Excel Workbook](./dang-tin/dang-tin-testcases.xlsx) |
| **Cho Nhân Sự Nghỉ Việc Admin** | [`nghi-viec/`](./nghi-viec/) | **10 TC** | **100% Passed** | [Excel Workbook](./nghi-viec/nghi-viec-testcases.xlsx) |
| **Quản Lý Công Ty Admin** | [`cong-ty/`](./cong-ty/) | **12 TC** | **100% Passed** | [Excel Workbook](./cong-ty/cong-ty-testcases.xlsx) |
| **Đăng Ký & Duyệt Ca Làm Quán** | [`dang-ky-ca/`](./dang-ky-ca/) | **4 TC** | **100% Passed** | [Excel Workbook](./dang-ky-ca/dang-ky-ca-testcases.xlsx) |
| **Giao Diện Quản Lý Xếp Ca** | [`xep-ca-quan-ly/`](./xep-ca-quan-ly/) | **4 TC** | **100% Passed** | [Excel Workbook](./xep-ca-quan-ly/xep-ca-quan-ly-testcases.xlsx) |
| **Đặt Phòng Họp & Bất Cập** | [`phong-hop/`](./phong-hop/) | **3 TC** | **100% Passed** | [Excel Workbook](./phong-hop/phong-hop-testcases.xlsx) |
| **Duyệt Đơn & Phân Cấp Phê Duyệt** | [`duyet-don/`](./duyet-don/) | **6 TC** | **100% Passed** | [Excel Workbook](./duyet-don/duyet-don-testcases.xlsx) |
| **Chấm Công Lộ Trình Đi Quán** | [`cham-cong/`](./cham-cong/) | **5 TC** | **100% Passed** | [Excel Workbook](./cham-cong/cham-cong-testcases.xlsx) |

---

## Cấu Trúc Tổ Chức Chuẩn GitHub

Mỗi phân hệ trong thư mục `testcases/` được tổ chức độc lập và hoàn chỉnh:

```text
testcases/
├── README.md                      # Mục lục Master tổng hợp toàn bộ các phân hệ
├── cham-cong/                     # Phân hệ Chấm Công Lộ Trình Đi Quán (5 TC)
│   ├── README.md                  # Mục lục kịch bản chấm công
│   ├── cham-cong-testcases.xlsx   # Bảng tính Excel chuẩn 13 cột
│   ├── cham-cong-testcases.json   # Dữ liệu JSON CI/CD
│   └── cases/                     # File Markdown độc lập từng Test Case
├── duyet-don/                     # Phân hệ Duyệt Đơn & Phân Cấp Phê Duyệt (6 TC)
├── dao-tao/                       # Phân hệ Quản lý Đào tạo (20 TC)
├── bang-cong/                     # Phân hệ Xem Bảng Công (6 TC)
├── don-tu/                        # Phân hệ Đơn Từ & Xác Nhận Công (9 TC)
├── phan-anh/                      # Phân hệ Kênh Phản Ánh & Khiếu Nại (7 TC)
├── profile-update/                # Phân hệ Cập Nhật Hồ Sơ & Ngân Hàng (6 TC)
├── auth-phone-forgot/             # Phân hệ Xác Thực SĐT & Quên Mật Khẩu (6 TC)
├── store-dept/                    # Phân hệ Cửa Hàng & Phòng Ban Admin (11 TC)
├── dang-tin/                      # Phân hệ Đăng Tin Nội Bộ Admin (11 TC)
├── nghi-viec/                     # Phân hệ Cho Nhân Sự Nghỉ Việc Admin (10 TC)
├── cong-ty/                       # Phân hệ Quản Lý Công Ty Admin (12 TC)
├── dang-nhap/                     # Phân hệ Đăng Nhập PWA (14 TC)
├── quen-mat-khau/                 # Phân hệ Quên Mật Khẩu PWA (14 TC)
├── dang-ky-ca/                    # Phân hệ Đăng Ký & Duyệt Ca Quán (4 TC)
├── xep-ca-quan-ly/                # Phân hệ Giao Diện Quản Lý Xếp Ca (4 TC)
└── phong-hop/                     # Phân hệ Đặt Phòng Họp & Bất Cập (3 TC)
```

> [!TIP]
> Tất cả các file Excel `.xlsx` trong thư mục `testcases/` đã được miễn trừ khỏi `.gitignore` (`!testcases/**/*.xlsx`) nên có thể thực hiện `git add testcases/` và `git commit` đẩy trực tiếp lên GitHub mà không bị thất lạc dữ liệu bảng tính.
