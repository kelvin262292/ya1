import { Metadata } from "next"
import { AnalyticsCards } from "@/components/admin/dashboard/analytics-cards"
import { SalesChart } from "@/components/admin/dashboard/sales-chart"
import { RecentOrders } from "@/components/admin/dashboard/recent-orders"
import { CategoryChart } from "@/components/admin/dashboard/category-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Dashboard | Admin Panel",
  description: "Tổng quan về hoạt động kinh doanh và doanh thu của cửa hàng",
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h2>
        <p className="text-slate-400 mt-1">
          Tổng quan về hoạt động kinh doanh của cửa hàng
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none h-auto p-0">
          <TabsTrigger 
            value="overview" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Tổng quan
          </TabsTrigger>
          <TabsTrigger 
            value="sales" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Doanh thu
          </TabsTrigger>
          <TabsTrigger 
            value="products" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Sản phẩm
          </TabsTrigger>
          <TabsTrigger 
            value="customers" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Khách hàng
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Thẻ thống kê */}
          <AnalyticsCards />

          {/* Biểu đồ và đơn hàng gần đây */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <SalesChart />
            </div>
            <div>
              <RecentOrders />
            </div>
          </div>

          {/* Biểu đồ danh mục và báo cáo khác */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryChart />
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Báo cáo hệ thống</CardTitle>
                <CardDescription className="text-slate-400">
                  Tình trạng hệ thống và cảnh báo quan trọng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <div>
                      <p className="text-white font-medium">Hệ thống đang hoạt động</p>
                      <p className="text-sm text-slate-400">Tất cả các dịch vụ đang hoạt động bình thường</p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <div>
                      <p className="text-white font-medium">Bảo mật</p>
                      <p className="text-sm text-slate-400">Không có cảnh báo bảo mật nào</p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <div>
                      <p className="text-white font-medium">Dung lượng lưu trữ</p>
                      <p className="text-sm text-slate-400">Sử dụng 68% dung lượng</p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white font-medium">Cập nhật hệ thống</p>
                      <p className="text-sm text-slate-400">Phiên bản mới có sẵn (v2.1.5)</p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Báo cáo doanh thu</CardTitle>
                <CardDescription className="text-slate-400">
                  Nội dung đang được phát triển
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <p className="text-slate-400">Tab doanh thu chi tiết đang được phát triển</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Phân tích sản phẩm</CardTitle>
                <CardDescription className="text-slate-400">
                  Nội dung đang được phát triển
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <p className="text-slate-400">Tab phân tích sản phẩm đang được phát triển</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Phân tích khách hàng</CardTitle>
                <CardDescription className="text-slate-400">
                  Nội dung đang được phát triển
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <p className="text-slate-400">Tab phân tích khách hàng đang được phát triển</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
