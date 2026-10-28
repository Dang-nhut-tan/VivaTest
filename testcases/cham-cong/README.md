# Bộ Kịch Bản Kiểm Thử Phân Hệ Chấm Công Lộ Trình Đi Quán

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Tổng số kịch bản**: 5 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 5 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-CC-001** | Mở màn hình Chấm công lúc 09:50 -> Tự động nhận diện Lượt 1 (Quán A: 08:00–10:00) | `Chặn` | **Passed 100%** | [`TC-CC-001.md`](./cases/TC-CC-001.md) |
| **TC-CC-002** | Giữ nguyên màn hình, thời gian chuyển sang 10:30 -> Tự động cập nhật Lượt 2 (Quán B) không cần refresh | `Chặn` | **Passed 100%** | [`TC-CC-002.md`](./cases/TC-CC-002.md) |
| **TC-CC-003** | Cơ chế Reset GPS khi đổi quán -> Không tái sử dụng kết quả toạ độ của quán cũ | `Chặn` | **Passed 100%** | [`TC-CC-003.md`](./cases/TC-CC-003.md) |
| **TC-CC-004** | Giữ lượt VÀO đang mở -> Đã bấm Chấm vào Quán A thì không tự nhảy sang Quán B trước khi chấm ra | `Chặn` | **Passed 100%** | [`TC-CC-004.md`](./cases/TC-CC-004.md) |
| **TC-CC-005** | Kiểm tra cơ chế visibilitychange khi app quay lại từ background | `Sai` | **Passed 100%** | [`TC-CC-005.md`](./cases/TC-CC-005.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/cham-cong/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── cham-cong-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── cham-cong-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
