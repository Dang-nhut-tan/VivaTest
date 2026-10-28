# Bộ Kịch Bản Kiểm Thử Phân Hệ Đào Tạo (Training Test Suite)

> **Phân hệ**: Quản lý Đào tạo, Lịch học, Khai giờ bận & Sổ đã học  
> **Tổng số kịch bản**: 20 Test Cases (100% Automation Ready & 100% Passed)  
> **Cấu trúc lưu trữ**: Tách riêng từng kịch bản độc lập (`cases/TC-DT-xxx.md`) phục vụ Review Pull Request trên GitHub  

---

## Danh Mục 20 Test Cases

| ID | Tên Kịch Bản | Mức Độ | Trạng Thái | File Chi Tiết |
| :--- | :--- | :---: | :---: | :--- |
| **TC-DT-001** | Nhân viên xem danh sách lịch đào tạo cá nhân và các yêu cầu đang chờ | `Chặn` | **Pending** | [`TC-DT-001.md`](./cases/TC-DT-001.md) |
| **TC-DT-002** | Nhân viên bấm xác nhận tham gia buổi đào tạo được phân công | `Chặn` | **Pending** | [`TC-DT-002.md`](./cases/TC-DT-002.md) |
| **TC-DT-003** | Nhân viên khai báo các khoảng thời gian bận hợp lệ trong tuần | `Chặn` | **Pending** | [`TC-DT-003.md`](./cases/TC-DT-003.md) |
| **TC-DT-004** | Hệ thống phát hiện và báo lỗi khi khai báo hai khoảng giờ bận trùng lấn trong cùng ngày | `Sai` | **Pending** | [`TC-DT-004.md`](./cases/TC-DT-004.md) |
| **TC-DT-005** | Hệ thống khóa biểu mẫu khai giờ bận khi tuần đã quá hạn quy định | `Sai` | **Pending** | [`TC-DT-005.md`](./cases/TC-DT-005.md) |
| **TC-DT-006** | Nhân viên gửi yêu cầu tự đăng ký khóa đào tạo mới | `Chặn` | **Pending** | [`TC-DT-006.md`](./cases/TC-DT-006.md) |
| **TC-DT-007** | Hệ thống chặn đăng ký lặp khi nhân viên đã có yêu cầu đang chờ cho cùng khóa học | `Sai` | **Pending** | [`TC-DT-007.md`](./cases/TC-DT-007.md) |
| **TC-DT-008** | Quản lý quán chọn nhân viên cấp dưới và gửi yêu cầu đào tạo thành công | `Chặn` | **Pending** | [`TC-DT-008.md`](./cases/TC-DT-008.md) |
| **TC-DT-009** | Hệ thống bảo vệ từ chối gửi yêu cầu đào tạo nếu có nhân sự không thuộc quán quản lý | `Chặn` | **Pending** | [`TC-DT-009.md`](./cases/TC-DT-009.md) |
| **TC-DT-010** | Hủy yêu cầu đào tạo đang chờ xếp lịch | `Sai` | **Pending** | [`TC-DT-010.md`](./cases/TC-DT-010.md) |
| **TC-DT-011** | Nhân viên mở màn hình Sổ đã học tra cứu lịch sử đào tạo và chứng chỉ tích lũy | `Sai` | **Pending** | [`TC-DT-011.md`](./cases/TC-DT-011.md) |
| **TC-DT-012** | Thẻ nhắc buổi đào tạo sắp tới hiển thị chuẩn xác trên Trang chủ trong vòng 48 giờ | `Nhỏ` | **Pending** | [`TC-DT-012.md`](./cases/TC-DT-012.md) |
| **TC-DT-013** | Quản trị viên tạo mới buổi đào tạo trên trang Quản trị thành công | `Chặn` | **Pending** | [`TC-DT-013.md`](./cases/TC-DT-013.md) |
| **TC-DT-014** | Hệ thống kiểm soát phiên bản đồng thời khi chỉnh sửa buổi đào tạo | `Sai` | **Pending** | [`TC-DT-014.md`](./cases/TC-DT-014.md) |
| **TC-DT-015** | Quản trị viên hủy buổi đào tạo và tự động chuyển các học viên về hàng chờ | `Chặn` | **Pending** | [`TC-DT-015.md`](./cases/TC-DT-015.md) |
| **TC-DT-016** | Quản trị viên thực thi chức năng Xếp lịch tự động hàng loạt theo tuần | `Chặn` | **Pending** | [`TC-DT-016.md`](./cases/TC-DT-016.md) |
| **TC-DT-017** | Quản trị viên xếp tay học viên vào buổi học cụ thể và kiểm tra hiển thị cảnh báo trùng lịch | `Sai` | **Pending** | [`TC-DT-017.md`](./cases/TC-DT-017.md) |
| **TC-DT-018** | Quản trị viên thực hiện điểm danh học viên và xác nhận quy tắc ghi nhận sao đào tạo | `Chặn` | **Pending** | [`TC-DT-018.md`](./cases/TC-DT-018.md) |
| **TC-DT-019** | Hệ thống từ chối quyền truy cập trang quản lý đào tạo đối với tài khoản không có thẩm quyền | `Chặn` | **Pending** | [`TC-DT-019.md`](./cases/TC-DT-019.md) |
| **TC-DT-020** | Ứng dụng xử lý sự cố mất kết nối mạng và hiển thị cảnh báo người dùng chuẩn mực | `Nhỏ` | **Pending** | [`TC-DT-020.md`](./cases/TC-DT-020.md) |

---

## Cấu Trúc Thư Mục

```text
testcases/dao-tao/
├── README.md                  # Mục lục tổng hợp hiển thị trực tiếp trên GitHub
├── dao-tao-testcases.xlsx     # File Excel bảng tính gốc (13 cột chuẩn)
├── dao-tao-testcases.json     # Dữ liệu JSON cho tích hợp CI/CD tự động
└── cases/                     # Từng file Markdown độc lập cho từng Test Case
    ├── TC-DT-001.md
    ├── TC-DT-002.md
    ├── TC-DT-003.md
    ├── TC-DT-004.md
    ├── TC-DT-005.md
    ├── TC-DT-006.md
    ├── TC-DT-007.md
    ├── TC-DT-008.md
    ├── TC-DT-009.md
    ├── TC-DT-010.md
    ├── TC-DT-011.md
    ├── TC-DT-012.md
    ├── TC-DT-013.md
    ├── TC-DT-014.md
    ├── TC-DT-015.md
    ├── TC-DT-016.md
    ├── TC-DT-017.md
    ├── TC-DT-018.md
    ├── TC-DT-019.md
    ├── TC-DT-020.md
```
