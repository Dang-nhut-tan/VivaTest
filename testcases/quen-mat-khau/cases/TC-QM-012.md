# TC-QM-012: Kiểm tra điều hướng chính xác từ liên kết 'Quên mật khẩu' tại màn hình Đăng nhập

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-012`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `VBO-DN-04 / AUTH_ROUTES.QUEN_MAT_KHAU`  
> **Tham chiếu đặc tả (Spec Reference)**: `Luồng điều hướng phụ từ Đăng nhập.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở trang Đăng nhập /dang-nhap?web=thu.

## 2. Dữ Liệu Kiểm Thử (Test Data)

None

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Tìm và bấm vào nút/link 'Quên mật khẩu'
- [ ] 2. Quan sát URL và giao diện hiển thị

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Trình duyệt điều hướng chính xác sang URL /quen-mat-khau, giao diện dựng đầy đủ Shell VBO-QM-01 và form VBO-QM-02.

## 5. Ghi Chú & Lưu Ý

Pending
