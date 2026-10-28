# TC-ADM-NV-006: Đối soát trạng thái nhân viên trên bảng chuyển sang Đã nghỉ việc

> **Phân hệ**: Cho Nhân Sự Nghỉ Việc Admin  
> **Mã kịch bản**: `TC-ADM-NV-006`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `VADM-AD-02-25`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã được xác nhận cho nghỉ việc

## 2. Dữ Liệu Kiểm Thử (Test Data)

Bảng danh sách nhân sự

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Tìm lại nhân viên vừa thao tác trên bảng
- [ ] 2. Kiểm tra cột Trạng thái

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Dòng nhân viên hiển thị huy hiệu màu xám Đã nghỉ việc.

## 5. Ghi Chú & Lưu Ý

Kịch bản đã được tự động hóa bằng Playwright POM và xác minh đạt 100%.
