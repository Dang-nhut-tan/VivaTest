# TC-ADM-TN-BVA-01: [Biên dưới] Kiểm tra validation khi Tiêu đề rỗng hoặc chỉ chứa khoảng trắng

> **Phân hệ**: Đăng Tin Nội Bộ Admin  
> **Mã kịch bản**: `TC-ADM-TN-BVA-01`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-17-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở hộp thoại Soạn tin

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tiêu đề để trống hoặc toàn dấu cách

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Để trống trường Tiêu đề
- [ ] 2. Quan sát trạng thái nút Lưu

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Nút Lưu bị vô hiệu hóa (disabled), không cho phép lưu bài tin rỗng.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
