# TC-DN-008: Từ chối đăng nhập đối với tài khoản nhân viên đã nghỉ việc (Inactive Account Protection)

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-008`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-31 / fakeAuthPort.ts:88`  
> **Tham chiếu đặc tả (Spec Reference)**: `Đảm bảo người đã thôi việc không còn quyền truy cập dữ liệu nội bộ.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên có trạng thái status='resigned' hoặc app_user.is_active = false trong DB.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV đã nghỉ việc, Mật khẩu đúng trước đây

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập Mã nhân viên đã nghỉ việc và Mật khẩu
- [ ] 2. Bấm nút 'Đăng nhập'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống từ chối đăng nhập và trả về đúng câu lỗi bảo mật chung BAD_CREDENTIALS (không thông báo 'Tài khoản đã nghỉ việc' để tránh lộ thông tin nhân sự).

## 5. Ghi Chú & Lưu Ý

Pending
