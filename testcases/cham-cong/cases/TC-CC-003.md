# TC-CC-003: Cơ chế Reset GPS khi đổi quán -> Không tái sử dụng kết quả toạ độ của quán cũ

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên thực thi (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `doiNoiLamViec, reset GPS state`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã xác định toạ độ định vị hợp lệ tại Quán A; hệ thống tự động hoặc thủ công chuyển lượt sang Quán B.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Toạ độ GPS Quán A: 10.7769, 106.7009 -> Toạ độ GPS thực tế mới tại Quán B: 10.7800, 106.6900.

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Chuyển sang Lượt 2 tại Quán B (Minh Khai).
- [ ] 2. Kiểm tra tín hiệu yêu cầu định vị GPS từ thiết bị di động.
- [ ] 3. Quan sát thông báo khoảng cách và vị trí tính toán cho Quán B.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] **Tầng 1 (Giao diện người dùng):** Giao diện thông báo đang cập nhật vị trí mới cho Quán B, không hiển thị khoảng cách của Quán A trước đó.
- [x] **Tầng 2 (Dữ liệu & Trạng thái):** Toàn bộ bộ nhớ đệm toạ độ của Quán A được xoá trắng; hệ thống gửi yêu cầu đọc tín hiệu GPS mới và so khớp độc lập với tâm toạ độ của Quán B.

## 5. Ghi Chú & Lưu Ý

Chặn tuyệt đối nguy cơ gian lận chấm công bằng cách tái sử dụng toạ độ quán cũ.
