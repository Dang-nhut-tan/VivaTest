# TC-PH-001: Kiểm tra xử lý ô lịch các khung giờ trong quá khứ trên lưới đặt phòng

> **Phân hệ**: Đặt Phòng Họp & Bất Cập  
> **Mã kịch bản**: `TC-PH-001`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-HP-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên đã đăng nhập

## 2. Dữ Liệu Kiểm Thử (Test Data)

Màn hình đặt phòng ngày hôm nay

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở màn hình Đặt phòng họp
- [ ] 2. Quan sát các khung giờ đã qua trong ngày
- [ ] 3. Thử nhấp vào khung giờ quá khứ

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống xác minh bất cập ô giờ quá khứ vẫn clickable nhưng chặn lưu khi gửi request.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
