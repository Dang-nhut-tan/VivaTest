# TC-ADM-TN-006: Lọc danh sách theo Chuyên mục và xác nhận tin hiển thị đúng bộ lọc

> **Phân hệ**: Đăng Tin Nội Bộ Admin  
> **Mã kịch bản**: `TC-ADM-TN-006`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-17`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Bảng tin nội bộ có nhiều bài viết thuộc các chuyên mục khác nhau

## 2. Dữ Liệu Kiểm Thử (Test Data)

Bộ lọc Chuyên mục Sự kiện

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Chọn bộ lọc Chuyên mục là Sự kiện
- [ ] 2. Quan sát danh sách bài tin

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Bảng chỉ hiển thị các bài tin thuộc chuyên mục Sự kiện, các chuyên mục khác được lọc ẩn chính xác.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
