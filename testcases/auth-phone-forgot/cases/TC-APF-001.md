# TC-APF-001: Đăng nhập thành công bằng Số điện thoại qua Tab Số điện thoại (VBO-DN-09)

> **Phân hệ**: Xác Thực SĐT & Quên Mật Khẩu  
> **Mã kịch bản**: `TC-APF-001`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DN-09`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên đã gắn số điện thoại hợp lệ

## 2. Dữ Liệu Kiểm Thử (Test Data)

Số điện thoại và mật khẩu đã kích hoạt

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở trang Đăng nhập /dang-nhap?web=thu
- [ ] 2. Nhấp chọn tab Số điện thoại
- [ ] 3. Điền số điện thoại và mật khẩu
- [ ] 4. Bấm Đăng nhập

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Đăng nhập thành công, chuyển hướng vào Trang chủ và token xác thực được lưu an toàn.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
