# TC-DD-004: Trưởng phòng xin nghỉ phép - Hệ thống chặn tự duyệt đơn của chính mình

> **Phân hệ**: Duyệt Đơn & Phân Cấp Phê Duyệt  
> **Mã kịch bản**: `TC-DD-004`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `duyet-14b.sql: t.nd <> p_employee_id`, `SPEC-NS-87`, `SPEC-DD-05`, `laDonCuaToi`  
> **Trạng thái thực thi**: **Passed 100% (Playwright POM)**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)
- Trưởng phòng đã nộp đơn xin nghỉ phép cá nhân vào hệ thống.
- Trưởng phòng truy cập vào màn hình `/duyet-don`.

## 2. Dữ Liệu Kiểm Thử (Test Data)
- Tài khoản Trưởng phòng: Mã `VG900008` / Mật khẩu `TruongPhong@2026`.
- Đơn xin nghỉ phép: Do chính Trưởng phòng gửi, thời gian nghỉ 15/11/2026 - 16/11/2026, lý do "Trưởng phòng xin nghỉ phép việc cá nhân".

## 3. Các Bước Thực Hiện (Test Steps)
1. Đăng nhập hệ thống bằng tài khoản Trưởng phòng (`VG900008`).
2. Mở màn hình Duyệt đơn tại `/duyet-don?web=thu`.
3. Kiểm tra ngăn "Đơn nhân viên phòng": đối soát xem đơn của chính mình có xuất hiện không.
4. Chuyển sang ngăn "Đơn của tôi": kiểm tra thẻ đơn của chính mình và trạng thái các nút thao tác.

## 4. Kết Quả Mong Đợi (Expected Results)
- Tại ngăn "Đơn nhân viên phòng": Đơn của chính Trưởng phòng BỊ LOẠI BỎ hoàn toàn khỏi hàng chờ duyệt (`laDonCuaToi`).
- Tại ngăn "Đơn của tôi": Thấy đơn của mình nhưng HOÀN TOÀN KHÔNG CÓ nút Duyệt hoặc Từ chối (`hideDecisionButtons = true`).
- Hiển thị thông điệp cảnh báo nghiệp vụ rõ ràng: "Đây là đơn của chính bạn. Bạn không thể tự duyệt đơn của mình."
