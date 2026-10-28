# TC-CC-003: Cơ chế Reset GPS khi đổi quán -> Không tái sử dụng kết quả toạ độ của quán cũ

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `doiNoiLamViec, reset GPS state`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã xác định GPS tại Quán A; hệ thống chuyển lượt sang Quán B

## 2. Dữ Liệu Kiểm Thử (Test Data)

Toạ độ GPS Quán A: 10.7769, 106.7009 -> Toạ độ GPS Quán B: 10.7800, 106.6900

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Chuyển sang Lượt 2 (Quán B)
- [ ] 2. Kiểm tra trạng thái dữ liệu GPS và khoảng cách của Quán B

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống reset toàn bộ trạng thái GPS cũ của Quán A, kích hoạt đọc lại toạ độ vị trí cho Quán B và tính toán lại khoảng cách độc lập.

## 5. Ghi Chú & Lưu Ý

Không được tái sử dụng kết quả GPS của quán trước cho quán mới
