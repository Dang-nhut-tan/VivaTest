# TC-BC-003: Kiểm tra Lưới lịch chấm công & Ký hiệu công ngày 16

> **Phân hệ**: Xem Bảng Công  
> **Mã kịch bản**: `TC-BC-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-BC-04`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Kỳ công đang chọn có phát sinh ngày công thực tế

## 2. Dữ Liệu Kiểm Thử (Test Data)

Ngày 16/10 ca VP-HC1 ký hiệu mã X

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Cuộn đến khu vực lưới lịch chấm công
- [ ] 2. Kiểm tra hàng tiêu đề 7 thứ trong tuần (T2 đến CN)
- [ ] 3. Tìm ô ngày 16 trên lưới lịch

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Lưới lịch hiển thị đủ 7 cột các thứ trong tuần; ô ngày 16 hiển thị số ngày 16 và ký hiệu mã công X màu xanh nổi bật.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
