# TC-ADM-CO-007: Đối soát thông tin công ty sau cập nhật hiển thị chính xác trên bảng danh sách

> **Phân hệ**: Quản Lý Công Ty Admin  
> **Mã kịch bản**: `TC-ADM-CO-007`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-11`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Công ty đã được cập nhật thành công

## 2. Dữ Liệu Kiểm Thử (Test Data)

Bảng danh sách công ty

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Quan sát dòng công ty trên bảng danh sách
- [ ] 2. Đối chiếu tên và MST mới

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Dữ liệu tên mới và MST 13 số được phản ánh tức thì trên bảng danh sách.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
