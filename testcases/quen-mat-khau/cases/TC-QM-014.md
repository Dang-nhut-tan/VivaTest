# TC-QM-014: Kiểm tra xử lý lỗi kết nối mạng (Network Offline) và khả năng phục hồi giao diện

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-014`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `04-src/src/auth/supabaseAuthPort.ts:191 / AuthError`  
> **Tham chiếu đặc tả (Spec Reference)**: `Kiểm tra resilience khi mạng chập chờn.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Đang ở màn hình /quen-mat-khau với mã đã điền sẵn.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Ngắt kết nối mạng hoặc chặn network request tới RPC

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Bật chế độ offline trong browser
- [ ] 2. Bấm 'Gửi yêu cầu'
- [ ] 3. Quan sát thông báo lỗi
- [ ] 4. Bật lại mạng và thử lại

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Giao diện hiển thị thành phần AuthError thông báo lỗi mạng; nút 'Gửi yêu cầu' không bị kẹt ở trạng thái loading vĩnh viễn và cho phép người dùng thử lại khi có mạng.

## 5. Ghi Chú & Lưu Ý

Pending
