# TC-ADM-NV-BVA-03: [Biên ngày nghỉ] Chọn ngày nghỉ ở tương lai -> Báo lỗi không được sau hôm nay

> **Phân hệ**: Cho Nhân Sự Nghỉ Việc Admin  
> **Mã kịch bản**: `TC-ADM-NV-BVA-03`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-02-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở hộp thoại Cho nghỉ việc

## 2. Dữ Liệu Kiểm Thử (Test Data)

Ngày nghỉ lớn hơn ngày hiện tại (D + 2)

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Chọn ngày nghỉ ở tương lai
- [ ] 2. Quan sát phản hồi thông báo

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống báo lỗi ngày làm việc cuối không được sau hôm nay và khóa nút xác nhận.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
