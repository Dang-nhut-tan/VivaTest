# TC-CC-001: Mở màn hình Chấm công lúc 09:50 -> Tự động nhận diện Lượt 1 (Quán A: 08:00–10:00)

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-001`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên thực thi (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `useLoTrinhChamCong.ts, diemDungGanGioNhat`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên có lịch đi làm 2 quán trong ngày: Quán A (08:00–10:00) và Quán B (10:30–12:00). Tài khoản nhân viên đã đăng nhập thành công vào ứng dụng di động.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Thời gian hệ thống máy chủ giả lập tại 09:50:00, toạ độ vị trí GPS đặt tại Quán A (10.7769, 106.7009).

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở màn hình Chấm công (`/cham-cong`) trên ứng dụng di động.
- [ ] 2. Kiểm tra danh sách hiển thị các lượt đi quán hôm nay trên thẻ lộ trình.
- [ ] 3. Quan sát lượt quán đang được hệ thống kích hoạt tự động.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] **Tầng 1 (Giao diện người dùng):** Danh sách hiển thị đầy đủ thông tin 2 ca làm việc gồm Quán A (Lê Duẩn) và Quán B (Minh Khai).
- [x] **Tầng 2 (Dữ liệu & Trạng thái):** Lượt 1 (Quán A) được hệ thống tự động nhận diện và kích hoạt sẵn sàng chấm công (`aria-pressed="true"`), không đòi hỏi nhân viên phải chọn quán thủ công.

## 5. Ghi Chú & Lưu Ý

Xác minh thuật toán tính điểm dừng gần mốc giờ mở màn hình nhất.
