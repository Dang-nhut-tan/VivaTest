# Bộ Kịch Bản Kiểm Thử Phân Hệ Đăng Nhập

> **Phân hệ**: Đăng Nhập  
> **Tổng số kịch bản**: 14 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 14 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-DN-002** | Đăng nhập thành công bằng Số điện thoại và Mật khẩu hợp lệ qua Tab Số điện thoại | `Chặn` | **Passed 100%** | [`TC-DN-002.md`](./cases/TC-DN-002.md) |
| **TC-DN-003** | Kiểm tra Bảo mật Phản hồi Chung khi nhập sai Mật khẩu hoặc Tài khoản không tồn tại (Chống dò User) | `Chặn` | **Passed 100%** | [`TC-DN-003.md`](./cases/TC-DN-003.md) |
| **TC-DN-004** | Ngăn chặn gửi dồn nhiều lần khi bấm nút Đăng nhập liên tiếp (Double Submit Throttling) | `Chặn` | **Passed 100%** | [`TC-DN-004.md`](./cases/TC-DN-004.md) |
| **TC-DN-005** | Khóa tài khoản tạm thời sau 5 lần nhập sai mật khẩu liên tiếp (Account Lockout Policy) | `Chặn` | **Passed 100%** | [`TC-DN-005.md`](./cases/TC-DN-005.md) |
| **TC-DN-006** | Cảnh báo thiết bị lạ lần đầu đăng nhập trên máy mới và tiếp tục vào ứng dụng (MayLaNotice) | `Chặn` | **Passed 100%** | [`TC-DN-006.md`](./cases/TC-DN-006.md) |
| **TC-DN-007** | Cưỡng chế chuyển hướng sang Đổi mật khẩu đối với tài khoản đang mang Mật khẩu tạm | `Chặn` | **Passed 100%** | [`TC-DN-007.md`](./cases/TC-DN-007.md) |
| **TC-DN-008** | Từ chối đăng nhập đối với tài khoản nhân viên đã nghỉ việc (Inactive Account Protection) | `Chặn` | **Passed 100%** | [`TC-DN-008.md`](./cases/TC-DN-008.md) |
| **TC-DN-009** | Kiểm tra Validation trạng thái nút 'Đăng nhập' bị vô hiệu hóa khi thiếu thông tin | `Sai` | **Passed 100%** | [`TC-DN-009.md`](./cases/TC-DN-009.md) |
| **TC-DN-010** | Kiểm tra chuyển đổi linh hoạt giữa 2 Tab 'Mã nhân viên' và 'Số điện thoại' (VBO-DN-09) | `Sai` | **Passed 100%** | [`TC-DN-010.md`](./cases/TC-DN-010.md) |
| **TC-DN-011** | Kiểm tra cơ chế tự động chuyển chữ thường thành in hoa ngay khi gõ Mã nhân viên | `Sai` | **Passed 100%** | [`TC-DN-011.md`](./cases/TC-DN-011.md) |
| **TC-DN-012** | Kiểm tra chức năng Ẩn / Hiện mật khẩu bằng nút con mắt lồng trong ô nhập | `Sai` | **Passed 100%** | [`TC-DN-012.md`](./cases/TC-DN-012.md) |
| **TC-DN-013** | Kiểm tra tính năng Ghi nhớ đăng nhập trên máy này kéo dài thời hạn phiên (Remember Me) | `Sai` | **Passed 100%** | [`TC-DN-013.md`](./cases/TC-DN-013.md) |
| **TC-DN-014** | Kiểm tra điều hướng tiếp tục sau đăng nhập an toàn và chống vòng lặp (Deep Link ?tiep-tuc=) | `Sai` | **Passed 100%** | [`TC-DN-014.md`](./cases/TC-DN-014.md) |
| **TC-DN-015** | Kiểm tra liên kết mở hộp thoại Hướng dẫn cài ứng dụng (InstallGuideSheet) từ màn Đăng nhập | `Nhỏ` | **Passed 100%** | [`TC-DN-015.md`](./cases/TC-DN-015.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/dang-nhap/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── dang-nhap-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── dang-nhap-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
