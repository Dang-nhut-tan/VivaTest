# TC-APF-006: Gửi yêu cầu Quên mật khẩu bằng Mã nhân viên & đối soát Backend API

> **Phân hệ**: Xác Thực SĐT & Quên Mật Khẩu  
> **Mã kịch bản**: `TC-APF-006`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-QM-RPC`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình Quên mật khẩu

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã nhân viên VG000101

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Điền mã nhân viên
- [ ] 2. Bấm Gửi yêu cầu
- [ ] 3. Đối soát API Backend RPC xin_dat_lai_mat_khau

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] RPC Backend xử lý thành công, không tiết lộ tài khoản có tồn tại hay không nhằm chống tấn công dò quét.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
