# Bộ Kịch Bản Kiểm Thử Phân Hệ Cập Nhật Hồ Sơ & Ngân Hàng

> **Phân hệ**: Cập Nhật Hồ Sơ & Ngân Hàng  
> **Tổng số kịch bản**: 6 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 6 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-HS-001** | Đăng nhập App nhân viên và mở trang Hồ sơ | `Chặn` | **Passed 100%** | [`TC-HS-001.md`](./cases/TC-HS-001.md) |
| **TC-HS-002** | Gửi yêu cầu cập nhật Thông tin liên hệ (SĐT & Email) | `Chặn` | **Passed 100%** | [`TC-HS-002.md`](./cases/TC-HS-002.md) |
| **TC-HS-003** | Kiểm tra Validation ràng buộc Số tài khoản ngân hàng (< 6 số) | `Sai` | **Passed 100%** | [`TC-HS-003.md`](./cases/TC-HS-003.md) |
| **TC-HS-004** | Gửi yêu cầu cập nhật Tài khoản ngân hàng hợp lệ | `Chặn` | **Passed 100%** | [`TC-HS-004.md`](./cases/TC-HS-004.md) |
| **TC-HS-005** | Đối soát trực tiếp Database PostgREST API | `Chặn` | **Passed 100%** | [`TC-HS-005.md`](./cases/TC-HS-005.md) |
| **TC-HS-006** | HR Admin phê duyệt yêu cầu -> Dữ liệu cập nhật chính thức, hết Chờ duyệt | `Chặn` | **Passed 100%** | [`TC-HS-006.md`](./cases/TC-HS-006.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/profile-update/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── profile-update-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── profile-update-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
