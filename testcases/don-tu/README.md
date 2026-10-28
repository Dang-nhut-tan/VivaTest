# Bộ Kịch Bản Kiểm Thử Phân Hệ Đơn Từ & Xác Nhận Công

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Tổng số kịch bản**: 9 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 9 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-DTU-001** | Đăng nhập App nhân viên và mở màn hình Đơn từ (/don-tu) | `Chặn` | **Passed 100%** | [`TC-DTU-001.md`](./cases/TC-DTU-001.md) |
| **TC-DTU-002** | Kiểm tra Validation form Đơn xin nghỉ phép (Chặn gửi khi thiếu Lý do) | `Sai` | **Passed 100%** | [`TC-DTU-002.md`](./cases/TC-DTU-002.md) |
| **TC-DTU-003** | Gửi Đơn xin nghỉ phép hợp lệ (Leave Request) | `Chặn` | **Passed 100%** | [`TC-DTU-003.md`](./cases/TC-DTU-003.md) |
| **TC-DTU-004** | Kiểm tra Validation Đơn xác nhận công (Chọn Quên chấm công vào mà chưa nhập Giờ vào) | `Sai` | **Passed 100%** | [`TC-DTU-004.md`](./cases/TC-DTU-004.md) |
| **TC-DTU-005** | Gửi Đơn xác nhận công bổ sung hợp lệ (Attendance Confirm Request) | `Chặn` | **Passed 100%** | [`TC-DTU-005.md`](./cases/TC-DTU-005.md) |
| **TC-DTU-006** | Mở biểu mẫu Xác nhận công trực tiếp qua URL query param (?don=xac-nhan-cong) | `Nhỏ` | **Passed 100%** | [`TC-DTU-006.md`](./cases/TC-DTU-006.md) |
| **TC-DTU-007** | Đối soát Database PostgREST API (Xác nhận các bản ghi đã lưu vào DB kho thật) | `Chặn` | **Passed 100%** | [`TC-DTU-007.md`](./cases/TC-DTU-007.md) |
| **TC-DTU-008** | Quản lý / HR phê duyệt các đơn từ -> Màn hình cập nhật trạng thái Đã duyệt | `Chặn` | **Passed 100%** | [`TC-DTU-008.md`](./cases/TC-DTU-008.md) |
| **TC-DTU-009** | Kiểm tra trường Tăng ca tới mấy giờ bị khóa khi chưa có ca kèm thông báo giải thích rõ ràng | `Sai` | **Passed 100%** | [`TC-DTU-009.md`](./cases/TC-DTU-009.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/don-tu/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── don-tu-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── don-tu-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
