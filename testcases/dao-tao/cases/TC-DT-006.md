# TC-DT-006: Nhân viên gửi yêu cầu tự đăng ký khóa đào tạo mới

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-006`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-197 / CacSheetLdt.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên chưa có yêu cầu đào tạo đang chờ xếp lịch cho khóa học được chọn

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chọn khóa 'Kỹ năng pha chế cơ bản', tuần mong muốn: tuần tới, ghi chú: 'Đăng ký học kỹ năng'

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở tab 'Lịch của tôi' trên màn hình Lịch đào tạo.
- [ ] 2. Tìm đến khối 'Đăng ký đào tạo' và bấm nút 'Đăng ký đào tạo'.
- [ ] 3. Trong bảng trượt mở ra, chọn khóa học mong muốn và tuần bắt đầu.
- [ ] 4. Nhập nội dung ghi chú và bấm 'Gửi đăng ký'.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hộp thoại đóng lại, màn hình hiển thị thông báo gửi yêu cầu thành công; mục 'Yêu cầu đang chờ' xuất hiện thêm dòng yêu cầu mới với trạng thái 'Chờ xếp lịch'.

## 5. Ghi Chú & Lưu Ý

Kiểm tra độ dài ghi chú tối đa 500 ký tự.
