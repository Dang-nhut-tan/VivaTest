# TC-ADM-TN-BVA-05: [Ký tự đặc biệt & Unicode] HTML, tiếng Việt có dấu, emoji, URL

> **Phân hệ**: Đăng Tin Nội Bộ Admin  
> **Mã kịch bản**: `TC-ADM-TN-BVA-05`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-17-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở hộp thoại Soạn tin

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tiêu đề chứa thẻ HTML, emoji và link

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập tiêu đề có chứa ký tự tiếng Việt UTF-8, emoji và chuỗi HTML
- [ ] 2. Bấm Lưu và quan sát hiển thị

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống render nguyên vẹn chuỗi tiếng Việt và emoji, mã hóa chống tấn công XSS an toàn.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
