"use client"

import { useState } from "react"
import { Eye, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import { mockOrders } from "@/lib/mock-data"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Component Chi tiết đơn hàng
function OrderDetails({ order }: { order: any }) {
  if (!order) return null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Mã đơn hàng:</span>
              <span className="font-medium text-sky-400">#{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Ngày đặt hàng:</span>
              <span>{order.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Trạng thái:</span>
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
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
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Phương thức thanh toán:</span>
              <span>{order.paymentMethod || "Thẻ tín dụng"}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Thông tin khách hàng</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Tên khách hàng:</span>
              <span>{order.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email:</span>
              <span>{order.email || "customer@example.com"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Điện thoại:</span>
              <span>{order.phone || "(+84) 123-456-789"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Địa chỉ:</span>
              <span>{order.address || "123 Đường ABC, Quận 1, TP.HCM"}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Sản phẩm</h3>
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-850 text-slate-400 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Sản phẩm</th>
                <th className="px-4 py-3 text-center">Số lượng</th>
                <th className="px-4 py-3 text-right">Giá</th>
                <th className="px-4 py-3 text-right">Tổng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {/* Giả lập các sản phẩm trong đơn hàng */}
              <tr>
                <td className="px-4 py-3">Google Nest Mini</td>
                <td className="px-4 py-3 text-center">2</td>
                <td className="px-4 py-3 text-right">$49.00</td>
                <td className="px-4 py-3 text-right">$98.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Smart Light Bulb</td>
                <td className="px-4 py-3 text-center">3</td>
                <td className="px-4 py-3 text-right">$15.99</td>
                <td className="px-4 py-3 text-right">$47.97</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-850">
              <tr>
                <td colSpan={2}></td>
                <td className="px-4 py-3 text-right font-medium">Tạm tính:</td>
                <td className="px-4 py-3 text-right">${(order.total - 5).toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={2}></td>
                <td className="px-4 py-3 text-right font-medium">Phí vận chuyển:</td>
                <td className="px-4 py-3 text-right">$5.00</td>
              </tr>
              <tr>
                <td colSpan={2}></td>
                <td className="px-4 py-3 text-right font-medium">Tổng cộng:</td>
                <td className="px-4 py-3 text-right font-bold">${order.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="gap-1 bg-slate-800 border-slate-700 hover:bg-slate-700">
          <FileText className="h-4 w-4" />
          In hóa đơn
        </Button>
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  
  // Các trạng thái đơn hàng
  const statusOptions = [
    { value: "Pending", label: "Đang chờ xử lý" },
    { value: "Processing", label: "Đang xử lý" },
    { value: "Shipped", label: "Đang vận chuyển" },
    { value: "Delivered", label: "Đã giao hàng" },
    { value: "Cancelled", label: "Đã hủy" },
  ]

  // Xử lý xuất dữ liệu đơn hàng
  const handleExport = () => {
    toast({
      title: "Xuất dữ liệu đơn hàng",
      description: "Đang xuất dữ liệu đơn hàng...",
    })
    // Giả lập quá trình xuất dữ liệu
    setTimeout(() => {
      toast({
        title: "Xuất dữ liệu thành công",
        description: "Dữ liệu đơn hàng đã được xuất thành công.",
      })
    }, 1500)
  }

  // Xử lý khi click vào một đơn hàng
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
  }

  // Cập nhật trạng thái đơn hàng (chức năng giả lập)
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Cập nhật trạng thái",
      description: `Đã cập nhật đơn hàng #${orderId} sang trạng thái: ${newStatus}`,
    })
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Đơn hàng</h2>
      </div>

      <DataTable
        data={mockOrders}
        columns={[
          {
            id: "id",
            header: "Mã đơn hàng",
            accessorKey: "id",
            sortable: true,
            cell: (order) => <span className="text-sky-400">#{order.id}</span>,
          },
          {
            id: "customer",
            header: "Khách hàng",
            accessorKey: "customer",
            sortable: true,
          },
          {
            id: "date",
            header: "Ngày đặt hàng",
            accessorKey: "date",
            sortable: true,
          },
          {
            id: "total",
            header: "Tổng tiền",
            accessorKey: "total",
            sortable: true,
            cell: (order) => `$${order.total.toFixed(2)}`,
          },
          {
            id: "status",
            header: "Trạng thái",
            accessorKey: "status",
            sortable: true,
            filterable: true,
            filterOptions: statusOptions,
            cell: (order) => (
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
            ),
          },
          {
            id: "actions",
            header: "Thao tác",
            cell: (order) => (
              <div className="flex justify-end gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sky-400 hover:text-sky-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedOrder(order)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Xem chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Chi tiết đơn hàng #{order.id}</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Thông tin chi tiết về đơn hàng #{order.id}
                      </DialogDescription>
                    </DialogHeader>
                    <OrderDetails order={order} />
                  </DialogContent>
                </Dialog>
              </div>
            ),
          },
        ]}
        onRowClick={handleViewOrder}
        searchPlaceholder="Tìm kiếm đơn hàng..."
        onExport={handleExport}
      />

      {/* Modal xem chi tiết đơn hàng khi click vào hàng */}
      <Dialog open={selectedOrder !== null} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Chi tiết đơn hàng #{selectedOrder.id}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Thông tin chi tiết về đơn hàng #{selectedOrder.id}
                </DialogDescription>
              </DialogHeader>
              <OrderDetails order={selectedOrder} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
