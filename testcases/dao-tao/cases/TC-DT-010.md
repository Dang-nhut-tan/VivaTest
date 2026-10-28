# TC-DT-010: Hủy yêu cầu đào tạo đang chờ xếp lịch

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-010`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-185 / useHuyYeuCau.ts`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Yêu cầu đào tạo đang ở trạng thái 'Chờ xếp lịch' (chưa được xếp vào buổi cụ thể)

## 2. Dữ Liệu Kiểm Thử (Test Data)

Mã yêu cầu đang chờ, lý do hủy: 'Thay đổi kế hoạch công việc'

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở màn hình danh sách yêu cầu đang chờ.
- [ ] 2. Bấm nút 'Hủy' bên cạnh yêu cầu đào tạo.
- [ ] 3. Trong hộp thoại xác nhận, nhập lý do hủy.
- [ ] 4. Bấm nút 'Xác nhận hủy'.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hộp thoại đóng lại, hiển thị thông báo đã hủy yêu cầu thành công; dòng yêu cầu được cập nhật trạng thái 'Đã hủy' hoặc biến mất khỏi danh sách hàng chờ.

## 5. Ghi Chú & Lưu Ý

Không thể hủy đối với yêu cầu đã được xếp lịch học chính thức.
