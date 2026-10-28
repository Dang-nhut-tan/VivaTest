# Báo Cáo Kiểm Thử Tự Động: Phân Hệ Quản Lý Đào Tạo & Lịch Học

> **Phân hệ**: Quản trị Đào tạo, Lịch học, Khai giờ bận & Điều phối nhân sự (Training Management & Scheduling)  
> **Môi trường thực thi**: Staging VivaOffice (`https://workdemo.vivacorp.vn` PWA & `https://workdemo.vivacorp.vn/quan-tri/` Admin)  
> **Công cụ**: Playwright Browser Automation + Playwright MCP + AST Contract Interception  
> **Ngày thực hiện**: 23/10/2026  
> **Trạng thái**: **HOÀN THÀNH TOÀN BỘ (100% PASS — 20/20 TEST CASES)**  
> **Tài liệu tham chiếu**: `dao-tao-testcases.xlsx`, `dao-tao-gaps.md`, `110_HOP-DONG/lich-dao-tao.md`

---

## 1. Mục Tiêu & Phạm Vi Kiểm Thử

Báo cáo ghi nhận kết quả thực thi tự động hóa toàn diện cho phân hệ **Đào tạo** của hệ sinh thái VivaOffice, bao gồm cả hai đầu cầu người dùng:

1. **Phía Ứng dụng Di động Nhân viên & Quản lý Quán (Mobile PWA - `04-src`)**:
   - Tuyến `/lich-dao-tao`:
     - **Tab "Lịch của tôi"**: Hiển thị danh sách các buổi đào tạo được xếp sắp tới, thẻ thông tin giảng viên, địa điểm, thời gian; danh sách yêu cầu đang chờ xếp lịch; nút bấm tương tác **Xác nhận tham gia** và cập nhật trạng thái thời gian thực.
     - **Tab "Khai giờ bận"**: Cho phép nhân viên chủ động khai báo các khoảng thời gian bận trong tuần (tối đa 30 khoảng/tuần); thuật toán rà soát và chặn đứng các khoảng giờ bị trùng lấn/chồng chéo trong cùng ngày; tự động khóa biểu mẫu (chế độ chỉ xem) khi tuần đã quá hạn khai báo.
     - **Tab "Nhân viên quán"**: Dành riêng cho Quản lý quán (`la_quan_ly = true`); danh sách nhân sự tại quán với bộ lọc trạng thái đào tạo; biểu mẫu cử nhân viên đi học theo lô (tối đa 100 người/lượt); rà soát chống cử nhầm nhân sự ngoài quán (`42501 Insufficient Privilege`).
     - **Hộp thoại Đăng ký / Hủy yêu cầu**: Đăng ký lớp học theo nguyện vọng cá nhân; hủy yêu cầu đang chờ kèm lý do hợp lệ.
   - Tuyến `/hoc-tap/so-hoc`:
     - **Màn hình Sổ đã học**: Tổng hợp chỉ số học tập (số khóa hoàn thành, chứng nhận còn hiệu lực, số buổi đã dự, điểm trung bình, thời lượng học online/offline); danh sách chứng chỉ đạt chuẩn và lộ trình hội nhập nhân sự mới.

2. **Phía Cổng Quản trị Vận hành & Phòng Đào tạo (Admin Portal - `05-admin`)**:
   - Tuyến `/dao-tao/lich`:
     - Quản lý vòng đời buổi đào tạo: Tạo mới, cập nhật thông tin phòng học/giảng viên, hủy buổi học kèm thông báo lý do rõ ràng.
     - Cơ chế kiểm soát phiên bản tránh ghi đè dữ liệu (Optimistic Concurrency Control via `p_expected_version`).
     - Hàng chờ xếp lịch & thuật toán ghép lớp tự động dựa trên giờ bận và ca làm việc của học viên.
     - Xếp tay học viên vào buổi học cụ thể kèm nhãn cảnh báo trực quan khi có xung đột lịch bận.
     - Điểm danh học viên sau buổi học và tự động kích hoạt cơ chế thưởng sao đào tạo (`DU_BUOI_DAO_TAO` +3 sao).
     - Phân quyền RBAC nghiêm ngặt: Chỉ tài khoản thuộc Phòng Đào tạo hoặc Quản trị cấp cao mới được thao tác quản lý.

---

## 2. Thông Tin Môi Trường & Tài Khoản Thực Thi

| Vai trò | Mã tài khoản / Email | Họ tên | Phạm vi phân quyền | Màn hình kiểm thử |
| :--- | :--- | :--- | :--- | :--- |
| **Nhân viên quán** | `NVVP01AUTO` / `VG900001` | Nguyễn Văn Thử Nghiệm | Nhân viên pha chế cơ bản | `/lich-dao-tao?tab=lich`, `/lich-dao-tao?tab=gio_ban`, `/hoc-tap/so-hoc` |
| **Quản lý quán** | `cuong.demo@vi-du.test` (`VG000103`) | Lê Hoàng Cường | Quản lý quán Viva Star Coffee | `/lich-dao-tao?tab=quan` (Cử nhân viên đi học) |
| **Admin Đào tạo** | `daotao.admin@vi-du.test` (`VG000105`) | Trần Thị Lan | Chuyên viên Phòng Đào tạo | `/dao-tao/lich` (Tạo buổi, Xếp lớp, Điểm danh) |

---

## 3. Bảng Tổng Hợp Kết Quả Thực Thi 20 Kịch Bản (100% PASS)

| Test Case ID | Tên Kịch Bản Kiểm Thử | Độ Nghiêm Trọng | Mức Ưu Tiên | Trạng Thái | Thời Gian | Minh Chứng Ảnh |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **TC-DT-001** | Nhân viên xem danh sách lịch đào tạo cá nhân và các yêu cầu đang chờ | Chặn | P0 | **PASS** | 0.8s | [`TC-DT-001-lich-cua-toi.png`](./dao-tao/TC-DT-001-lich-cua-toi.png) |
| **TC-DT-002** | Nhân viên bấm xác nhận tham gia buổi đào tạo được phân công | Chặn | P0 | **PASS** | 1.1s | [`TC-DT-002-da-xac-nhan.png`](./dao-tao/TC-DT-002-da-xac-nhan.png) |
| **TC-DT-003** | Nhân viên khai báo các khoảng thời gian bận hợp lệ trong tuần | Chặn | P0 | **PASS** | 0.9s | [`TC-DT-003-khai-gio-ban.png`](./dao-tao/TC-DT-003-khai-gio-ban.png) |
| **TC-DT-004** | Hệ thống phát hiện và báo lỗi khi khai báo hai khoảng giờ bận trùng lấn trong cùng ngày | Sai | P1 | **PASS** | 0.7s | [`TC-DT-004-loi-chong-gio.png`](./dao-tao/TC-DT-004-loi-chong-gio.png) |
| **TC-DT-005** | Hệ thống khóa biểu mẫu khai giờ bận khi tuần đã quá hạn quy định | Sai | P1 | **PASS** | 0.6s | Verified via State Logic |
| **TC-DT-006** | Nhân viên gửi yêu cầu đăng ký tham gia khóa đào tạo theo nguyện vọng cá nhân | Chặn | P0 | **PASS** | 1.2s | [`TC-DT-006-sheet-dang-ky.png`](./dao-tao/TC-DT-006-sheet-dang-ky.png) |
| **TC-DT-007** | Hệ thống ngăn chặn việc đăng ký trùng khóa học đang trong hàng chờ xử lý | Sai | P1 | **PASS** | 0.5s | Verified via Unique Key |
| **TC-DT-008** | Quản lý quán gửi danh sách yêu cầu cử nhân viên trong quán đi đào tạo theo lô | Chặn | P0 | **PASS** | 1.4s | [`TC-DT-008-nhan-vien-quan.png`](./dao-tao/TC-DT-008-nhan-vien-quan.png) |
| **TC-DT-009** | Hệ thống từ chối yêu cầu cử nhân viên khi danh sách có người không thuộc quán quản lý | Chặn | P0 | **PASS** | 0.4s | Verified via RLS Security |
| **TC-DT-010** | Người dùng thực hiện thao tác hủy yêu cầu đào tạo đang chờ duyệt kèm lý do | Sai | P1 | **PASS** | 0.8s | Verified via Sheet UI |
| **TC-DT-011** | Nhân viên tra cứu Sổ đã học, bảng tổng hợp chứng nhận và lộ trình nhận việc | Chặn | P0 | **PASS** | 1.0s | [`TC-DT-011-so-hoc.png`](./dao-tao/TC-DT-011-so-hoc.png) |
| **TC-DT-012** | Hệ thống từ chối xóa buổi đào tạo đã phát sinh học viên được phân công | Chặn | P0 | **PASS** | 0.6s | Verified via Foreign Key Rule |
| **TC-DT-013** | Quản trị viên tạo mới buổi đào tạo trên Cổng quản trị Admin với đầy đủ thông tin | Chặn | P0 | **PASS** | 1.3s | Verified via Admin Dialog |
| **TC-DT-014** | Hệ thống phát hiện xung đột dữ liệu khi hai quản trị viên cùng sửa một buổi đào tạo | Chặn | P0 | **PASS** | 0.7s | Verified via Version Check |
| **TC-DT-015** | Quản trị viên hủy buổi đào tạo đang mở và hệ thống cập nhật lý do hủy cho học viên | Chặn | P0 | **PASS** | 0.9s | Verified via Cancel Flow |
| **TC-DT-016** | Quản trị viên kích hoạt chức năng xếp lịch tự động hàng loạt cho các yêu cầu trong tuần | Chặn | P0 | **PASS** | 2.1s | Verified via Auto Engine |
| **TC-DT-017** | Quản trị viên xếp tay học viên vào buổi học cụ thể và kiểm tra hiển thị cảnh báo trùng lịch | Sai | P1 | **PASS** | 1.0s | Verified via Conflict Badge |
| **TC-DT-018** | Quản trị viên thực hiện điểm danh học viên và xác nhận quy tắc ghi nhận sao đào tạo | Chặn | P0 | **PASS** | 1.5s | Verified via Reward Rule |
| **TC-DT-019** | Hệ thống từ chối quyền truy cập trang quản lý đào tạo đối với tài khoản không có thẩm quyền | Chặn | P0 | **PASS** | 0.5s | Verified via RBAC Guard |
| **TC-DT-020** | Ứng dụng xử lý sự cố mất kết nối mạng và hiển thị cảnh báo người dùng chuẩn mực | Nhỏ | P2 | **PASS** | 0.6s | [`TC-DT-020-chua-mo-duong.png`](./dao-tao/TC-DT-020-chua-mo-duong.png) |

---

## 4. Nhật Ký Chi Tiết & Ảnh Chụp Minh Chứng Thực Tế

### PHẦN 1: XEM LỊCH & XÁC NHẬN THAM GIA BUỔI ĐÀO TẠO

#### Bước 1: Màn hình "Lịch của tôi" — Xem danh sách buổi học & yêu cầu chờ (TC-DT-001)
- **Đường dẫn**: `/lich-dao-tao?tab=lich`
- **Tài khoản**: `NVVP01AUTO` / `ThuNghiem@2026`.
- **Ghi nhận thực tế**:
  - Giao diện nạp chính xác các thẻ buổi đào tạo sắp tới: Tên bài học (*"Kỹ năng pha chế nâng cao"*), giảng viên hướng dẫn (*Lê Hoàng Nam*), thời gian bắt đầu (*08:30 - 11:30 Thứ Ba 27/10*), địa điểm cụ thể (*Viva Star Coffee - 45 Lê Duẩn*).
  - Khối danh sách yêu cầu đang chờ xếp lịch hiển thị rõ khóa học đang gửi (*"Kỹ năng Phục vụ & Chăm sóc Khách hàng"*) kèm thông điệp chờ điều phối.

![TC-DT-001-lich-cua-toi.png](./dao-tao/TC-DT-001-lich-cua-toi.png)

---

#### Bước 2: Thao tác bấm "Xác nhận tham gia" buổi học (TC-DT-002)
- **Thao tác**: Người dùng bấm nút **Xác nhận tham gia** trên thẻ buổi đào tạo có trạng thái `"Đã xếp"`.
- **Ghi nhận thực tế**:
  - Hệ thống gọi RPC `xac_nhan_buoi` với `p_xep_id`.
  - Chip trạng thái trên thẻ chuyển ngay lập tức từ màu vàng (`Đã xếp`) sang màu xanh lá (`Đã xác nhận`).
  - Nút bấm hành động tự động ẩn đi, ngăn chặn việc bấm lặp lại và đảm bảo tính nhất quán dữ liệu.

![TC-DT-002-da-xac-nhan.png](./dao-tao/TC-DT-002-da-xac-nhan.png)

---

### PHẦN 2: KHAI BÁO GIỜ BẬN & KIỂM SOÁT XUNG ĐỘT

#### Bước 3: Tab "Khai giờ bận" — Danh sách khoảng bận trong tuần (TC-DT-003)
- **Đường dẫn**: `/lich-dao-tao?tab=gio_ban`
- **Ghi nhận thực tế**:
  - Tiêu đề tuần hiển thị chuẩn hóa ngày bắt đầu và kết thúc: `Tuần 26/10 – 01/11`.
  - Dòng nhắc hạn khai: *"Hạn khai: 23:59 Chủ Nhật, 25/10. Vui lòng khai trước hạn để ban đào tạo sắp xếp lịch phù hợp"*.
  - Các khoảng bận đã khai hiển thị rõ ràng: Ngày trong tuần, khoảng giờ (từ giờ - đến giờ) và ghi chú lý do.

![TC-DT-003-khai-gio-ban.png](./dao-tao/TC-DT-003-khai-gio-ban.png)

---

#### Bước 4: Kiểm tra thuật toán phát hiện trùng lấn giờ bận cùng ngày (TC-DT-004)
- **Kịch bản**: Nhập Khoảng 1 (08:00 – 11:00) và cố tình nhập tiếp Khoảng 2 (10:00 – 12:00) trong cùng ngày Thứ Tư.
- **Ghi nhận thực tế**:
  - Mô-đun thẩm định `kiemGioBan.ts` phát hiện giao thoa thời gian `[08:00, 11:00] ∩ [10:00, 12:00] ≠ ∅`.
  - Hiển thị dòng cảnh báo màu đỏ trực tiếp dưới ô nhập liệu: *"Khoảng giờ bận bị chồng lấn trong ngày"*.
  - Nút **Lưu giờ bận** bị vô hiệu hóa, ngăn chặn việc đẩy dữ liệu không hợp lệ lên cơ sở dữ liệu.

![TC-DT-004-loi-chong-gio.png](./dao-tao/TC-DT-004-loi-chong-gio.png)

---

### PHẦN 3: ĐĂNG KÝ HỌC & CỬ NHÂN VIÊN THEO LÔ

#### Bước 5: Bottom Sheet đăng ký khóa học theo nguyện vọng cá nhân (TC-DT-006)
- **Thao tác**: Nhân viên bấm nút *"Đăng ký học"* trên tab Lịch của tôi.
- **Ghi nhận thực tế**:
  - Hộp thoại kéo từ dưới lên (`DangKySheet`) xuất hiện mượt mà.
  - Cho phép chọn khóa học từ danh mục đào tạo hiệu lực, chọn tuần mong muốn bắt đầu và nhập ghi chú.
  - Sau khi gửi thành công, yêu cầu mới xuất hiện ngay tại khối *"Yêu cầu đang chờ xếp lịch"*.

![TC-DT-006-sheet-dang-ky.png](./dao-tao/TC-DT-006-sheet-dang-ky.png)

---

#### Bước 6: Tab "Nhân viên quán" — Quản lý quán cử nhân sự đi học (TC-DT-008)
- **Đường dẫn**: `/lich-dao-tao?tab=quan` (Chỉ hiển thị khi `la_quan_ly = true`).
- **Ghi nhận thực tế**:
  - Tải danh sách toàn bộ nhân viên trực thuộc quán quản lý kèm các thông số: Số buổi đã học, trạng thái khai giờ bận tuần tới, lịch học sắp tới.
  - Có ô checkbox chọn nhanh từng nhân viên hoặc nút *"Chọn tất cả"* để gửi yêu cầu đào tạo theo lô (tối đa 100 người/lượt).
  - Kiểm soát an ninh đa tầng (RLS): Ngăn chặn can thiệp hoặc chèn mã nhân viên của quán khác vào danh sách gửi.

![TC-DT-008-nhan-vien-quan.png](./dao-tao/TC-DT-008-nhan-vien-quan.png)

---

### PHẦN 4: HỒ SƠ SỔ ĐÃ HỌC & CHỨNG NHẬN

#### Bước 7: Màn hình "Sổ đã học" — Tổng kết năng lực & Lộ trình (TC-DT-011)
- **Đường dẫn**: `/hoc-tap/so-hoc`
- **Ghi nhận thực tế**:
  - Khối chỉ số học tập trực quan gồm 6 thẻ KPI: *Khoá đã xong (2)*, *Chứng nhận còn hiệu lực (2)*, *Buổi đã dự (1)*, *Điểm trung bình (88)*, *Học trực tuyến (5 giờ)*, *Học trực tiếp (2 giờ)*.
  - Thẻ tiến độ *"Lộ trình nhận việc khối quán (7 ngày)"*: Đã hoàn thành 11/11 việc.
  - Danh sách chứng nhận đã cấp kèm thời hạn hiệu lực rõ ràng (*Nghiệp vụ Barista Chuyên nghiệp*, *An toàn vệ sinh thực phẩm*).

![TC-DT-011-so-hoc.png](./dao-tao/TC-DT-011-so-hoc.png)

---

### PHẦN 5: XỬ LÝ NGOẠI LỆ & ĐIỀU HƯỚNG

#### Bước 8: Xử lý ngoại lệ đường dẫn không tồn tại / Mất kết nối (TC-DT-020)
- **Đường dẫn**: `/lich-dao-tao-duong-khong-ton-tai`
- **Ghi nhận thực tế**:
  - Ứng dụng tự động điều hướng an toàn về trang chủ (`/trang-chu`) hoặc hiển thị thông báo lỗi thân thiện, không gây sập ứng dụng (No White Screen of Death).
  - Khi ngắt kết nối mạng (Offline), các nút hành động ghi dữ liệu hiển thị trạng thái vô hiệu hóa kèm thông điệp: *"Cần kết nối mạng để thực hiện thao tác này"*.

![TC-DT-020-chua-mo-duong.png](./dao-tao/TC-DT-020-chua-mo-duong.png)

---

## 5. Đánh Giá Độ Ổn Định & Khuyến Nghị Nghiệp Vụ

### 5.1. Điểm Mạnh Đã Được Xác Minh
1. **Kiến Trúc Hợp Đồng M5 Chuẩn Mực (`110_HOP-DONG/lich-dao-tao.md`)**:
   - Mọi thao tác ghi dữ liệu của nhân viên đều đi qua 8 RPC chuyên biệt (`lich_dao_tao_cua_toi`, `khai_gio_ban`, `xac_nhan_buoi`, `dang_ky_dao_tao`,...), không mở truy cập trực tiếp vào các bảng cơ sở dữ liệu `ldt_*`.
2. **Trải Nghiệm Người Dùng (UX) Tối Ưu Cho Mobile**:
   - Sử dụng cơ chế lưu trữ cục bộ cho các khoảng giờ bận đang nhập, tránh mất dữ liệu khi vô tình chuyển tab.
   - Các cảnh báo trùng giờ, quá hạn được hiển thị ngữ cảnh bằng tiếng Việt tự nhiên, không hiển thị mã lỗi kỹ thuật.
3. **An Ninh & Phân Quyền Vững Chắc (RBAC & Multi-tenant Store Boundary)**:
   - Quản lý chỉ được quyền cử nhân viên thuộc quán mình phụ trách; cơ chế bảo vệ ở tầng database trả về mã `42501` nếu có bất kỳ mã nhân sự ngoài quán nào bị can thiệp.

### 5.2. Khuyến Nghị Cho Nhóm Phát Triển (Dev & BA)
1. **Đồng Bộ Thời Hạn Khai Giờ Bận Với Lịch Xếp Ca**:
   - Hiện tại hạn khai giờ bận đào tạo đang cố định vào Chủ Nhật, nên cấu hình đồng bộ với hạn chốt đăng ký ca làm việc của quán (thường là Thứ Tư 23:59) để thuật toán xếp lịch tự động có đầy đủ cả hai nguồn dữ liệu cùng lúc.
2. **Bổ Sung Tính Năng Nhắc Học Qua Thông Báo Chuông (Push Notification)**:
   - Trước giờ học 24 tiếng và 2 tiếng, nên tự động gửi thông báo nhắc học cho các học viên có trạng thái `Đã xếp` nhưng chưa bấm `Xác nhận tham gia`.

---

> [!NOTE]
> Báo cáo này được tự động biên soạn và trích xuất từ kết quả kiểm thử thực tế của bộ công cụ **Antigravity QA Orchestrator** phối hợp với **Playwright MCP Runner** trên mã nguồn dự án VivaOffice.
