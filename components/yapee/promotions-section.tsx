import { Button } from "@/components/ui/button"

export function PromotionsSection() {
  return (
    <section id="promotions" className="py-12 md:py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Ưu Đãi Đặc Biệt</h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Promotion Card 1 */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-6 md:p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Giảm 20% Cho Đơn Hàng Đầu Tiên</h3>
              <p className="mb-6 opacity-90">
                Đăng ký tài khoản mới và nhận ngay ưu đãi 20% cho đơn hàng đầu tiên của bạn. Áp dụng cho tất cả sản
                phẩm.
              </p>
              <Button className="bg-white text-red-600 hover:bg-gray-100">Đăng Ký Ngay</Button>
            </div>
          </div>

          {/* Promotion Card 2 */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-6 md:p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Combo Nhà Thông Minh</h3>
              <p className="mb-6 opacity-90">
                Tiết kiệm đến 30% khi mua combo thiết bị nhà thông minh. Bao gồm loa, đèn, và cảm biến an ninh.
              </p>
              <Button className="bg-white text-orange-600 hover:bg-gray-100">Xem Ngay</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
