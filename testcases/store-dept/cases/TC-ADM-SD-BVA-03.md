# TC-ADM-SD-BVA-03: [Biên trên tên phòng ban] Tên phòng ban > 120 ký tự kích hoạt lỗi validation

> **Phân hệ**: Cửa Hàng & Phòng Ban Admin  
> **Mã kịch bản**: `TC-ADM-SD-BVA-03`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-08-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở hộp thoại Thêm phòng ban

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tên phòng ban 121 ký tự

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập tên phòng ban dài 121 ký tự
- [ ] 2. Bấm Lưu

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Báo lỗi Tên phòng ban tối đa 120 ký tự và chặn lưu.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
