# Bộ Kịch Bản Kiểm Thử Phân Hệ Xác Thực SĐT & Quên Mật Khẩu

> **Phân hệ**: Xác Thực SĐT & Quên Mật Khẩu  
> **Tổng số kịch bản**: 6 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 6 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-APF-001** | Đăng nhập thành công bằng Số điện thoại qua Tab Số điện thoại (VBO-DN-09) | `Chặn` | **Passed 100%** | [`TC-APF-001.md`](./cases/TC-APF-001.md) |
| **TC-APF-002** | Đăng xuất tài khoản và quay về trang Đăng nhập | `Chặn` | **Passed 100%** | [`TC-APF-002.md`](./cases/TC-APF-002.md) |
| **TC-APF-003** | Điều hướng từ trang Đăng nhập sang trang Quên mật khẩu (/quen-mat-khau) | `Sai` | **Passed 100%** | [`TC-APF-003.md`](./cases/TC-APF-003.md) |
| **TC-APF-004** | Kiểm tra Validation form Quên mật khẩu (Chặn gửi khi ô trống) | `Sai` | **Passed 100%** | [`TC-APF-004.md`](./cases/TC-APF-004.md) |
| **TC-APF-005** | Gửi yêu cầu Quên mật khẩu bằng Số điện thoại & xác nhận câu thông báo an toàn | `Chặn` | **Passed 100%** | [`TC-APF-005.md`](./cases/TC-APF-005.md) |
| **TC-APF-006** | Gửi yêu cầu Quên mật khẩu bằng Mã nhân viên & đối soát Backend API | `Chặn` | **Passed 100%** | [`TC-APF-006.md`](./cases/TC-APF-006.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/auth-phone-forgot/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── auth-phone-forgot-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── auth-phone-forgot-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
