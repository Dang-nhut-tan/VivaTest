# Bộ Kịch Bản Kiểm Thử Phân Hệ Cho Nhân Sự Nghỉ Việc Admin

> **Phân hệ**: Cho Nhân Sự Nghỉ Việc Admin  
> **Tổng số kịch bản**: 10 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 10 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-ADM-NV-001** | Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login) | `Chặn` | **Passed 100%** | [`TC-ADM-NV-001.md`](./cases/TC-ADM-NV-001.md) |
| **TC-ADM-NV-002** | Điều hướng đến Màn hình Nhân sự (#/nhan-su) và kiểm tra bảng dữ liệu | `Chặn` | **Passed 100%** | [`TC-ADM-NV-002.md`](./cases/TC-ADM-NV-002.md) |
| **TC-ADM-NV-003** | Tìm kiếm nhân viên kiểm thử và mở Menu thao tác | `Chặn` | **Passed 100%** | [`TC-ADM-NV-003.md`](./cases/TC-ADM-NV-003.md) |
| **TC-ADM-NV-004** | Mở Hộp thoại Cho nghỉ việc và kiểm tra các trường bắt buộc | `Sai` | **Passed 100%** | [`TC-ADM-NV-004.md`](./cases/TC-ADM-NV-004.md) |
| **TC-ADM-NV-BVA-01** | [Biên dưới lý do] Lý do để trống hoặc chỉ chứa khoảng trắng -> Vô hiệu nút Xác nhận | `Sai` | **Passed 100%** | [`TC-ADM-NV-BVA-01.md`](./cases/TC-ADM-NV-BVA-01.md) |
| **TC-ADM-NV-BVA-02** | [Biên dưới hợp lệ] Điền lý do hợp lệ có nghĩa -> Kích hoạt nút Xác nhận | `Sai` | **Passed 100%** | [`TC-ADM-NV-BVA-02.md`](./cases/TC-ADM-NV-BVA-02.md) |
| **TC-ADM-NV-BVA-03** | [Biên ngày nghỉ] Chọn ngày nghỉ ở tương lai -> Báo lỗi không được sau hôm nay | `Sai` | **Passed 100%** | [`TC-ADM-NV-BVA-03.md`](./cases/TC-ADM-NV-BVA-03.md) |
| **TC-ADM-NV-005** | Điền thông tin hợp lệ và thực hiện Cho nghỉ việc thành công | `Chặn` | **Passed 100%** | [`TC-ADM-NV-005.md`](./cases/TC-ADM-NV-005.md) |
| **TC-ADM-NV-006** | Đối soát trạng thái nhân viên trên bảng chuyển sang Đã nghỉ việc | `Chặn` | **Passed 100%** | [`TC-ADM-NV-006.md`](./cases/TC-ADM-NV-006.md) |
| **TC-ADM-NV-007** | Xác nhận mục Cho nghỉ việc trong Menu thao tác đã bị ẩn đối với nhân viên đã nghỉ | `Sai` | **Passed 100%** | [`TC-ADM-NV-007.md`](./cases/TC-ADM-NV-007.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/nghi-viec/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── nghi-viec-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── nghi-viec-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
