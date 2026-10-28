# TC-DT-008: Quản lý quán chọn nhân viên cấp dưới và gửi yêu cầu đào tạo thành công

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-008`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-199 / NhanVienQuanTab.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Tài khoản đăng nhập có vai trò Quản lý quán (STORE_MANAGER) và có nhân viên đang làm việc

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chọn 2 nhân viên trong quán, tuần mong muốn: Tuần tới, khóa học: Buổi bất kỳ sớm nhất

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Đăng nhập tài khoản Quản lý quán và mở màn hình 'Lịch đào tạo'.
- [ ] 2. Bấm chọn tab 'Nhân viên quán'.
- [ ] 3. Tích chọn ô vuông trước tên 2 nhân viên trong danh sách.
- [ ] 4. Chọn tuần mong muốn và nhập ghi chú điều động.
- [ ] 5. Bấm nút 'Gửi yêu cầu đào tạo'.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống gửi yêu cầu thành công, hiển thị thông báo xác nhận: 'Đã gửi yêu cầu đào tạo cho 2 nhân viên', trạng thái của nhân viên trong danh sách cập nhật hiển thị có yêu cầu đang chờ.

## 5. Ghi Chú & Lưu Ý

Kiểm tra danh sách nhân viên chỉ giới hạn tối đa 100 người/lượt gửi.
