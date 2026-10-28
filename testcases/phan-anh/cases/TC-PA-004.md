# TC-PA-004: Tra cứu phản ánh ẨN DANH bằng mã vé và đối soát thông tin

> **Phân hệ**: Kênh Phản Ánh & Khiếu Nại  
> **Mã kịch bản**: `TC-PA-004`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-PA-04`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đã có mã vé phản ánh ẩn danh hợp lệ

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã vé 12 ký tự đã lưu

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Điều hướng sang màn hình Tra cứu phản ánh /phan-anh/tra-cuu
- [ ] 2. Nhập mã vé vào ô tìm kiếm
- [ ] 3. Bấm Tra cứu và đối soát kết quả

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hiển thị chính xác chi tiết phản ánh ẩn danh, trạng thái Chờ tiếp nhận, nhãn Gửi ẩn danh và đối soát API trả dữ liệu chuẩn xác.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
