# TC-DD-006: Tổng Giám Đốc (CEO) phê duyệt đơn xin nghỉ phép của Trưởng phòng thành công

> **Phân hệ**: Duyệt Đơn & Phân Cấp Phê Duyệt  
> **Mã kịch bản**: `TC-DD-006`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `viva_auth.nguoi_duyet_cua (nhánh can_admin_config)`, `SPEC-DD-07`, `SPEC-NS-124`  
> **Trạng thái thực thi**: **Passed 100% (Playwright POM)**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)
- Trưởng phòng ban đã nộp đơn xin nghỉ phép lên hệ thống.
- Đơn đang ở trạng thái chờ duyệt (`pending`).
- Tổng Giám Đốc (CEO) có quyền hạn cao nhất trong chuỗi phê duyệt hành chính.

## 2. Dữ Liệu Kiểm Thử (Test Data)
- Tài khoản CEO: Mã `VG900009` / Mật khẩu `TongGiamDoc@2026`.
- Đơn xin nghỉ phép: Người gửi `Đặng Trưởng Phòng Kế Hoạch`, thời gian nghỉ 25/11/2026 - 26/11/2026, lý do "Trưởng phòng xin nghỉ phép cuối năm".

## 3. Các Bước Thực Hiện (Test Steps)
1. Đăng nhập hệ thống bằng tài khoản Tổng Giám Đốc CEO (`VG900009`).
2. Mở màn hình Duyệt đơn tại `/duyet-don?web=thu`.
3. Tìm thẻ đơn của Trưởng phòng `Đặng Trưởng Phòng`.
4. Bấm nút "Duyệt" trên thẻ đơn.

## 4. Kết Quả Mong Đợi (Expected Results)
- Thẻ đơn hiển thị đầy đủ thông tin Trưởng phòng và nội dung đơn.
- Nút "Duyệt" hoạt động bình thường, gửi lệnh phê duyệt thành công.
- Trạng thái đơn được cập nhật và thông báo thông suốt tới Trưởng phòng.
