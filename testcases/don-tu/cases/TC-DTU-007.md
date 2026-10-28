# TC-DTU-007: Đối soát Database PostgREST API (Xác nhận các bản ghi đã lưu vào DB kho thật)

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-007`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-API`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã gửi đơn nghỉ phép và xác nhận công

## 2. Dữ Liệu Kiểm Thử (Test Data)

API PostgREST leave_request và attendance_confirm_request

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Gọi API Backend kiểm tra dữ liệu bảng leave_request
- [ ] 2. Gọi API Backend kiểm tra bảng attendance_confirm_request
- [ ] 3. Đối chiếu mã nhân viên, lý do và trạng thái

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Các bản ghi tồn tại chính xác trong cơ sở dữ liệu với trạng thái PENDING và đúng thông tin nhân sự.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
