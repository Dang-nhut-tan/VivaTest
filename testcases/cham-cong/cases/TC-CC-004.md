# TC-CC-004: Giữ lượt VÀO đang mở -> Đã bấm Chấm vào Quán A thì không tự nhảy sang Quán B trước khi chấm ra

> **Phân hệ**: Chấm Công Lộ Trình Đi Quán  
> **Mã kịch bản**: `TC-CC-004`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `luotDangMo, LuotHomNayCard lock logic`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã thực hiện Chấm công vào (VÀO) tại Quán A lúc 09:30 và chưa bấm Chấm ra

## 2. Dữ Liệu Kiểm Thử (Test Data)

Thời gian trôi đến 10:45 (đã qua giờ bắt đầu của Quán B)

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở màn hình Chấm công với bản ghi VÀO đang mở tại Quán A
- [ ] 2. Thời gian trôi đến 10:45
- [ ] 3. Quan sát giao diện thẻ lượt và các nút thao tác

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống vẫn giữ nguyên Quán A với trạng thái Vào 09:30, khóa đổi lượt tự động để bảo toàn phiên làm việc; nút hành động hiển thị Chấm công ra cho Quán A.

## 5. Ghi Chú & Lưu Ý

Chặn chuyển quán tự động khi ca trước chưa checkout
