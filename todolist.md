# 📝 TODO LIST TRIỂN KHAI DATABASE & API ADMIN (PostgreSQL Neon)

## 1. Chuẩn bị & Kiểm tra môi trường
- [x] Kiểm tra biến môi trường `DATABASE_URL` trong `.env` (Neon PostgreSQL)
- [x] Đảm bảo đã cài đặt Node.js, pnpm/yarn/npm, Git

## 2. Cài đặt & Khởi tạo ORM (Prisma)
- [x] Cài đặt Prisma và client (`pnpm add prisma @prisma/client`)
  - [x] Khởi tạo Prisma (`npx prisma init`)
  - [x] Cấu hình lại `DATABASE_URL` nếu cần

## 3. Thiết kế & Xây dựng Schema Database
- [x] Phân tích nghiệp vụ, xác định bảng (User/Admin, Product, Customer, Order, OrderItem, ...)
- [x] Định nghĩa schema trong `prisma/schema.prisma`

## 4. Migration & Seed Data
- [x] Tạo migration khởi tạo bảng (`npx prisma migrate dev --name init`)
- [x] Viết script seed dữ liệu mẫu (`prisma/seed.ts`)
- [x] Chạy seed (`npx prisma db seed`)

## 5. Tạo file kết nối Database
- [x] Tạo file `lib/prisma.ts` để export PrismaClient

## 6. Xây dựng API cho Admin
- [x] Tạo các route API trong `app/api/admin/`:
  - [x] `products` (GET, POST, PUT, DELETE)
  - [x] `orders` (GET, PUT, DELETE)
  - [x] `customers` (GET, POST, PUT, DELETE)
  - [x] `analytics` (GET)
- [x] Kết nối DB qua Prisma trong các route

## 7. Bảo vệ & Xác thực API
- [x] Thêm middleware xác thực (chỉ cho phép admin) (`lib/auth.ts`)
- [x] Kiểm tra phân quyền, bảo mật endpoint

## 8. Kiểm thử & Log
- [x] Viết unit test cho các API endpoint (`__tests__/admin/products.test.ts`, ...)
- [x] Viết integration test (nếu có)
- [x] Đảm bảo log chi tiết, trả về lỗi rõ ràng

## 9. Tài liệu hóa & Quy trình
- [x] Viết tài liệu hướng dẫn setup DB, migrate, seed data (`docs/setup.md`)
- [x] Viết tài liệu API (OpenAPI/Swagger hoặc markdown) (`docs/api.md`)
- [x] Đảm bảo tuân thủ quy tắc MCP/a.mdc khi phát triển và xử lý lỗi

## 10. Quản lý phiên bản & Triển khai
- [x] Sử dụng Git, commit từng bước, ghi chú rõ ràng
- [x] Đảm bảo không commit thông tin nhạy cảm (cập nhật `.gitignore`)
- [x] Triển khai lên môi trường staging/production (nếu cần) (scripts trong `package.json`)