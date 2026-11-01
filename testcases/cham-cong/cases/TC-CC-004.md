# TC-CC-004: Giữ lượt VÀO đang mở -> Đã bấm Chấm vào Quán A thì không tự nhảy sang Quán B trước khi chấm ra

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-004`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên thực thi (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `luotDangMo, LuotHomNayCard lock logic`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã thực hiện thao tác Chấm công vào (VÀO) tại Quán A lúc 09:30 và chưa thực hiện thao tác Chấm công ra (RA).

## 2. Dữ Liệu Kiểm Thử (Test Data)

Thời gian máy chủ giả lập trôi đến 10:45 (đã bước sang khung giờ Lượt 2 của Quán B).

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở màn hình Chấm công với bản ghi ca Vào đang mở tại Quán A.
- [ ] 2. Đồng hồ trôi qua mốc 10:45 (thuộc khung giờ Quán B).
- [ ] 3. Quan sát giao diện thẻ lượt và nút hành động chính trên màn hình.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] **Tầng 1 (Giao diện người dùng):** Thẻ thông tin vẫn giữ cố định `Quán A (Lê Duẩn)` kèm trạng thái `Vào 09:30`; nút hành động nổi bật hiển thị `Chấm công ra` cho Quán A.
- [x] **Tầng 2 (Dữ liệu & Trạng thái):** Hệ thống khóa chuyển lượt tự động, ngăn chặn nhảy sang Quán B để bảo toàn trọn vẹn phiên làm việc chưa hoàn tất.

## 5. Ghi Chú & Lưu Ý

Đảm bảo nhân viên không bị mất lượt chấm công ra khi ca làm việc kéo dài quá mốc giờ bắt đầu của ca sau.
