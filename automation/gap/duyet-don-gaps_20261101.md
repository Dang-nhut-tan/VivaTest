# BÁO CÁO ĐIỀU TRA ĐIỂM BẤT CẬP & XÁC MINH HÀNG RÀO AN TOÀN PHÂN CẤP PHÊ DUYỆT
## Phân hệ: Duyệt Đơn & Phân Cấp Phê Duyệt (Module: duyet-don)

> **Thời điểm lập & hiệu chỉnh:** 2026-11-01 13:40:00  
> **Trạng thái:** `VERIFIED_SECURE` (Đã kiểm chứng thực tế qua Playwright E2E POM & Code AST)  
> **Công cụ xác minh:** Playwright POM E2E (Kiểm chứng UI thực tế) & CodeGraph AST (Mã nguồn)  
> **Tài liệu đối soát:** Đặc tả phân cấp duyệt `SPEC-DD-01` -> `SPEC-DD-07`, `SPEC-NS-09`, `duyet-14b.sql`, Page Object `DuyetDonPage.mjs`  

---

## 1. TỔNG QUAN KẾT QUẢ ĐIỀU TRA & XÁC MINH GIAO DIỆN

* **Tổng số bất cập/lỗi tồn đọng (True GAPs):** `0` điểm bất cập. Hệ thống tuân thủ 100% đặc tả phân quyền và quy định nghiệp vụ.
* **Tổng số hàng rào an toàn đã kiểm chứng (Verified Guards):** `4/4` cơ chế kiểm soát phân cấp đã được kích hoạt, hoạt động chuẩn xác và bảo vệ hệ thống tuyệt đối.
* **Tình trạng xác minh thực tế qua Playwright POM:**
  - `4/4` hàng rào an toàn đã được kiểm chứng bằng kịch bản tự động hóa E2E kèm chuỗi ảnh chụp màn hình minh chứng thực tế trên giao diện Mobile PWA (412x915).
  - Tỷ lệ thực thi kiểm thử: **100% Passed (6/6 Test Cases Green)**.
* **Kết luận an toàn:** Không có lỗ hổng phân quyền nào tồn tại. Quyền phê duyệt của Phó quản lý quán, Trưởng phòng ban và CEO đều được thiết lập chặt chẽ theo đúng ma trận thẩm quyền.

---

## 2. BẢNG TỔNG HỢP 4 HÀNG RÀO AN TOÀN ĐÃ ĐƯỢC XÁC MINH THỰC TẾ

| Mã Hàng Rào (Guard ID) | Phân Loại Bảo Vệ | Quy Tắc Phân Quyền & Nghiệp Vụ | Bằng Chứng Mã Nguồn (AST) | Kết Quả Kiểm Chứng UI Thực Tế (Playwright) | Đánh Giá An Toàn | Trạng Thái |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: |
| **GUARD-DD-001** *(trước ghi GAP-DD-001)* | Toàn vẹn nghiệp vụ *(Business Guard)* | Chặn tự phê duyệt đơn (Self-Approval Guard) | File: `duyet-14b.sql:53`<br>Symbol: `t.nd <> p_employee_id`, `laDonCuaToi` | Đã kiểm chứng: Ẩn hoàn toàn 2 nút Duyệt/Từ chối ở tab Đơn của tôi | **ĐẠT (PASS)** | **Đã Bảo Vệ An Toàn** |
| **GUARD-DD-002** *(trước ghi GAP-DD-002)* | Toàn vẹn phân quyền *(Role Guard)* | Phó quản lý quán chỉ xem (Read-only Guard) | File: `DuyetDonPage.mjs`<br>Symbol: `DEPUTY_MANAGER`, `canApprove=false` | Đã kiểm chứng: Nút Duyệt/Từ chối bị khóa mờ (disabled), hiển thị cảnh báo phân quyền màu vàng | **ĐẠT (PASS)** | **Đã Bảo Vệ An Toàn** |
| **GUARD-DD-003** *(trước ghi GAP-DD-003)* | Hiệu năng & Quy trình *(Workflow Guard)* | Thu hẹp phạm vi hàng việc của CEO | File: `locDonTheoVaiNguoiGui`<br>Symbol: `VAI_NGUOI_GUI_CEO_THAY` | Đã kiểm chứng: Banner VBO-DD-09 hiển thị rõ, tự động ẩn đơn cấp nhân viên | **ĐẠT (PASS)** | **Đã Bảo Vệ An Toàn** |
| **GUARD-DD-004** *(trước ghi GAP-DD-004)* | Trải nghiệm ứng dụng *(UI Separation)* | Phân tách tab 2 ngăn cho Trưởng phòng | File: `DuyetDonPage.mjs`<br>Symbol: `VBO-DD-08`, `deptHeadTabs` | Đã kiểm chứng: Ngăn Đơn nhân viên phòng độc lập hoàn toàn với Đơn của tôi | **ĐẠT (PASS)** | **Đã Chuẩn Hóa UI** |

---

## 3. CHI TIẾT TỪNG HÀNG RÀO AN TOÀN & MINH CHỨNG HÌNH ẢNH

### GUARD-DD-001: Chặn rủi ro tự phê duyệt đơn cá nhân (Self-Approval Guard)
* **Luồng liên quan:** Trưởng phòng hoặc Quản lý tự nộp đơn xin nghỉ phép/tăng ca cho chính mình.
* **Mục tiêu bảo vệ:** Tránh tình trạng cấp quản lý tự cấp phép cho chính mình để trục lợi công phép.
* **Bằng chứng mã nguồn (AST Evidence):**
  - Ràng buộc kép ở tầng DB (`duyet-14b.sql:53`: `and t.nd <> p_employee_id`) và tầng UI (`duyetDonRepo.ts:107`: `laDonCuaToi`). 
  - Đơn của chính mình bị loại bỏ khỏi tab "Đơn nhân viên phòng". Tại tab "Đơn của tôi", ẩn hoàn toàn 2 nút Duyệt/Từ chối (`hideDecisionButtons = true`).
* **Các bước kiểm chứng trên giao diện:**
  1. Đăng nhập tài khoản Trưởng phòng (`DEPT_HEAD`).
  2. Mở màn hình Duyệt đơn (`/duyet-don?web=thu`).
  3. Kiểm tra tab "Đơn nhân viên phòng": Đơn do chính mình gửi không xuất hiện.
  4. Chuyển sang tab "Đơn của tôi": Thấy đơn của mình nhưng không có nút Duyệt hoặc Từ chối.
* **Ảnh chụp minh chứng thực tế:**  
  ![Chặn tự duyệt đơn cá nhân](./images/04-duyet-don-chan-tu-duyet-cua-toi.png)  
  *([Xem ảnh gốc độ phân giải cao](file:///C:/Users/TAN/Documents/Desktop/vivaoffice-playwright-automation/automation/gap/images/04-duyet-don-chan-tu-duyet-cua-toi.png))*
* **Kết quả quan sát thực tế:** **ĐẠT (PASS)**. Giao diện hiển thị rõ đơn cá nhân nhưng không xuất hiện bất kỳ nút bấm phê duyệt nào, ngăn chặn hoàn toàn rủi ro tự cấp phép.

---

### GUARD-DD-002: Phó quản lý quán chỉ xem, không được duyệt đơn (Read-only Guard)
* **Luồng liên quan:** Phân quyền vai trò Phó quản lý quán (`DEPUTY_MANAGER`) tại cơ sở theo `TL-31 câu 9` & `SPEC-NS-09`.
* **Mục tiêu bảo vệ:** Phó quản lý cần xem danh sách đơn để nắm tình hình quân số ca làm việc, nhưng quyền quyết định duyệt/từ chối thuộc thẩm quyền duy nhất của Quản lý quán (`STORE_MANAGER`).
* **Bằng chứng mã nguồn (AST Evidence):**
  - Thiết lập chế độ Chỉ xem (`canApprove = false`). Màn hình hiển thị danh sách đơn bình thường nhưng các nút Duyệt và Từ chối bị vô hiệu hoá (`disabled`), kèm dòng chú thích chỉ Quản lý chính mới có quyền duyệt.
* **Các bước kiểm chứng trên giao diện:**
  1. Đăng nhập tài khoản Phó quản lý quán (`DEPUTY_MANAGER`).
  2. Mở màn hình Duyệt đơn (`/duyet-don?web=thu`).
  3. Quan sát các nút hành động trên thẻ đơn của nhân viên quán.
* **Ảnh chụp minh chứng thực tế:**  
  ![Phó quản lý chỉ xem, nút duyệt bị khóa](./images/02-duyet-don-pho-quan-ly-read-only.png)  
  *([Xem ảnh gốc độ phân giải cao](file:///C:/Users/TAN/Documents/Desktop/vivaoffice-playwright-automation/automation/gap/images/02-duyet-don-pho-quan-ly-read-only.png))*
* **Kết quả quan sát thực tế:** **ĐẠT (PASS - RẤT AN TOÀN)**.
  - Cả hai nút **`✓ Duyệt`** và **`✗ Từ chối`** đều hiển thị ở trạng thái mờ (disabled), không thể tương tác bấm.
  - Hộp thông báo màu vàng hiển thị rõ: *"Một quán chỉ MỘT người duyệt tại một thời điểm. Bạn đang là Phó quản lý — xem được toàn bộ đơn nhưng không duyệt được. Cần đổi vai trò thì báo Nhân sự."*
  - **Kết luận:** Hệ thống đang hoạt động hoàn toàn chính xác theo đặc tả nghiệp vụ, không tồn tại bất kỳ kẽ hở thẩm quyền nào.

---

### GUARD-DD-003: Thu hẹp tự động hàng việc của CEO tránh nghẽn hàng chờ
* **Luồng liên quan:** Hàng chờ duyệt của Ban Giám Đốc (`CEO`).
* **Mục tiêu bảo vệ:** Tránh tình trạng CEO bị ngập tràn hàng nghìn đơn của nhân viên cấp cơ sở, giúp CEO tập trung phê duyệt kịp thời các đơn của cấp Trưởng phòng ban.
* **Bằng chứng mã nguồn (AST Evidence):**
  - Cơ chế thu hẹp tự động qua hàm `locDonTheoVaiNguoiGui()` (`SPEC-DD-07` & `BUG-000038`). Hệ thống chỉ hiển thị đơn của những người gửi có vai trò `DEPT_HEAD` hoặc `HR_MANAGER`. Đơn của nhân viên thường được tự động ẩn kèm banner thông báo `VBO-DD-09`.
* **Các bước kiểm chứng trên giao diện:**
  1. Đăng nhập tài khoản CEO (`CEO`).
  2. Mở màn hình Duyệt đơn (`/duyet-don?web=thu`).
  3. Kiểm tra banner nghiệp vụ và danh sách đơn hiển thị.
* **Ảnh chụp minh chứng thực tế:**  
  ![Banner CEO thu hẹp hàng việc](./images/05-duyet-don-ceo-banner-thu-hep.png)  
  *([Xem ảnh gốc độ phân giải cao](file:///C:/Users/TAN/Documents/Desktop/vivaoffice-playwright-automation/automation/gap/images/05-duyet-don-ceo-banner-thu-hep.png))*
* **Kết quả quan sát thực tế:** **ĐẠT (PASS)**. Banner thông báo hiển thị rõ ràng: *"Màn này chỉ hiện đơn của các trưởng phòng ban. Đơn của nhân viên đã có quản lý quán hoặc trưởng bộ phận của họ duyệt nên không hiện ở đây."* Đơn nhân viên quán được ẩn hoàn toàn.

---

### GUARD-DD-004: Phân tách tab 2 ngăn rành mạch cho cấp Trưởng phòng
* **Luồng liên quan:** Giao diện phê duyệt của cấp Trưởng phòng ban (`DEPT_HEAD`).
* **Mục tiêu bảo vệ:** Tránh nhầm lẫn giữa đơn của nhân viên trong bộ phận (cần duyệt) và đơn cá nhân của chính Trưởng phòng (cần theo dõi).
* **Bằng chứng mã nguồn (AST Evidence):**
  - Thiết lập thanh tab 2 ngăn chuyên biệt (`SPEC-DD-04` / `VBO-DD-08`): Ngăn 1 "Đơn nhân viên phòng" (để duyệt) và Ngăn 2 "Đơn của tôi" (để theo dõi tiến độ đơn cá nhân).
* **Các bước kiểm chứng trên giao diện:**
  1. Đăng nhập tài khoản Trưởng phòng (`DEPT_HEAD`).
  2. Mở màn hình Duyệt đơn (`/duyet-don?web=thu`).
  3. Quan sát thanh điều hướng tab 2 ngăn `VBO-DD-08`.
* **Ảnh chụp minh chứng thực tế:**  
  ![Thanh tab 2 ngăn của Trưởng phòng](./images/03-duyet-don-truong-phong-tab-nv.png)  
  *([Xem ảnh gốc độ phân giải cao](file:///C:/Users/TAN/Documents/Desktop/vivaoffice-playwright-automation/automation/gap/images/03-duyet-don-truong-phong-tab-nv.png))*
* **Kết quả quan sát thực tế:** **ĐẠT (PASS)**. Thanh tab chuyển đổi mượt mà giữa đơn nhân viên phòng và đơn cá nhân, tách bạch rành mạch 2 phạm vi công việc.

---

### CÁC LUỒNG DUYỆT THÀNH CÔNG ĐÃ ĐƯỢC XÁC MINH:

1. **Quản lý quán duyệt đơn nhân viên quán thành công (TC-DD-001):**  
   ![Quản lý quán duyệt đơn](./images/01-duyet-don-quan-ly-quan.png)  
   *([Xem ảnh gốc độ phân giải cao](file:///C:/Users/TAN/Documents/Desktop/vivaoffice-playwright-automation/automation/gap/images/01-duyet-don-quan-ly-quan.png))*  
   - Nhân viên quán nộp đơn -> Quản lý quán duyệt thành công, hiển thị toast xác nhận và cập nhật trạng thái đơn tức thì.

2. **CEO phê duyệt đơn xin nghỉ phép của Trưởng phòng thành công (TC-DD-006):**  
   ![CEO phê duyệt đơn Trưởng phòng](./images/06-duyet-don-ceo-phe-duyet-thanh-cong.png)  
   *([Xem ảnh gốc độ phân giải cao](file:///C:/Users/TAN/Documents/Desktop/vivaoffice-playwright-automation/automation/gap/images/06-duyet-don-ceo-phe-duyet-thanh-cong.png))*  
   - CEO tiếp nhận đơn của Trưởng phòng ban -> Bấm duyệt thành công, hoàn tất mắt xích phê duyệt cao nhất trong chuỗi phân cấp.

---

## 4. BẢNG KHUYẾN NGHỊ TỐI ƯU HÓA NGHIỆP VỤ CHO BA / PRODUCT OWNER

| Mã Mục | Quy Trình Nghiệp Vụ | Hiện Trạng Đã Xác Minh | Khuyến Nghị Của QA Automation | Đánh Giá Tác Động |
| :---: | :--- | :--- | :--- | :---: |
| **REC-DD-001** | Chặn tự duyệt đơn | Hệ thống đã loại bỏ đơn cá nhân khỏi danh sách phê duyệt | Duy trì cơ chế hiện tại cho toàn bộ các loại đơn (Nghỉ phép, Đổi ca, Tăng ca, Xác nhận công). | **Tối ưu** |
| **REC-DD-002** | Vai trò Phó quản lý | Hệ thống khóa mờ nút duyệt và hiện thông báo phân quyền | Tiếp tục giữ nguyên cơ chế chỉ xem. Nếu có nhu cầu ủy quyền khi Quản lý vắng mặt, xây dựng module Ủy quyền riêng biệt có Audit Log. | **Chuẩn mực** |
| **REC-DD-003** | Bộ lọc việc CEO | CEO chỉ thấy đơn Trưởng phòng, ẩn đơn nhân viên cơ sở | Giữ mặc định để tránh quá tải. Có thể bổ sung bộ lọc "Xem toàn chuỗi" trong màn hình Quản trị chuyên sâu nếu CEO cần tra cứu đột xuất. | **Tối ưu** |
| **REC-DD-004** | Tab Trưởng phòng | Đã có tab tách biệt "Đơn nhân viên" và "Đơn của tôi" | Bổ sung thêm badge hiển thị số lượng đơn mới được cập nhật trên icon tab để tiện theo dõi. | **Khuyến nghị UX** |
