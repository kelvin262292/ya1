import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Về Yapee</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Chúng tôi là đơn vị tiên phong trong lĩnh vực thương mại điện tử tại Việt Nam, 
          mang đến cho khách hàng những sản phẩm công nghệ chất lượng cao với trải nghiệm mua sắm tuyệt vời.
        </p>
      </div>
      
      {/* Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Văn phòng Yapee"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <Badge className="mb-4">Câu chuyện của chúng tôi</Badge>
          <h2 className="text-3xl font-bold mb-4">Từ ý tưởng đến thương hiệu hàng đầu</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Yapee được thành lập vào năm 2018 bởi một nhóm các chuyên gia công nghệ đam mê, 
            với mục tiêu tạo ra một nền tảng thương mại điện tử đáng tin cậy, nơi người tiêu dùng 
            Việt Nam có thể tiếp cận với các sản phẩm công nghệ chính hãng với giá cả hợp lý.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Khởi đầu là một cửa hàng nhỏ tại Quận 1, TP. Hồ Chí Minh, Yapee đã nhanh chóng phát triển 
            và mở rộng phạm vi hoạt động trên toàn quốc. Đến nay, chúng tôi đã có hơn 10 cửa hàng 
            trên toàn quốc và một nền tảng thương mại điện tử với hàng triệu lượt truy cập mỗi tháng.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Sự phát triển của Yapee là minh chứng cho cam kết không ngừng của chúng tôi trong việc 
            mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất, cùng với trải nghiệm mua sắm 
            thuận tiện và đáng tin cậy.
          </p>
        </div>
      </div>
      
      {/* Mission & Vision */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-red-100 dark:bg-red-900/20 text-red-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </span>
              Sứ mệnh
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Sứ mệnh của Yapee là trở thành cầu nối đáng tin cậy giữa các thương hiệu công nghệ hàng đầu 
              thế giới và người tiêu dùng Việt Nam. Chúng tôi cam kết mang đến những sản phẩm chính hãng, 
              chất lượng cao với giá cả hợp lý, đồng thời cung cấp dịch vụ khách hàng xuất sắc và 
              trải nghiệm mua sắm thuận tiện.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-red-100 dark:bg-red-900/20 text-red-500 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 10-4 4-4-4" />
                </svg>
              </span>
              Tầm nhìn
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tầm nhìn của chúng tôi là trở thành nền tảng thương mại điện tử hàng đầu trong lĩnh vực 
              công nghệ tại Việt Nam, được biết đến với sự đáng tin cậy, chất lượng sản phẩm và 
              dịch vụ khách hàng xuất sắc. Chúng tôi hướng tới việc tạo ra một hệ sinh thái số hoàn chỉnh, 
              nơi khách hàng có thể tìm thấy mọi giải pháp công nghệ cho cuộc sống hiện đại.
            </p>
          </div>
        </div>
      </div>
      
      {/* Core Values */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <Badge className="mb-2">Giá trị cốt lõi</Badge>
          <h2 className="text-3xl font-bold mb-4">Những giá trị định hình Yapee</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tại Yapee, mọi quyết định và hành động của chúng tôi đều dựa trên những giá trị cốt lõi sau đây:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-500">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Khách hàng là trọng tâm</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Chúng tôi đặt nhu cầu và trải nghiệm của khách hàng lên hàng đầu trong mọi quyết định.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-500">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Chính trực</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Chúng tôi luôn hành động với sự trung thực, minh bạch và đạo đức trong mọi hoạt động kinh doanh.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-500">
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Chất lượng</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Chúng tôi không ngừng nỗ lực để đảm bảo chất lượng cao nhất trong mọi sản phẩm và dịch vụ.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-500">
                  <path d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z" />
                  <path d="M14 7v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z" />
                  <path d="M21 3v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Đổi mới</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Chúng tôi luôn tìm kiếm những cách thức mới để cải thiện và phát triển, đón đầu xu hướng công nghệ.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Our Team */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <Badge className="mb-2">Đội ngũ lãnh đạo</Badge>
          <h2 className="text-3xl font-bold mb-4">Những người dẫn dắt Yapee</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Đội ngũ lãnh đạo của chúng tôi bao gồm những chuyên gia với nhiều năm kinh nghiệm trong lĩnh vực công nghệ và thương mại điện tử.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <Card className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="Nguyễn Văn A"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-lg">Nguyễn Văn A</h3>
              <p className="text-red-500 mb-2">Giám đốc điều hành (CEO)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hơn 15 năm kinh nghiệm trong lĩnh vực công nghệ và thương mại điện tử.
              </p>
            </CardContent>
          </Card>
          
          {/* Team Member 2 */}
          <Card className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                alt="Trần Thị B"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-lg">Trần Thị B</h3>
              <p className="text-red-500 mb-2">Giám đốc tài chính (CFO)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chuyên gia tài chính với hơn 10 năm kinh nghiệm trong các tập đoàn đa quốc gia.
              </p>
            </CardContent>
          </Card>
          
          {/* Team Member 3 */}
          <Card className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="Lê Văn C"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-lg">Lê Văn C</h3>
              <p className="text-red-500 mb-2">Giám đốc công nghệ (CTO)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kỹ sư phần mềm với chuyên môn về AI và phát triển nền tảng thương mại điện tử.
              </p>
            </CardContent>
          </Card>
          
          {/* Team Member 4 */}
          <Card className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
                alt="Phạm Thị D"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-lg">Phạm Thị D</h3>
              <p className="text-red-500 mb-2">Giám đốc marketing</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chuyên gia marketing với kinh nghiệm phong phú trong lĩnh vực thương mại điện tử.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Milestones */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <Badge className="mb-2">Cột mốc phát triển</Badge>
          <h2 className="text-3xl font-bold mb-4">Hành trình của Yapee</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Nhìn lại chặng đường phát triển của chúng tôi qua các cột mốc quan trọng.
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-red-100 dark:bg-red-900/20 text-red-500 font-bold text-xl p-4 rounded-lg inline-block">
                2018
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold mb-2">Thành lập Yapee</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yapee được thành lập với cửa hàng đầu tiên tại Quận 1, TP. Hồ Chí Minh, 
                chuyên cung cấp các sản phẩm điện thoại và phụ kiện.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-red-100 dark:bg-red-900/20 text-red-500 font-bold text-xl p-4 rounded-lg inline-block">
                2019
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold mb-2">Ra mắt website thương mại điện tử</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yapee mở rộng hoạt động kinh doanh với việc ra mắt nền tảng thương mại điện tử, 
                cho phép khách hàng mua sắm trực tuyến.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-red-100 dark:bg-red-900/20 text-red-500 font-bold text-xl p-4 rounded-lg inline-block">
                2020
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold mb-2">Mở rộng danh mục sản phẩm</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yapee mở rộng danh mục sản phẩm, bao gồm laptop, máy tính bảng, thiết bị thông minh cho gia đình và nhiều phụ kiện công nghệ khác.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-red-100 dark:bg-red-900/20 text-red-500 font-bold text-xl p-4 rounded-lg inline-block">
                2021
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold mb-2">Mở rộng mạng lưới cửa hàng</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yapee mở thêm 5 cửa hàng mới tại Hà Nội, Đà Nẵng và các tỉnh thành lớn.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-red-100 dark:bg-red-900/20 text-red-500 font-bold text-xl p-4 rounded-lg inline-block">
                2022
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold mb-2">Ra mắt ứng dụng di động</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yapee ra mắt ứng dụng di động trên iOS và Android, giúp khách hàng mua sắm thuận tiện hơn.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-red-100 dark:bg-red-900/20 text-red-500 font-bold text-xl p-4 rounded-lg inline-block">
                2023
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold mb-2">Đạt mốc 1 triệu khách hàng</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yapee đạt mốc 1 triệu khách hàng và trở thành một trong những nền tảng thương mại điện tử 
                hàng đầu trong lĩnh vực công nghệ tại Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-red-500 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Trở thành một phần của Yapee</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Chúng tôi luôn tìm kiếm những người tài năng và đam mê để cùng nhau xây dựng tương lai của thương mại điện tử.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="outline" className="bg-white text-red-500 hover:bg-gray-100 border-none">
            <Link href="/yapee/careers">Cơ hội nghề nghiệp</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-white hover:bg-red-600 border-white">
            <Link href="/yapee/contact">Liên hệ với chúng tôi</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 