"use client"

import { useState, useEffect } from "react"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

// Dữ liệu mẫu
const categoryData = [
  { name: "Điện thoại", value: 48000000, color: "#3b82f6" },
  { name: "Laptop", value: 35000000, color: "#10b981" },
  { name: "Máy tính bảng", value: 15000000, color: "#a855f7" },
  { name: "Phụ kiện", value: 18000000, color: "#f59e0b" },
  { name: "Thiết bị thông minh", value: 9000000, color: "#ec4899" }
]

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-md shadow-lg">
        <p className="text-slate-200 font-medium mb-1">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.color }}>
          Doanh thu: {formatCurrency(payload[0].value)}
        </p>
        <p style={{ color: payload[0].payload.color }}>
          Tỷ trọng: {payload[0].payload.percent}%
        </p>
      </div>
    )
  }

  return null
}

// Custom Legend
const CustomLegend = (props: any) => {
  const { payload } = props
  
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <div style={{ backgroundColor: entry.color }} className="w-3 h-3 rounded-full"></div>
          <span className="text-sm text-slate-300">{entry.value}</span>
        </li>
      ))}
    </ul>
  )
}

export function CategoryChart() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<typeof categoryData>([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Tính phần trăm cho mỗi danh mục
        const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0)
        const dataWithPercent = categoryData.map(item => ({
          ...item,
          percent: Math.round((item.value / totalValue) * 100)
        }))
        
        setData(dataWithPercent)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu biểu đồ danh mục:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <Skeleton className="h-5 w-60 bg-slate-700" />
            <Skeleton className="h-4 w-40 bg-slate-700 mt-1" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full bg-slate-700 rounded-md" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Doanh thu theo danh mục</CardTitle>
        <CardDescription className="text-slate-400">
          Phân bố doanh thu theo từng danh mục sản phẩm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={({ percent }) => `${Math.round(percent * 100)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-400">Danh mục doanh thu cao nhất</p>
            <p className="text-lg font-bold text-white">
              {data.sort((a, b) => b.value - a.value)[0]?.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Tổng doanh thu</p>
            <p className="text-lg font-bold text-white">
              {formatCurrency(data.reduce((sum, item) => sum + item.value, 0))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
