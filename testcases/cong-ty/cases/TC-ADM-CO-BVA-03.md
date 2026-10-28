# TC-ADM-CO-BVA-03: [BVA] Mã số thuế sai quy cách (5 số) -> Hiển thị cảnh báo định dạng MST

> **Phân hệ**: Quản Lý Công Ty Admin  
> **Mã kịch bản**: `TC-ADM-CO-BVA-03`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-11-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở hộp thoại Thêm công ty

## 2. Dữ Liệu Kiểm Thử (Test Data)

MST: 12345 (5 số)

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập MST 5 số sai quy cách
- [ ] 2. Quan sát cảnh báo

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Kích hoạt cảnh báo định dạng Để trống được — 10 số, hoặc 13 số.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
