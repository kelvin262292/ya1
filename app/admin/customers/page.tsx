"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon, Eye, Download, Mail, Phone, Pencil, AlertCircle } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { mockCustomers } from "@/lib/mock-data"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Component Chi tiết khách hàng
function CustomerDetails({ customer }: { customer: any }) {
  if (!customer) return null

  // Giả lập dữ liệu giao dịch gần đây
  const recentOrders = [
    { id: "ORD00123", date: "2025-05-22", status: "Delivered", total: 149.99 },
    { id: "ORD00119", date: "2025-05-15", status: "Delivered", total: 79.50 },
    { id: "ORD00098", date: "2025-05-01", status: "Cancelled", total: 45.00 },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none h-auto p-0">
          <TabsTrigger 
            value="info" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Thông tin
          </TabsTrigger>
          <TabsTrigger 
            value="orders" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Đơn hàng
          </TabsTrigger>
        </TabsList>
        
        {/* Tab thông tin khách hàng */}
        <TabsContent value="info" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-slate-800 p-6 rounded-lg flex flex-col items-center text-center">
                <div className={`h-24 w-24 rounded-full ${customer.avatarColor} flex items-center justify-center text-white text-3xl font-medium mb-4`}>
                  {customer.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold">{customer.name}</h3>
                <p className="text-slate-400">ID: {customer.id}</p>
                
                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center gap-2 justify-center">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">{customer.phone || "(+84) 123-456-789"}</span>
                  </div>
                </div>
                
                <Separator className="my-4 bg-slate-700" />
                
                <div className="w-full grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Đơn hàng</p>
                    <p className="text-lg font-medium">{customer.orders}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Tổng chi tiêu</p>
                    <p className="text-lg font-medium">${customer.totalSpent.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Họ tên</p>
                    <p>{customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p>{customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Điện thoại</p>
                    <p>{customer.phone || "(+84) 123-456-789"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Ngày tham gia</p>
                    <p>{customer.joinedDate || "01/01/2025"}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Địa chỉ</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">Địa chỉ mặc định</p>
                      <span className="text-xs bg-sky-500 text-white px-2 py-0.5 rounded">Mặc định</span>
                    </div>
                    <p className="text-slate-300">{customer.address || "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Tab đơn hàng gần đây */}
        <TabsContent value="orders" className="pt-4">
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-850 text-slate-400 text-sm">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Mã đơn hàng</th>
                  <th className="px-6 py-4 text-left font-medium">Ngày đặt</th>
                  <th className="px-6 py-4 text-left font-medium">Trạng thái</th>
                  <th className="px-6 py-4 text-right font-medium">Tổng tiền</th>
                  <th className="px-6 py-4 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-700/30">
                    <td className="px-6 py-4">
                      <span className="text-sky-400">#{order.id}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{order.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-500 text-green-50"
                            : order.status === "Shipped"
                              ? "bg-purple-500 text-purple-50"
                              : order.status === "Processing"
                                ? "bg-blue-500 text-blue-50"
                                : order.status === "Pending"
                                  ? "bg-yellow-500 text-yellow-50"
                                  : "bg-red-500 text-red-50"
                        }`}
                      >
                        {order.status === "Delivered" 
                          ? "Đã giao hàng"
                          : order.status === "Shipped"
                            ? "Đang vận chuyển"
                            : order.status === "Processing"
                              ? "Đang xử lý"
                              : order.status === "Pending"
                                ? "Đang chờ xử lý"
                                : "Đã hủy"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-300">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-sky-400 hover:text-sky-300">
                        <Eye className="h-4 w-4 mr-1" />
                        Xem
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      
      <DialogFooter>
        <Button variant="outline" className="gap-1 bg-slate-800 border-slate-700 hover:bg-slate-700">
          <Mail className="h-4 w-4" />
          Gửi email
        </Button>
        <Button className="gap-1 bg-sky-500 hover:bg-sky-600">
          <Pencil className="h-4 w-4" />
          Chỉnh sửa
        </Button>
      </DialogFooter>
    </div>
  )
}

// Trang Customers chính
export default function CustomersPage() {
  const router = useRouter()
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  
  // Tạo bộ lọc từ dữ liệu khách hàng
  const joinedDateOptions = [
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
  ]
  
  // Xử lý xuất dữ liệu khách hàng
  const handleExport = () => {
    toast({
      title: "Xuất dữ liệu khách hàng",
      description: "Đang xuất dữ liệu khách hàng...",
    })
    // Giả lập quá trình xuất dữ liệu
    setTimeout(() => {
      toast({
        title: "Xuất dữ liệu thành công",
        description: "Dữ liệu khách hàng đã được xuất thành công.",
      })
    }, 1500)
  }
  
  // Xử lý nhập dữ liệu khách hàng
  const handleImport = () => {
    toast({
      title: "Nhập dữ liệu khách hàng",
      description: "Tính năng nhập dữ liệu đang được phát triển.",
    })
  }

  // Xử lý khi click vào một khách hàng
  const handleRowClick = (customer: any) => {
    setSelectedCustomer(customer)
  }
  
  // Xử lý xóa khách hàng
  const handleDeleteCustomer = (customerId: string) => {
    toast({
      title: "Đã xóa khách hàng",
      description: `Khách hàng với ID: ${customerId} đã được xóa thành công.`,
    })
  }

  // Xử lý thêm khách hàng mới
  const handleAddCustomer = () => {
    // Trong ứng dụng thực tế, sẽ điều hướng đến trang thêm khách hàng
    toast({
      title: "Thêm khách hàng mới",
      description: "Tính năng thêm khách hàng mới đang được phát triển.",
    })
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Khách hàng</h2>
        <Button className="bg-sky-500 hover:bg-sky-600" onClick={handleAddCustomer}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Thêm khách hàng mới
        </Button>
      </div>

      <DataTable
        data={mockCustomers}
        columns={[
          {
            id: "customer",
            header: "Khách hàng",
            accessorKey: "name",
            sortable: true,
            cell: (customer) => (
              <div className="flex items-center">
                <div
                  className={`h-10 w-10 flex-shrink-0 rounded-full ${customer.avatarColor} mr-3 flex items-center justify-center text-white font-medium`}
                >
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white">{customer.name}</div>
                  <div className="text-sm text-slate-400">ID: {customer.id}</div>
                </div>
              </div>
            ),
          },
          {
            id: "email",
            header: "Email",
            accessorKey: "email",
            sortable: true,
          },
          {
            id: "orders",
            header: "Đơn hàng",
            accessorKey: "orders",
            sortable: true,
          },
          {
            id: "totalSpent",
            header: "Tổng chi tiêu",
            accessorKey: "totalSpent",
            sortable: true,
            cell: (customer) => `$${customer.totalSpent.toFixed(2)}`,
          },
          {
            id: "lastOrder",
            header: "Đơn hàng gần nhất",
            accessorKey: "lastOrder",
            sortable: true,
          },
          {
            id: "actions",
            header: "Thao tác",
            cell: (customer) => (
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sky-400 hover:text-sky-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCustomer(customer)
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Xem
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Xóa
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-800 border-slate-700 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận xóa khách hàng</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        Bạn có chắc chắn muốn xóa khách hàng "{customer.name}"? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600">
                        Hủy bỏ
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        Xóa khách hàng
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ),
          },
        ]}
        onRowClick={handleRowClick}
        searchPlaceholder="Tìm kiếm khách hàng..."
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Modal xem chi tiết khách hàng */}
      <Dialog open={selectedCustomer !== null} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle>Chi tiết khách hàng</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Thông tin chi tiết về khách hàng {selectedCustomer.name}
                </DialogDescription>
              </DialogHeader>
              <CustomerDetails customer={selectedCustomer} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
