# TC-DTU-009: Kiểm tra trường Tăng ca tới mấy giờ bị khóa khi chưa có ca kèm thông báo giải thích rõ ràng

> **Phân hệ**: Đơn Từ & Xác Nhận Công  
> **Mã kịch bản**: `TC-DTU-009`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DT-09, VBO-DT-17, VBO-DT-17.1`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên chưa có ca làm việc trong tuần, đang mở Sheet Gửi đơn tăng ca

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tài khoản nhân viên VG900001 trên thiết bị Redmi 13 (Viewport 412x915)

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Đăng nhập tài khoản nhân viên
- [ ] 2. Mở màn hình Đơn từ (/don-tu)
- [ ] 3. Bấm Tạo đơn và chọn Tăng ca
- [ ] 4. Quan sát mục 3 Tăng ca tới mấy giờ

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Ô giờ hiển thị placeholder --:-- và bị vô hiệu hóa; bên dưới hiển thị thông báo giải thích rõ ràng nguyên nhân do chưa có ca làm việc và hướng dẫn liên hệ quản lý.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
