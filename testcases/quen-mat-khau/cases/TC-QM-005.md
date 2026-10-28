# TC-QM-005: Phanh chống ngập 1: Chặn âm thầm khi nhân viên đang có yêu cầu ở trạng thái Pending

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-005`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-57 / quenmatkhau-40a.sql:121`  
> **Tham chiếu đặc tả (Spec Reference)**: `Phanh chống ngập số 1 của RPC xin_dat_lai_mat_khau.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã gửi 1 yêu cầu trước đó và đang chờ HCNS duyệt (status='pending').

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV đã có yêu cầu pending

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở /quen-mat-khau?web=thu
- [ ] 2. Nhập lại chính mã nhân viên đó
- [ ] 3. Bấm 'Gửi yêu cầu'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] UI vẫn hiển thị thông báo thành công VBO-QM-03; CSDL không chèn thêm dòng mới (giữ nguyên duy nhất 1 dòng pending).

## 5. Ghi Chú & Lưu Ý

Pending
