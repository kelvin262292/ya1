"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, CreditCard, Landmark, MapPin, Truck, Wallet } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variants?: { name: string; value: string }[]
}

// Dữ liệu mẫu cho giỏ hàng
const cartItems: CartItem[] = [
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
]

// Tính toán tổng tiền
const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shippingFee = 50000 // Phí vận chuyển mẫu
const discount = 2500000 // Giảm giá mẫu
const total = subtotal + shippingFee - discount

// Phương thức thanh toán
const paymentMethods = [
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng (COD)",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
    icon: <Truck className="h-5 w-5" />
  },
  {
    id: "bank-transfer",
    name: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản qua tài khoản ngân hàng",
    icon: <Landmark className="h-5 w-5" />
  },
  {
    id: "credit-card",
    name: "Thẻ tín dụng/ghi nợ",
    description: "Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ",
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: "e-wallet",
    name: "Ví điện tử",
    description: "Thanh toán qua ví điện tử (MoMo, ZaloPay, VNPay)",
    icon: <Wallet className="h-5 w-5" />
  }
]

// Schema cho form thanh toán
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" }),
  address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
  province: z.string().min(1, { message: "Vui lòng chọn tỉnh/thành phố" }),
  district: z.string().min(1, { message: "Vui lòng chọn quận/huyện" }),
  ward: z.string().min(1, { message: "Vui lòng chọn phường/xã" }),
  paymentMethod: z.string().min(1, { message: "Vui lòng chọn phương thức thanh toán" }),
  notes: z.string().optional(),
})

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Dữ liệu cho các dropdown tỉnh/thành, quận/huyện, phường/xã
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([])
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([])
  const [wards, setWards] = useState<{ id: string; name: string }[]>([])
  
  // Form thanh toán
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      province: "",
      district: "",
      ward: "",
      paymentMethod: "cod",
      notes: "",
    },
  })
  
  // Xử lý khi chọn tỉnh/thành
  const handleProvinceChange = (provinceId: string) => {
    form.setValue("province", provinceId)
    form.setValue("district", "")
    form.setValue("ward", "")
    
    // Trong thực tế, sẽ gọi API để lấy danh sách quận/huyện theo tỉnh/thành
    setDistricts([
      { id: "district-1", name: "Quận 1" },
      { id: "district-2", name: "Quận 2" },
      { id: "district-3", name: "Quận 3" },
      { id: "district-4", name: "Quận 4" },
    ])
    
    setWards([])
  }
  
  // Xử lý khi chọn quận/huyện
  const handleDistrictChange = (districtId: string) => {
    form.setValue("district", districtId)
    form.setValue("ward", "")
    
    // Trong thực tế, sẽ gọi API để lấy danh sách phường/xã theo quận/huyện
    setWards([
      { id: "ward-1", name: "Phường 1" },
      { id: "ward-2", name: "Phường 2" },
      { id: "ward-3", name: "Phường 3" },
      { id: "ward-4", name: "Phường 4" },
    ])
  }
  
  // Tải dữ liệu ban đầu
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Tải danh sách tỉnh/thành
        setProvinces([
          { id: "province-1", name: "Hồ Chí Minh" },
          { id: "province-2", name: "Hà Nội" },
          { id: "province-3", name: "Đà Nẵng" },
          { id: "province-4", name: "Hải Phòng" },
          { id: "province-5", name: "Cần Thơ" },
        ])
        
        // Kiểm tra giỏ hàng có sản phẩm không
        if (cartItems.length === 0) {
          toast({
            title: "Giỏ hàng trống",
            description: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
            variant: "destructive"
          })
          router.push("/cart")
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error)
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    initData()
  }, [router])
  
  // Xử lý đặt hàng
  const onSubmit = async (values: CheckoutFormValues) => {
    setIsSubmitting(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Form values:", values)
      
      // Chuyển đến trang xác nhận đơn hàng
      toast({
        title: "Đặt hàng thành công",
        description: "Đơn hàng của bạn đã được đặt thành công.",
      })
      
      router.push("/order-confirmation")
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error)
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-6 w-64" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
          
          <div>
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
            <Link href="/cart" className="text-gray-500 hover:text-gray-900">Giỏ hàng</Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <span className="font-medium">Thanh toán</span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Thanh toán</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Thông tin giao hàng */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Thông tin giao hàng
                  </CardTitle>
                  <CardDescription>
                    Nhập thông tin chi tiết để giao hàng
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập họ tên" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập số điện thoại" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tỉnh/Thành phố</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={field.value}
                              onChange={(e) => handleProvinceChange(e.target.value)}
                            >
                              <option value="">Chọn tỉnh/thành phố</option>
                              {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                  {province.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quận/Huyện</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={field.value}
                              onChange={(e) => handleDistrictChange(e.target.value)}
                              disabled={!form.getValues("province")}
                            >
                              <option value="">Chọn quận/huyện</option>
                              {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                  {district.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phường/Xã</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={field.value}
                              onChange={(e) => form.setValue("ward", e.target.value)}
                              disabled={!form.getValues("district")}
                            >
                              <option value="">Chọn phường/xã</option>
                              {wards.map((ward) => (
                                <option key={ward.id} value={ward.id}>
                                  {ward.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ cụ thể</FormLabel>
                        <FormControl>
                          <Input placeholder="Số nhà, tên đường, tòa nhà..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ghi chú</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng hoặc địa điểm giao hàng chi tiết..." 
                            className="resize-none" 
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Phương thức thanh toán */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Phương thức thanh toán
                  </CardTitle>
                  <CardDescription>
                    Chọn phương thức thanh toán phù hợp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-4"
                          >
                            {paymentMethods.map((method) => (
                              <div 
                                key={method.id} 
                                className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all
                                  ${field.value === method.id ? "border-primary bg-primary/5" : ""}
                                `}
                                onClick={() => form.setValue("paymentMethod", method.id)}
                              >
                                <RadioGroupItem value={method.id} id={method.id} />
                                <div className="flex items-center space-x-2 flex-1">
                                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                                    {method.icon}
                                  </div>
                                  <div>
                                    <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                      {method.name}
                                    </Label>
                                    <p className="text-sm text-gray-500">{method.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Hiển thị thông tin thêm dựa trên phương thức thanh toán */}
                  {form.watch("paymentMethod") === "bank-transfer" && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Thông tin chuyển khoản</h4>
                      <p className="text-sm">Ngân hàng: <span className="font-medium">VCB - Vietcombank</span></p>
                      <p className="text-sm">Số tài khoản: <span className="font-medium">1234567890</span></p>
                      <p className="text-sm">Chủ tài khoản: <span className="font-medium">CÔNG TY TNHH YAPEE</span></p>
                      <p className="text-sm">Nội dung: <span className="font-medium">Thanh toán đơn hàng [Họ tên]</span></p>
                      <p className="text-sm mt-2">Vui lòng chuyển khoản trong vòng 24h sau khi đặt hàng.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Nút quay lại và đặt hàng */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/cart" className="inline-flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại giỏ hàng
                  </Link>
                </Button>
                <Button 
                  type="submit" 
                  className="sm:ml-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Tổng quan đơn hàng */}
        <div>
          <Card className="sticky top-8">
            <CardHeader className="pb-2">
              <CardTitle>Tổng quan đơn hàng</CardTitle>
              <CardDescription>
                {cartItems.length} sản phẩm trong giỏ hàng
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <Accordion type="single" collapsible defaultValue="items">
                <AccordionItem value="items" className="border-b-0">
                  <AccordionTrigger>Chi tiết sản phẩm</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            {item.variants && item.variants.length > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                {item.variants.map((variant, index) => (
                                  <span key={index}>
                                    {variant.name}: {variant.value}
                                    {index < item.variants!.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex justify-between mt-1">
                              <span className="text-sm">{formatCurrency(item.price)} x {item.quantity}</span>
                              <span className="font-medium text-sm">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="space-y-3 py-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span>{formatCurrency(shippingFee)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
