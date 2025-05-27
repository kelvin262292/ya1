'use client'

import { FileText, Scale, ShoppingCart, Truck, RotateCcw, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Điều khoản Sử dụng</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Các điều khoản và điều kiện sử dụng dịch vụ của Yapee
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Scale className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Tuân thủ Pháp luật</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Theo quy định pháp luật Việt Nam về thương mại điện tử
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingCart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Mua sắm An toàn</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quy trình đặt hàng và thanh toán bảo mật
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Minh bạch</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Điều khoản rõ ràng, dễ hiểu và công bằng
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Giới thiệu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Chào mừng bạn đến với Yapee! Các Điều khoản Sử dụng này ("Điều khoản") điều chỉnh việc 
                truy cập và sử dụng website thương mại điện tử Yapee và các dịch vụ liên quan.
              </p>
              <p>
                Bằng việc truy cập, đăng ký tài khoản hoặc sử dụng bất kỳ dịch vụ nào của Yapee, 
                bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản này.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Lưu ý quan trọng:</strong> Vui lòng đọc kỹ các Điều khoản này trước khi sử dụng dịch vụ. 
                  Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng website của chúng tôi.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Quy trình Đặt hàng và Thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline">1</Badge>
                  Đặt hàng
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                  <li>Khách hàng chọn sản phẩm và thêm vào giỏ hàng</li>
                  <li>Điền đầy đủ thông tin giao hàng và liên hệ</li>
                  <li>Xác nhận đơn hàng và phương thức thanh toán</li>
                  <li>Yapee sẽ gửi email xác nhận đơn hàng trong vòng 24 giờ</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline">2</Badge>
                  Phương thức Thanh toán
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                  <li>Thanh toán khi nhận hàng (COD)</li>
                  <li>Chuyển khoản ngân hàng</li>
                  <li>Thanh toán online qua cổng thanh toán bảo mật</li>
                  <li>Ví điện tử (MoMo, ZaloPay, VNPay)</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="outline">3</Badge>
                  Xác nhận và Xử lý
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                  <li>Đơn hàng được xác nhận trong vòng 24 giờ làm việc</li>
                  <li>Yapee có quyền từ chối đơn hàng trong trường hợp bất khả kháng</li>
                  <li>Thông tin đơn hàng sẽ được gửi qua email và SMS</li>
                  <li>Khách hàng có thể theo dõi tình trạng đơn hàng trên website</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Chính sách Giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Thời gian giao hàng:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Nội thành TP.HCM:</strong> 1-2 ngày làm việc</li>
                    <li><strong>Các tỉnh thành khác:</strong> 2-5 ngày làm việc</li>
                    <li><strong>Vùng sâu, vùng xa:</strong> 5-7 ngày làm việc</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Phí giao hàng:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Đơn hàng từ 500.000đ:</strong> Miễn phí</li>
                    <li><strong>Nội thành TP.HCM:</strong> 25.000đ</li>
                    <li><strong>Các tỉnh thành khác:</strong> 35.000đ</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Lưu ý quan trọng:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Thời gian giao hàng có thể thay đổi do điều kiện thời tiết, giao thông</li>
                  <li>Khách hàng vui lòng kiểm tra hàng hóa khi nhận</li>
                  <li>Yapee không chịu trách nhiệm với địa chỉ giao hàng không chính xác</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Chính sách Đổi trả và Hoàn tiền
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Điều kiện đổi trả:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng</li>
                  <li>Còn đầy đủ bao bì, nhãn mác, phụ kiện kèm theo</li>
                  <li>Trong thời hạn 7 ngày kể từ ngày nhận hàng</li>
                  <li>Có hóa đơn mua hàng hoặc email xác nhận đơn hàng</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Các trường hợp được đổi trả:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-1 text-green-600 dark:text-green-400">✓ Được chấp nhận:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Sản phẩm bị lỗi từ nhà sản xuất</li>
                      <li>Giao sai sản phẩm</li>
                      <li>Sản phẩm bị hư hỏng trong vận chuyển</li>
                      <li>Không đúng mô tả trên website</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-1 text-red-600 dark:text-red-400">✗ Không chấp nhận:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Sản phẩm đã qua sử dụng</li>
                      <li>Hư hỏng do người dùng</li>
                      <li>Mất bao bì, phụ kiện</li>
                      <li>Quá thời hạn đổi trả</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Quy trình đổi trả:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">1</Badge>
                    <span className="text-sm">Liên hệ CSKH qua hotline 0333.938.014 hoặc email cskh@yapee.vn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">2</Badge>
                    <span className="text-sm">Cung cấp thông tin đơn hàng và lý do đổi trả</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">3</Badge>
                    <span className="text-sm">Yapee xác nhận và hướng dẫn gửi hàng về</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">4</Badge>
                    <span className="text-sm">Kiểm tra và xử lý đổi trả trong 3-5 ngày làm việc</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Chính sách Hoàn tiền
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Thời gian hoàn tiền:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Thanh toán COD:</strong> Hoàn tiền mặt ngay khi nhận hàng trả</li>
                  <li><strong>Chuyển khoản:</strong> 1-3 ngày làm việc</li>
                  <li><strong>Thanh toán online:</strong> 3-7 ngày làm việc</li>
                  <li><strong>Ví điện tử:</strong> 1-2 ngày làm việc</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cam kết hoàn tiền 100%:</h4>
                <p className="text-sm">
                  Yapee cam kết hoàn tiền 100% trong các trường hợp sản phẩm lỗi từ nhà sản xuất, 
                  giao sai hàng hoặc không đúng mô tả. Phí vận chuyển sẽ được Yapee chịu hoàn toàn.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trách nhiệm và Giới hạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Trách nhiệm của Yapee:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Cung cấp sản phẩm chất lượng, đúng mô tả</li>
                  <li>Bảo mật thông tin khách hàng</li>
                  <li>Hỗ trợ khách hàng 24/7</li>
                  <li>Xử lý khiếu nại một cách công bằng và kịp thời</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Trách nhiệm của Khách hàng:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Cung cấp thông tin chính xác khi đặt hàng</li>
                  <li>Thanh toán đúng hạn theo phương thức đã chọn</li>
                  <li>Kiểm tra hàng hóa khi nhận</li>
                  <li>Tuân thủ các điều khoản sử dụng</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Giới hạn trách nhiệm:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Yapee không chịu trách nhiệm với thiệt hại gián tiếp</li>
                  <li>Trách nhiệm tối đa không vượt quá giá trị đơn hàng</li>
                  <li>Không chịu trách nhiệm với sự cố ngoài tầm kiểm soát</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin Liên hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Nếu bạn có bất kỳ câu hỏi nào về Điều khoản Sử dụng này, vui lòng liên hệ:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li><strong>Công ty:</strong> Yapee</li>
                  <li><strong>Địa chỉ:</strong> 74 đường số 13, Phường Bình Trị Đông B, Quận Bình Tân, TP. Hồ Chí Minh</li>
                  <li><strong>Hotline:</strong> 0333.938.014</li>
                  <li><strong>Email:</strong> cskh@yapee.vn</li>
                  <li><strong>Thời gian làm việc:</strong> 8h00 - 19h00, từ Thứ Hai đến Chủ Nhật</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                <strong>Ngày hiệu lực:</strong> {new Date().toLocaleDateString('vi-VN')}
              </p>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Yapee có quyền thay đổi, bổ sung các Điều khoản này bất cứ lúc nào. 
                Mọi thay đổi sẽ được thông báo công khai trên website và có hiệu lực ngay lập tức.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}