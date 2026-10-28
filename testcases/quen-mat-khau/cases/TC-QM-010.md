# TC-QM-010: Kiểm tra Validation khi nhập chuỗi chỉ chứa toàn khoảng trắng (Whitespace Only)

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-010`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-25 / chuanHoaOGoDinhDanh / QuenMatKhauPage.tsx:38`  
> **Tham chiếu đặc tả (Spec Reference)**: `Ngăn chặn gửi chuỗi rỗng ngụy trang bằng dấu cách.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở màn hình /quen-mat-khau?web=thu.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chuỗi khoảng trắng: '     '

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập 5 dấu cách vào ô định danh
- [ ] 2. Quan sát ô nhập liệu và nút 'Gửi yêu cầu'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hàm chuẩn hóa tự động cắt bỏ toàn bộ khoảng trắng, ô nhập liệu giữ trạng thái trống, nút 'Gửi yêu cầu' vẫn bị vô hiệu hóa (disabled).

## 5. Ghi Chú & Lưu Ý

Pending
