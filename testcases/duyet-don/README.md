# Bộ Kịch Bản Kiểm Thử Phân Hệ Duyệt Đơn & Phân Cấp Phê Duyệt (Multi-Level Approval Hierarchy)

> **Phân hệ**: Duyệt Đơn & Phân Cấp Phê Duyệt (/duyet-don)  
> **Tổng số kịch bản**: 6 Test Cases (100% Automation Ready & 100% Passed)  
> **Mô hình kiến trúc**: Playwright Page Object Model (POM), Web-First Assertions, Mocking & Real Multi-Role Testing  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-DD-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 6 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Ưu Tiên | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **TC-DD-001** | Quản lý quán (`STORE_MANAGER`) duyệt đơn xin nghỉ phép của nhân viên quán | `Chặn` | `P0` | **Passed 100%** | [`TC-DD-001.md`](./cases/TC-DD-001.md) |
| **TC-DD-002** | Phó quản lý quán (`DEPUTY_MANAGER`) có quyền xem nhưng KHÔNG được duyệt (Read-only Guard) | `Chặn` | `P0` | **Passed 100%** | [`TC-DD-002.md`](./cases/TC-DD-002.md) |
| **TC-DD-003** | Nhân viên văn phòng gửi đơn -> Trưởng phòng (`DEPT_HEAD`) duyệt đơn trong tab Đơn nhân viên | `Chặn` | `P0` | **Passed 100%** | [`TC-DD-003.md`](./cases/TC-DD-003.md) |
| **TC-DD-004** | Trưởng phòng xin nghỉ phép -> Hệ thống chặn tự duyệt (Đơn của tôi không có nút Duyệt) | `Chặn` | `P0` | **Passed 100%** | [`TC-DD-004.md`](./cases/TC-DD-004.md) |
| **TC-DD-005** | CEO đăng nhập -> Hệ thống thu hẹp bộ lọc, chỉ hiện đơn Trưởng phòng và ẩn đơn nhân viên thường | `Chặn` | `P0` | **Passed 100%** | [`TC-DD-005.md`](./cases/TC-DD-005.md) |
| **TC-DD-006** | CEO phê duyệt đơn xin nghỉ phép của Trưởng phòng thành công | `Chặn` | `P0` | **Passed 100%** | [`TC-DD-006.md`](./cases/TC-DD-006.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/duyet-don/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── duyet-don-testcases.xlsx       # File Excel bảng tính gốc (13 cột chuẩn)
├── duyet-don-testcases.json       # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
    ├── TC-DD-001.md
    ├── TC-DD-002.md
    ├── TC-DD-003.md
    ├── TC-DD-004.md
    ├── TC-DD-005.md
    └── TC-DD-006.md
```
