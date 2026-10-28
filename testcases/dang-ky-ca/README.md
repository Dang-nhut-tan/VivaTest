# Bộ Kịch Bản Kiểm Thử Phân Hệ Đăng Ký & Duyệt Ca Làm Quán

> **Phân hệ**: Đăng Ký & Duyệt Ca Làm Quán  
> **Tổng số kịch bản**: 4 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 4 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-DKC-001** | Nhân viên mở màn hình Đăng ký ca và kiểm tra thông tin thương hiệu & thời hạn | `Chặn` | **Passed 100%** | [`TC-DKC-001.md`](./cases/TC-DKC-001.md) |
| **TC-DKC-002** | Mở Bottom Sheet chọn ca mong muốn cho ngày trong tuần | `Sai` | **Passed 100%** | [`TC-DKC-002.md`](./cases/TC-DKC-002.md) |
| **TC-DKC-003** | Chọn ca nguyện vọng và kiểm tra bộ đếm ngày hoàn thành | `Chặn` | **Passed 100%** | [`TC-DKC-003.md`](./cases/TC-DKC-003.md) |
| **TC-DKC-004** | Gửi đăng ký nguyện vọng và kiểm tra Sheet xác nhận tiến trình 2 bước | `Chặn` | **Passed 100%** | [`TC-DKC-004.md`](./cases/TC-DKC-004.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/dang-ky-ca/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── dang-ky-ca-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── dang-ky-ca-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
