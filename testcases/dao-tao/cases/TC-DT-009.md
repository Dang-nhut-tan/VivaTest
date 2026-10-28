# TC-DT-009: Hệ thống bảo vệ từ chối gửi yêu cầu đào tạo nếu có nhân sự không thuộc quán quản lý

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-009`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-199 / SPEC-AD-764`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Người dùng đăng nhập bằng vai trò Quản lý quán A

## 2. Dữ Liệu Kiểm Thử (Test Data)

Danh sách nhân viên bị can thiệp chứa mã nhân viên thuộc Quán B

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Thực hiện hành động gửi yêu cầu đào tạo kèm danh sách nhân viên có mã người ngoài quán.
- [ ] 2. Gửi yêu cầu lên máy chủ.
- [ ] 3. Quan sát phản hồi và trạng thái lưu trữ.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống ngay lập tức từ chối toàn bộ lượt gửi với thông báo không đủ quyền hạn: 'Bạn chỉ gửi được yêu cầu đào tạo cho nhân viên quán mình quản lý', không có bất kỳ bản ghi nào được tạo thêm trong cơ sở dữ liệu.

## 5. Ghi Chú & Lưu Ý

Kiểm tra chốt an toàn phân quyền bảo mật 42501 KHONG_DU_QUYEN.
