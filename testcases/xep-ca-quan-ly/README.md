# Bộ Kịch Bản Kiểm Thử Phân Hệ Giao Diện Quản Lý Xếp Ca

> **Phân hệ**: Giao Diện Quản Lý Xếp Ca  
> **Tổng số kịch bản**: 4 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 4 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-XCQ-001** | Quản lý quán mở lưới xếp ca toàn cảnh hiển thị đầy đủ nhân sự và tổng giờ | `Chặn` | **Passed 100%** | [`TC-XCQ-001.md`](./cases/TC-XCQ-001.md) |
| **TC-XCQ-002** | Sử dụng bộ lọc Chỉ người chưa đăng ký để lọc nhanh nhân sự chưa nộp ca | `Sai` | **Passed 100%** | [`TC-XCQ-002.md`](./cases/TC-XCQ-002.md) |
| **TC-XCQ-003** | Hiển thị cảnh báo viền nét đứt màu vàng khi quản lý xếp ca lệch nguyện vọng | `Sai` | **Passed 100%** | [`TC-XCQ-003.md`](./cases/TC-XCQ-003.md) |
| **TC-XCQ-004** | Kích hoạt chế độ Chọn nhiều ô để gán ca hàng loạt (Bulk Assign) | `Chặn` | **Passed 100%** | [`TC-XCQ-004.md`](./cases/TC-XCQ-004.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/xep-ca-quan-ly/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── xep-ca-quan-ly-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── xep-ca-quan-ly-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
