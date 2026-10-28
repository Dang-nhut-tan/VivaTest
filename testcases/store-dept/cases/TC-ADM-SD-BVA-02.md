# TC-ADM-SD-BVA-02: [Biên trên bán kính] Bán kính > 2000m (2001m) kích hoạt lỗi validation

> **Phân hệ**: Cửa Hàng & Phòng Ban Admin  
> **Mã kịch bản**: `TC-ADM-SD-BVA-02`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-07-BVA`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang mở form Thêm quán

## 2. Dữ Liệu Kiểm Thử (Test Data)

Bán kính: 2001

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Điền bán kính 2001m
- [ ] 2. Quan sát phản hồi thông báo

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Báo lỗi Bán kính tối đa 2000m và chặn lưu form.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
