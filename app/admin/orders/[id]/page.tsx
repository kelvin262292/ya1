"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Printer, ArrowDownToLine, Clock, ShoppingCart, Truck, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatDate } from "@/lib/utils"

// Mock data
const orders = [
  {
    id: "ORD-001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@example.com",
    customerPhone: "0987654321",
    status: "Đã giao hàng",
    paymentStatus: "Đã thanh toán",
    paymentMethod: "Chuyển khoản ngân hàng",
    total: 25600000,
    subtotal: 25000000,
    shippingFee: 600000,
    discount: 0,
    tax: 0,
    date: "2023-05-20T10:30:00Z",
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      address: "123 Đường ABC",
      ward: "Phường XYZ",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      country: "Việt Nam",
      phone: "0987654321"
    },
    items: [
      {
        id: "1",
        name: "Laptop Gaming XYZ",
        price: 25000000,
        quantity: 1,
        image: "https://placehold.co/100",
        options: [
          { name: "Màu sắc", value: "Đen" },
          { name: "RAM", value: "16GB" },
          { name: "SSD", value: "512GB" }
        ]
      }
    ],
    notes: "Giao hàng trong giờ hành chính",
    history: [
      { status: "Đặt hàng", date: "2023-05-18T08:00:00Z", note: "Đơn hàng đã được tạo" },
      { status: "Xác nhận", date: "2023-05-18T10:15:00Z", note: "Đơn hàng đã được xác nhận" },
      { status: "Đóng gói", date: "2023-05-19T09:30:00Z", note: "Đơn hàng đang được đóng gói" },
      { status: "Vận chuyển", date: "2023-05-19T14:00:00Z", note: "Đơn hàng đang được vận chuyển" },
      { status: "Đã giao hàng", date: "2023-05-20T10:30:00Z", note: "Đơn hàng đã được giao thành công" }
    ]
  },
  {
    id: "ORD-002",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@example.com",
    customerPhone: "0912345678",
    status: "Đang vận chuyển",
    paymentStatus: "Đã thanh toán",
    paymentMethod: "Thẻ tín dụng",
    total: 12600000,
    subtotal: 12000000,
    shippingFee: 600000,
    discount: 0,
    tax: 0,
    date: "2023-05-21T09:15:00Z",
    shippingAddress: {
      fullName: "Trần Thị B",
      address: "456 Đường DEF",
      ward: "Phường UVW",
      district: "Quận 2",
      city: "TP. Hồ Chí Minh",
      country: "Việt Nam",
      phone: "0912345678"
    },
    items: [
      {
        id: "2",
        name: "Smartphone ABC Pro",
        price: 12000000,
        quantity: 1,
        image: "https://placehold.co/100",
        options: [
          { name: "Màu sắc", value: "Xanh" },
          { name: "Bộ nhớ", value: "256GB" }
        ]
      }
    ],
    notes: "",
    history: [
      { status: "Đặt hàng", date: "2023-05-21T09:15:00Z", note: "Đơn hàng đã được tạo" },
      { status: "Xác nhận", date: "2023-05-21T11:30:00Z", note: "Đơn hàng đã được xác nhận" },
      { status: "Đóng gói", date: "2023-05-22T08:45:00Z", note: "Đơn hàng đang được đóng gói" },
      { status: "Vận chuyển", date: "2023-05-22T13:20:00Z", note: "Đơn hàng đang được vận chuyển" }
    ]
  },
  {
    id: "ORD-003",
    customerName: "Lê Văn C",
    customerEmail: "levanc@example.com",
    customerPhone: "0901234567",
    status: "Chờ xác nhận",
    paymentStatus: "Chưa thanh toán",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    total: 3590000,
    subtotal: 3500000,
    shippingFee: 90000,
    discount: 0,
    tax: 0,
    date: "2023-05-22T14:30:00Z",
    shippingAddress: {
      fullName: "Lê Văn C",
      address: "789 Đường GHI",
      ward: "Phường JKL",
      district: "Quận 3",
      city: "TP. Hồ Chí Minh",
      country: "Việt Nam",
      phone: "0901234567"
    },
    items: [
      {
        id: "3",
        name: "Tai nghe không dây DEF",
        price: 3500000,
        quantity: 1,
        image: "https://placehold.co/100",
        options: [
          { name: "Màu sắc", value: "Trắng" }
        ]
      }
    ],
    notes: "Gọi điện trước khi giao hàng",
    history: [
      { status: "Đặt hàng", date: "2023-05-22T14:30:00Z", note: "Đơn hàng đã được tạo" }
    ]
  }
]

// Các trạng thái đơn hàng
const orderStatuses = [
  { value: "Chờ xác nhận", label: "Chờ xác nhận" },
  { value: "Xác nhận", label: "Đã xác nhận" },
  { value: "Đóng gói", label: "Đang đóng gói" },
  { value: "Vận chuyển", label: "Đang vận chuyển" },
  { value: "Đã giao hàng", label: "Đã giao hàng" },
  { value: "Đã hủy", label: "Đã hủy" },
  { value: "Hoàn trả", label: "Hoàn trả" }
]

// Các trạng thái thanh toán
const paymentStatuses = [
  { value: "Chưa thanh toán", label: "Chưa thanh toán" },
  { value: "Đã thanh toán", label: "Đã thanh toán" },
  { value: "Hoàn tiền", label: "Hoàn tiền" },
  { value: "Thanh toán một phần", label: "Thanh toán một phần" }
]

// Component hiển thị biểu tượng trạng thái
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "Đã giao hàng":
      return <CheckCircle className="h-6 w-6 text-green-500" />
    case "Đang vận chuyển":
      return <Truck className="h-6 w-6 text-blue-500" />
    case "Đang đóng gói":
      return <ShoppingCart className="h-6 w-6 text-orange-500" />
    case "Chờ xác nhận":
    case "Đã xác nhận":
      return <Clock className="h-6 w-6 text-purple-500" />
    case "Đã hủy":
    case "Hoàn trả":
      return <AlertCircle className="h-6 w-6 text-red-500" />
    default:
      return <Clock className="h-6 w-6 text-gray-500" />
  }
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<(typeof orders)[0] | null>(null)
  const [orderStatus, setOrderStatus] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Tải dữ liệu đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Tìm đơn hàng trong mock data
        const foundOrder = orders.find(o => o.id === params.id)
        
        if (foundOrder) {
          setOrder(foundOrder)
          setOrderStatus(foundOrder.status)
          setPaymentStatus(foundOrder.paymentStatus)
        } else {
          toast({
            title: "Lỗi",
            description: "Không tìm thấy thông tin đơn hàng.",
            variant: "destructive",
          })
          router.push("/admin/orders")
        }
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải thông tin đơn hàng.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [params.id, router])

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async () => {
    if (!order) return
    
    setIsUpdating(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Cập nhật trạng thái đơn hàng
      setOrder(prev => {
        if (!prev) return null
        
        return {
          ...prev,
          status: orderStatus,
          paymentStatus: paymentStatus,
          history: [
            ...prev.history,
            {
              status: orderStatus,
              date: new Date().toISOString(),
              note: `Cập nhật trạng thái đơn hàng thành "${orderStatus}"`
            }
          ]
        }
      })
      
      toast({
        title: "Cập nhật thành công",
        description: "Trạng thái đơn hàng đã được cập nhật.",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // In đơn hàng
  const printOrder = () => {
    window.print()
  }

  // Tải xuống đơn hàng dưới dạng PDF
  const downloadOrder = () => {
    toast({
      title: "Thông báo",
      description: "Tính năng tải xuống đơn hàng sẽ được phát triển trong tương lai.",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/admin/orders" className="text-slate-400 hover:text-slate-300 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Skeleton className="h-8 w-64 bg-slate-700" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-24 bg-slate-700" />
            <Skeleton className="h-9 w-24 bg-slate-700" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <Skeleton className="h-40 w-full bg-slate-700" />
            <Skeleton className="h-64 w-full bg-slate-700" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-40 w-full bg-slate-700" />
            <Skeleton className="h-64 w-full bg-slate-700" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      {order && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/admin/orders" className="text-slate-400 hover:text-slate-300 transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Đơn hàng #{order.id}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={printOrder} className="bg-slate-800 border-slate-700 hover:bg-slate-700">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>In đơn hàng</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={downloadOrder} className="bg-slate-800 border-slate-700 hover:bg-slate-700">
                      <ArrowDownToLine className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tải xuống PDF</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-6 md:col-span-2">
              {/* Tổng quan đơn hàng */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      Tổng quan đơn hàng
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <StatusIcon status={order.status} />
                      <Badge 
                        className={
                          order.status === "Đã giao hàng" ? "bg-green-600" : 
                          order.status === "Đang vận chuyển" ? "bg-blue-600" : 
                          order.status === "Đã hủy" ? "bg-red-600" : 
                          "bg-orange-600"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-slate-400">
                    Đặt hàng lúc {formatDate(order.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-slate-400">Khách hàng</h3>
                        <p className="text-white">{order.customerName}</p>
                        <p className="text-slate-300">{order.customerEmail}</p>
                        <p className="text-slate-300">{order.customerPhone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-400">Thanh toán</h3>
                        <p className="text-white">{order.paymentMethod}</p>
                        <p className="text-slate-300">
                          <Badge 
                            className={
                              order.paymentStatus === "Đã thanh toán" ? "bg-green-600" : 
                              order.paymentStatus === "Hoàn tiền" ? "bg-red-600" : 
                              "bg-orange-600"
                            }
                          >
                            {order.paymentStatus}
                          </Badge>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-1">Địa chỉ giao hàng</h3>
                      <p className="text-white">{order.shippingAddress.fullName}</p>
                      <p className="text-slate-300">{order.shippingAddress.address}</p>
                      <p className="text-slate-300">
                        {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
                      </p>
                      <p className="text-slate-300">{order.shippingAddress.country}</p>
                      <p className="text-slate-300">{order.shippingAddress.phone}</p>
                    </div>
                    
                    {order.notes && (
                      <div>
                        <h3 className="text-sm font-medium text-slate-400 mb-1">Ghi chú</h3>
                        <p className="text-slate-300">{order.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Sản phẩm trong đơn hàng */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Sản phẩm ({order.items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="h-16 w-16 rounded-md overflow-hidden bg-slate-700 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {item.options.map((option, i) => (
                              <span key={i} className="text-xs text-slate-400">
                                {option.name}: {option.value}
                              </span>
                            ))}
                          </div>
                          <div className="mt-1 text-sm text-slate-300">
                            {formatCurrency(item.price)} × {item.quantity}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-white font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700 flex-col items-end pt-4">
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Tạm tính</span>
                      <span className="text-white">{formatCurrency(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Phí vận chuyển</span>
                      <span className="text-white">{formatCurrency(order.shippingFee)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Giảm giá</span>
                        <span className="text-green-500">-{formatCurrency(order.discount)}</span>
                      </div>
                    )}
                    {order.tax > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Thuế</span>
                        <span className="text-white">{formatCurrency(order.tax)}</span>
                      </div>
                    )}
                    <Separator className="my-2 bg-slate-700" />
                    <div className="flex justify-between font-medium">
                      <span className="text-white">Tổng cộng</span>
                      <span className="text-lg text-white">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Cập nhật trạng thái */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Cập nhật trạng thái
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400">Trạng thái đơn hàng</h3>
                    <Select
                      value={orderStatus}
                      onValueChange={setOrderStatus}
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {orderStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400">Trạng thái thanh toán</h3>
                    <Select
                      value={paymentStatus}
                      onValueChange={setPaymentStatus}
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {paymentStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-sky-500 hover:bg-sky-600"
                    onClick={updateOrderStatus}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Đang cập nhật..." : "Cập nhật trạng thái"}
                  </Button>
                </CardFooter>
              </Card>

              {/* Lịch sử đơn hàng */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Lịch sử đơn hàng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.history.map((event, index) => (
                      <div key={index} className="border-l-2 border-slate-700 pl-4 pb-4 relative">
                        <div className="absolute w-3 h-3 bg-slate-700 rounded-full -left-[7px]" />
                        <h4 className="text-white font-medium">{event.status}</h4>
                        <p className="text-sm text-slate-300 mt-1">{formatDate(event.date)}</p>
                        {event.note && (
                          <p className="text-sm text-slate-400 mt-1">{event.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
