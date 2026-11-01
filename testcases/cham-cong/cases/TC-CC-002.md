# TC-CC-002: Giữ nguyên màn hình, thời gian chuyển sang 10:30 -> Tự động cập nhật Lượt 2 (Quán B) không cần refresh

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-002`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên thực thi (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `useLuotTheoGio.ts, timer tự kích hoạt tính lại lượt`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đang mở sẵn màn hình Chấm công ở Lượt 1 (Quán A) từ lúc 09:50 và giữ nguyên ứng dụng trên màn hình.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Thời gian hệ thống trôi qua mốc 10:30:05 (đã bước sang khung giờ Lượt 2 của Quán B).

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Giữ nguyên màn hình Chấm công, không thao tác bấm tải lại trang (không bấm F5, không kéo vuốt refresh).
- [ ] 2. Chờ thời gian trôi qua mốc 10:30 của Lượt 2.
- [ ] 3. Quan sát giao diện thẻ hiển thị lượt hôm nay.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] **Tầng 1 (Giao diện người dùng):** Thẻ thông tin lộ trình tự động chuyển sang hiển thị Quán B (Minh Khai) mà không yêu cầu nhân viên rời màn hình hay tải lại trang.
- [x] **Tầng 2 (Dữ liệu & Trạng thái):** Nút Quán B chuyển sang trạng thái kích hoạt (`aria-pressed="true"`), nút Quán A tự động chuyển về trạng thái chờ (`aria-pressed="false"`).

## 5. Ghi Chú & Lưu Ý

Khắc phục triệt để lỗi người dùng phải bấm F5 tải lại trang để chuyển ca.
