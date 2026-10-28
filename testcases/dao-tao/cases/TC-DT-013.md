# TC-DT-013: Quản trị viên tạo mới buổi đào tạo trên trang Quản trị thành công

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-013`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-AD-758 / BuoiFormDialog.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản có vai trò Quản lý đào tạo (TRAINER, HR_MANAGER, SUPER_ADMIN)

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tiêu đề: 'Tập huấn ATVSTP đợt 1', bắt đầu: Ngày mai 09:00, kết thúc: 11:00, sức chứa: 25 người, địa điểm: 'Viva Quán A'

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Đăng nhập cổng Quản trị (05-admin), vào menu 'Đào tạo' -> 'Lịch đào tạo'.
- [ ] 2. Tại thẻ 'Buổi học', bấm nút 'Tạo buổi học mới'.
- [ ] 3. Điền đầy đủ các thông tin: Tiêu đề, thời gian bắt đầu, thời gian kết thúc, chọn địa điểm quán và sức chứa.
- [ ] 4. Bấm nút 'Lưu buổi đào tạo'.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hộp thoại đóng lại, hệ thống hiển thị thông báo tạo buổi học thành công; buổi học mới xuất hiện trên bảng danh sách với trạng thái 'Đang mở đăng ký' và số chỗ trống là 25.

## 5. Ghi Chú & Lưu Ý

Kiểm tra giờ bắt đầu phải nằm ở tương lai (không cho tạo buổi ở quá khứ).
