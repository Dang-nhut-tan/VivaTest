# TC-DN-015: Kiểm tra liên kết mở hộp thoại Hướng dẫn cài ứng dụng (InstallGuideSheet) từ màn Đăng nhập

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-015`  
> **Độ nghiêm trọng (Severity)**: `Nhỏ`  
> **Tự động hóa (Automation Ready)**: `SPEC-HT-163 / VBO-DN-04 / InstallGuideSheet.tsx`  
> **Tham chiếu đặc tả (Spec Reference)**: `Đảm bảo người dùng mới dễ dàng tiếp cận hướng dẫn cài đặt PWA.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình Đăng nhập.

## 2. Dữ Liệu Kiểm Thử (Test Data)

None

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bấm vào nút 'Hướng dẫn cài ứng dụng' ở nhóm lối phụ VBO-DN-04
- [ ] 2. Kiểm tra hiển thị hộp thoại
- [ ] 3. Bấm nút 'Đóng' hoặc bấm ngoài vùng phủ để đóng modal

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Hộp thoại Modal InstallGuideSheet mở lên trực tiếp từ màn đăng nhập (kể cả khi chưa đăng nhập), hiển thị hướng dẫn cài PWA cho iOS và Android. Bấm Đóng sẽ đóng modal và giữ nguyên ngữ cảnh form đăng nhập.

## 5. Ghi Chú & Lưu Ý

Pending
