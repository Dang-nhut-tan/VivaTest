# Bộ Kịch Bản Kiểm Thử Phân Hệ Quản Lý Công Ty Admin

> **Phân hệ**: Quản Lý Công Ty Admin  
> **Tổng số kịch bản**: 12 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 12 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-ADM-CO-001** | Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login) | `Chặn` | **Passed 100%** | [`TC-ADM-CO-001.md`](./cases/TC-ADM-CO-001.md) |
| **TC-ADM-CO-002** | Điều hướng tới Màn hình Công ty (#/cong-ty) và kiểm tra giao diện bảng | `Chặn` | **Passed 100%** | [`TC-ADM-CO-002.md`](./cases/TC-ADM-CO-002.md) |
| **TC-ADM-CO-003** | Mở Hộp thoại Thêm công ty và kiểm tra các trường nhập liệu | `Sai` | **Passed 100%** | [`TC-ADM-CO-003.md`](./cases/TC-ADM-CO-003.md) |
| **TC-ADM-CO-BVA-01** | [BVA] Mã công ty < 2 ký tự hoặc chứa ký tự đặc biệt -> Hiển thị cảnh báo định dạng mã | `Sai` | **Passed 100%** | [`TC-ADM-CO-BVA-01.md`](./cases/TC-ADM-CO-BVA-01.md) |
| **TC-ADM-CO-BVA-02** | [BVA] Tên công ty để trống -> Hiển thị cảnh báo Vui lòng nhập tên công ty | `Sai` | **Passed 100%** | [`TC-ADM-CO-BVA-02.md`](./cases/TC-ADM-CO-BVA-02.md) |
| **TC-ADM-CO-BVA-03** | [BVA] Mã số thuế sai quy cách (5 số) -> Hiển thị cảnh báo định dạng MST | `Sai` | **Passed 100%** | [`TC-ADM-CO-BVA-03.md`](./cases/TC-ADM-CO-BVA-03.md) |
| **TC-ADM-CO-004** | Thêm công ty mới hợp lệ thành công với MST 10 số | `Chặn` | **Passed 100%** | [`TC-ADM-CO-004.md`](./cases/TC-ADM-CO-004.md) |
| **TC-ADM-CO-005** | Đối soát công ty mới tạo hiển thị trên bảng danh sách với thông tin chuẩn xác | `Chặn` | **Passed 100%** | [`TC-ADM-CO-005.md`](./cases/TC-ADM-CO-005.md) |
| **TC-ADM-CO-006** | Mở Hộp thoại Sửa công ty, cập nhật tên và mã số thuế 13 số thành công | `Chặn` | **Passed 100%** | [`TC-ADM-CO-006.md`](./cases/TC-ADM-CO-006.md) |
| **TC-ADM-CO-007** | Đối soát thông tin công ty sau cập nhật hiển thị chính xác trên bảng danh sách | `Sai` | **Passed 100%** | [`TC-ADM-CO-007.md`](./cases/TC-ADM-CO-007.md) |
| **TC-ADM-CO-008** | Mở Hộp thoại Xoá công ty và thực hiện Xác nhận xoá thành công | `Chặn` | **Passed 100%** | [`TC-ADM-CO-008.md`](./cases/TC-ADM-CO-008.md) |
| **TC-ADM-CO-009** | Đối soát công ty đã bị xoá hoàn toàn khỏi bảng danh sách | `Chặn` | **Passed 100%** | [`TC-ADM-CO-009.md`](./cases/TC-ADM-CO-009.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/cong-ty/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── cong-ty-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── cong-ty-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
