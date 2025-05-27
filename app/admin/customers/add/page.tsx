"use client"

import { useState } from "react"
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

export default function AddCustomerPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Xử lý submit form
  const onSubmit = async (data: CustomerFormValues) => {
    setIsSubmitting(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Thêm khách hàng thành công",
        description: `Khách hàng ${data.name} đã được thêm thành công.`,
      })
      
      // Chuyển về trang danh sách khách hàng
      router.push("/admin/customers")
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi thêm khách hàng. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin/customers" className="text-slate-400 hover:text-slate-300 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Thêm khách hàng mới</h2>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
              <CardDescription className="text-slate-400">
                Thêm thông tin chi tiết về khách hàng mới
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
              {isSubmitting ? "Đang xử lý..." : "Thêm khách hàng"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
