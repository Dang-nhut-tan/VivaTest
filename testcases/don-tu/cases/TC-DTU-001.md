# TC-DTU-001: Đăng nhập App nhân viên và mở màn hình Đơn từ (/don-tu)

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-001`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-01 & VBO-DT-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên mới chưa có phát sinh đơn từ

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tài khoản nhân viên chuẩn

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Đăng nhập vào ứng dụng
- [ ] 2. Mở đường dẫn /don-tu
- [ ] 3. Kiểm tra trạng thái danh sách đơn

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Giao diện tải thành công, hiển thị thông báo rỗng Bạn chưa gửi đơn nào kèm nút Tạo đơn mới sẵn sàng.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
