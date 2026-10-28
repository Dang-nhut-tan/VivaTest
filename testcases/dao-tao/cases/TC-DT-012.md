# TC-DT-012: Thẻ nhắc buổi đào tạo sắp tới hiển thị chuẩn xác trên Trang chủ trong vòng 48 giờ

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-012`  
> **Độ nghiêm trọng (Severity)**: `Nhỏ`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-204 / TheLichDaoTaoTrangChu.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên có buổi học đã được xếp lịch diễn ra trong vòng 48 giờ tới

## 2. Dữ Liệu Kiểm Thử (Test Data)

Buổi học diễn ra vào ngày mai lúc 09:00

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Đăng nhập ứng dụng và mở màn hình 'Trang chủ'.
- [ ] 2. Quan sát khu vực tiện ích và thẻ việc cần làm.
- [ ] 3. Kiểm tra nội dung thẻ nhắc lịch đào tạo sắp tới.
- [ ] 4. Bấm trực tiếp vào thẻ nhắc việc.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Trang chủ xuất hiện thẻ 'Buổi đào tạo sắp tới' nêu rõ tên buổi học, giờ học và địa điểm; khi bấm vào thẻ, ứng dụng tự động điều hướng sang màn hình '/lich-dao-tao'.

## 5. Ghi Chú & Lưu Ý

Thẻ tự động ẩn khi buổi học kết thúc hoặc khi đăng xuất khỏi tài khoản.
