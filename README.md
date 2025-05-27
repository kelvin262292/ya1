# Yapee E-commerce

## Giới thiệu

## Hướng dẫn Sử dụng
1. **Đăng ký/Đăng nhập**: Truy cập trang /login, nhập email và mật khẩu để đăng nhập (hoặc đăng ký nếu chưa có tài khoản).
2. **Thêm sản phẩm vào giỏ**: Truy cập trang sản phẩm, nhấn "Thêm vào giỏ hàng".
3. **Đặt hàng**: Truy cập giỏ hàng (/cart), nhấn "Tiến hành đặt hàng" và điền thông tin giao hàng.

## Quy ước Coding
- **Component**: Sử dụng PascalCase (ví dụ: `ProductCard.tsx`).
- **Biến/Function**: Sử dụng camelCase (ví dụ: `handleClick`).
- **Comment**: Sử dụng JSDoc cho các hàm quan trọng (ví dụ: `/** Lấy danh sách sản phẩm */`).

## Cấu trúc Dự Án
Yapee E-commerce là một ứng dụng thương mại điện tử được xây dựng bằng Next.js, React, TypeScript, Tailwind CSS, và các thư viện hỗ trợ khác. Dự án này cung cấp giao diện người dùng thân thiện, dễ sử dụng và hiệu quả cho cả khách hàng và quản trị viên.

## Cấu trúc Dự Án
```
├── .gitattributes
├── .gitignore
├── app\
│   ├── admin\
│   │   ├── analytics\
│   │   ├── customers\
│   │   ├── layout.tsx
│   │   ├── orders\
│   │   ├── page.tsx
│   │   └── products\
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── yapee\
│       ├── layout.tsx
│       └── page.tsx
├── components.json
├── components\
│   ├── admin\
│   │   ├── chart-card.tsx
│   │   ├── icons\
│   │   ├── sidebar.tsx
│   │   └── stat-card.tsx
│   ├── theme-provider.tsx
│   ├── ui\
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── yapee\
│       ├── cart-provider.tsx
│       ├── category-nav.tsx
│       ├── footer.tsx
│       ├── header.tsx
│       ├── hero-section.tsx
│       ├── icons\
│       ├── product-card.tsx
│       ├── products-section.tsx
│       ├── promotions-section.tsx
│       ├── testimonial-card.tsx
│       ├── testimonial-section.tsx
│       └── toast.tsx
├── docs\
│   ├── admin.txt
│   └── yapê.txt
├── hooks\
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib\
│   ├── mock-data.ts
│   ├── types.ts
│   └── utils.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public\
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── styles\
│   └── globals.css
├── tailwind.config.ts
└── tsconfig.json
```

## Công nghệ Sử Dụng
- **Next.js**: Framework React cho ứng dụng web phía máy chủ.
- **React**: Thư viện JavaScript để xây dựng giao diện người dùng.
- **TypeScript**: Ngôn ngữ lập trình tĩnh dựa trên JavaScript.
- **Tailwind CSS**: Framework CSS để xây dựng giao diện nhanh chóng và linh hoạt.
- **Recharts**: Thư viện biểu đồ dựa trên React.
- **Shadcn UI**: Bộ sưu tập các thành phần UI tái sử dụng.
- **Radix UI**: Bộ sưu tập các thành phần UI không giao diện.
- **Class Variance Authority**: Thư viện quản lý biến thể CSS.
- **Next Themes**: Thư viện quản lý chủ đề sáng/tối.

## Cấu Hình Dự Án
- **.gitattributes**: Cấu hình Git để tự động phát hiện tệp văn bản và chuẩn hóa ký tự xuống dòng (LF).
- **.gitignore**: Liệt kê các tệp và thư mục bị bỏ qua bởi Git.
- **components.json**: Cấu hình cho Shadcn UI, định nghĩa kiểu dáng, sử dụng RSC, TSX, cấu hình Tailwind CSS và các bí danh đường dẫn.
- **next.config.mjs**: Cấu hình Next.js, bỏ qua lỗi ESLint và TypeScript trong quá trình build, và tắt tối ưu hóa hình ảnh.
- **package.json**: Liệt kê các script dự án (`dev`, `build`, `start`, `lint`) và tất cả các dependencies và devDependencies.
- **pnpm-lock.yaml**: Tệp khóa của pnpm, chỉ ra phiên bản `lockfileVersion` và cài đặt `autoInstallPeers`.
- **postcss.config.mjs**: Cấu hình PostCSS, chỉ định sử dụng plugin `tailwindcss`.
- **tailwind.config.ts**: Cấu hình Tailwind CSS, bao gồm chế độ tối, đường dẫn nội dung, tiền tố, chủ đề mở rộng với các màu sắc tùy chỉnh, bo góc, keyframes và animation cho accordion.
- **tsconfig.json**: Cấu hình TypeScript, định nghĩa các thư viện, tùy chọn biên dịch, plugin Next.js và ánh xạ đường dẫn.
- **.env**: Cấu hình biến môi trường, bao gồm thông tin kết nối đến cơ sở dữ liệu Neon với biến `DATABASE_URL`.

## Thành Phần Chính
- **app/admin/page.tsx**: Định nghĩa trang quản trị với các thẻ thống kê (`StatCard`) và biểu đồ (`ChartCard`) sử dụng Recharts để hiển thị dữ liệu hoạt động người dùng, doanh thu, sử dụng thiết bị và phễu chuyển đổi.
- **app/yapee/page.tsx**: Định nghĩa trang chính của Yapee, tích hợp các thành phần như `HeroSection`, `CategoryNav`, `ProductsSection`, `PromotionsSection`, và `TestimonialSection`.
- **components/theme-provider.tsx**: Cung cấp `ThemeProvider` sử dụng `next-themes` để quản lý chủ đề (sáng/tối) cho ứng dụng.
- **components/ui/button.tsx**: Định nghĩa thành phần `Button` với các biến thể và kích thước khác nhau sử dụng `class-variance-authority` và `radix-ui/react-slot`.
- **components/yapee/header.tsx**: Định nghĩa thành phần `YapeeHeader` với chức năng điều hướng, chuyển đổi chủ đề, quản lý trạng thái đăng nhập, hiển thị giỏ hàng và menu di động.
- **components/admin/sidebar.tsx**: Triển khai thanh điều hướng bên (sidebar) cho trang quản trị, bao gồm các liên kết đến Dashboard, Products, Orders, Customers, và Analytics, cùng với chức năng thu gọn/mở rộng.
- **components/yapee/footer.tsx**: Định nghĩa thành phần chân trang (footer) cho trang Yapee, bao gồm thông tin công ty, liên kết nhanh, thông tin hỗ trợ và phần đăng ký nhận tin.

## Tài Liệu
- **docs/admin.txt**: Tài liệu chi tiết về giao diện Admin Dashboard, bao gồm kiến trúc, các thành phần, luồng dữ liệu, triết lý thiết kế, và hướng dẫn phát triển và bảo trì.
- **docs/yapê.txt**: Mô tả giao diện website thương mại điện tử Yapee, bao gồm giới thiệu chung, tính năng chính, công nghệ sử dụng, styling và theme, bố cục layout và hiệu ứng, cấu trúc thư mục, hướng dẫn cài đặt và chạy dự án, các thành phần nổi bật, điều hướng, quản lý trạng thái và context, dữ liệu, và hướng phát triển tiếp theo.

## Hướng Dẫn Cài Đặt và Chạy Dự Án
1. **Cài đặt các phụ thuộc:**
   ```bash
   pnpm install
   ```
2. **Chạy dự án trong chế độ phát triển:**
   ```bash
   pnpm dev
   ```
3. **Xây dựng dự án:**
   ```bash
   pnpm build
   ```
4. **Chạy dự án đã xây dựng:**
   ```bash
   p00m start
   ```

## Kiểm Thử
- **Kiểm thử đơn vị:** Sử dụng Jest và React Testing Library.
- **Kiểm thử tích hợp:** Sử dụng Cypress.

## Đóng Góp
Chúng tôi rất chào đón đóng góp từ cộng đồng. Vui lòng xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm thông tin.

## Giấy Phép
Dự án này được cấp phép dưới [MIT License](LICENSE).