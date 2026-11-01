# TC-CC-005: Kiểm tra cơ chế visibilitychange khi app quay lại từ background

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-005`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Ưu tiên thực thi (Priority)**: `P1`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `document.addEventListener('visibilitychange')`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Ứng dụng đang mở ở Quán A lúc 09:15; người dùng tắt màn hình điện thoại hoặc chuyển sang ứng dụng khác (app chạy ngầm/background).

## 2. Dữ Liệu Kiểm Thử (Test Data)

Thời gian hệ thống trôi đến 11:00, người dùng mở lại màn hình điện thoại vào ứng dụng VivaOffice.

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Đưa ứng dụng xuống chạy ngầm hoặc tắt màn hình lúc 09:15 tại Quán A.
- [ ] 2. Chờ đến thời điểm 11:00.
- [ ] 3. Mở lại ứng dụng (kích hoạt sự kiện khôi phục hiển thị `visibilitychange`).

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] **Tầng 1 (Giao diện người dùng):** Giao diện ngay lập tức cập nhật sang Quán B (Minh Khai), hiển thị thông tin ca làm việc chính xác tại thời điểm 11:00 mà không cần người dùng thao tác gì thêm.
- [x] **Tầng 2 (Dữ liệu & Trạng thái):** Hệ thống bắt sự kiện `visibilitychange`, kích hoạt hàm đánh giá lại thời gian và tự động gán trạng thái active cho Quán B (`aria-pressed="true"`).

## 5. Ghi Chú & Lưu Ý

Đảm bảo dữ liệu ca kíp luôn tươi mới khi nhân viên mở lại điện thoại sau thời gian dài di chuyển.
