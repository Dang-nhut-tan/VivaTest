# TC-CC-005: Kiểm tra cơ chế visibilitychange khi app quay lại từ background

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-005`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `document.addEventListener('visibilitychange')`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

App đang mở ở Quán A lúc 09:15; người dùng chuyển app xuống background

## 2. Dữ Liệu Kiểm Thử (Test Data)

Thời gian hệ thống trôi đến 11:00, app quay lại foreground

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Đưa app xuống background lúc 09:15
- [ ] 2. Chờ đến 11:00
- [ ] 3. Mở lại app (kích hoạt sự kiện visibilitychange)

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống bắt sự kiện visibilitychange ngay lập tức, tự động đánh giá lại thời gian và cập nhật ngay sang Quán B mà không bị treo ở dữ liệu cũ.

## 5. Ghi Chú & Lưu Ý

Đảm bảo tính chính xác khi người dùng bật tắt màn hình
