# 📝 TODO LIST TRIỂN KHAI WEB-CLIENT (Theo MCP)

## 1. Kiểm tra & hoàn thiện các module chính
- [ ] Rà soát, hoàn thiện giao diện và logic trang Sản phẩm (products)
- [ ] Kiểm tra, tối ưu trang Danh mục (categories), filter, phân trang
- [ ] Hoàn thiện chức năng Giỏ hàng (cart): thêm/xóa/sửa, đồng bộ backend
- [ ] Kiểm tra, hoàn thiện trang Wishlist: thêm/xóa, đồng bộ backend
- [ ] Kiểm tra, hoàn thiện trang Blog: danh sách, chi tiết bài viết
- [ ] Kiểm tra, hoàn thiện trang Tìm kiếm (search): UX, tốc độ, kết quả
- [ ] Kiểm tra, hoàn thiện trang About, Contact: form gửi thông tin, validate

## 2. Luồng đặt hàng & tài khoản
- [ ] Kiểm tra, hoàn thiện luồng Đặt hàng (checkout): xác thực, lưu đơn hàng
- [ ] Kiểm tra, hoàn thiện trang Tài khoản (account): đăng ký, đăng nhập, đổi mật khẩu, cập nhật thông tin
- [ ] Đảm bảo xác thực người dùng (JWT/session), bảo vệ route nhạy cảm

## 3. Tối ưu gọi API & xử lý dữ liệu
- [ ] Đảm bảo mọi thao tác lấy/gửi dữ liệu đều qua API backend
- [ ] Bổ sung validate dữ liệu đầu vào (form, API)
- [ ] Xử lý lỗi, loading, thông báo rõ ràng cho người dùng
- [ ] Tối ưu hiệu năng: lazy load, SSR/SSG, caching nếu cần

## 4. Kiểm thử & log
- [ ] Viết unit test cho các component chính (nếu chưa có)
- [ ] Viết integration test cho luồng chính (đặt hàng, đăng nhập, v.v.)
- [ ] Bổ sung log frontend (console, gửi log lỗi về server nếu cần)
- [ ] Kiểm thử hồi quy sau mỗi lần cập nhật lớn

## 5. Giao diện & trải nghiệm người dùng
- [ ] Đảm bảo responsive trên mọi thiết bị (mobile, tablet, desktop)
- [ ] Kiểm tra, tối ưu UX/UI: màu sắc, font, spacing, button, feedback
- [ ] Kiểm tra accessibility (WCAG): tab, focus, alt text, v.v.

## 6. Cấu hình & bảo mật
- [ ] Đảm bảo không lộ thông tin nhạy cảm (API key, token, .env)
- [ ] Kiểm tra cấu hình build, tối ưu bundle size
- [ ] Đảm bảo các route nhạy cảm chỉ cho phép user hợp lệ truy cập

## 7. Tài liệu hóa & quy trình
- [ ] Bổ sung tài liệu hướng dẫn sử dụng cho người dùng cuối
- [ ] Bổ sung tài liệu phát triển (README, cấu trúc code, quy ước)
- [ ] Ghi chú rõ ràng mọi thay đổi, commit nhỏ, tuân thủ coding convention
- [ ] Sử dụng git branch cho từng tính năng/bugfix, review code trước khi merge

## 8. Kiểm tra tích hợp với backend & database
- [ ] Đảm bảo mọi API call hoạt động đúng với backend (CRUD, xác thực, phân quyền)
- [ ] Kiểm tra đồng bộ dữ liệu với PostgreSQL Neon (test trên môi trường staging/dev)
- [ ] Kiểm tra log backend khi thao tác từ web-client 