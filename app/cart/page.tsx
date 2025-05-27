"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
interface CartItem {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  image: string
  quantity: number
  variants?: { name: string; value: string }[]
}

// Dữ liệu mẫu cho giỏ hàng
const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Laptop Gaming XYZ",
    price: 25000000,
    originalPrice: 28000000,
    discount: 10,
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
    originalPrice: 15000000,
    discount: 20,
    image: "https://placehold.co/600x400",
    quantity: 2,
    variants: [
      { name: "Màu sắc", value: "Đen" },
      { name: "Bộ nhớ trong", value: "256GB" }
    ]
  }
]

export default function CartPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [isUpdatingCart, setIsUpdatingCart] = useState(false)
  
  // Tính toán tổng tiền
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal > 0 ? 50000 : 0 // Phí vận chuyển mẫu
  const total = subtotal + shippingFee - promoDiscount
  
  // Tải dữ liệu giỏ hàng
  useEffect(() => {
    const fetchCartData = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Trong thực tế, dữ liệu sẽ được lấy từ API hoặc local storage
        setCartItems(initialCartItems)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu giỏ hàng:", error)
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải giỏ hàng. Vui lòng thử lại sau.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchCartData()
  }, [])
  
  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id: string, newQuantity: number) => {
    // Đảm bảo số lượng không âm và không quá 99
    if (newQuantity < 1 || newQuantity > 99) return
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }
  
  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    toast({
      title: "Đã xóa sản phẩm",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng."
    })
  }
  
  // Áp dụng mã giảm giá
  const applyPromoCode = async () => {
    if (!promoCode.trim()) return
    
    setIsApplyingPromo(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Kiểm tra mã giảm giá (mã mẫu: WELCOME10)
      if (promoCode.toUpperCase() === "WELCOME10") {
        // Giảm 10% tổng tiền hàng
        const discount = Math.round(subtotal * 0.1)
        setPromoDiscount(discount)
        toast({
          title: "Áp dụng mã giảm giá thành công",
          description: `Bạn được giảm ${formatCurrency(discount)}.`
        })
      } else {
        setPromoDiscount(0)
        toast({
          title: "Mã giảm giá không hợp lệ",
          description: "Vui lòng kiểm tra lại mã giảm giá.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Lỗi khi áp dụng mã giảm giá:", error)
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi áp dụng mã giảm giá. Vui lòng thử lại sau.",
        variant: "destructive"
      })
    } finally {
      setIsApplyingPromo(false)
    }
  }
  
  // Cập nhật giỏ hàng
  const updateCart = async () => {
    setIsUpdatingCart(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Cập nhật giỏ hàng thành công",
        description: "Giỏ hàng đã được cập nhật."
      })
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error)
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật giỏ hàng. Vui lòng thử lại sau.",
        variant: "destructive"
      })
    } finally {
      setIsUpdatingCart(false)
    }
  }
  
  // Tiếp tục thanh toán
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
        variant: "destructive"
      })
      return
    }
    
    router.push("/checkout")
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
            <span className="font-medium">Giỏ hàng</span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex gap-4 border rounded-lg p-4">
                <Skeleton className="h-24 w-24 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-6 w-24 ml-auto" />
                  <Skeleton className="h-8 w-24 ml-auto" />
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <ShoppingBag className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-medium mb-2">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.</p>
          <Button asChild>
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Danh sách sản phẩm trong giỏ hàng */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                {/* Hình ảnh sản phẩm */}
                <div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                
                {/* Thông tin sản phẩm */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">
                      <Link href={`/products/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-500"
                      aria-label="Xóa sản phẩm"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Biến thể sản phẩm */}
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
                  
                  {/* Giá sản phẩm */}
                  <div className="mt-1">
                    <span className="font-medium text-primary">
                      {formatCurrency(item.price)}
                    </span>
                    {item.discount > 0 && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {/* Số lượng sản phẩm */}
                  <div className="flex items-center mt-2">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center border-x py-1 text-sm"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-sm text-gray-600 hover:text-red-500 inline-flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Xóa</span>
                    </button>
                    
                    {/* Tổng tiền mỗi sản phẩm hiển thị ở màn hình lớn */}
                    <div className="ml-auto hidden sm:block">
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Tổng tiền mỗi sản phẩm hiển thị ở màn hình nhỏ */}
                  <div className="mt-2 sm:hidden">
                    <span className="font-medium">
                      Tổng: {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Nút cập nhật giỏ hàng và tiếp tục mua sắm */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                variant="outline"
                onClick={updateCart}
                disabled={isUpdatingCart}
              >
                {isUpdatingCart ? "Đang cập nhật..." : "Cập nhật giỏ hàng"}
              </Button>
              <Button variant="link" asChild>
                <Link href="/products" className="inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Tiếp tục mua sắm
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Tổng quan giỏ hàng */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Tổng quan đơn hàng</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>{formatCurrency(shippingFee)}</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-{formatCurrency(promoDiscount)}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold">
                    <span>Tổng cộng</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
                
                {/* Mã giảm giá */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Mã giảm giá</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nhập mã giảm giá"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={applyPromoCode}
                      disabled={isApplyingPromo || !promoCode.trim()}
                    >
                      {isApplyingPromo ? "Đang áp dụng..." : "Áp dụng"}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Nhập mã "WELCOME10" để được giảm 10%
                  </p>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button 
                  className="w-full"
                  onClick={proceedToCheckout}
                  disabled={cartItems.length === 0}
                >
                  Tiến hành thanh toán
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
