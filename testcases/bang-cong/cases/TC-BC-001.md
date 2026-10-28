# TC-BC-001: Tải giao diện Bảng công & Kiểm tra Header và Thanh chọn kỳ công

> **Phân hệ**: Xem Bảng Công  
> **Mã kịch bản**: `TC-BC-001`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-BC-01 & VBO-BC-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên văn phòng NVVP01AUTO đã đăng nhập hệ thống

## 2. Dữ Liệu Kiểm Thử (Test Data)

Kỳ công hiện tại hoặc kỳ liền kề

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở trang chủ ứng dụng
- [ ] 2. Điều hướng vào đường dẫn /bang-cong?web=thu
- [ ] 3. Quan sát tiêu đề Header Bảng công và thanh điều hướng kỳ công

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Giao diện tải hoàn tất, tiêu đề hiển thị Bảng công và thanh chọn kỳ công hiển thị Kỳ T10/2026 hoặc T11/2026 kèm trạng thái chuẩn xác.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
