# Bộ Kịch Bản Kiểm Thử Phân Hệ Quên Mật Khẩu

> **Phân hệ**: Quên Mật Khẩu  
> **Tổng số kịch bản**: 14 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 14 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-QM-002** | Gửi yêu cầu Quên mật khẩu thành công bằng Số điện thoại chuẩn hóa | `Chặn` | **Passed 100%** | [`TC-QM-002.md`](./cases/TC-QM-002.md) |
| **TC-QM-003** | Kiểm tra bảo mật định danh đối với Mã NV / SĐT không tồn tại (Chống dò tìm User) | `Chặn` | **Passed 100%** | [`TC-QM-003.md`](./cases/TC-QM-003.md) |
| **TC-QM-004** | Ngăn chặn gửi dồn nhiều yêu cầu liên tiếp khi bấm nút nhanh (Double Submit Throttling) | `Chặn` | **Passed 100%** | [`TC-QM-004.md`](./cases/TC-QM-004.md) |
| **TC-QM-005** | Phanh chống ngập 1: Chặn âm thầm khi nhân viên đang có yêu cầu ở trạng thái Pending | `Chặn` | **Passed 100%** | [`TC-QM-005.md`](./cases/TC-QM-005.md) |
| **TC-QM-006** | Phanh chống ngập 2: Chặn âm thầm khi một tài khoản vượt ngưỡng 3 yêu cầu trong 24 giờ | `Chặn` | **Passed 100%** | [`TC-QM-006.md`](./cases/TC-QM-006.md) |
| **TC-QM-007** | Kiểm soát phân quyền RPC: Khách chưa đăng nhập (web_anon) không thể gọi duyet/tu_choi | `Chặn` | **Passed 100%** | [`TC-QM-007.md`](./cases/TC-QM-007.md) |
| **TC-QM-008** | Trưởng phòng HCNS duyệt yêu cầu: Kích hoạt mật khẩu tạm Viva@123 và cờ đổi mật khẩu | `Chặn` | **Passed 100%** | [`TC-QM-008.md`](./cases/TC-QM-008.md) |
| **TC-QM-009** | Kiểm tra Validation trạng thái nút 'Gửi yêu cầu' khi ô định danh để trống | `Sai` | **Passed 100%** | [`TC-QM-009.md`](./cases/TC-QM-009.md) |
| **TC-QM-010** | Kiểm tra Validation khi nhập chuỗi chỉ chứa toàn khoảng trắng (Whitespace Only) | `Sai` | **Passed 100%** | [`TC-QM-010.md`](./cases/TC-QM-010.md) |
| **TC-QM-011** | Kiểm tra cơ chế tự động chuyển chữ thường thành in hoa ngay khi gõ Mã nhân viên | `Sai` | **Passed 100%** | [`TC-QM-011.md`](./cases/TC-QM-011.md) |
| **TC-QM-012** | Kiểm tra điều hướng chính xác từ liên kết 'Quên mật khẩu' tại màn hình Đăng nhập | `Sai` | **Passed 100%** | [`TC-QM-012.md`](./cases/TC-QM-012.md) |
| **TC-QM-013** | Kiểm tra điều hướng nút 'Quay lại đăng nhập' từ cả form nhập liệu và khối thông báo | `Sai` | **Passed 100%** | [`TC-QM-013.md`](./cases/TC-QM-013.md) |
| **TC-QM-014** | Kiểm tra xử lý lỗi kết nối mạng (Network Offline) và khả năng phục hồi giao diện | `Sai` | **Passed 100%** | [`TC-QM-014.md`](./cases/TC-QM-014.md) |
| **TC-QM-015** | Kiểm tra hiển thị đầy đủ Brand Header VBO-QM-01 (Logo, Tiêu đề, Placeholder mẫu) | `Nhỏ` | **Passed 100%** | [`TC-QM-015.md`](./cases/TC-QM-015.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/quen-mat-khau/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── quen-mat-khau-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── quen-mat-khau-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
