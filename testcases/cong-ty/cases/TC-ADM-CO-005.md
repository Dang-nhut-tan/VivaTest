# TC-ADM-CO-005: Đối soát công ty mới tạo hiển thị trên bảng danh sách với thông tin chuẩn xác

> **Phân hệ**: Quản Lý Công Ty Admin  
> **Mã kịch bản**: `TC-ADM-CO-005`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-11`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Công ty mới đã được tạo thành công

## 2. Dữ Liệu Kiểm Thử (Test Data)

Từ khóa tìm kiếm tên công ty

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập tên công ty vào ô tìm kiếm
- [ ] 2. Kiểm tra hàng dữ liệu trên bảng

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hiển thị đúng: Mã, Tên, MST 10 số, 0 phòng, 0 quán và trạng thái Đang hoạt động.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
