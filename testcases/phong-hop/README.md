# Bộ Kịch Bản Kiểm Thử Phân Hệ Đặt Phòng Họp & Bất Cập

> **Phân hệ**: Đặt Phòng Họp & Bất Cập  
> **Tổng số kịch bản**: 3 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 3 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-PH-001** | Kiểm tra xử lý ô lịch các khung giờ trong quá khứ trên lưới đặt phòng | `Sai` | **Passed 100%** | [`TC-PH-001.md`](./cases/TC-PH-001.md) |
| **TC-PH-002** | Xác minh ô lịch của chính mình trên lưới và lối vào Lượt của tôi | `Sai` | **Passed 100%** | [`TC-PH-002.md`](./cases/TC-PH-002.md) |
| **TC-PH-003** | Kiểm tra cơ chế Cần gấp chỉ cấp quyền cho thành viên Ban Giám Đốc (BOD) | `Sai` | **Passed 100%** | [`TC-PH-003.md`](./cases/TC-PH-003.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/phong-hop/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── phong-hop-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── phong-hop-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
