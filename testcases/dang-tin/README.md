# Bộ Kịch Bản Kiểm Thử Phân Hệ Đăng Tin Nội Bộ Admin

> **Phân hệ**: Đăng Tin Nội Bộ Admin  
> **Tổng số kịch bản**: 11 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-*.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 11 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-ADM-TN-001** | Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login) | `Chặn` | **Passed 100%** | [`TC-ADM-TN-001.md`](./cases/TC-ADM-TN-001.md) |
| **TC-ADM-TN-002** | Điều hướng đến Màn hình Tin nội bộ (#/tin-noi-bo) và kiểm tra giao diện bảng | `Chặn` | **Passed 100%** | [`TC-ADM-TN-002.md`](./cases/TC-ADM-TN-002.md) |
| **TC-ADM-TN-003** | Mở Hộp thoại Soạn tin mới và kiểm tra các trường thông tin bắt buộc | `Sai` | **Passed 100%** | [`TC-ADM-TN-003.md`](./cases/TC-ADM-TN-003.md) |
| **TC-ADM-TN-004** | Điền thông tin Chuyên mục, Tiêu đề, Nội dung, Bật Ghim và Lưu tin mới thành công | `Chặn` | **Passed 100%** | [`TC-ADM-TN-004.md`](./cases/TC-ADM-TN-004.md) |
| **TC-ADM-TN-005** | Xác nhận bài tin vừa đăng xuất hiện trên Bảng danh sách với đầy đủ nhãn Ghim & Chuyên mục | `Chặn` | **Passed 100%** | [`TC-ADM-TN-005.md`](./cases/TC-ADM-TN-005.md) |
| **TC-ADM-TN-006** | Lọc danh sách theo Chuyên mục và xác nhận tin hiển thị đúng bộ lọc | `Sai` | **Passed 100%** | [`TC-ADM-TN-006.md`](./cases/TC-ADM-TN-006.md) |
| **TC-ADM-TN-BVA-01** | [Biên dưới] Kiểm tra validation khi Tiêu đề rỗng hoặc chỉ chứa khoảng trắng | `Sai` | **Passed 100%** | [`TC-ADM-TN-BVA-01.md`](./cases/TC-ADM-TN-BVA-01.md) |
| **TC-ADM-TN-BVA-02** | [Biên dưới hợp lệ] Tiêu đề đúng 1 ký tự được chấp nhận và kích hoạt nút Lưu | `Sai` | **Passed 100%** | [`TC-ADM-TN-BVA-02.md`](./cases/TC-ADM-TN-BVA-02.md) |
| **TC-ADM-TN-BVA-03** | [Biên trên tối đa] Tiêu đề đạt ngưỡng 200 ký tự và chống tràn khi nhập quá 200 ký tự | `Sai` | **Passed 100%** | [`TC-ADM-TN-BVA-03.md`](./cases/TC-ADM-TN-BVA-03.md) |
| **TC-ADM-TN-BVA-04** | [Trường tùy chọn] Đăng tin với Nội dung rỗng (Empty Body) | `Nhỏ` | **Passed 100%** | [`TC-ADM-TN-BVA-04.md`](./cases/TC-ADM-TN-BVA-04.md) |
| **TC-ADM-TN-BVA-05** | [Ký tự đặc biệt & Unicode] HTML, tiếng Việt có dấu, emoji, URL | `Sai` | **Passed 100%** | [`TC-ADM-TN-BVA-05.md`](./cases/TC-ADM-TN-BVA-05.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/dang-tin/
├── README.md                      # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── dang-tin-testcases.xlsx   # File Excel bảng tính gốc (13 cột chuẩn)
├── dang-tin-testcases.json   # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                         # Từng file Markdown độc lập cho từng Test Case
```
