# TC-DT-005: Hệ thống khóa biểu mẫu khai giờ bận khi tuần đã quá hạn quy định

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-005`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-198 / GioBanTab.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Thời điểm hiện tại đã vượt qua ngày hạn chót khai giờ bận của tuần được chọn

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tuần có ngày hạn khai trong quá khứ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở màn hình 'Lịch đào tạo', chọn tab 'Khai giờ bận'.
- [ ] 2. Chọn một tuần đã hết hạn khai báo.
- [ ] 3. Quan sát các ô nhập liệu và các nút bấm trên giao diện.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Biểu mẫu chuyển sang chế độ chỉ xem (Read-only), hiển thị dòng thông báo màu vàng/đỏ: 'Đã quá hạn khai giờ bận cho tuần này', nút Thêm khoảng bận và nút Lưu bị ẩn hoặc vô hiệu hóa.

## 5. Ghi Chú & Lưu Ý

Đảm bảo người dùng không thể cố tình sửa đổi qua thao tác bàn phím.
