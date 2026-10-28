# TC-QM-007: Kiểm soát phân quyền RPC: Khách chưa đăng nhập (web_anon) không thể gọi duyet/tu_choi

> **Phân hệ**: Quên Mật Khẩu  
> **Mã kịch bản**: `TC-QM-007`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-58 / SPEC-AU-59 / quenmatkhau-40a.sql:333`  
> **Tham chiếu đặc tả (Spec Reference)**: `Kiểm tra bảo mật API RPC definer.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Phiên khách vãng lai chưa có JWT xác thực.

## 2. Dữ Liệu Kiểm Thử (Test Data)

UUID yêu cầu hợp lệ

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Dùng vai trò web_anon gọi trực tiếp RPC duyet_xin_dat_lai(id, 'ly do')
- [ ] 2. Dùng vai trò web_anon gọi trực tiếp RPC tu_choi_xin_dat_lai(id, 'ly do')

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Máy chủ từ chối với lỗi insufficient_privilege (HTTP 401/403 hoặc SQLState 42501). Tuyệt đối không cho phép duyệt trái phép.

## 5. Ghi Chú & Lưu Ý

Pending
