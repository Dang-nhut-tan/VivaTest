# TC-DN-002: Đăng nhập thành công bằng Số điện thoại và Mật khẩu hợp lệ qua Tab Số điện thoại

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-002`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-02 / SPEC-AU-49 / VBO-DN-09`  
> **Tham chiếu đặc tả (Spec Reference)**: `Kiểm tra định danh mở rộng theo số điện thoại.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên đã cập nhật SĐT cá nhân trong hồ sơ và tài khoản active.

## 2. Dữ Liệu Kiểm Thử (Test Data)

SĐT: 0906123477, Mật khẩu: Password@123

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở trang /dang-nhap?web=thu
- [ ] 2. Chuyển sang Tab 'Số điện thoại'
- [ ] 3. Nhập Số điện thoại và Mật khẩu
- [ ] 4. Bấm nút 'Đăng nhập'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống chuẩn hóa SĐT về định dạng máy chủ GoTrue (84xxxxxxxxx), cấp vé xác thực hợp lệ và điều hướng vào trang chủ.

## 5. Ghi Chú & Lưu Ý

Pending
