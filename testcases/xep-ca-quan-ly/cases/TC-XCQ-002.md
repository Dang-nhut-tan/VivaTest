# TC-XCQ-002: Sử dụng bộ lọc Chỉ người chưa đăng ký để lọc nhanh nhân sự chưa nộp ca

> **Phân hệ**: Giao Diện Quản Lý Xếp Ca  
> **Mã kịch bản**: `TC-XCQ-002`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-XC-02`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Có nhân sự chưa nộp nguyện vọng tuần

## 2. Dữ Liệu Kiểm Thử (Test Data)

Nút Chỉ người chưa đăng ký

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm nút Chỉ người chưa đăng ký
- [ ] 2. Quan sát lưới nhân sự

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Lưới lọc ẩn các nhân viên đã nộp ca, chỉ hiển thị những nhân sự chưa gửi nguyện vọng.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
