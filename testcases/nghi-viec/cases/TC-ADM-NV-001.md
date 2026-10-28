# TC-ADM-NV-001: Đăng nhập thành công vào Cổng Quản trị Admin (/quan-tri/#/login)

> **Phân hệ**: Cho Nhân Sự Nghỉ Việc Admin  
> **Mã kịch bản**: `TC-ADM-NV-001`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản HR Admin hợp lệ

## 2. Dữ Liệu Kiểm Thử (Test Data)

dung.demo@vi-du.test

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở Cổng Quản trị
- [ ] 2. Đăng nhập email và mật khẩu
- [ ] 3. Vào Dashboard

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Đăng nhập thành công, điều hướng vào Dashboard quản trị.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
