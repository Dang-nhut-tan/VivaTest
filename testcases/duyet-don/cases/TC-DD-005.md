# TC-DD-005: CEO đăng nhập - Hệ thống thu hẹp bộ lọc chỉ hiện đơn Trưởng phòng và ẩn đơn nhân viên thường

> **Phân hệ**: Duyệt Đơn & Phân Cấp Phê Duyệt  
> **Mã kịch bản**: `TC-DD-005`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DD-07`, `locDonTheoVaiNguoiGui`, `VAI_NGUOI_GUI_CEO_THAY`, `VBO-DD-09`  
> **Trạng thái thực thi**: **Passed 100% (Playwright POM)**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)
- Kho dữ liệu tồn tại đồng thời:
  1. Đơn xin nghỉ phép của nhân viên cửa hàng (đã có Quản lý quán duyệt).
  2. Đơn xin nghỉ phép của Trưởng phòng ban (không có cấp trên nào khác ngoài CEO).
- Người dùng đăng nhập có vai trò `CEO` (Tổng Giám Đốc).

## 2. Dữ Liệu Kiểm Thử (Test Data)
- Tài khoản CEO: Mã `VG900009` / Mật khẩu `TongGiamDoc@2026`.
- Đơn 1: Nhân viên quán `Nguyễn Văn Pha Chế Quán 1` (vai trò `EMPLOYEE`).
- Đơn 2: `Đặng Trưởng Phòng Kế Hoạch` (vai trò `DEPT_HEAD`).

## 3. Các Bước Thực Hiện (Test Steps)
1. Đăng nhập hệ thống bằng tài khoản Tổng Giám Đốc CEO (`VG900009`).
2. Mở màn hình Duyệt đơn tại `/duyet-don?web=thu`.
3. Kiểm tra thông báo hướng dẫn và thu hẹp nghiệp vụ tại banner `VBO-DD-09`.
4. Quan sát danh sách đơn hiển thị trên màn hình.

## 4. Kết Quả Mong Đợi (Expected Results)
- Banner nghiệp vụ hiển thị thông báo: "Màn này chỉ hiện đơn của các trưởng phòng ban. Đơn của nhân viên đã có quản lý quán hoặc trưởng bộ phận của họ duyệt nên không hiện ở đây."
- Đơn của nhân viên quán bị ẩn hoàn toàn khỏi danh sách của CEO.
- Đơn của Trưởng phòng hiển thị rõ ràng và sẵn sàng để CEO thao tác phê duyệt.
