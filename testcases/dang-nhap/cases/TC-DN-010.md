# TC-DN-010: Kiểm tra chuyển đổi linh hoạt giữa 2 Tab 'Mã nhân viên' và 'Số điện thoại' (VBO-DN-09)

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-010`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-49 / VBO-DN-09 / TabDinhDanh.tsx`  
> **Tham chiếu đặc tả (Spec Reference)**: `Kiểm tra trải nghiệm người dùng trên thanh chọn lối đăng nhập.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình Đăng nhập.

## 2. Dữ Liệu Kiểm Thử (Test Data)

None

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm Tab 'Số điện thoại' -> Kiểm tra nhãn ô đổi thành 'Số điện thoại', placeholder 'VD: 0912345678'
- [ ] 2. Bấm lại Tab 'Mã nhân viên' -> Kiểm tra nhãn đổi về 'Mã nhân viên', placeholder 'VD: VG000101'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Tablist chuyển đổi mượt mà, cập nhật đúng nhãn và placeholder gợi ý tương ứng; xóa ô định danh khi đổi tab để tránh nhầm lẫn.

## 5. Ghi Chú & Lưu Ý

Pending
