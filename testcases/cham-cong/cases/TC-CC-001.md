# TC-CC-001: Mở màn hình Chấm công lúc 09:50 -> Tự động nhận diện Lượt 1 (Quán A: 08:00–10:00)

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-001`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `useLoTrinhChamCong.ts, diemDungGanGioNhat`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên có lịch đi 2 quán trong ngày: Quán A (08:00–10:00) và Quán B (10:30–12:00)

## 2. Dữ Liệu Kiểm Thử (Test Data)

Thời gian hệ thống 09:50:00, toạ độ GPS tại Quán A

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở màn hình Chấm công (/cham-cong)
- [ ] 2. Kiểm tra danh sách hiển thị các lượt đi quán hôm nay
- [ ] 3. Quan sát lượt đang được hệ thống kích hoạt tự động

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hiển thị đầy đủ 2 lượt Quán A và Quán B; Lượt 1 (Quán A) được hệ thống tự động nhận diện và kích hoạt (aria-pressed=true).

## 5. Ghi Chú & Lưu Ý

Kiểm tra tính lượt ban đầu dựa theo mốc giờ
