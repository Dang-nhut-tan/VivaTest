# TC-DT-004: Hệ thống phát hiện và báo lỗi khi khai báo hai khoảng giờ bận trùng lấn trong cùng ngày

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-004`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-198 / kiemGioBan.ts`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đang ở tab 'Khai giờ bận' của tuần hợp lệ

## 2. Dữ Liệu Kiểm Thử (Test Data)

Cùng ngày Thứ Tư: Khoảng 1 (08:00 - 11:00), Khoảng 2 (10:00 - 12:00)

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở tab 'Khai giờ bận' trên màn hình Lịch đào tạo.
- [ ] 2. Bấm 'Thêm khoảng bận' và nhập Khoảng 1 từ 08:00 đến 11:00.
- [ ] 3. Bấm 'Thêm khoảng bận' thứ hai cùng ngày từ 10:00 đến 12:00.
- [ ] 4. Bấm nút 'Lưu giờ bận'.
- [ ] 5. Quan sát cảnh báo trên màn hình.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Giao diện hiển thị thông báo lỗi rõ ràng bên dưới dòng bị trùng: 'Khoảng giờ bận bị chồng lấn trong ngày', nút Lưu bị chặn hoặc yêu cầu sửa lại trước khi gửi.

## 5. Ghi Chú & Lưu Ý

Cần kiểm tra cả trường hợp khoảng sau bao trùm hoàn toàn khoảng trước.
