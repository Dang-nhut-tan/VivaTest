# TC-BC-004: Mở Sheet chi tiết ngày công và kiểm tra thông tin ca & giờ làm

> **Phân hệ**: Xem Bảng Công  
> **Mã kịch bản**: `TC-BC-004`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-BC-06`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Lưới lịch đã hiển thị các ô ngày công

## 2. Dữ Liệu Kiểm Thử (Test Data)

Bấm vào ô ngày 16

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhấp chuột vào ô ngày 16 trên lưới lịch
- [ ] 2. Chờ Bottom Sheet chi tiết ngày trượt lên
- [ ] 3. Kiểm tra ngày, mã ca, giờ vào/ra và công tạm tính
- [ ] 4. Bấm nút Đóng để đóng sheet

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Sheet mở ra hiển thị đúng ngày 16/10/2026, ca xếp VP-HC1 (08:00–17:00), các mốc giờ chấm công và đóng lại an toàn khi bấm Đóng.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
