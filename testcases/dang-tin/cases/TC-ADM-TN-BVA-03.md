# TC-ADM-TN-BVA-03: [Biên trên tối đa] Tiêu đề đạt ngưỡng 200 ký tự và chống tràn khi nhập quá 200 ký tự

> **Phân hệ**: Đăng Tin Nội Bộ Admin  
> **Mã kịch bản**: `TC-ADM-TN-BVA-03`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-17-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở hộp thoại Soạn tin

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chuỗi văn bản 200 ký tự và 220 ký tự

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập chuỗi 200 ký tự vào Tiêu đề
- [ ] 2. Thử nhập thêm 20 ký tự
- [ ] 3. Quan sát độ dài ô nhập

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Chấp nhận đầy đủ 200 ký tự và tự động cắt ngắn hoặc chặn nhập ký tự thứ 201 trở đi.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
