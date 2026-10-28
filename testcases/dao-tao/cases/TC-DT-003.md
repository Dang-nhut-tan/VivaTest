# TC-DT-003: Nhân viên khai báo các khoảng thời gian bận hợp lệ trong tuần

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-198 / GioBanTab.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tuần được chọn còn trong hạn khai báo giờ bận theo cấu hình hệ thống

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tuần tới, 2 khoảng bận: Thứ Ba (08:00 - 12:00) và Thứ Năm (14:00 - 17:00), ghi chú 'Học thêm'

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở màn hình 'Lịch đào tạo', chuyển sang tab 'Khai giờ bận'.
- [ ] 2. Dùng nút chuyển tuần để chọn tuần mong muốn.
- [ ] 3. Bấm nút 'Thêm khoảng bận'.
- [ ] 4. Nhập ngày, giờ bắt đầu, giờ kết thúc và ghi chú cho từng khoảng.
- [ ] 5. Bấm nút 'Lưu giờ bận'.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Màn hình hiển thị thông báo đã lưu giờ bận thành công, danh sách các khoảng bận vừa nhập được lưu trữ ổn định và giữ nguyên khi tải lại trang.

## 5. Ghi Chú & Lưu Ý

Kiểm tra giới hạn tối đa 30 khoảng/tuần theo quy định.
