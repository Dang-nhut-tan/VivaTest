# TC-QM-002: Gửi yêu cầu Quên mật khẩu thành công bằng Số điện thoại chuẩn hóa

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-002`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-96 / SPEC-AU-02 / SPEC-AU-03`  
> **Tham chiếu đặc tả (Spec Reference)**: `Kiểm tra nhận diện qua chuỗi số điện thoại tự nhiên.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã cập nhật SĐT cá nhân trong hồ sơ và tài khoản active.

## 2. Dữ Liệu Kiểm Thử (Test Data)

SĐT: 0906123477

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Truy cập /quen-mat-khau?web=thu
- [ ] 2. Nhập Số điện thoại vào ô định danh
- [ ] 3. Bấm nút 'Gửi yêu cầu'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống tự động nhận diện định dạng SĐT (E.164), gửi yêu cầu thành công, hiển thị câu thông báo chuẩn VBO-QM-03.

## 5. Ghi Chú & Lưu Ý

Pending
