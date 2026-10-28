# TC-HS-005: Đối soát trực tiếp Database PostgREST API

> **Phân hệ**: Cập Nhật Hồ Sơ & Ngân Hàng  
> **Mã kịch bản**: `TC-HS-005`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VBO-HS-API`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đã gửi 2 yêu cầu cập nhật

## 2. Dữ Liệu Kiểm Thử (Test Data)

Bảng profile_update_request

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Gọi API Backend truy vấn bảng profile_update_request theo employee_id
- [ ] 2. Kiểm tra danh sách bản ghi và các trường cần cập nhật

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Tồn tại ít nhất 2 bản ghi với trạng thái PENDING gồm trường phone và bank_account.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
