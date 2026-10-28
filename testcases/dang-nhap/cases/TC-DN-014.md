# TC-DN-014: Kiểm tra điều hướng tiếp tục sau đăng nhập an toàn và chống vòng lặp (Deep Link ?tiep-tuc=)

> **Phân hệ**: Đăng Nhập  
> **Mã kịch bản**: `TC-DN-014`  
> **Độ nghiêm trọng (Severity)**: `Sai`  
> **Tự động hóa (Automation Ready)**: `SPEC-AU-105 / SPEC-AU-108 / SPEC-AU-110 / dichQuayLai.ts`  
> **Tham chiếu đặc tả (Spec Reference)**: `Chống lỗ hổng Open Redirect và lỗi lặp vô tận màn đăng nhập.`  
> **Trạng thái thực thi**: **Passed 100%**  

---

## 1. Điều Kiện Tiên Quyết (Preconditions)

Truy cập URL đăng nhập có chứa deep link hợp lệ: /dang-nhap?web=thu&tiep-tuc=%2Fcham-cong.

## 2. Dữ Liệu Kiểm Thử (Test Data)

Tham số ?tiep-tuc=/cham-cong

## 3. Các Bước Thực Hiện (Test Steps)

- [ ] Nhập thông tin đăng nhập hợp lệ và submit
- [ ] 2. Kiểm tra URL sau khi hoàn tất đăng nhập
- [ ] 3. Thử trường hợp ?tiep-tuc=/dang-nhap hoặc URL ngoài miền

## 4. Kết Quả Mong Đợi (Expected Results)

- [x] Với deep link hợp lệ: hệ thống điều hướng thẳng đến /cham-cong. Với link trỏ về chính màn xác thực (KHONG_LAM_DICH) hoặc link ngoài miền: hệ thống tự động bẻ hướng an toàn về /trang-chu.

## 5. Ghi Chú & Lưu Ý

Pending
