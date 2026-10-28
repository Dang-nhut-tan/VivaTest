# TC-QM-013: Kiểm tra điều hướng nút 'Quay lại đăng nhập' từ cả form nhập liệu và khối thông báo

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-013`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `VBO-QM-02 / VBO-QM-03 / AUTH_ROUTES.DANG_NHAP / SPEC-AU-110`  
> **Tham chiếu đặc tả (Spec Reference)**: `Kiểm tra tính nhất quán của navigation paths và không bị kẹt lặp màn xác thực.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở /quen-mat-khau?web=thu.

## 2. Dữ Liệu Kiểm Thử (Test Data)

None

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Từ form VBO-QM-02: Bấm 'Quay lại đăng nhập' -> Kiểm tra URL về /dang-nhap
- [ ] 2. Mở lại /quen-mat-khau, nhập mã hợp lệ và gửi yêu cầu
- [ ] 3. Từ khối VBO-QM-03: Bấm 'Quay lại đăng nhập' -> Kiểm tra URL

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Cả hai nút 'Quay lại đăng nhập' đều điều hướng mượt mà và chính xác về màn hình /dang-nhap.

## 5. Ghi Chú & Lưu Ý

Pending
