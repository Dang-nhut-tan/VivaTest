# TC-DT-018: Quản trị viên thực hiện điểm danh học viên và xác nhận quy tắc ghi nhận sao đào tạo

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-018`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-AD-762 / DiemDanhDialog.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Buổi học đã đến giờ bắt đầu (trong vòng 30 phút trước giờ bắt đầu trở đi)

## 2. Dữ Liệu Kiểm Thử (Test Data)

Lớp học 5 học viên: 4 người Đã học, 1 người Vắng mặt

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở hộp thoại chi tiết buổi học, bấm nút 'Điểm danh'.
- [ ] 2. Đánh dấu trạng thái 'Đã học' cho 4 học viên và chọn 'Vắng' cho 1 học viên.
- [ ] 3. Bấm nút 'Lưu điểm danh'.
- [ ] 4. Quan sát kết quả và số lượng sao được cộng.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống lưu kết quả điểm danh thành công; các học viên 'Đã học' hợp lệ được tự động cộng 3 sao sự kiện DU_BUOI_DAO_TAO; hệ thống chặn không cho phép đổi ngược lại từ 'Đã học' sang 'Vắng'.

## 5. Ghi Chú & Lưu Ý

Kiểm tra người điểm danh hoặc giảng viên dạy buổi học đó sẽ không được tự cộng sao cho chính mình.
