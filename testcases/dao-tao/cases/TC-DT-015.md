# TC-DT-015: Quản trị viên hủy buổi đào tạo và tự động chuyển các học viên về hàng chờ

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-015`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-AD-759 / HuyBuoiDialog.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Buổi đào tạo có học viên đang ở trạng thái 'Đã xếp' hoặc 'Đã xác nhận', chưa điểm danh

## 2. Dữ Liệu Kiểm Thử (Test Data)

Lý do hủy: 'Giảng viên có việc đột xuất, dời lịch sang tuần sau'

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Tại bảng danh sách buổi học, tìm buổi học cần hủy và bấm biểu tượng 'Hủy buổi'.
- [ ] 2. Nhập lý do hủy buổi (từ 5 đến 500 ký tự).
- [ ] 3. Bấm nút 'Xác nhận hủy'.
- [ ] 4. Mở tab 'Hàng chờ + xếp lịch' để kiểm tra học viên của buổi đó.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Buổi học chuyển trạng thái sang 'Đã hủy'; tất cả học viên đã xếp trong buổi được tự động hoàn trả về danh sách hàng chờ với trạng thái 'Chờ xếp lịch' để xếp ở đợt tiếp theo.

## 5. Ghi Chú & Lưu Ý

Nếu buổi học đã có người được điểm danh 'Đã học' thì hệ thống kiên quyết không cho phép hủy.
