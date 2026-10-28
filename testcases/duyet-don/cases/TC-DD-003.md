# TC-DD-003: Trưởng phòng duyệt đơn xin nghỉ phép của nhân viên văn phòng

> **Phân hệ**: Duyệt Đơn & Phân Cấp Phê Duyệt  
> **Mã kịch bản**: `TC-DD-003`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Ưu tiên (Priority)**: `P0`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `viva_auth.nguoi_duyet_cua`, `SPEC-DD-04`, `VBO-DD-08`  
> **Trạng thái thực thi**: **Passed 100% (Playwright POM)**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)
- Nhân viên khối văn phòng (thuộc phòng ban `dept-01`, không gắn quán) gửi đơn xin nghỉ phép.
- Trưởng phòng có vai trò `DEPT_HEAD` phụ trách phòng ban đó.

## 2. Dữ Liệu Kiểm Thử (Test Data)
- Tài khoản Trưởng phòng: Mã `VG900008` / Mật khẩu `TruongPhong@2026`.
- Đơn xin nghỉ phép: Nhân viên văn phòng `Lê Văn Phòng (Chuyên viên Marketing)`, thời gian nghỉ 10/11/2026 - 11/11/2026.

## 3. Các Bước Thực Hiện (Test Steps)
1. Đăng nhập hệ thống bằng tài khoản Trưởng phòng (`VG900008`).
2. Mở màn hình Duyệt đơn tại `/duyet-don?web=thu`.
3. Kiểm tra thanh điều hướng 2 ngăn: "Đơn nhân viên phòng" và "Đơn của tôi".
4. Chọn tab "Đơn nhân viên phòng".
5. Tìm đơn của nhân sự `Lê Văn Phòng` và bấm nút "Duyệt".

## 4. Kết Quả Mong Đợi (Expected Results)
- Thanh tab 2 ngăn (`VBO-DD-08`) xuất hiện đúng nghiệp vụ Trưởng phòng.
- Tại ngăn "Đơn nhân viên phòng", đơn của nhân viên cấp dưới hiển thị đầy đủ.
- Nút "Duyệt" khả dụng và thực hiện phê duyệt đơn thành công.
