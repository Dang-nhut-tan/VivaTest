# TC-HS-003: Kiểm tra Validation ràng buộc Số tài khoản ngân hàng (< 6 số)

> **Phân hệ**: Cập Nhật Hồ Sơ & Ngân Hàng  
> **Mã kịch bản**: `TC-HS-003`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-HS-14-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở Sheet Cập nhật tài khoản ngân hàng

## 2. Dữ Liệu Kiểm Thử (Test Data)

Số tài khoản 1234 (4 chữ số)

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở form cập nhật ngân hàng
- [ ] 2. Nhập số tài khoản dưới 6 chữ số
- [ ] 3. Bấm nút Gửi yêu cầu

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống báo lỗi validation Số tài khoản phải gồm 6–20 chữ số và chặn gửi yêu cầu.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
