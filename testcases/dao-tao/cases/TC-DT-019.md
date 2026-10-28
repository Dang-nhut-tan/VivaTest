# TC-DT-019: Hệ thống từ chối quyền truy cập trang quản lý đào tạo đối với tài khoản không có thẩm quyền

> **Phân hệ**: Đào tạo  
> **Mã kịch bản**: `TC-DT-019`  
> **Độ nghiêm trọng (Severity)**: `Chặn`  
> **Tự động hóa (Automation Ready)**: `Yes`  
> **Tham chiếu đặc tả (Spec Reference)**: `SPEC-AD-764 / LichDaoTaoPage.tsx`  
> **Trạng thái thực thi**: **Pending**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Người dùng đăng nhập bằng tài khoản nhân viên thông thường hoặc quản lý quán không có vai trò quản lý đào tạo

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tài khoản nhân viên cơ bản truy cập đường dẫn /dao-tao/lich

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] 1. Đăng nhập tài khoản nhân viên thông thường.
- [ ] 2. Cố tình nhập đường dẫn trực tiếp '/dao-tao/lich' trên thanh địa chỉ trình duyệt.
- [ ] 3. Quan sát phản hồi hiển thị trên màn hình.

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Màn hình hiển thị thông báo màu xanh/vàng: 'Chỉ Phòng đào tạo, Trưởng phòng vận hành hoặc Nhân sự quản trị mới có quyền quản lý lịch đào tạo', các nút thao tác nghiệp vụ và các thẻ quản trị bị ẩn hoàn toàn.

## 5. Ghi Chú & Lưu Ý

Kiểm tra chốt an toàn phân quyền giao diện kết hợp với bảo mật phía máy chủ.
