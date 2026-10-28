# TC-QM-009: Kiểm tra Validation trạng thái nút 'Gửi yêu cầu' khi ô định danh để trống

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-009`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `VBO-QM-02 / QuenMatKhauPage.tsx:67`  
> **Tham chiếu đặc tả (Spec Reference)**: `Validation cơ bản phía Client.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở màn hình /quen-mat-khau?web=thu.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chuỗi rỗng ''

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Quan sát trạng thái ban đầu của nút 'Gửi yêu cầu'
- [ ] 2. Thử click vào nút 'Gửi yêu cầu'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Nút 'Gửi yêu cầu' có thuộc tính disabled, cursor not-allowed, không thể click và không có sự kiện submit được kích hoạt.

## 5. Ghi Chú & Lưu Ý

Pending
