# TC-PA-003: Gửi phản ánh ẨN DANH thành công & kiểm tra cơ chế bảo mật sinh mã vé

> **Phân hệ**: Kênh Phản Ánh & Khiếu Nại  
> **Mã kịch bản**: `TC-PA-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-PA-03`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đã chọn hình thức Ẩn danh

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chủ đề: Công việc, Nội dung phản ánh hợp lệ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Chọn phân loại chủ đề
- [ ] 2. Nhập nội dung sự việc chi tiết
- [ ] 3. Bấm Gửi phản ánh ẩn danh
- [ ] 4. Quan sát mã vé và nút chuyển tiếp

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống gửi thành công, sinh mã vé ngẫu nhiên 12 ký tự; các nút chuyển tiếp bị khóa cho đến khi người dùng tích xác nhận đã lưu mã vé.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
