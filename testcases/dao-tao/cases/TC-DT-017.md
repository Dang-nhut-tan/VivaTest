# TC-DT-017: Quản trị viên xếp tay học viên vào buổi học cụ thể và kiểm tra hiển thị cảnh báo trùng lịch

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-017`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-AD-761 / XepTayDialog.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Học viên đang có lịch trùng giờ bận nhưng Quản trị viên quyết định xếp đặc cách

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chọn 1 học viên có lịch bận vào buổi học Pha chế còn chỗ trống

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở chi tiết buổi học cần bổ sung người.
- [ ] 2. Bấm nút 'Xếp người vào buổi'.
- [ ] 3. Tìm kiếm học viên theo tên hoặc mã nhân viên.
- [ ] 4. Chọn học viên và bấm 'Xác nhận xếp'.
- [ ] 5. Kiểm tra danh sách học viên trong buổi học.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Học viên được thêm thành công vào danh sách lớp học, đồng thời hiển thị nhãn cảnh báo màu vàng 'Trùng giờ bận đã khai' để người quản lý lưu ý theo dõi.

## 5. Ghi Chú & Lưu Ý

Xếp tay vẫn cho phép xếp học viên đến muộn tối đa 2 ngày sau khi buổi kết thúc.
