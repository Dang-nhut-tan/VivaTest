# TC-DT-007: Hệ thống chặn đăng ký lặp khi nhân viên đã có yêu cầu đang chờ cho cùng khóa học

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-007`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-197 / lichDaoTaoRepo.ts`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã gửi 1 yêu cầu đào tạo khóa X và đang ở trạng thái 'Chờ xếp lịch'

## 2. Dữ Liệu Kiểm Thử (Test Data)

Chọn lại đúng khóa học X đang chờ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở bảng đăng ký đào tạo.
- [ ] 2. Chọn khóa học X trùng với khóa học đã có trong danh sách đang chờ.
- [ ] 3. Bấm nút 'Gửi đăng ký'.
- [ ] 4. Quan sát thông báo từ hệ thống.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hệ thống từ chối ghi nhận và hiển thị thông báo lỗi: 'Bạn đã có yêu cầu đào tạo đang chờ xếp lịch cho khóa này', không tạo mới bản ghi trùng lặp.

## 5. Ghi Chú & Lưu Ý

Mã lỗi phản hồi từ kho là DA_CO_YEU_CAU.
