# TC-DD-002: Phó quản lý quán xem đơn nhưng không có quyền duyệt (Read-only Guard)

> **Phân hệ**: Duyệt Đơn & Phân Cấp Phê Duyệt  
> **Mã kịch bản**: `TC-DD-002`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `TL-31 câu 9`, `SPEC-NS-09`, `VBO-DD-01`  
> **Trạng thái thực thi**: **Passed 100% (Playwright POM)**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)
- Cửa hàng `store-q1` có đơn xin nghỉ phép đang ở trạng thái chờ duyệt.
- Người dùng đăng nhập có vai trò `DEPUTY_MANAGER` (Phó quản lý quán).

## 2. Dữ Liệu Kiểm Thử (Test Data)
- Tài khoản Phó quản lý: Mã `VG900006` / Mật khẩu `PhoQuanLy@2026`.
- Đơn xin nghỉ phép: Nhân viên `Nguyễn Văn Pha Chế Quán 1`, thời gian nghỉ 05/11/2026 - 06/11/2026.

## 3. Các Bước Thực Hiện (Test Steps)
1. Đăng nhập hệ thống bằng tài khoản Phó quản lý (`VG900006`).
2. Mở màn hình Duyệt đơn tại `/duyet-don?web=thu`.
3. Kiểm tra danh sách đơn chờ duyệt và các nút thao tác phê duyệt.

## 4. Kết Quả Mong Đợi (Expected Results)
- Phó quản lý xem được toàn bộ danh sách đơn chờ duyệt của quán.
- Nút "Duyệt" và "Từ chối" bị vô hiệu hóa (disabled).
- Hệ thống hiển thị câu thông báo giải thích rõ quyền hạn chỉ xem của Phó quản lý ("Phó quản lý chỉ xem, quyền duyệt thuộc Quản lý chính").
