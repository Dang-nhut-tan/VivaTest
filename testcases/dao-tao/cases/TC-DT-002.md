# TC-DT-002: Nhân viên bấm xác nhận tham gia buổi đào tạo được phân công

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-002`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-195 / TheBuoiDaoTao.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên có ít nhất 1 buổi đào tạo ở trạng thái 'Đã xếp' và chưa bắt đầu

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã lượt xếp lịch đào tạo hợp lệ của chính nhân viên

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở màn hình 'Lịch đào tạo', tab 'Lịch của tôi'.
- [ ] 2. Tìm đến thẻ buổi học có trạng thái 'Đã xếp'.
- [ ] 3. Bấm nút 'Xác nhận tham gia'.
- [ ] 4. Quan sát trạng thái hiển thị trên thẻ buổi học.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống ghi nhận thành công, trạng thái trên thẻ chuyển từ 'Đã xếp' sang 'Đã xác nhận', nút xác nhận tự động ẩn và hiển thị thông báo thành công.

## 5. Ghi Chú & Lưu Ý

Thao tác xác nhận không thể hoàn tác từ phía nhân viên.
