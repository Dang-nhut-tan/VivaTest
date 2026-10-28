# TC-QM-004: Ngăn chặn gửi dồn nhiều yêu cầu liên tiếp khi bấm nút nhanh (Double Submit Throttling)

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-004`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-HT-26 / QuenMatKhauPage.tsx:24`  
> **Tham chiếu đặc tả (Spec Reference)**: `Bảo vệ hệ thống và HCNS khỏi tình trạng spam requests.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở form Quên mật khẩu với mã hợp lệ.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã NV: VG000101

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập Mã nhân viên
- [ ] 2. Thực hiện click đúp (double-click) hoặc click dồn dập vào nút 'Gửi yêu cầu'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hook useSubmitOnce kích hoạt ngay lập tức: nút chuyển sang trạng thái loading/disabled, chỉ có đúng 1 network request được gửi đi máy chủ.

## 5. Ghi Chú & Lưu Ý

Pending
