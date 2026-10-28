# TC-QM-008: Trưởng phòng HCNS duyệt yêu cầu: Kích hoạt mật khẩu tạm Viva@123 và cờ đổi mật khẩu

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-008`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-58 / SPEC-AU-60 / quenmatkhau-40a.sql:150`  
> **Tham chiếu đặc tả (Spec Reference)**: `Kiểm tra vòng đời hoàn chỉnh từ xin cấp lại đến duyệt của HR.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Có yêu cầu status='pending' trong password_reset_request. Đăng nhập với quyền is_hr_admin.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Yêu cầu pending ID, Lý do duyệt >= 3 ký tự

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Gọi RPC duyet_xin_dat_lai(p_id, 'Duyet cap mat khau tam')
- [ ] 2. Kiểm tra bản ghi password_reset_request và app_user

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Yêu cầu chuyển sang status='approved', có temp_password_expires_at; tài khoản nhân viên được đặt lại mật khẩu tạm 'Viva@123' và app_user.must_change_password=true.

## 5. Ghi Chú & Lưu Ý

Pending
