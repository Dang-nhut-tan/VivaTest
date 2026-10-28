# TC-BC-005: Chuyển đổi qua lại giữa các kỳ công (Kỳ trước / Kỳ sau) qua PeriodNav

> **Phân hệ**: Xem Bảng Công  
> **Mã kịch bản**: `TC-BC-005`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-BC-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình Bảng công

## 2. Dữ Liệu Kiểm Thử (Test Data)

Nút Kỳ trước và Kỳ sau

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm nút Kỳ trước trên thanh chọn kỳ công
- [ ] 2. Kiểm tra khoảng ngày và nhãn kỳ được cập nhật về kỳ trước đó
- [ ] 3. Bấm nút Kỳ sau để quay lại kỳ hiện tại

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống chuyển đổi mượt mà giữa các kỳ công, dữ liệu công và khoảng ngày thay đổi tương ứng mà không bị giật lag.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
