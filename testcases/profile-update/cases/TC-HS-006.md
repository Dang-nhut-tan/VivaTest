# TC-HS-006: HR Admin phê duyệt yêu cầu -> Dữ liệu cập nhật chính thức, hết Chờ duyệt

> **Phân hệ**: Cập Nhật Hồ Sơ & Ngân Hàng  
> **Mã kịch bản**: `TC-HS-006`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-HS-08`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Có yêu cầu cập nhật đang chờ duyệt

## 2. Dữ Liệu Kiểm Thử (Test Data)

HR Admin duyệt các yêu cầu

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] HR Admin phê duyệt các yêu cầu cập nhật hồ sơ
- [ ] 2. Tải lại trang Hồ sơ của nhân viên
- [ ] 3. Kiểm tra thông tin hiển thị

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Số điện thoại và tài khoản ngân hàng mới được cập nhật chính thức; toàn bộ nhãn Chờ duyệt biến mất hoàn toàn.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
