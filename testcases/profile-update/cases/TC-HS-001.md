# TC-HS-001: Đăng nhập App nhân viên và mở trang Hồ sơ

> **Phân hệ**: Cập Nhật Hồ Sơ & Ngân Hàng  
> **Mã kịch bản**: `TC-HS-001`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-HS-01 & VBO-HS-14`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên hợp lệ đã đăng nhập

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mở màn hình /ho-so hoặc /trang-chu

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Đăng nhập vào ứng dụng
- [ ] 2. Mở màn hình Hồ sơ cá nhân
- [ ] 3. Kiểm tra các thẻ thông tin liên hệ và ngân hàng

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Giao diện tải thành công, hiển thị đầy đủ thẻ Thông tin liên hệ và thẻ Tài khoản nhận lương.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
