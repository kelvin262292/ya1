'use client'

import { Shield, Lock, Eye, FileText, Users, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Chính sách Bảo mật</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Yapee cam kết bảo vệ thông tin cá nhân của khách hàng theo các quy định pháp luật Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Bảo vệ Dữ liệu</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Lock className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Mã hóa SSL</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tất cả dữ liệu được mã hóa và bảo mật tuyệt đối
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Eye className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Minh bạch</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Thông tin rõ ràng về cách thức thu thập và sử dụng dữ liệu
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Giới thiệu và Cam kết
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Yapee cam kết tôn trọng và bảo vệ quyền riêng tư cũng như dữ liệu cá nhân của Quý khách hàng 
                khi truy cập và sử dụng website thương mại điện tử của Yapee.
              </p>
              <p>
                Chính sách Bảo mật này mô tả cách thức chúng tôi thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ 
                thông tin cá nhân của bạn. Bằng việc sử dụng Website Yapee, bạn đồng ý với các điều khoản được 
                quy định trong Chính sách này.
              </p>
              <p>
                Chúng tôi cam kết tuân thủ nghiêm ngặt các quy định của pháp luật Việt Nam về bảo vệ dữ liệu cá nhân, 
                đặc biệt là Nghị định số 13/2023/NĐ-CP ngày 17/4/2023 của Chính phủ về bảo vệ dữ liệu cá nhân.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Mục đích và Phạm vi Thu thập Thông tin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Mục đích thu thập:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Xử lý đơn hàng: Xác nhận, xử lý, đóng gói và giao đơn hàng của bạn</li>
                  <li>Quản lý tài khoản: Tạo và quản lý tài khoản mua hàng trên Website Yapee</li>
                  <li>Giao hàng: Cung cấp thông tin cần thiết cho đối tác vận chuyển</li>
                  <li>Hỗ trợ khách hàng: Liên hệ, giải đáp thắc mắc, xử lý yêu cầu</li>
                  <li>Cung cấp thông tin: Gửi thông báo liên quan đến đơn hàng, tài khoản</li>
                  <li>Cải thiện dịch vụ: Phân tích hành vi mua sắm để nâng cao chất lượng</li>
                  <li>Tiếp thị và Khuyến mãi (có sự đồng ý): Gửi thông tin ưu đãi</li>
                  <li>Ngăn chặn gian lận: Phát hiện các hoạt động bất thường</li>
                  <li>Tuân thủ pháp luật: Thực hiện nghĩa vụ theo yêu cầu cơ quan nhà nước</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Phạm vi thu thập:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Thông tin định danh: Họ tên, địa chỉ, số điện thoại, email</li>
                  <li>Thông tin tài khoản: Tên đăng nhập, mật khẩu (được mã hóa), lịch sử mua hàng</li>
                  <li>Thông tin giao dịch: Chi tiết đơn hàng, thông tin thanh toán</li>
                  <li>Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, dữ liệu cookie</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                An toàn Dữ liệu Cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Yapee áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu cá nhân của bạn 
                khỏi bị truy cập, thu thập, sử dụng, tiết lộ, sao chép, sửa đổi, phá hủy trái phép.
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">Các biện pháp bảo mật:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Mã hóa:</strong> Sử dụng giao thức SSL để mã hóa dữ liệu truyền tải</li>
                  <li><strong>Kiểm soát Truy cập:</strong> Giới hạn quyền truy cập chỉ cho nhân viên cần thiết</li>
                  <li><strong>Bảo mật Hạ tầng:</strong> Lưu trữ trên máy chủ bảo mật với tường lửa</li>
                  <li><strong>Quy trình Nội bộ:</strong> Các quy định nghiêm ngặt về quản lý dữ liệu</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Quyền của Chủ thể Dữ liệu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Theo quy định tại Nghị định 13/2023/NĐ-CP, bạn có các quyền sau đối với dữ liệu cá nhân:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Quyền được biết về hoạt động xử lý dữ liệu</li>
                    <li>Quyền đồng ý hoặc không đồng ý</li>
                    <li>Quyền truy cập để xem, chỉnh sửa dữ liệu</li>
                    <li>Quyền rút lại sự đồng ý</li>
                    <li>Quyền xóa dữ liệu</li>
                  </ul>
                </div>
                <div>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Quyền hạn chế xử lý dữ liệu</li>
                    <li>Quyền yêu cầu cung cấp dữ liệu</li>
                    <li>Quyền phản đối xử lý dữ liệu</li>
                    <li>Quyền khiếu nại, tố cáo</li>
                    <li>Quyền yêu cầu bồi thường thiệt hại</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Thời gian Lưu trữ và Chia sẻ Thông tin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Thời gian lưu trữ:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Thông tin tài khoản: Trong suốt thời gian duy trì tài khoản</li>
                  <li>Thông tin đơn hàng: Theo quy định pháp luật về kế toán, thuế</li>
                  <li>Dữ liệu sẽ được xóa khi không còn cần thiết hoặc theo yêu cầu của bạn</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">Chia sẻ thông tin:</h4>
                <p className="text-sm mb-2">
                  Yapee cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân với bên thứ ba vì mục đích thương mại.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Đối tác vận chuyển: Chỉ thông tin cần thiết để giao hàng</li>
                  <li>Cổng thanh toán: Xử lý thanh toán qua đối tác uy tín</li>
                  <li>Nhà cung cấp dịch vụ: Hỗ trợ hoạt động kinh doanh</li>
                  <li>Yêu cầu pháp lý: Khi được yêu cầu bởi cơ quan có thẩm quyền</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liên hệ về Chính sách Bảo mật</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Nếu bạn có bất kỳ câu hỏi nào về Chính sách Bảo mật này hoặc muốn thực hiện các quyền 
                của mình đối với dữ liệu cá nhân, vui lòng liên hệ:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li><strong>Email:</strong> privacy@yapee.vn</li>
                  <li><strong>Hotline:</strong> 0333.938.014</li>
                  <li><strong>Địa chỉ:</strong> 74 đường số 13, Phường Bình Trị Đông B, Quận Bình Tân, TP. Hồ Chí Minh</li>
                  <li><strong>Thời gian làm việc:</strong> 8h00 - 19h00, từ Thứ Hai đến Chủ Nhật</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                <strong>Ngày hiệu lực:</strong> {new Date().toLocaleDateString('vi-VN')}
              </p>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Chính sách này có thể được cập nhật để phản ánh những thay đổi trong hoạt động kinh doanh 
                hoặc yêu cầu pháp lý. Mọi thay đổi sẽ được thông báo công khai trên website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}