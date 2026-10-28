# TC-DD-001: Quản lý quán duyệt đơn xin nghỉ phép của nhân viên quán

> **Phân hệ**: Duyệt Đơn & Phân Cấp Phê Duyệt  
> **Mã kịch bản**: `TC-DD-001`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `viva_auth.nguoi_duyet_cua`, `SPEC-DD-01`, `VBO-DD-01`  
> **Trạng thái thực thi**: **Passed 100% (Playwright POM)**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)
- Nhân viên quán thuộc cửa hàng (store_id = `store-q1`) đã gửi đơn xin nghỉ phép với trạng thái chờ duyệt (`pending`).
- Quản lý quán có vai trò `STORE_MANAGER` và được phân công quản lý cửa hàng `store-q1`.

## 2. Dữ Liệu Kiểm Thử (Test Data)
- Tài khoản Quản lý: Mã `VG900002` / Mật khẩu `QuanLyThu@2026`.
- Đơn xin nghỉ phép: Nhân viên `Nguyễn Văn Pha Chế Quán 1`, thời gian nghỉ 02/11/2026 - 03/11/2026, lý do "Nghỉ phép thường niên giải quyết việc gia đình".

## 3. Các Bước Thực Hiện (Test Steps)
1. Đăng nhập hệ thống bằng tài khoản Quản lý quán (`VG900002`).
2. Mở màn hình Duyệt đơn tại đường dẫn `/duyet-don?web=thu`.
3. Kiểm tra danh sách đơn chờ duyệt: tìm thẻ đơn của nhân viên `Nguyễn Văn Pha Chế Quán 1`.
4. Nhấn nút "Duyệt" trên thẻ đơn.

## 4. Kết Quả Mong Đợi (Expected Results)
- Tiêu đề màn hình hiển thị "Duyệt đơn".
- Thẻ đơn hiển thị đầy đủ thông tin người gửi, loại nghỉ phép và lý do.
- Nút "Duyệt" ở trạng thái sẵn sàng (enabled) và khi bấm sẽ cập nhật phê duyệt thành công.
