# TC-PA-007: Xác nhận bảo mật danh tính: Phản ánh ẨN DANH không có trong Phản ánh của tôi

> **Phân hệ**: Kênh Phản Ánh & Khiếu Nại  
> **Mã kịch bản**: `TC-PA-007`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-PA-07`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã gửi cả phản ánh ẩn danh và đứng tên

## 2. Dữ Liệu Kiểm Thử (Test Data)

Danh sách Phản ánh của tôi và API Backend

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Kiểm tra toàn bộ danh sách trong Phản ánh của tôi
- [ ] 2. Đối soát dữ liệu API trả về

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Khẳng định tuyệt đối phản ánh Ẩn danh không xuất hiện trong danh sách Phản ánh của tôi cả trên UI lẫn Backend API.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
