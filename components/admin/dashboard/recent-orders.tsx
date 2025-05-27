"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatDate } from "@/lib/utils"

// Dữ liệu mẫu
const recentOrdersData = [
  {
    id: "ORD-001",
    customerName: "Nguyễn Văn A",
    date: "2023-05-20T10:30:00Z",
    total: 25600000,
    status: "Đã giao hàng",
    items: 1
  },
  {
    id: "ORD-002",
    customerName: "Trần Thị B",
    date: "2023-05-21T09:15:00Z",
    total: 12600000,
    status: "Đang vận chuyển",
    items: 1
  },
  {
    id: "ORD-003",
    customerName: "Lê Văn C",
    date: "2023-05-22T14:30:00Z",
    total: 3590000,
    status: "Chờ xác nhận",
    items: 1
  },
  {
    id: "ORD-004",
    customerName: "Phạm Thị D",
    date: "2023-05-23T08:45:00Z",
    total: 8200000,
    status: "Đã xác nhận",
    items: 2
  },
  {
    id: "ORD-005",
    customerName: "Hoàng Văn E",
    date: "2023-05-23T11:20:00Z",
    total: 15800000,
    status: "Đang đóng gói",
    items: 3
  }
]

export function RecentOrders() {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<typeof recentOrdersData>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1200))
        
        setOrders(recentOrdersData)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng gần đây:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Hiển thị trạng thái đơn hàng
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã giao hàng":
        return <Badge className="bg-green-600">Đã giao hàng</Badge>
      case "Đang vận chuyển":
        return <Badge className="bg-blue-600">Đang vận chuyển</Badge>
      case "Đang đóng gói":
        return <Badge className="bg-orange-600">Đang đóng gói</Badge>
      case "Đã xác nhận":
        return <Badge className="bg-purple-600">Đã xác nhận</Badge>
      case "Chờ xác nhận":
        return <Badge className="bg-slate-600">Chờ xác nhận</Badge>
      case "Đã hủy":
        return <Badge className="bg-red-600">Đã hủy</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <Skeleton className="h-5 w-40 bg-slate-700" />
          <Skeleton className="h-4 w-60 bg-slate-700 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 bg-slate-700" />
                  <Skeleton className="h-4 w-24 bg-slate-700 mt-1" />
                </div>
                <Skeleton className="h-5 w-24 bg-slate-700" />
                <Skeleton className="h-8 w-20 bg-slate-700" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-full bg-slate-700" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Đơn hàng gần đây</CardTitle>
        <CardDescription className="text-slate-400">
          {orders.length} đơn hàng mới nhất đã được đặt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {order.customerName}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{order.id}</span>
                  <span>•</span>
                  <span>{formatDate(order.date)}</span>
                </div>
              </div>
              <div className="text-right mr-4">
                <p className="text-sm font-medium text-white">
                  {formatCurrency(order.total)}
                </p>
                <p className="text-xs text-slate-400">
                  {order.items} sản phẩm
                </p>
              </div>
              {getStatusBadge(order.status)}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full bg-slate-900 border-slate-700 hover:bg-slate-800 hover:text-white">
          <Link href="/admin/orders">Xem tất cả đơn hàng</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
