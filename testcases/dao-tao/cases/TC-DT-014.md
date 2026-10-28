# TC-DT-014: Hệ thống kiểm soát phiên bản đồng thời khi chỉnh sửa buổi đào tạo

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-014`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-AD-758 / buoiForm.ts`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Buổi học đang mở và có 2 quản trị viên cùng mở hộp thoại chỉnh sửa

## 2. Dữ Liệu Kiểm Thử (Test Data)

Quản trị viên 1 đổi địa điểm; Quản trị viên 2 đổi tiêu đề trên phiên bản cũ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Quản trị viên 1 và Quản trị viên 2 cùng mở biểu mẫu sửa của buổi học X.
- [ ] 2. Quản trị viên 1 lưu thay đổi trước thành công (phiên bản tăng lên 2).
- [ ] 3. Quản trị viên 2 bấm nút 'Lưu thay đổi'.
- [ ] 4. Quan sát phản hồi trên màn hình của Quản trị viên 2.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống từ chối lưu thay đổi của Quản trị viên 2 và cảnh báo: 'Buổi học đã có người khác cập nhật trước đó. Vui lòng tải lại dữ liệu', đảm bảo không bị mất mát dữ liệu đồng thời.

## 5. Ghi Chú & Lưu Ý

Kiểm tra cơ chế khóa lạc quan dựa trên trường version.
