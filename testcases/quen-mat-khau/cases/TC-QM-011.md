# TC-QM-011: Kiểm tra cơ chế tự động chuyển chữ thường thành in hoa ngay khi gõ Mã nhân viên

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-011`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-25 / chuanHoaMaNhanVien / QuenMatKhauPage.tsx:63`  
> **Tham chiếu đặc tả (Spec Reference)**: `Hành vi gõ phím tức thời trên UI.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở màn hình /quen-mat-khau?web=thu.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chuỗi chữ thường: 'vg000101'

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Gõ chuỗi 'vg000101' vào ô định danh
- [ ] 2. Kiểm tra giá trị hiển thị thực tế trong ô input

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Giá trị trong ô input lập tức chuyển đổi thành 'VG000101' viết hoa hoàn toàn (theo chuẩn thẻ nhân viên). Nút 'Gửi yêu cầu' được kích hoạt enabled.

## 5. Ghi Chú & Lưu Ý

Pending
