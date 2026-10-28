# TC-DN-012: Kiểm tra chức năng Ẩn / Hiện mật khẩu bằng nút con mắt lồng trong ô nhập

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-012`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `PasswordField.tsx / VBO-DN-02`  
> **Tham chiếu đặc tả (Spec Reference)**: `Kiểm tra thành phần PasswordField lồng nút con mắt góc phải.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đã nhập mật khẩu vào ô Mật khẩu.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mật khẩu: Password@123

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập mật khẩu (mặc định dạng dấu chấm type='password')
- [ ] 2. Bấm nút con mắt (aria-label='Hiện mật khẩu')
- [ ] 3. Kiểm tra hiển thị văn bản mật khẩu
- [ ] 4. Bấm lại nút con mắt (aria-label='Ẩn mật khẩu')

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Khi bấm hiện: type đổi sang 'text', hiển thị rõ chuỗi 'Password@123'. Khi bấm ẩn: type chuyển lại 'password', che giấu ký tự an toàn.

## 5. Ghi Chú & Lưu Ý

Pending
