# TC-ADM-CO-008: Mở Hộp thoại Xoá công ty và thực hiện Xác nhận xoá thành công

> **Phân hệ**: Quản Lý Công Ty Admin  
> **Mã kịch bản**: `TC-ADM-CO-008`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-11`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Công ty có 0 phòng ban và 0 quán

## 2. Dữ Liệu Kiểm Thử (Test Data)

Nút Xóa công ty

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm nút Xóa tại dòng công ty
- [ ] 2. Kiểm tra thông điệp xác nhận trong hộp thoại
- [ ] 3. Bấm Xác nhận xóa

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Tuân thủ SPEC-AD-11.4: Công ty có 0 đơn vị trực thuộc được xác nhận xóa an toàn.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
