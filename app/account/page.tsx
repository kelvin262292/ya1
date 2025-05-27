"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowRight, CreditCard, Package, User, UserCog } from "lucide-react"

// Schema cho form thông tin cá nhân
const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" }),
  address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
})

// Schema cho form đổi mật khẩu
const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Vui lòng nhập mật khẩu hiện tại" }),
    newPassword: z.string().min(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string().min(1, { message: "Vui lòng xác nhận mật khẩu mới" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp với mật khẩu mới",
    path: ["confirmPassword"],
  })

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

// Dữ liệu người dùng mẫu
const userData = {
  id: "user-123",
  fullName: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "0912345678",
  address: "123 Đường ABC, Phường XYZ, Quận 1, Thành phố Hồ Chí Minh",
  joinDate: "2022-01-15T00:00:00Z",
  orders: 5,
  wishlist: 3,
}

// Dữ liệu đơn hàng gần đây
const recentOrders = [
  {
    id: "ORD-123456",
    date: "2023-05-20T15:30:00Z",
    status: "delivered",
    total: 37500000,
    items: 3,
  },
  {
    id: "ORD-789012",
    date: "2023-04-10T09:15:00Z",
    status: "processing",
    total: 12000000,
    items: 1,
  },
  {
    id: "ORD-345678",
    date: "2023-03-05T11:45:00Z",
    status: "delivered",
    total: 28500000,
    items: 2,
  },
]

export default function AccountPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<typeof userData | null>(null)
  const [orders, setOrders] = useState<typeof recentOrders>([])
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  
  // Form cho thông tin cá nhân
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  })
  
  // Form cho đổi mật khẩu
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  
  // Tải dữ liệu người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Thiết lập dữ liệu người dùng
        setUser(userData)
        setOrders(recentOrders)
        
        // Cập nhật giá trị mặc định cho form
        profileForm.reset({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        })
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error)
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải thông tin tài khoản. Vui lòng thử lại sau.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUserData()
  }, [profileForm])
  
  // Xử lý cập nhật thông tin cá nhân
  const onSubmitProfile = async (values: ProfileFormValues) => {
    setIsSavingProfile(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log("Cập nhật thông tin cá nhân:", values)
      
      // Cập nhật dữ liệu người dùng
      setUser(prev => prev ? { ...prev, ...values } : null)
      
      toast({
        title: "Thành công",
        description: "Thông tin cá nhân đã được cập nhật thành công.",
      })
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin cá nhân:", error)
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật thông tin cá nhân. Vui lòng thử lại sau.",
        variant: "destructive"
      })
    } finally {
      setIsSavingProfile(false)
    }
  }
  
  // Xử lý đổi mật khẩu
  const onSubmitPassword = async (values: PasswordFormValues) => {
    setIsSavingPassword(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log("Đổi mật khẩu:", values)
      
      toast({
        title: "Thành công",
        description: "Mật khẩu đã được thay đổi thành công.",
      })
      
      // Reset form
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error)
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.",
        variant: "destructive"
      })
    } finally {
      setIsSavingPassword(false)
    }
  }
  
  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã đăng xuất khỏi tài khoản.",
      })
      
      // Chuyển đến trang đăng nhập
      router.push("/")
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error)
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.",
        variant: "destructive"
      })
    }
  }
  
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
  
  // Hiển thị thông báo nếu không tìm thấy người dùng
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <User className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Không tìm thấy thông tin tài khoản</h1>
          <p className="text-gray-600 mb-6">Vui lòng đăng nhập để xem thông tin tài khoản của bạn.</p>
          <Button asChild>
            <Link href="/login">Đăng nhập</Link>
          </Button>
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
            <span className="font-medium">Tài khoản</span>
          </li>
        </ol>
      </nav>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Tài khoản của tôi</h1>
      
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
                  <CardTitle className="text-lg">{user.fullName}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-1 p-0">
              <Link 
                href="/account" 
                className="flex items-center p-3 rounded-md bg-primary/10 text-primary font-medium"
              >
                <UserCog className="mr-2 h-4 w-4" />
                <span>Thông tin tài khoản</span>
              </Link>
              <Link 
                href="/account/orders" 
                className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <Package className="mr-2 h-4 w-4" />
                <span>Đơn hàng của tôi</span>
              </Link>
              <Link 
                href="/wishlist" 
                className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Sản phẩm yêu thích</span>
              </Link>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 px-3"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tổng quan</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Tổng đơn hàng</p>
                  <p className="text-2xl font-bold">{user.orders}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Sản phẩm yêu thích</p>
                  <p className="text-2xl font-bold">{user.wishlist}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">Thành viên từ</p>
                <p className="font-medium">
                  {new Date(user.joinDate).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
            </TabsList>
            
            {/* Tab thông tin cá nhân */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>
                    Cập nhật thông tin cá nhân của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-4">
                      <FormField
                        control={profileForm.control}
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
                        control={profileForm.control}
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
                      
                      <FormField
                        control={profileForm.control}
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
                      
                      <FormField
                        control={profileForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập địa chỉ" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        disabled={isSavingProfile}
                        className="mt-2"
                      >
                        {isSavingProfile ? "Đang lưu..." : "Lưu thay đổi"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab đổi mật khẩu */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Đổi mật khẩu</CardTitle>
                  <CardDescription>
                    Cập nhật mật khẩu của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mật khẩu hiện tại</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập mật khẩu hiện tại" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mật khẩu mới</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập mật khẩu mới" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                            <FormControl>
                              <Input placeholder="Xác nhận mật khẩu mới" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        disabled={isSavingPassword}
                        className="mt-2"
                      >
                        {isSavingPassword ? "Đang lưu..." : "Cập nhật mật khẩu"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Đơn hàng gần đây */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Đơn hàng gần đây</CardTitle>
                <Button variant="link" size="sm" asChild>
                  <Link href="/account/orders" className="flex items-center">
                    Xem tất cả
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-gray-700 text-sm">
                      <tr>
                        <th className="px-4 py-3 text-left">Mã đơn hàng</th>
                        <th className="px-4 py-3 text-left">Ngày đặt</th>
                        <th className="px-4 py-3 text-center">Số lượng</th>
                        <th className="px-4 py-3 text-right">Tổng tiền</th>
                        <th className="px-4 py-3 text-center">Trạng thái</th>
                        <th className="px-4 py-3 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.map((order) => (
                        <tr key={order.id} className="text-sm">
                          <td className="px-4 py-3 font-medium">{order.id}</td>
                          <td className="px-4 py-3">
                            {new Date(order.date).toLocaleDateString("vi-VN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3 text-center">{order.items}</td>
                          <td className="px-4 py-3 text-right font-medium">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(order.total)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""}
                                ${order.status === "processing" ? "bg-yellow-100 text-yellow-800" : ""}
                                ${order.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
                              `}
                            >
                              {order.status === "delivered" && "Đã giao hàng"}
                              {order.status === "processing" && "Đang xử lý"}
                              {order.status === "cancelled" && "Đã hủy"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/account/orders/${order.id}`}>Chi tiết</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
