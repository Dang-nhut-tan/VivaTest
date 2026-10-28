# TC-DN-007: Cưỡng chế chuyển hướng sang Đổi mật khẩu đối với tài khoản đang mang Mật khẩu tạm

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-007`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-98 / RequireAuth.tsx:49`  
> **Tham chiếu đặc tả (Spec Reference)**: `Bảo vệ an toàn tài khoản sau khi cấp lại mật khẩu.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản vừa được HCNS duyệt đặt lại mật khẩu tạm (cờ must_change_password = true).

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV: VG000101, Mật khẩu tạm: Viva@123

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Đăng nhập bằng Mật khẩu tạm
- [ ] 2. Quan sát điều hướng của hệ thống

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] RequireAuth lập tức chặn mọi lối vào màn nghiệp vụ và cưỡng chế chuyển hướng người dùng sang route /doi-mat-khau; người dùng không thể vào trang chủ khi chưa đổi mật khẩu riêng.

## 5. Ghi Chú & Lưu Ý

Pending
