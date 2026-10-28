# TC-DTU-002: Kiểm tra Validation form Đơn xin nghỉ phép (Chặn gửi khi thiếu Lý do)

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-002`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-05`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở Sheet Đơn xin nghỉ phép

## 2. Dữ Liệu Kiểm Thử (Test Data)

Để trống trường Lý do

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm nút Tạo đơn mới và chọn Nghỉ phép
- [ ] 2. Chọn loại phép và ngày nghỉ nhưng để trống ô Lý do
- [ ] 3. Quan sát trạng thái nút Gửi đơn

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Nút Gửi đơn bị vô hiệu hóa (disabled), form chặn gửi và cảnh báo người dùng phải điền lý do nghỉ phép.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
