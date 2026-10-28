# TC-DN-005: Khóa tài khoản tạm thời sau 5 lần nhập sai mật khẩu liên tiếp (Account Lockout Policy)

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-005`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-05 / SPEC-AU-101 / supabaseAuthPort.ts:71`  
> **Tham chiếu đặc tả (Spec Reference)**: `Chính sách bảo mật brute-force chống dò mật khẩu.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên active.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV: VG000101, Mật khẩu sai

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập sai mật khẩu liên tục 5 lần trong vòng 15 phút
- [ ] 2. Quan sát phản hồi ở lần thứ 5

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Máy chủ phản hồi mã lỗi 423 (API_ERROR.LOCKED); giao diện hiển thị câu thông báo tài khoản bị khóa tạm và số phút còn lại trước khi được mở lại.

## 5. Ghi Chú & Lưu Ý

Pending
