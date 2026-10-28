# TC-DTU-005: Gửi Đơn xác nhận công bổ sung hợp lệ (Attendance Confirm Request)

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-005`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-10`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở form Đơn xác nhận công

## 2. Dữ Liệu Kiểm Thử (Test Data)

Ngày hôm qua, giờ vào 08:00, lý do: Quên quẹt thẻ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Chọn ngày công đã kết thúc
- [ ] 2. Điền mốc giờ vào thực tế 08:00
- [ ] 3. Nhập lý do cụ thể
- [ ] 4. Bấm Gửi quản lý

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Đơn gửi thành công, sheet đóng lại và thẻ đơn Xác nhận công xuất hiện trong danh sách với trạng thái Chờ duyệt.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
