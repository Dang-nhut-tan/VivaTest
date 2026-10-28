# TC-DN-013: Kiểm tra tính năng Ghi nhớ đăng nhập trên máy này kéo dài thời hạn phiên (Remember Me)

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-013`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-13 / RememberCheckbox.tsx / VBO-DN-02`  
> **Tham chiếu đặc tả (Spec Reference)**: `Chính sách duy trì phiên làm việc cho nhân viên cửa hàng.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở form Đăng nhập.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Checkbox Nhớ đăng nhập = checked

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Tích chọn checkbox 'Nhớ đăng nhập trên máy này'
- [ ] 2. Đăng nhập thành công
- [ ] 3. Kiểm tra thông tin phiên lưu trữ trong localStorage/sessionStorage

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống ghi nhận cờ remembered=true, cấp hạn phiên sống 30 ngày thay vì phiên mặc định 8 giờ, cho phép người dùng không phải đăng nhập lại mỗi ca làm việc.

## 5. Ghi Chú & Lưu Ý

Pending
