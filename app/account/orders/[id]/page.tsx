"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { toast } from "@/components/ui/use-toast"
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  Copy, 
  FileText, 
  Info, 
  Loader2, 
  MapPin, 
  Package, 
  Printer, 
  RefreshCw, 
  ShoppingBag, 
  Truck, 
  XCircle 
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Định nghĩa kiểu dữ liệu cho sản phẩm trong đơn hàng
interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variants?: { name: string; value: string }[]
}

// Định nghĩa kiểu dữ liệu cho trạng thái đơn hàng
interface OrderStatus {
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  label: string
  color: string
  icon: React.ReactNode
  date?: string
  description: string
}

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  statusText: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "refunded"
  shippingAddress: {
    fullName: string
    phone: string
    email: string
    address: string
    province: string
    district: string
    ward: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
  statusHistory: OrderStatus[]
}

// Mẫu dữ liệu đơn hàng
const orderData: Order = {
  id: "ORD-123456",
  date: "2023-05-20T15:30:00Z",
  status: "processing",
  statusText: "Đang xử lý",
  items: [
    {
      id: "1",
      name: "Laptop Gaming XYZ",
      price: 25000000,
      image: "https://placehold.co/600x400",
      quantity: 1,
      variants: [
        { name: "RAM", value: "16GB" },
        { name: "Ổ cứng", value: "512GB" }
      ]
    },
    {
      id: "2",
      name: "Smartphone ABC Pro",
      price: 12000000,
      image: "https://placehold.co/600x400",
      quantity: 2,
      variants: [
        { name: "Màu sắc", value: "Đen" },
        { name: "Bộ nhớ trong", value: "256GB" }
      ]
    }
  ],
  subtotal: 49000000,
  shipping: 50000,
  discount: 2500000,
  total: 46550000,
  paymentMethod: "Thanh toán khi nhận hàng (COD)",
  paymentStatus: "pending",
  shippingAddress: {
    fullName: "Nguyễn Văn A",
    phone: "0912345678",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC",
    province: "Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Nghé"
  },
  trackingNumber: "TN123456789VN",
  estimatedDelivery: "2023-05-25T00:00:00Z",
  statusHistory: [
    {
      status: "pending",
      label: "Đơn hàng đã đặt",
      color: "gray",
      icon: <Clock className="h-5 w-5" />,
      date: "2023-05-20T15:30:00Z",
      description: "Đơn hàng của bạn đã được đặt thành công và đang chờ xác nhận."
    },
    {
      status: "processing",
      label: "Đang xử lý",
      color: "yellow",
      icon: <Package className="h-5 w-5" />,
      date: "2023-05-21T09:15:00Z",
      description: "Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị."
    },
    {
      status: "shipped",
      label: "Đang giao hàng",
      color: "blue",
      icon: <Truck className="h-5 w-5" />,
      description: "Đơn hàng của bạn đang được giao đến địa chỉ của bạn."
    },
    {
      status: "delivered",
      label: "Đã giao hàng",
      color: "green",
      icon: <Check className="h-5 w-5" />,
      description: "Đơn hàng của bạn đã được giao thành công."
    }
  ]
}

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<Order | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Tải thông tin đơn hàng
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Trong thực tế, sẽ lấy thông tin đơn hàng theo ID
        // const response = await fetch(`/api/orders/${orderId}`)
        // const data = await response.json()
        
        setOrder(orderData)
      } catch (error) {
        console.error("Lỗi khi tải thông tin đơn hàng:", error)
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải thông tin đơn hàng. Vui lòng thử lại sau.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])
  
  // Sao chép mã đơn hàng
  const copyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.id)
      toast({
        title: "Đã sao chép",
        description: `Mã đơn hàng ${order.id} đã được sao chép vào clipboard.`,
      })
    }
  }
  
  // Sao chép mã vận đơn
  const copyTrackingNumber = () => {
    if (order?.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber)
      toast({
        title: "Đã sao chép",
        description: `Mã vận đơn ${order.trackingNumber} đã được sao chép vào clipboard.`,
      })
    }
  }
  
  // In đơn hàng
  const printOrder = () => {
    window.print()
  }
  
  // Hủy đơn hàng
  const cancelOrder = async () => {
    setIsCancelling(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Cập nhật trạng thái đơn hàng
      if (order) {
        const updatedOrder = {
          ...order,
          status: "cancelled" as const,
          statusText: "Đã hủy",
          statusHistory: [
            ...order.statusHistory,
            {
              status: "cancelled" as const,
              label: "Đã hủy",
              color: "red",
              icon: <XCircle className="h-5 w-5" />,
              date: new Date().toISOString(),
              description: "Đơn hàng đã bị hủy theo yêu cầu của bạn."
            }
          ]
        }
        
        setOrder(updatedOrder)
      }
      
      toast({
        title: "Thành công",
        description: "Đơn hàng đã được hủy thành công.",
      })
      
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error)
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi hủy đơn hàng. Vui lòng thử lại sau.",
        variant: "destructive"
      })
    } finally {
      setIsCancelling(false)
    }
  }
  
  // Kiểm tra xem đơn hàng có thể hủy không (chỉ cho phép hủy các đơn hàng có trạng thái "pending" hoặc "processing")
  const canCancel = order && ["pending", "processing"].includes(order.status)
  
  // Hiển thị skeleton khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-64 mb-8" />
        <div className="grid gap-8">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-80 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    )
  }
  
  // Hiển thị thông báo nếu không tìm thấy đơn hàng
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <Package className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Không tìm thấy đơn hàng</h1>
          <p className="text-gray-600 mb-6">Rất tiếc, chúng tôi không thể tìm thấy thông tin đơn hàng mà bạn yêu cầu.</p>
          <Button asChild>
            <Link href="/account/orders">Quay lại danh sách đơn hàng</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 print:py-0">
      {/* Breadcrumb */}
      <div className="mb-6 print:hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/account">Tài khoản</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/account/orders">Đơn hàng</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/account/orders/${order.id}`}>{order.id}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Chi tiết đơn hàng</h1>
        
        <div className="flex items-center gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={printOrder}>
            <Printer className="h-4 w-4 mr-2" />
            In đơn hàng
          </Button>
          
          {canCancel && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  <XCircle className="h-4 w-4 mr-2" />
                  Hủy đơn hàng
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Xác nhận hủy đơn hàng</DialogTitle>
                  <DialogDescription>
                    Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác.
                  </DialogDescription>
                </DialogHeader>
                <div className="bg-yellow-50 p-4 rounded-md text-sm text-yellow-800 my-2 flex items-start">
                  <Info className="h-5 w-5 mr-2 mt-0.5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Lưu ý:</p>
                    <p>- Nếu bạn đã thanh toán, số tiền sẽ được hoàn lại theo chính sách của chúng tôi.</p>
                    <p>- Thời gian hoàn tiền có thể mất từ 5-7 ngày làm việc tùy vào phương thức thanh toán của bạn.</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Hủy bỏ
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={cancelOrder}
                    disabled={isCancelling}
                  >
                    {isCancelling ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>Xác nhận hủy</>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      {/* Thông tin đơn hàng */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle className="flex items-center text-xl">
                Thông tin đơn hàng
                <div className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""}
                  ${order.status === "processing" ? "bg-yellow-100 text-yellow-800" : ""}
                  ${order.status === "shipped" ? "bg-blue-100 text-blue-800" : ""}
                  ${order.status === "pending" ? "bg-gray-100 text-gray-800" : ""}
                  ${order.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
                `}>
                  {order.statusText}
                </div>
              </CardTitle>
              
              <div className="flex items-center mt-2">
                <p className="text-gray-700 mr-2">Mã đơn hàng: <span className="font-medium">{order.id}</span></p>
                <button 
                  onClick={copyOrderId}
                  className="text-gray-500 hover:text-primary"
                  aria-label="Sao chép mã đơn hàng"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-gray-700 mt-1">
                Ngày đặt hàng: {new Date(order.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
            
            {order.trackingNumber && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">Mã vận đơn:</p>
                <div className="flex items-center">
                  <p className="font-medium mr-2">{order.trackingNumber}</p>
                  <button 
                    onClick={copyTrackingNumber}
                    className="text-gray-500 hover:text-primary"
                    aria-label="Sao chép mã vận đơn"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                {order.estimatedDelivery && (
                  <p className="text-sm text-gray-600 mt-1">
                    Dự kiến giao hàng: {new Date(order.estimatedDelivery).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pb-0">
          {/* Trạng thái đơn hàng */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-4">Trạng thái đơn hàng</h3>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
              <div className="space-y-8 relative z-10">
                {order.statusHistory.map((status, index) => {
                  const isActive = order.status === status.status || 
                    (status.status === "processing" && order.status === "shipped") ||
                    (status.status === "processing" && order.status === "delivered") ||
                    (status.status === "shipped" && order.status === "delivered");
                  
                  const isCompleted = status.date !== undefined;
                  
                  return (
                    <div key={status.status} className="flex items-start">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full z-10
                        ${isActive 
                          ? status.status === "cancelled" 
                            ? "bg-red-100 text-red-600" 
                            : "bg-primary text-white" 
                          : "bg-gray-100 text-gray-400"
                        }
                      `}>
                        {status.icon}
                      </div>
                      <div className="ml-4 min-w-0 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                              {status.label}
                            </p>
                            <p className="text-sm text-gray-600 mt-0.5">{status.description}</p>
                          </div>
                          {isCompleted && status.date && (
                            <p className="text-sm text-gray-500">
                              {new Date(status.date).toLocaleDateString("vi-VN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Danh sách sản phẩm */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-4">Sản phẩm đã đặt</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 py-4 border-t first:border-t-0">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">
                      <Link href={`/products/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h4>
                    
                    {item.variants && item.variants.length > 0 && (
                      <div className="mt-1 text-sm text-gray-600">
                        {item.variants.map((variant, index) => (
                          <span key={index}>
                            {variant.name}: {variant.value}
                            {index < item.variants!.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {formatCurrency(item.price)} x {item.quantity}
                      </div>
                      <div className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Thông tin vận chuyển và thanh toán */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Địa chỉ giao hàng */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Địa chỉ giao hàng
              </h3>
              <div className="p-4 border rounded-lg">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.email}</p>
                <p className="mt-1">{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.province}
                </p>
              </div>
            </div>
            
            {/* Phương thức thanh toán */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Phương thức thanh toán
              </h3>
              <div className="p-4 border rounded-lg">
                <p className="font-medium">{order.paymentMethod}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600 mr-2">Trạng thái thanh toán:</span>
                  <span 
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${order.paymentStatus === "paid" ? "bg-green-100 text-green-800" : ""}
                      ${order.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${order.paymentStatus === "refunded" ? "bg-blue-100 text-blue-800" : ""}
                    `}
                  >
                    {order.paymentStatus === "paid" && "Đã thanh toán"}
                    {order.paymentStatus === "pending" && "Chờ thanh toán"}
                    {order.paymentStatus === "refunded" && "Đã hoàn tiền"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col">
          <Separator className="mb-6" />
          
          {/* Tổng quan đơn hàng */}
          <div className="w-full flex justify-end">
            <div className="w-full md:w-72">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span>{formatCurrency(order.shipping)}</span>
                </div>
                
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold text-base">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      {/* Nút quay lại và liên hệ hỗ trợ */}
      <div className="flex flex-col sm:flex-row gap-4 print:hidden">
        <Button variant="outline" asChild>
          <Link href="/account/orders" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách đơn hàng
          </Link>
        </Button>
        
        <Button variant="outline" asChild className="sm:ml-auto">
          <Link href="/contact" className="inline-flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Yêu cầu hỗ trợ
          </Link>
        </Button>
      </div>
    </div>
  )
}
