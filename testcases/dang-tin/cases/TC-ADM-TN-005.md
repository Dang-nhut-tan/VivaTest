# TC-ADM-TN-005: Xác nhận bài tin vừa đăng xuất hiện trên Bảng danh sách với đầy đủ nhãn Ghim & Chuyên mục

> **Phân hệ**: Đăng Tin Nội Bộ Admin  
> **Mã kịch bản**: `TC-ADM-TN-005`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-17`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Bài tin mới đã được lưu thành công

## 2. Dữ Liệu Kiểm Thử (Test Data)

Bảng danh sách Tin nội bộ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Quan sát dòng đầu tiên của bảng tin nội bộ
- [ ] 2. Kiểm tra nhãn Chuyên mục và huy hiệu Ghim

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Bài tin vừa tạo hiển thị ở vị trí đầu tiên kèm nhãn Chuyên mục Sự kiện và huy hiệu Ghim màu cam nổi bật.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
