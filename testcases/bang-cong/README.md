# Bộ Kịch Bản Kiểm Thử Phân Hệ Xem Bảng Công

> **Phân hệ**: Xem Bảng Công  
> **Tổng số kịch bản**: 6 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 6 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-BC-001** | Tải giao diện Bảng công & Kiểm tra Header và Thanh chọn kỳ công | `Chặn` | **Passed 100%** | [`TC-BC-001.md`](./cases/TC-BC-001.md) |
| **TC-BC-002** | Kiểm tra Thẻ tổng kết công cuối kỳ (6 chỉ số công & 2 chỉ số OT đối chiếu Đ.107 BLLĐ) | `Chặn` | **Passed 100%** | [`TC-BC-002.md`](./cases/TC-BC-002.md) |
| **TC-BC-003** | Kiểm tra Lưới lịch chấm công & Ký hiệu công ngày 16 | `Chặn` | **Passed 100%** | [`TC-BC-003.md`](./cases/TC-BC-003.md) |
| **TC-BC-004** | Mở Sheet chi tiết ngày công và kiểm tra thông tin ca & giờ làm | `Sai` | **Passed 100%** | [`TC-BC-004.md`](./cases/TC-BC-004.md) |
| **TC-BC-005** | Chuyển đổi qua lại giữa các kỳ công (Kỳ trước / Kỳ sau) qua PeriodNav | `Sai` | **Passed 100%** | [`TC-BC-005.md`](./cases/TC-BC-005.md) |
| **TC-BC-006** | Mở và đóng Sheet giải thích cách tính ngày công | `Nhỏ` | **Passed 100%** | [`TC-BC-006.md`](./cases/TC-BC-006.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/bang-cong/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── bang-cong-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── bang-cong-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
