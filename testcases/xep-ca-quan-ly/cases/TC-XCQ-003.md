# TC-XCQ-003: Hiển thị cảnh báo viền nét đứt màu vàng khi quản lý xếp ca lệch nguyện vọng

> **Phân hệ**: Giao Diện Quản Lý Xếp Ca  
> **Mã kịch bản**: `TC-XCQ-003`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-XC-07`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đăng ký Muốn FT2

## 2. Dữ Liệu Kiểm Thử (Test Data)

Gán ca FT1 lệch nguyện vọng

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Gán ca FT1 cho nhân viên muốn làm FT2
- [ ] 2. Quan sát ô ca trên lưới

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Ô ca xuất hiện viền nét đứt màu vàng (dashed warning) kèm tooltip thông báo Khác nguyện vọng.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
