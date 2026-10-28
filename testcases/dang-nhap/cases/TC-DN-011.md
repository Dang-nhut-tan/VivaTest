# TC-DN-011: Kiểm tra cơ chế tự động chuyển chữ thường thành in hoa ngay khi gõ Mã nhân viên

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-011`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-25 / chuanHoaOGoDinhDanh / DangNhapPage.tsx:124`  
> **Tham chiếu đặc tả (Spec Reference)**: `Hành vi chuẩn hóa dữ liệu tức thì (on-the-fly).`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở Tab 'Mã nhân viên'.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chuỗi gõ: 'vg000101'

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Gõ ký tự thường 'vg000101' vào ô Mã nhân viên
- [ ] 2. Kiểm tra giá trị hiển thị thực tế trong ô input

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Ô input tự động chuyển đổi tức thời thành chữ hoa 'VG000101' đúng chuẩn định danh thẻ nhân viên.

## 5. Ghi Chú & Lưu Ý

Pending
