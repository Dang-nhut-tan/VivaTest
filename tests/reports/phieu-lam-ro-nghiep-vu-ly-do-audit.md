# PHIẾU LÀM RÕ YÊU CẦU NGHIỆP VỤ (BUSINESS CLARIFICATION REQUEST)

**Mã phiếu:** `BCR-VBO-2026-10-01`  
**Ngày lập:** 21/10/2026  
**Người gửi:** Đội ngũ Kiểm thử & Đảm bảo chất lượng (QA/QC)  
**Người nhận đề nghị:** Business Analyst (BA) / Product Owner (PO) VivaOffice  
**Chủ đề:** Làm rõ tính nhất quán của cơ chế "Bắt buộc nhập lý do" và màn hình tra cứu lịch sử (Audit Trail) trên hệ thống

---

## 1. BỐI CẢNH & VẤN ĐỀ ĐẶT RA (CONTEXT)

Hệ thống VivaOffice đang áp dụng cơ chế kiểm soát trách nhiệm giải trình (Accountability) bằng cách yêu cầu người dùng (Nhân sự, Quản lý, Giám sát) **bắt buộc phải nhập lý do** khi thực hiện các hành động trọng yếu (chặn nút Lưu, kiểm tra độ dài tối thiểu 3–5 ký tự, tối đa 500 ký tự).

Tuy nhiên, qua quá trình kiểm thử và đối soát mã nguồn thực tế, đội QA phát hiện có sự **BẤT ĐỒNG BỘ NGHIỆP VỤ NGHIÊM TRỌNG** giữa các tính năng:
- **Nhóm A (Đã hoàn thiện luồng):** Người dùng nhập lý do -> Hệ thống lưu trữ -> **Có màn hình/cột để xem lại**.  
  *Ví dụ tiêu biểu:* Màn hình *Yêu cầu đặt lại mật khẩu* (`#/yeu-cau-mat-khau`) có khối "Lịch sử — 50 yêu cầu đã duyệt/từ chối" hiển thị rõ cột *Người quyết*, *Thời gian*, *Lý do*; Màn hình *Xem bảng công* có Tooltip xem lý do sửa công; Hồ sơ nhân sự có thẻ mở rộng xem lịch sử bật/tắt miễn GPS/ảnh.
- **Nhóm B (Rơi vào "hố đen dữ liệu" — Write-only):** **9 nghiệp vụ** ép người dùng phải nhập lý do thì mới cho thực hiện, nhưng sau khi bấm xác nhận thì **LÝ DO BIẾN MẤT HOÀN TOÀN TRÊN GIAO DIỆN**. Người dùng hoặc cấp trên không thể tìm thấy bất kỳ chỗ nào để đọc lại lý do này.

> [!IMPORTANT]
> **Nguyên tắc trải nghiệm & kiểm toán (Audit Trail Principle):**  
> *"Nếu một lý do bắt buộc người dùng phải suy nghĩ và gõ vào hệ thống, lý do đó phải có giá trị tra cứu về sau. Ngược lại, nếu lý do không bao giờ được đọc lại trên giao diện, việc bắt buộc nhập đang gây ức chế và làm tăng thao tác thừa (friction) cho nhân sự."*

---

## 2. CHI TIẾT 9 NGHIỆP VỤ CẦN LÀM RÕ VỚI BA

### ❓ VẤN ĐỀ 1: Cho nhân sự nghỉ việc — Lý do nghỉ việc đi đâu?
* **Hiện trạng hệ thống:**
  - Khi HR bấm "Cho nghỉ việc" tại `#/nhan-su`, hộp thoại bắt buộc HR phải nhập ô **Lý do nghỉ việc** (tối đa 500 ký tự), nếu để trống thì nút Xác nhận bị vô hiệu hóa (`disabled`).
  - Tuy nhiên, trong Cơ sở dữ liệu, bảng `employee` **hoàn toàn không có cột lưu lý do nghỉ việc** (`resigned_reason`). Hệ thống chỉ gán biến tạm và đổi trạng thái sang `resigned` kèm ngày nghỉ `resigned_on`.
  - Trên màn hình Hồ sơ nhân sự (`#/nhan-su/:id/chinh-sua`), hệ thống chỉ hiển thị dòng *"Ngày nghỉ việc: DD/MM/YYYY"*, **không có bất kỳ vị trí nào xem lại lý do nghỉ việc**.
* **Hệ quả nghiệp vụ:** Sau này khi xảy ra khiếu nại lao động hoặc HR khác tiếp quản hồ sơ, không ai biết nhân sự này nghỉ việc vì lý do gì (tự xin nghỉ, sa thải, hết hạn hợp đồng, vi phạm kỷ luật).
* **👉 CÂU HỎI CHO BA:**
  1. Nghiệp vụ có yêu cầu **lưu trữ và hiển thị lý do nghỉ việc** trên hồ sơ nhân sự (dạng chỉ đọc) không?
  2. Nếu có, BA đề xuất hiển thị ở đâu: Trong tab *Thông tin chung*, tab *Công việc*, hay popup *Chi tiết nhân sự*?
  3. Nếu không cần xem lại, có nên bỏ ràng buộc bắt buộc nhập lý do để giảm bớt thao tác cho HR không?

---

### ❓ VẤN ĐỀ 2: Vòng đời nhân sự — Bỏ quên cột Lý do trong Lịch sử phân công
* **Hiện trạng hệ thống:**
  - Tại màn hình *Vòng đời nhân sự* (`#/vong-doi-nhan-su`), khi HR thực hiện **"Luân chuyển nơi làm việc"**, hệ thống bắt buộc nhập lý do (`!lyDo.trim()`).
  - Giao diện đã có sẵn nút và popup **"Lịch sử phân công"** (`AssignmentHistoryDialog.tsx`), nhưng bảng này chỉ thiết kế 5 cột: `['Nơi làm việc', 'Quản lý trực tiếp', 'Từ ngày', 'Đến ngày', 'Trạng thái']` — **hoàn toàn bỏ quên cột Lý do luân chuyển**.
  - Tương tự, thao tác **"Chuyển sang chính thức"** cũng bắt buộc nhập lý do, nhưng màn hình này không có bất kỳ bảng lịch sử nào ghi nhận các lần chuyển chính thức.
* **👉 CÂU HỎI CHO BA:**
  1. Có bổ sung thêm cột **"Lý do luân chuyển"** vào bảng *Lịch sử phân công* (`AssignmentHistoryDialog`) để HR theo dõi vì sao nhân sự được điều chuyển công tác không?
  2. Thao tác *Chuyển sang chính thức*: Lý do này có cần được lưu vết và hiển thị ở đâu trong hồ sơ nhân sự không?

---

### ❓ VẤN ĐỀ 3: Mở khóa tài khoản đăng nhập — Mở xong biến mất không dấu vết
* **Hiện trạng hệ thống:**
  - Tại màn hình *Tài khoản bị khoá* (`#/tai-khoan-bi-khoa`), khi bấm "Mở khoá", hệ thống hiện modal bắt buộc nhập: *"Lý do mở khoá (bắt buộc, tối thiểu 3 ký tự)"*.
  - Tuy nhiên, màn hình này chỉ hiển thị danh sách các tài khoản *đang bị khoá*. Sau khi HR mở khóa xong, dòng đó biến mất khỏi bảng.
  - Trong DB có bảng `login_lock_audit` ghi nhận lại ai mở, lúc nào, lý do gì, nhưng bảng này là **bảng mồ côi (unused)** — không có bất kỳ màn hình nào đọc ra.
* **👉 CÂU HỎI CHO BA:**
  - BA có muốn bổ sung khối **"Lịch sử mở khoá tài khoản"** đặt ngay phía dưới bảng tài khoản bị khóa (tương tự thiết kế của màn hình *Yêu cầu đặt lại mật khẩu* `#/yeu-cau-mat-khau`) để Trưởng phòng Nhân sự và Admin kiểm tra trách nhiệm khi mở khóa nhầm/mở khóa trái phép không?

---

### ❓ VẤN ĐỀ 4: Khóa & Mở khóa kỳ công — Thiếu sổ vết kiểm toán kỳ công
* **Hiện trạng hệ thống:**
  - Tại màn hình *Quản lý kỳ công* (`#/tien-luong`), thao tác **"Khoá kỳ công"** và **"Mở khoá kỳ công"** đều có ô nhập lý do bắt buộc (`canTroKhoaKy`, `canTroMoKhoaKy`).
  - Sau khi khóa, hệ thống chỉ hiển thị một câu thông báo ngắn: *"Kỳ này đang khoá từ [ngày]. Bảng công trong kỳ không sửa được."*
  - Hoàn toàn không hiển thị: **Ai là người khóa/mở khóa? Thao tác vào lúc nào? Lý do mở khóa là gì?**
  - Trong CSDL có bảng `payroll_period_audit` nhưng không hề có giao diện đọc.
* **Hệ quả nghiệp vụ:** Khóa kỳ công là chốt số tiền lương của hàng trăm nhân viên. Nếu một kỳ công bị ai đó mở khóa ra để sửa bảng công rồi khóa lại, các cấp quản lý và kế toán không thể biết ai đã mở và vì lý do gì nếu không can thiệp truy vấn SQL trực tiếp vào máy chủ.
* **👉 CÂU HỎI CHO BA:**
  - Nghiệp vụ có cần bổ sung một bảng **"Nhật ký đóng/mở kỳ công"** (Audit Log) ngay dưới thẻ Khoá kỳ để hiển thị: `[Thời gian] | [Hành động: Khóa / Mở] | [Người thực hiện] | [Lý do]` hay không?

---

### ❓ VẤN ĐỀ 5: Chốt công hàng loạt & Xử lý tăng ca
* **Hiện trạng hệ thống:**
  - Tại màn hình *Theo dõi chấm công* (`#/theo-doi-cham-cong`), nút **"Chốt công hàng loạt"** mở popup yêu cầu nhập lý do bắt buộc. Lý do này được ghi vào bảng CSDL `hr_edit_audit`, nhưng Frontend không có trang nào đọc bảng `hr_edit_audit`.
  - Tại màn hình *Việc tăng ca cần xử lý* (`TangCaCanXuLy.tsx`), bấm "Đã xử lý" bắt buộc nhập lý do (`Lý do xử lý (bắt buộc)`). Sau khi lưu, việc biến mất khỏi danh sách và không có nơi nào lưu trữ danh sách các việc đã xử lý.
* **👉 CÂU HỎI CHO BA:**
  - Đối với các thao tác chốt công và xử lý tăng ca theo lô, BA kỳ vọng người dùng xem lại lịch sử các đợt chốt công ở đâu? Hay nghiệp vụ chỉ coi lý do này là dữ liệu lưu trữ kỹ thuật dự phòng (Technical Log)?

---

## 3. TỔNG HỢP CÁC PHƯƠNG ÁN ĐỀ XUẤT (PROPOSED SOLUTIONS)

Đội Kiểm thử đề xuất 2 hướng chuẩn hóa nghiệp vụ để BA xem xét và lựa chọn:

### 🔹 Hướng 1: Chuẩn hóa theo hướng "Minh bạch dữ liệu & Đầy đủ vết kiểm toán" (Khuyên dùng)
- **Giải pháp:** Bổ sung giao diện xem lại lý do cho 9 nghiệp vụ trên:
  1. Thêm trường `Lý do nghỉ việc` (chỉ đọc) trên hồ sơ nhân sự đã nghỉ việc.
  2. Bổ sung cột `Lý do` vào popup *Lịch sử phân công* (`AssignmentHistoryDialog`).
  3. Thêm bảng *Lịch sử mở khoá* trên màn hình `#/tai-khoan-bi-khoa` (tương tự màn Đặt lại mật khẩu).
  4. Thêm bảng *Lịch sử khóa/mở kỳ* trên màn hình Quản trị kỳ công.
- **Ưu điểm:** Đảm bảo tính minh bạch, hỗ trợ tối đa cho kiểm toán nội bộ, tra cứu tranh chấp lương và nhân sự.

### 🔹 Hướng 2: Giản lược hóa thao tác (Lean Workflow)
- **Giải pháp:** Nếu BA xác định các hành động nội bộ như *Chuyển chính thức*, *Mở khóa lịch*, *Xử lý tăng ca* không cần kiểm soát lý do:
  - Chuyển ô `Lý do` từ **Bắt buộc** sang **Tùy chọn (Optional)** hoặc **Loại bỏ hẳn ô nhập lý do**.
- **Ưu điểm:** Giảm bớt số lần click chuột và thời gian gõ phím vô nghĩa cho nhân sự hàng ngày.

---

*Kính đề nghị Bộ phận Phân tích nghiệp vụ (BA) và Product Owner xem xét phản hồi từng câu hỏi để đội ngũ triển khai theo đúng chuẩn mực nghiệp vụ mong muốn.*

