# TC-HS-002: Gửi yêu cầu cập nhật Thông tin liên hệ (SĐT & Email)

> **Phân hệ**: Cập Nhật Hồ Sơ & Ngân Hàng  
> **Mã kịch bản**: `TC-HS-002`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-HS-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở trang Hồ sơ

## 2. Dữ Liệu Kiểm Thử (Test Data)

SĐT mới 0987654321, Email mới nv.update@vivacorp.vn

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm nút Chỉnh sửa tại thẻ Thông tin liên hệ
- [ ] 2. Nhập số điện thoại và email mới
- [ ] 3. Bấm Gửi yêu cầu cập nhật

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Sheet đóng lại, thẻ xuất hiện huy hiệu màu cam Chờ duyệt và hiển thị thông tin chờ đối soát.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
