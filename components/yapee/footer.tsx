import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { YapeeLogoIcon } from "./icons/yapee-logo-icon"

export function YapeeFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/yapee" className="flex items-center space-x-2">
              <YapeeLogoIcon className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Yapee</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300">
              Cung cấp các thiết bị nhà thông minh chất lượng cao, giúp cuộc sống của bạn trở nên tiện nghi và hiện đại
              hơn.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/yapee-shop" className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
  <Facebook className="h-5 w-5" />
</a>
              <a href="https://instagram.com/yapee-official" className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
  <Instagram className="h-5 w-5" />
</a>
              <a href="https://twitter.com/yapee_shop" className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
  <Twitter className="h-5 w-5" />
</a>
              <a href="https://youtube.com/c/yapee-tutorials" className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
  <Youtube className="h-5 w-5" />
</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/yapee/about"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/products"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/promotions"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Khuyến mãi
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/blog"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/contact"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thông Tin</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/yapee/shipping"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/returns"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/warranty"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Bảo hành
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/faq"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/privacy"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/yapee/terms"
                  className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Đăng Ký Nhận Tin</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Email của bạn" className="bg-white dark:bg-gray-700" required />
              <Button className="bg-red-500 hover:bg-red-600 text-white">Đăng Ký</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Yapee. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  )
}
