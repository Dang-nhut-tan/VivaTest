# TC-CC-002: Giữ nguyên màn hình, thời gian chuyển sang 10:30 -> Tự động cập nhật Lượt 2 (Quán B) không cần refresh

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-002`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `useLuotTheoGio.ts, timer tự kích hoạt tính lại lượt`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đang mở màn hình Chấm công ở Lượt 1 (Quán A)

## 2. Dữ Liệu Kiểm Thử (Test Data)

Thời gian máy chủ nhảy từ 09:50 sang 10:30:05

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Giữ nguyên màn hình Chấm công không reload (không F5)
- [ ] 2. Thời gian trôi qua mốc 10:30 của Lượt 2
- [ ] 3. Quan sát giao diện thẻ lượt hôm nay

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Giao diện tự động chuyển trạng thái active sang Lượt 2 (Quán B, aria-pressed=true) mà người dùng không cần reload trang hay rời màn hình.

## 5. Ghi Chú & Lưu Ý

Khắc phục triệt để lỗi phải F5 để chuyển lượt
