# TC-ADM-CO-BVA-01: [BVA] Mã công ty < 2 ký tự hoặc chứa ký tự đặc biệt -> Hiển thị cảnh báo định dạng mã

> **Phân hệ**: Quản Lý Công Ty Admin  
> **Mã kịch bản**: `TC-ADM-CO-BVA-01`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-11-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở hộp thoại Thêm công ty

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã: A hoặc TEST@CO

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập mã dưới 2 ký tự hoặc có ký tự đặc biệt
- [ ] 2. Quan sát dòng cảnh báo trợ giúp

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Kích hoạt cảnh báo Viết HOA không dấu, chỉ chữ - số - gạch.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
