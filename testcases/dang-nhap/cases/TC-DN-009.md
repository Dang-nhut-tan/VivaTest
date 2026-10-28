# TC-DN-009: Kiểm tra Validation trạng thái nút 'Đăng nhập' bị vô hiệu hóa khi thiếu thông tin

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-009`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `VBO-DN-02 / DangNhapPage.tsx:75`  
> **Tham chiếu đặc tả (Spec Reference)**: `Validation bắt buộc phía Client trước khi gửi request.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Mở trang /dang-nhap?web=thu.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chỉ nhập định danh để trống mật khẩu HOẶC ngược lại

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Để trống cả 2 ô -> Kiểm tra nút Đăng nhập
- [ ] 2. Nhập định danh, để trống mật khẩu -> Kiểm tra nút
- [ ] 3. Để trống định danh, nhập mật khẩu -> Kiểm tra nút

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Trong cả 3 trường hợp, nút 'Đăng nhập' đều ở trạng thái disabled, cursor not-allowed, ngăn chặn kích hoạt sự kiện submit.

## 5. Ghi Chú & Lưu Ý

Pending
