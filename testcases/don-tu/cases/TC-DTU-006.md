# TC-DTU-006: Mở biểu mẫu Xác nhận công trực tiếp qua URL query param (?don=xac-nhan-cong)

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-006`  
> **Độ nghiêm trọng (Severity)**: `Nhỏ`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-10`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên đã đăng nhập

## 2. Dữ Liệu Kiểm Thử (Test Data)

Truy cập /don-tu?don=xac-nhan-cong

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Điều hướng trình duyệt đến /don-tu?don=xac-nhan-cong
- [ ] 2. Quan sát phản ứng giao diện

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Sheet Xác nhận công tự động mở sẵn trực tiếp mà không cần bấm chọn thủ công qua menu tạo đơn.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
