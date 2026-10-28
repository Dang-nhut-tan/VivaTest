# TC-DN-004: Ngăn chặn gửi dồn nhiều lần khi bấm nút Đăng nhập liên tiếp (Double Submit Throttling)

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-004`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-HT-26 / DangNhapPage.tsx:56`  
> **Tham chiếu đặc tả (Spec Reference)**: `Chống spam request và bảo vệ bộ đếm khóa tài khoản.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đã điền đầy đủ Mã nhân viên và Mật khẩu.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV: VG000101, Mật khẩu: Password@123

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm liên tục hoặc double-click nhanh vào nút 'Đăng nhập'
- [ ] 2. Quan sát network requests và trạng thái nút

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hook useSubmitOnce kích hoạt: nút lập tức chuyển sang loading/disabled, chỉ có duy nhất 1 request xác thực được gửi đến server, không làm tăng bộ đếm sai mật khẩu oan.

## 5. Ghi Chú & Lưu Ý

Pending
