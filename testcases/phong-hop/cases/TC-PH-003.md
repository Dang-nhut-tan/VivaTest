# TC-PH-003: Kiểm tra cơ chế Cần gấp chỉ cấp quyền cho thành viên Ban Giám Đốc (BOD)

> **Phân hệ**: Đặt Phòng Họp & Bất Cập  
> **Mã kịch bản**: `TC-PH-003`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-HP-14`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Kiểm tra phân quyền tài khoản

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tài khoản nhân viên thường vs Ban Giám Đốc

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Mở tính năng Đặt phòng bằng tài khoản nhân viên thường
- [ ] 2. Kiểm tra tùy chọn Đặt phòng cần gấp

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Tính năng Cần gấp chỉ hiển thị hoặc cho phép thực thi đối với nhân sự có vai trò BOD.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
