# TC-DTU-008: Quản lý / HR phê duyệt các đơn từ -> Màn hình cập nhật trạng thái Đã duyệt

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-008`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-17`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Có đơn từ đang ở trạng thái Chờ duyệt

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tài khoản HR Admin phê duyệt đơn

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Quản lý thực hiện phê duyệt các đơn đang chờ qua hệ thống
- [ ] 2. Tải lại màn hình Đơn từ của nhân viên
- [ ] 3. Quan sát trạng thái thẻ đơn

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Thẻ đơn chuyển sang trạng thái Đã duyệt với nhãn màu xanh lá, chip Đã áp dụng hiển thị rõ ràng và ẩn nút rút đơn.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
