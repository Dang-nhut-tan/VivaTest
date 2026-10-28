# TC-BC-002: Kiểm tra Thẻ tổng kết công cuối kỳ (6 chỉ số công & 2 chỉ số OT đối chiếu Đ.107 BLLĐ)

> **Phân hệ**: Xem Bảng Công  
> **Mã kịch bản**: `TC-BC-002`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-BC-03 & VBO-BC-05`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đang xem kỳ công có dữ liệu chấm công

## 2. Dữ Liệu Kiểm Thử (Test Data)

Bản ghi ngày công hợp lệ ngày 16/10

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở thẻ tổng kết công cuối kỳ
- [ ] 2. Kiểm tra các chỉ số Ngày công, Giờ thường, Giờ đêm, OT ngày, OT đêm, Nghỉ phép
- [ ] 3. Kiểm tra hàng thông tin làm thêm giờ tích lũy

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hiển thị đầy đủ Ngày công: 1 ngày, các chỉ số giờ và thanh làm thêm tích lũy kỳ công và tháng DL đối chiếu chuẩn Đ.107 BLLĐ.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
