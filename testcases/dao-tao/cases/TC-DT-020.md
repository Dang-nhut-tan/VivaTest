# TC-DT-020: Ứng dụng xử lý sự cố mất kết nối mạng và hiển thị cảnh báo người dùng chuẩn mực

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-020`  
> **Độ nghiêm trọng (Severity)**: `Nhỏ`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-194 / LichDaoTaoScreen.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Thiết bị người dùng bị ngắt kết nối Internet trong lúc đang thao tác trên màn hình Lịch đào tạo

## 2. Dữ Liệu Kiểm Thử (Test Data)

Ngắt kết nối mạng (Offline mode)

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở màn hình 'Lịch đào tạo', tab 'Khai giờ bận' hoặc 'Lịch của tôi'.
- [ ] 2. Ngắt kết nối mạng Internet của thiết bị.
- [ ] 3. Quan sát trạng thái các nút bấm hành động (Xác nhận tham gia, Lưu giờ bận, Đăng ký).
- [ ] 4. Thử bấm vào một hành động trên màn hình.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Các nút bấm hành động ghi dữ liệu bị vô hiệu hóa kèm thông báo cảnh báo rõ ràng: 'Cần kết nối mạng để thực hiện thao tác này', ứng dụng không bị vỡ giao diện hay phát sinh màn hình trắng.

## 5. Ghi Chú & Lưu Ý

Đảm bảo tuân thủ tiêu chuẩn giao diện PWA không gây treo ứng dụng.
