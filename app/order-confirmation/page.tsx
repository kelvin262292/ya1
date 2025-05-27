"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { ArrowRight, Check, Clock, Copy, MapPin, Package, Printer, ShoppingBag } from "lucide-react"
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

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered"
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  paymentMethod: string
  shippingAddress: {
    fullName: string
    phone: string
    email: string
    address: string
    province: string
    district: string
    ward: string
  }
}

// Mẫu dữ liệu đơn hàng
const orderData: Order = {
  id: "ORD-123456",
  date: "2023-05-20T15:30:00",
  status: "processing",
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
  shippingAddress: {
    fullName: "Nguyễn Văn A",
    phone: "0912345678",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC",
    province: "Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Nghé"
  }
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<Order | null>(null)
  
  // Lấy thông tin đơn hàng từ API
  useEffect(() => {
    const fetchOrderData = async () => {
      setIsLoading(true)
      try {
        // Trong thực tế sẽ lấy orderId từ searchParams và gọi API
        // const orderId = searchParams.get("id") || ""
        
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
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
    
    fetchOrderData()
  }, [searchParams])
  
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
  
  // In đơn hàng
  const printOrder = () => {
    window.print()
  }

  // Hiển thị skeleton khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Hiển thị thông báo lỗi nếu không tìm thấy đơn hàng
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <Package className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Không tìm thấy đơn hàng</h1>
          <p className="text-gray-600 mb-6">Rất tiếc, chúng tôi không thể tìm thấy thông tin đơn hàng mà bạn yêu cầu.</p>
          <Button asChild>
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Thông báo xác nhận đơn hàng */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Đặt hàng thành công!</h1>
        <p className="text-gray-600">
          Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          {/* Thông tin đơn hàng */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div>
              <h2 className="font-bold text-lg mb-2">Thông tin đơn hàng</h2>
              <div className="flex items-center">
                <p className="text-gray-700 mr-2">Mã đơn hàng: <span className="font-medium">{order.id}</span></p>
                <button 
                  onClick={copyOrderId}
                  className="text-primary hover:text-primary/80"
                  aria-label="Sao chép mã đơn hàng"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <p className="text-gray-700">
                Ngày đặt hàng: {new Date(order.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
              <p className="text-gray-700">
                Phương thức thanh toán: {order.paymentMethod}
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end">
              <div className="flex items-center mb-2">
                <div className="mr-2 px-3 py-1 rounded-full text-xs font-medium
                  bg-yellow-100 text-yellow-800">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Đang xử lý
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={printOrder}
                >
                  <Printer className="h-3 w-3 mr-1" />
                  In đơn hàng
                </Button>
              </div>
              <Link href="/account/orders" className="text-primary text-sm hover:underline flex items-center">
                Xem đơn hàng trong tài khoản của bạn
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Danh sách sản phẩm */}
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">Sản phẩm</th>
                    <th className="px-4 py-3 text-right">Giá</th>
                    <th className="px-4 py-3 text-center">Số lượng</th>
                    <th className="px-4 py-3 text-right">Tổng</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.items.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-3">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {item.variants && item.variants.length > 0 && (
                              <p className="text-xs text-gray-500">
                                {item.variants.map((variant, index) => (
                                  <span key={index}>
                                    {variant.name}: {variant.value}
                                    {index < item.variants!.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-3 text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Thông tin vận chuyển và tổng tiền */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Địa chỉ giao hàng */}
            <div>
              <h3 className="font-bold text-sm mb-3 flex items-center">
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
            
            {/* Tổng quan đơn hàng */}
            <div>
              <h3 className="font-bold text-sm mb-3 flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Tổng quan đơn hàng
              </h3>
              <div className="p-4 border rounded-lg">
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
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 px-6 pb-6">
          <Button asChild>
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/orders">Xem đơn hàng của tôi</Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Thông tin thêm */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Bạn có thắc mắc về đơn hàng?</p>
        <Link href="/contact" className="text-primary hover:underline text-sm">
          Liên hệ với chúng tôi để được hỗ trợ
        </Link>
      </div>
    </div>
  )
}