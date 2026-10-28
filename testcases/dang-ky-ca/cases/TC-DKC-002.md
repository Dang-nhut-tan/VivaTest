# TC-DKC-002: Mở Bottom Sheet chọn ca mong muốn cho ngày trong tuần

> **Phân hệ**: Đăng Ký & Duyệt Ca Làm Quán  
> **Mã kịch bản**: `TC-DKC-002`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-DK-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình Đăng ký ca

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chọn Thứ Hai trong tuần

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhấp vào thẻ ngày Thứ Hai
- [ ] 2. Quan sát danh mục ca trong sheet

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Bottom Sheet mở ra nạp động danh mục ca hiệu lực (FT1, FT2, HC1,...) và nút Nghỉ ngày này.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
