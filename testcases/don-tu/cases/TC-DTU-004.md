# TC-DTU-004: Kiểm tra Validation Đơn xác nhận công (Chọn Quên chấm công vào mà chưa nhập Giờ vào)

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-004`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-10`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở Sheet Đơn xác nhận công

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chọn lý do Quên chấm công vào nhưng chưa nhập giờ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm Tạo đơn mới và chọn Xác nhận công
- [ ] 2. Chọn ngày công và tích chọn Quên chấm công vào
- [ ] 3. Để trống trường Giờ vào thực tế
- [ ] 4. Quan sát nút Gửi quản lý

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống hiển thị cảnh báo mốc giờ bắt buộc và khóa nút Gửi quản lý.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
