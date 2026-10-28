# TC-ADM-CO-009: Đối soát công ty đã bị xoá hoàn toàn khỏi bảng danh sách

> **Phân hệ**: Quản Lý Công Ty Admin  
> **Mã kịch bản**: `TC-ADM-CO-009`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-11`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Công ty đã được xác nhận xóa

## 2. Dữ Liệu Kiểm Thử (Test Data)

Ô tìm kiếm công ty

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Tìm lại mã công ty vừa xóa
- [ ] 2. Quan sát bảng dữ liệu

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Dòng công ty không còn tồn tại trên giao diện và cơ sở dữ liệu.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
