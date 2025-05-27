"use client"

import { useState, useEffect } from "react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

// Dữ liệu biểu đồ mẫu
const weeklyData = [
  { name: "Thứ 2", doanhThu: 5800000, donHang: 12 },
  { name: "Thứ 3", doanhThu: 7200000, donHang: 18 },
  { name: "Thứ 4", doanhThu: 6500000, donHang: 15 },
  { name: "Thứ 5", doanhThu: 9800000, donHang: 22 },
  { name: "Thứ 6", doanhThu: 12000000, donHang: 28 },
  { name: "Thứ 7", doanhThu: 15500000, donHang: 35 },
  { name: "CN", doanhThu: 8900000, donHang: 20 },
]

const monthlyData = [
  { name: "T1", doanhThu: 85000000, donHang: 180 },
  { name: "T2", doanhThu: 72000000, donHang: 155 },
  { name: "T3", doanhThu: 91000000, donHang: 210 },
  { name: "T4", doanhThu: 86000000, donHang: 185 },
  { name: "T5", doanhThu: 110000000, donHang: 240 },
  { name: "T6", doanhThu: 125000000, donHang: 270 },
  { name: "T7", doanhThu: 105000000, donHang: 230 },
  { name: "T8", doanhThu: 95000000, donHang: 200 },
  { name: "T9", doanhThu: 118000000, donHang: 250 },
  { name: "T10", doanhThu: 135000000, donHang: 290 },
  { name: "T11", doanhThu: 150000000, donHang: 320 },
  { name: "T12", doanhThu: 195000000, donHang: 410 },
]

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-md shadow-lg">
        <p className="text-slate-200 font-medium mb-1">{label}</p>
        <p className="text-green-500 text-sm">
          Doanh thu: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-blue-500 text-sm">
          Đơn hàng: {payload[1].value}
        </p>
      </div>
    )
  }

  return null
}

export function SalesChart() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week")
  const [chartData, setChartData] = useState(weeklyData)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setChartData(timeRange === "week" ? weeklyData : monthlyData)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
  }

  // Tính tổng doanh thu và đơn hàng
  const totalRevenue = chartData.reduce((sum, item) => sum + item.doanhThu, 0)
  const totalOrders = chartData.reduce((sum, item) => sum + item.donHang, 0)

  if (isLoading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <Skeleton className="h-5 w-40 bg-slate-700" />
            <Skeleton className="h-4 w-60 bg-slate-700 mt-1" />
          </div>
          <Skeleton className="h-9 w-28 bg-slate-700" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full bg-slate-700 rounded-md" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-white">Biểu đồ doanh thu và đơn hàng</CardTitle>
          <CardDescription className="text-slate-400">
            {timeRange === "week" 
              ? "Thống kê trong tuần này" 
              : "Thống kê trong năm nay"}
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={handleTimeRangeChange}
        >
          <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700 text-white">
            <SelectValue placeholder="Chọn thời gian" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700 text-white">
            <SelectItem value="week">Trong tuần</SelectItem>
            <SelectItem value="month">Trong năm</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-400">Tổng doanh thu</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Tổng đơn hàng</p>
            <p className="text-2xl font-bold text-white">{totalOrders}</p>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorDoanhThu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDonHang" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="name" 
                axisLine={{ stroke: '#334155' }} 
                tickLine={{ stroke: '#334155' }}
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={{ stroke: '#334155' }} 
                tickLine={{ stroke: '#334155' }}
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => formatCurrency(value).split(' ')[0]}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={{ stroke: '#334155' }} 
                tickLine={{ stroke: '#334155' }}
                tick={{ fill: '#94a3b8' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => {
                  return <span style={{ color: '#e2e8f0' }}>{value}</span>
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="doanhThu"
                name="Doanh thu"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDoanhThu)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="donHang"
                name="Đơn hàng"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDonHang)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
