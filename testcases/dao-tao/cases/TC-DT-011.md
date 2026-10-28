# TC-DT-011: Nhân viên mở màn hình Sổ đã học tra cứu lịch sử đào tạo và chứng chỉ tích lũy

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-011`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-DAO-201 / SoHocScreen.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Nhân viên đã hoàn thành ít nhất 1 khóa học hoặc buổi đào tạo

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tài khoản nhân viên có lịch sử đào tạo

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Mở ứng dụng PWA, truy cập vào mục 'Góc học tập' hoặc 'Sổ đã học'.
- [ ] 2. Quan sát phần tổng kết số khóa học đã hoàn thành, chứng chỉ còn hiệu lực, số buổi đã học.
- [ ] 3. Kiểm tra danh sách khóa học và huy hiệu đạt được.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Màn hình hiển thị đầy đủ, chính xác các số liệu tổng hợp; danh sách các khóa học đã cấp chứng chỉ và huy hiệu tích lũy được trình bày trực quan, không bị lỗi dữ liệu rỗng.

## 5. Ghi Chú & Lưu Ý

Các chỉ số chưa có dữ liệu phải hiển thị dấu gạch ngang '-', không hiển thị số 0 giả.
