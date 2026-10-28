# TC-DN-003: Kiểm tra Bảo mật Phản hồi Chung khi nhập sai Mật khẩu hoặc Tài khoản không tồn tại (Chống dò User)

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-03 / VBO-DN-03`  
> **Tham chiếu đặc tả (Spec Reference)**: `Quy tắc an ninh bắt buộc: ngăn chặn kẻ xấu dò quét danh sách nhân viên.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình Đăng nhập.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV đúng + Mật khẩu sai HOẶC Mã NV không tồn tại + Mật khẩu bất kỳ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập Mã nhân viên và Mật khẩu không đúng
- [ ] 2. Bấm 'Đăng nhập'
- [ ] 3. Quan sát thông báo lỗi và trạng thái form

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Giao diện hiển thị đúng câu thông báo bảo mật chung: 'Tài khoản hoặc mật khẩu chưa đúng. Kiểm tra lại rồi thử lần nữa.' (không chỉ điểm sai trường nào). Ô mật khẩu bị xóa trắng, nút Đăng nhập chuyển sang disabled.

## 5. Ghi Chú & Lưu Ý

Pending
