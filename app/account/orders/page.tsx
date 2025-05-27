"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, FileText, Package, Search, User, UserCog } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Kiểu dữ liệu cho đơn hàng
interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  statusText: string
  total: number
  items: number
  paymentMethod: string
}

// Dữ liệu mẫu cho danh sách đơn hàng
const ordersData: Order[] = [
  {
    id: "ORD-123456",
    date: "2023-05-20T15:30:00Z",
    status: "delivered",
    statusText: "Đã giao hàng",
    total: 37500000,
    items: 3,
    paymentMethod: "Thanh toán khi nhận hàng (COD)"
  },
  {
    id: "ORD-789012",
    date: "2023-04-10T09:15:00Z",
    status: "processing",
    statusText: "Đang xử lý",
    total: 12000000,
    items: 1,
    paymentMethod: "Chuyển khoản ngân hàng"
  },
  {
    id: "ORD-345678",
    date: "2023-03-05T11:45:00Z",
    status: "delivered",
    statusText: "Đã giao hàng",
    total: 28500000,
    items: 2,
    paymentMethod: "Thẻ tín dụng"
  },
  {
    id: "ORD-901234",
    date: "2023-02-15T08:20:00Z",
    status: "delivered",
    statusText: "Đã giao hàng",
    total: 15000000,
    items: 1,
    paymentMethod: "Ví điện tử"
  },
  {
    id: "ORD-567890",
    date: "2023-01-25T14:10:00Z",
    status: "cancelled",
    statusText: "Đã hủy",
    total: 42000000,
    items: 4,
    paymentMethod: "Thanh toán khi nhận hàng (COD)"
  }
]

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10
  
  // Tải dữ liệu đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setOrders(ordersData)
        setFilteredOrders(ordersData)
      } catch (error) {
        console.error("Lỗi khi tải danh sách đơn hàng:", error)
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải danh sách đơn hàng. Vui lòng thử lại sau.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchOrders()
  }, [])
  
  // Lọc đơn hàng theo trạng thái và tìm kiếm
  useEffect(() => {
    let result = orders
    
    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      result = result.filter(order => order.status === statusFilter)
    }
    
    // Lọc theo từ khóa tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(order => 
        order.id.toLowerCase().includes(query)
      )
    }
    
    setFilteredOrders(result)
    setCurrentPage(1) // Reset về trang đầu tiên khi thay đổi bộ lọc
  }, [orders, statusFilter, searchQuery])
  
  // Tính toán phân trang
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  
  // Thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  
  // Hiển thị skeleton khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
          <div className="lg:col-span-3">
            <Skeleton className="h-20 w-full rounded-lg mb-6" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-900">Trang chủ</Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <Link href="/account" className="text-gray-500 hover:text-gray-900">Tài khoản</Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <span className="font-medium">Đơn hàng của tôi</span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Đơn hàng của tôi</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Nguyễn Văn A</CardTitle>
                  <CardDescription className="text-sm text-gray-500">nguyenvana@example.com</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-1 p-0">
              <Link 
                href="/account" 
                className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <UserCog className="mr-2 h-4 w-4" />
                <span>Thông tin tài khoản</span>
              </Link>
              <Link 
                href="/account/orders" 
                className="flex items-center p-3 rounded-md bg-primary/10 text-primary font-medium"
              >
                <Package className="mr-2 h-4 w-4" />
                <span>Đơn hàng của tôi</span>
              </Link>
              <Link 
                href="/wishlist" 
                className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>Sản phẩm yêu thích</span>
              </Link>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 px-3"
              >
                Đăng xuất
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách đơn hàng</CardTitle>
              <CardDescription>
                Quản lý và theo dõi các đơn hàng của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Bộ lọc và tìm kiếm */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Tìm kiếm theo mã đơn hàng..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="w-full sm:w-48">
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="pending">Chờ xác nhận</SelectItem>
                      <SelectItem value="processing">Đang xử lý</SelectItem>
                      <SelectItem value="shipped">Đang giao hàng</SelectItem>
                      <SelectItem value="delivered">Đã giao hàng</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Danh sách đơn hàng */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Package className="h-8 w-8 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-medium mb-2">Không tìm thấy đơn hàng</h2>
                  <p className="text-gray-600 mb-6">
                    {searchQuery || statusFilter !== "all"
                      ? "Không tìm thấy đơn hàng phù hợp với bộ lọc. Vui lòng thử lại với điều kiện khác."
                      : "Bạn chưa có đơn hàng nào. Hãy mua sắm để có đơn hàng đầu tiên."}
                  </p>
                  <Button asChild>
                    <Link href="/products">Mua sắm ngay</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-gray-700 text-sm">
                        <tr>
                          <th className="px-4 py-3 text-left">Mã đơn hàng</th>
                          <th className="px-4 py-3 text-left">Ngày đặt</th>
                          <th className="px-4 py-3 text-right">Tổng tiền</th>
                          <th className="px-4 py-3 text-center">Trạng thái</th>
                          <th className="px-4 py-3 text-center"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {currentOrders.map((order) => (
                          <tr key={order.id} className="text-sm">
                            <td className="px-4 py-4 font-medium">{order.id}</td>
                            <td className="px-4 py-4">
                              {new Date(order.date).toLocaleDateString("vi-VN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="px-4 py-4 text-right font-medium">
                              {formatCurrency(order.total)}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span 
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""}
                                  ${order.status === "processing" ? "bg-yellow-100 text-yellow-800" : ""}
                                  ${order.status === "shipped" ? "bg-blue-100 text-blue-800" : ""}
                                  ${order.status === "pending" ? "bg-gray-100 text-gray-800" : ""}
                                  ${order.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
                                `}
                              >
                                {order.statusText}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/account/orders/${order.id}`}>Chi tiết</Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Phân trang */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                      <nav className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="h-8 w-8"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                          <Button
                            key={number}
                            variant={currentPage === number ? "default" : "outline"}
                            size="sm"
                            onClick={() => paginate(number)}
                            className="h-8 w-8 px-0"
                          >
                            {number}
                          </Button>
                        ))}
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="h-8 w-8"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
