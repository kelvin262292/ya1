"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

// Định nghĩa schema cho form
const customerSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" }).optional(),
  address: z.string().min(10, { message: "Địa chỉ phải có ít nhất 10 ký tự" }).optional(),
  notes: z.string().optional(),
})

// Định nghĩa kiểu dữ liệu từ schema
type CustomerFormValues = z.infer<typeof customerSchema>

// Mock data
const customers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    notes: "Khách hàng thân thiết",
    createdAt: "2023-01-15T08:00:00Z",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    notes: "Khách hàng mới",
    createdAt: "2023-02-20T10:30:00Z",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0901234567",
    address: "789 Đường DEF, Quận 3, TP.HCM",
    notes: "",
    createdAt: "2023-03-10T14:45:00Z",
  },
]

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customer, setCustomer] = useState<(typeof customers)[0] | null>(null)

  // Khởi tạo form với react-hook-form và zod
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
  })

  // Tải dữ liệu khách hàng
  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Tìm khách hàng trong mock data
        const foundCustomer = customers.find(c => c.id === params.id)
        
        if (foundCustomer) {
          setCustomer(foundCustomer)
          
          // Cập nhật giá trị mặc định cho form
          form.reset({
            name: foundCustomer.name,
            email: foundCustomer.email,
            phone: foundCustomer.phone || "",
            address: foundCustomer.address || "",
            notes: foundCustomer.notes || "",
          })
        } else {
          toast({
            title: "Lỗi",
            description: "Không tìm thấy thông tin khách hàng.",
            variant: "destructive",
          })
          router.push("/admin/customers")
        }
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải thông tin khách hàng.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomer()
  }, [params.id, router, form])

  // Xử lý submit form
  const onSubmit = async (data: CustomerFormValues) => {
    setIsSubmitting(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Cập nhật thành công",
        description: `Thông tin khách hàng ${data.name} đã được cập nhật.`,
      })
      
      // Chuyển về trang danh sách khách hàng
      router.push("/admin/customers")
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật thông tin khách hàng. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/admin/customers" className="text-slate-400 hover:text-slate-300 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Skeleton className="h-8 w-64 bg-slate-700" />
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-slate-700" />
            <Skeleton className="h-4 w-64 bg-slate-700" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-slate-700" />
              <Skeleton className="h-24 w-full bg-slate-700" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-slate-700" />
              <Skeleton className="h-24 w-full bg-slate-700" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Skeleton className="h-10 w-24 bg-slate-700" />
          <Skeleton className="h-10 w-40 bg-slate-700" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin/customers" className="text-slate-400 hover:text-slate-300 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Chỉnh sửa khách hàng</h2>
        </div>
      </div>

      {customer && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Thông tin khách hàng</CardTitle>
                <CardDescription className="text-slate-400">
                  Chỉnh sửa thông tin chi tiết về khách hàng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên khách hàng</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nhập tên khách hàng" 
                            className="bg-slate-900 border-slate-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="example@mail.com" 
                            type="email"
                            className="bg-slate-900 border-slate-700 text-white"
                            {...field} 
                          />
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
                          <Input 
                            placeholder="Nhập số điện thoại" 
                            className="bg-slate-900 border-slate-700 text-white"
                            {...field} 
                          />
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
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Nhập địa chỉ khách hàng" 
                          className="bg-slate-900 border-slate-700 text-white"
                          rows={3}
                          {...field} 
                        />
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
                          placeholder="Thêm ghi chú về khách hàng (tuỳ chọn)" 
                          className="bg-slate-900 border-slate-700 text-white"
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

            <div className="flex justify-end gap-3">
              <Button variant="outline" asChild className="bg-slate-800 border-slate-700 hover:bg-slate-700">
                <Link href="/admin/customers">Huỷ bỏ</Link>
              </Button>
              <Button 
                type="submit" 
                className="bg-sky-500 hover:bg-sky-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
