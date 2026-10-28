# TC-QM-006: Phanh chống ngập 2: Chặn âm thầm khi một tài khoản vượt ngưỡng 3 yêu cầu trong 24 giờ

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-006`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-57 / quenmatkhau-40a.sql:125`  
> **Tham chiếu đặc tả (Spec Reference)**: `Phanh chống ngập số 2 của RPC xin_dat_lai_mat_khau.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản nhân viên đã có 3 yêu cầu trong vòng 24 giờ qua.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV đạt ngưỡng 3 lần/24h

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Gửi tiếp yêu cầu lần thứ 4 bằng mã nhân viên này
- [ ] 2. Kiểm tra phản hồi UI và bảng password_reset_request

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] UI trả về thông báo chung thành công VBO-QM-03; DB không chèn dòng mới do đã vượt quá 3 lần/24h.

## 5. Ghi Chú & Lưu Ý

Pending
