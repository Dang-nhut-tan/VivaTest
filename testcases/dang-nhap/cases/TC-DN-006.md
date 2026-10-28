# TC-DN-006: Cảnh báo thiết bị lạ lần đầu đăng nhập trên máy mới và tiếp tục vào ứng dụng (MayLaNotice)

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-006`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-10 / SPEC-AU-30 / VBO-DN-07`  
> **Tham chiếu đặc tả (Spec Reference)**: `Quy tắc YC-29: Cảnh báo người dùng nhưng không chặn đứng luồng công việc.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản đăng nhập lần đầu trên trình duyệt/thiết bị này (chưa có fingerprint trong localStorage).

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tài khoản hợp lệ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Thực hiện đăng nhập thành công
- [ ] 2. Quan sát màn hình sau đăng nhập
- [ ] 3. Bấm nút 'Tiếp tục'

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Sau khi đăng nhập thành công, khối MayLaNotice (VBO-DN-07) xuất hiện thông báo: 'Bạn đang dùng thiết bị mới...'. Bấm 'Tiếp tục' sẽ hoàn tất xác nhận và điều hướng vào trang chủ (cảnh báo, không chặn).

## 5. Ghi Chú & Lưu Ý

Pending
