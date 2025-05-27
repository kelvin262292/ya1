"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

interface AnalyticsCardProps {
  title: string
  value: string
  icon: React.ReactNode
  change: number
  description: string
}

export function AnalyticsCard({ title, value, icon, change, description }: AnalyticsCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
          </div>
          <div className="h-12 w-12 rounded-lg bg-slate-700 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {change > 0 ? (
            <span className="inline-flex items-center text-green-500 text-sm font-medium">
              <ArrowUp className="mr-1 h-3 w-3" />
              {change}%
            </span>
          ) : (
            <span className="inline-flex items-center text-red-500 text-sm font-medium">
              <ArrowDown className="mr-1 h-3 w-3" />
              {Math.abs(change)}%
            </span>
          )}
          <span className="ml-2 text-sm text-slate-400">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function AnalyticsCardSkeleton() {
  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-4 w-24 bg-slate-700" />
            <Skeleton className="h-8 w-32 bg-slate-700 mt-2" />
          </div>
          <Skeleton className="h-12 w-12 rounded-lg bg-slate-700" />
        </div>
        <div className="mt-4 flex items-center">
          <Skeleton className="h-4 w-16 bg-slate-700" />
          <Skeleton className="h-4 w-32 bg-slate-700 ml-2" />
        </div>
      </CardContent>
    </Card>
  )
}

export function AnalyticsCards() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    revenueChange: 0,
    ordersChange: 0,
    customersChange: 0,
    productsChange: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setData({
          totalRevenue: 125000000,
          totalOrders: 48,
          totalCustomers: 32,
          totalProducts: 75,
          revenueChange: 12.5,
          ordersChange: 8.2,
          customersChange: 15.3,
          productsChange: -3.7
        })
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thống kê:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCardSkeleton />
        <AnalyticsCardSkeleton />
        <AnalyticsCardSkeleton />
        <AnalyticsCardSkeleton />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        title="Tổng doanh thu"
        value={formatCurrency(data.totalRevenue)}
        icon={<DollarSign className="h-6 w-6 text-green-500" />}
        change={data.revenueChange}
        description="so với tháng trước"
      />
      <AnalyticsCard
        title="Tổng đơn hàng"
        value={data.totalOrders.toString()}
        icon={<ShoppingCart className="h-6 w-6 text-blue-500" />}
        change={data.ordersChange}
        description="so với tháng trước"
      />
      <AnalyticsCard
        title="Tổng khách hàng"
        value={data.totalCustomers.toString()}
        icon={<Users className="h-6 w-6 text-purple-500" />}
        change={data.customersChange}
        description="so với tháng trước"
      />
      <AnalyticsCard
        title="Tổng sản phẩm"
        value={data.totalProducts.toString()}
        icon={<Package className="h-6 w-6 text-orange-500" />}
        change={data.productsChange}
        description="so với tháng trước"
      />
    </div>
  )
}
