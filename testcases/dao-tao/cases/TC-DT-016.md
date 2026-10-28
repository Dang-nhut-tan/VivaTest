# TC-DT-016: Quản trị viên thực thi chức năng Xếp lịch tự động hàng loạt theo tuần

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-016`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-AD-760 / XepTuDongDialog.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Có nhiều yêu cầu đào tạo đang chờ xếp lịch cho tuần mục tiêu và có các lớp học còn chỗ trống

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chọn tuần cần xếp lịch: Thứ Hai tuần tới

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở trang quản trị Lịch đào tạo, chọn thẻ 'Hàng chờ + xếp lịch'.
- [ ] 2. Bấm nút 'Xếp lịch tự động'.
- [ ] 3. Chọn tuần mục tiêu và bấm 'Bắt đầu xếp lịch'.
- [ ] 4. Quan sát kết quả tổng hợp trả về trên hộp thoại.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống tự động rà soát, ghép học viên vào các lớp học phù hợp (tránh trùng ca làm việc và trùng giờ bận đã khai); hiển thị bảng tổng kết rõ số người đã xếp thành công và danh sách những người chưa xếp được kèm lý do cụ thể.

## 5. Ghi Chú & Lưu Ý

Kiểm tra người vừa bị rút khỏi buổi (DA_RUT_KHOI_BUOI) không bị tự động xếp lại vào chính buổi đó.
