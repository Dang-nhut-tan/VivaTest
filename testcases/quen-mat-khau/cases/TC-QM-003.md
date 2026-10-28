# TC-QM-003: Kiểm tra bảo mật định danh đối với Mã NV / SĐT không tồn tại (Chống dò tìm User)

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-03 / SPEC-AU-57`  
> **Tham chiếu đặc tả (Spec Reference)**: `Nguyên tắc bảo mật quan trọng: ngăn chặn kẻ tấn công brute-force dò quét danh sách nhân sự.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Định danh không thuộc bất kỳ hồ sơ nhân viên active nào.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV giả: VG999999

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở màn hình /quen-mat-khau?web=thu
- [ ] 2. Nhập mã nhân viên giả VG999999
- [ ] 3. Bấm nút 'Gửi yêu cầu'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống vẫn hiển thị câu thông báo thành công VBO-QM-03 giống hệt tài khoản thật (thời gian phản hồi đều, không báo lỗi 'Tài khoản không tồn tại'). Backend không sinh thêm bản ghi nào trong DB.

## 5. Ghi Chú & Lưu Ý

Pending
