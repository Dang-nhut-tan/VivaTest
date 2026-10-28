# TC-ADM-CO-006: Mở Hộp thoại Sửa công ty, cập nhật tên và mã số thuế 13 số thành công

> **Phân hệ**: Quản Lý Công Ty Admin  
> **Mã kịch bản**: `TC-ADM-CO-006`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-11`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Công ty đã tồn tại trên bảng danh sách

## 2. Dữ Liệu Kiểm Thử (Test Data)

Cập nhật tên mới và MST 13 số 0317609954-001

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm nút Sửa tại dòng công ty
- [ ] 2. Cập nhật Tên công ty
- [ ] 3. Cập nhật MST 13 số chi nhánh
- [ ] 4. Bấm Lưu

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Cập nhật thành công thông tin công ty và hộp thoại đóng lại.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
