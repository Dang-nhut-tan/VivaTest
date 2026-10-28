# Bộ Kịch Bản Kiểm Thử Phân Hệ Kênh Phản Ánh & Khiếu Nại

> **Phân hệ**: Kênh Phản Ánh & Khiếu Nại  
> **Tổng số kịch bản**: 7 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 7 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-PA-001** | Đăng nhập App nhân viên, mở màn hình Gửi phản ánh & kiểm tra validation danh tính | `Chặn` | **Passed 100%** | [`TC-PA-001.md`](./cases/TC-PA-001.md) |
| **TC-PA-002** | Chọn hình thức Ẩn danh, kích hoạt Dark Theme và bảng cam kết bảo mật danh tính | `Sai` | **Passed 100%** | [`TC-PA-002.md`](./cases/TC-PA-002.md) |
| **TC-PA-003** | Gửi phản ánh ẨN DANH thành công & kiểm tra cơ chế bảo mật sinh mã vé | `Chặn` | **Passed 100%** | [`TC-PA-003.md`](./cases/TC-PA-003.md) |
| **TC-PA-004** | Tra cứu phản ánh ẨN DANH bằng mã vé và đối soát thông tin | `Chặn` | **Passed 100%** | [`TC-PA-004.md`](./cases/TC-PA-004.md) |
| **TC-PA-005** | Gửi phản ánh ĐỨNG TÊN thành công & kiểm tra tính minh bạch | `Chặn` | **Passed 100%** | [`TC-PA-005.md`](./cases/TC-PA-005.md) |
| **TC-PA-006** | Xem phản ánh ĐỨNG TÊN trong danh sách Phản ánh của tôi | `Sai` | **Passed 100%** | [`TC-PA-006.md`](./cases/TC-PA-006.md) |
| **TC-PA-007** | Xác nhận bảo mật danh tính: Phản ánh ẨN DANH không có trong Phản ánh của tôi | `Chặn` | **Passed 100%** | [`TC-PA-007.md`](./cases/TC-PA-007.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/phan-anh/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── phan-anh-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── phan-anh-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
