# TC-DTU-003: Gửi Đơn xin nghỉ phép hợp lệ (Leave Request)

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-05`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở form Đơn xin nghỉ phép

## 2. Dữ Liệu Kiểm Thử (Test Data)

Phép năm, 1 ngày, Lý do: Việc gia đình có kế hoạch

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Chọn loại phép Nghỉ phép năm
- [ ] 2. Chọn ngày bắt đầu và kết thúc
- [ ] 3. Nhập lý do nghỉ hợp lệ
- [ ] 4. Bấm nút Gửi đơn

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Sheet tự động đóng lại; trên danh sách xuất hiện thẻ đơn Nghỉ phép với nhãn trạng thái màu cam Chờ duyệt.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
