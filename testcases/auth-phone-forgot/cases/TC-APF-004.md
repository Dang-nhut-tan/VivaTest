# TC-APF-004: Kiểm tra Validation form Quên mật khẩu (Chặn gửi khi ô trống)

> **Phân hệ**: Xác Thực SĐT & Quên Mật Khẩu  
> **Mã kịch bản**: `TC-APF-004`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-QM-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình Quên mật khẩu

## 2. Dữ Liệu Kiểm Thử (Test Data)

Để trống ô định danh

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Để trống trường nhập Số điện thoại hoặc Mã nhân viên
- [ ] 2. Quan sát nút Gửi yêu cầu

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Nút Gửi yêu cầu bị vô hiệu hóa (disabled), chỉ kích hoạt khi người dùng nhập dữ liệu.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
