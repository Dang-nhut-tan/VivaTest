# Bộ Kịch Bản Kiểm Thử Phân Hệ Cửa Hàng & Phòng Ban Admin

> **Phân hệ**: Cửa Hàng & Phòng Ban Admin  
> **Tổng số kịch bản**: 11 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 11 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-ADM-SD-001** | Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login) | `Chặn` | **Passed 100%** | [`TC-ADM-SD-001.md`](./cases/TC-ADM-SD-001.md) |
| **TC-ADM-SD-002** | Điều hướng đến Màn hình Quán & toạ độ (#/quan) và kiểm tra danh sách | `Chặn` | **Passed 100%** | [`TC-ADM-SD-002.md`](./cases/TC-ADM-SD-002.md) |
| **TC-ADM-SD-003** | Mở Form Tạo quán mới (#/quan/moi) và kiểm tra các ô nhập bắt buộc | `Sai` | **Passed 100%** | [`TC-ADM-SD-003.md`](./cases/TC-ADM-SD-003.md) |
| **TC-ADM-SD-004** | Điền thông tin và Tạo quán mới thành công | `Chặn` | **Passed 100%** | [`TC-ADM-SD-004.md`](./cases/TC-ADM-SD-004.md) |
| **TC-ADM-SD-005** | Tìm kiếm và xác nhận quán vừa tạo hiển thị trên Bảng danh sách | `Chặn` | **Passed 100%** | [`TC-ADM-SD-005.md`](./cases/TC-ADM-SD-005.md) |
| **TC-ADM-SD-006** | Điều hướng đến Màn hình Quản lý Phòng ban (#/phong-ban) và kiểm tra giao diện | `Chặn` | **Passed 100%** | [`TC-ADM-SD-006.md`](./cases/TC-ADM-SD-006.md) |
| **TC-ADM-SD-007** | Mở Hộp thoại Thêm phòng ban, chọn pháp nhân, điền tên và lưu thành công | `Chặn` | **Passed 100%** | [`TC-ADM-SD-007.md`](./cases/TC-ADM-SD-007.md) |
| **TC-ADM-SD-008** | Tìm kiếm và xác nhận phòng ban vừa tạo hiển thị trên Cây phòng ban | `Chặn` | **Passed 100%** | [`TC-ADM-SD-008.md`](./cases/TC-ADM-SD-008.md) |
| **TC-ADM-SD-BVA-01** | [Biên dưới bán kính] Bán kính < 50m (49m) kích hoạt lỗi validation | `Sai` | **Passed 100%** | [`TC-ADM-SD-BVA-01.md`](./cases/TC-ADM-SD-BVA-01.md) |
| **TC-ADM-SD-BVA-02** | [Biên trên bán kính] Bán kính > 2000m (2001m) kích hoạt lỗi validation | `Sai` | **Passed 100%** | [`TC-ADM-SD-BVA-02.md`](./cases/TC-ADM-SD-BVA-02.md) |
| **TC-ADM-SD-BVA-03** | [Biên trên tên phòng ban] Tên phòng ban > 120 ký tự kích hoạt lỗi validation | `Sai` | **Passed 100%** | [`TC-ADM-SD-BVA-03.md`](./cases/TC-ADM-SD-BVA-03.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/store-dept/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── store-dept-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── store-dept-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
