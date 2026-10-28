# TC-APF-005: Gửi yêu cầu Quên mật khẩu bằng Số điện thoại & xác nhận câu thông báo an toàn

> **Phân hệ**: Xác Thực SĐT & Quên Mật Khẩu  
> **Mã kịch bản**: `TC-APF-005`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-QM-03`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình Quên mật khẩu

## 2. Dữ Liệu Kiểm Thử (Test Data)

Số điện thoại hợp lệ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Điền số điện thoại
- [ ] 2. Bấm Gửi yêu cầu
- [ ] 3. Quan sát câu thông báo phản hồi

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống hiển thị thông báo an toàn VBO-QM-03 bảo mật và cho phép bấm quay lại Đăng nhập.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
