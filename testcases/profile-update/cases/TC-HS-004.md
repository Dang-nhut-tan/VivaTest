# TC-HS-004: Gửi yêu cầu cập nhật Tài khoản ngân hàng hợp lệ

> **Phân hệ**: Cập Nhật Hồ Sơ & Ngân Hàng  
> **Mã kịch bản**: `TC-HS-004`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-HS-14`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở form Cập nhật ngân hàng

## 2. Dữ Liệu Kiểm Thử (Test Data)

Số tài khoản 19036789012345, Ngân hàng Techcombank

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập số tài khoản hợp lệ
- [ ] 2. Chọn ngân hàng thụ hưởng
- [ ] 3. Bấm Gửi yêu cầu cập nhật

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Sheet đóng lại, thẻ Tài khoản nhận lương xuất hiện huy hiệu Chờ duyệt.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
