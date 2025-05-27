"use client"

import { StatCard } from "@/components/admin/stat-card"
import { ChartCard } from "@/components/admin/chart-card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useState } from "react"

// Mock data for charts
const userActivityData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1100 },
]

const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 8000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 9500 },
  { name: "Jul", value: 11000 },
]

const deviceUsageData = [
  { name: "Desktop", value: 45 },
  { name: "Mobile", value: 40 },
  { name: "Tablet", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export default function AdminDashboard() {
  // State for chart types
  const [userActivityChartType, setUserActivityChartType] = useState<"line" | "bar" | "area">("line")
  const [revenueChartType, setRevenueChartType] = useState<"bar" | "line" | "area">("bar")
  
  // Mock data refresh functions
  const refreshUsers = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    const randomValue = Math.floor(12000 + Math.random() * 1000)
    const randomChange = (5 + Math.random() * 10).toFixed(1)
    return {
      value: randomValue.toLocaleString(),
      change: `+${randomChange}%`,
      isPositive: true
    }
  }
  
  const refreshRevenue = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    const randomValue = Math.floor(30000 + Math.random() * 10000)
    const randomChange = (5 + Math.random() * 10).toFixed(1)
    return {
      value: `$${randomValue.toLocaleString()}`,
      change: `+${randomChange}%`,
      isPositive: true
    }
  }
  
  const refreshOrders = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    const randomValue = Math.floor(1000 + Math.random() * 500)
    const randomChange = (2 + Math.random() * 8).toFixed(1)
    return {
      value: randomValue.toLocaleString(),
      change: `+${randomChange}%`,
      isPositive: true
    }
  }
  
  const refreshConversion = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    const randomValue = (2.5 + Math.random() * 1.5).toFixed(1)
    const randomChange = (-1 + Math.random() * 2).toFixed(1)
    const isPositive = parseFloat(randomChange) >= 0
    return {
      value: `${randomValue}%`,
      change: `${isPositive ? '+' : ''}${randomChange}%`,
      isPositive
    }
  }
  
  // Render chart based on selected chart type
  const renderUserActivityChart = () => {
    switch (userActivityChartType) {
      case "line":
        return (
          <LineChart data={userActivityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#64748B" strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#94A3B8" }} />
            <YAxis tick={{ fill: "#94A3B8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderColor: "#334155",
                color: "#F1F5F9",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#38BDF8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )
      
      case "bar":
        return (
          <BarChart data={userActivityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#64748B" strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#94A3B8" }} />
            <YAxis tick={{ fill: "#94A3B8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderColor: "#334155",
                color: "#F1F5F9",
              }}
            />
            <Bar dataKey="value" fill="#38BDF8" radius={[4, 4, 0, 0]} />
          </BarChart>
        )
        
      case "area":
        return (
          <AreaChart data={userActivityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#64748B" strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#94A3B8" }} />
            <YAxis tick={{ fill: "#94A3B8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderColor: "#334155",
                color: "#F1F5F9",
              }}
            />
            <Area type="monotone" dataKey="value" fill="#38BDF8" fillOpacity={0.2} stroke="#38BDF8" />
          </AreaChart>
        )
    }
  }
  
  // Render revenue chart based on selected chart type
  const renderRevenueChart = () => {
    switch (revenueChartType) {
      case "bar":
        return (
          <BarChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#64748B" strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#94A3B8" }} />
            <YAxis tick={{ fill: "#94A3B8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderColor: "#334155",
                color: "#F1F5F9",
              }}
            />
            <Bar dataKey="value" fill="#64748B" radius={[4, 4, 0, 0]} />
          </BarChart>
        )
        
      case "line":
        return (
          <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#64748B" strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#94A3B8" }} />
            <YAxis tick={{ fill: "#94A3B8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderColor: "#334155",
                color: "#F1F5F9",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#64748B"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )
        
      case "area":
        return (
          <AreaChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#64748B" strokeOpacity={0.1} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#94A3B8" }} />
            <YAxis tick={{ fill: "#94A3B8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderColor: "#334155",
                color: "#F1F5F9",
              }}
            />
            <Area type="monotone" dataKey="value" fill="#64748B" fillOpacity={0.2} stroke="#64748B" />
          </AreaChart>
        )
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Users" 
          value="12,345" 
          change="+12.5%" 
          isPositive={true} 
          detailLink="/admin/analytics#users"
          detailLinkText="User report"
          onRefresh={refreshUsers}
        />
        <StatCard 
          title="Revenue" 
          value="$34,567" 
          change="+8.2%" 
          isPositive={true} 
          detailLink="/admin/analytics#revenue"
          detailLinkText="Revenue details"
          onRefresh={refreshRevenue}
        />
        <StatCard 
          title="Orders" 
          value="1,234" 
          change="+5.3%" 
          isPositive={true}
          detailLink="/admin/orders" 
          onRefresh={refreshOrders}
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.2%" 
          change="-0.5%" 
          isPositive={false} 
          detailLink="/admin/analytics#conversion"
          onRefresh={refreshConversion}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="User Activity" 
          value="1,245" 
          subtitle="+15.3% from last month" 
          isPositive={true}
          chartTypes={["line", "bar", "area"]}
          defaultChartType="line"
          onChartTypeChange={(type) => setUserActivityChartType(type as "line" | "bar" | "area")}
          onRefresh={() => console.log("Refreshing user activity data...")}
        >
          <ResponsiveContainer width="100%" height={300}>
            {renderUserActivityChart()}
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Revenue" 
          value="$24,567" 
          subtitle="+8.2% from last month" 
          isPositive={true}
          chartTypes={["bar", "line", "area"]}
          defaultChartType="bar"
          onChartTypeChange={(type) => setRevenueChartType(type as "bar" | "line" | "area")}
          onRefresh={() => console.log("Refreshing revenue data...")}
        >
          <ResponsiveContainer width="100%" height={300}>
            {renderRevenueChart()}
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Device Usage" value="3 platforms" subtitle="Desktop leads with 45%" isPositive={true}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceUsageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {deviceUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  borderColor: "#334155",
                  color: "#F1F5F9",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Conversion Funnel" 
          value="3.2%" 
          subtitle="Final conversion rate" 
          isPositive={true}
          chartTypes={["area"]}
          defaultChartType="area"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={[
                { name: "Visitors", value: 5000 },
                { name: "Product Views", value: 3500 },
                { name: "Add to Cart", value: 2200 },
                { name: "Checkout", value: 1200 },
                { name: "Purchase", value: 800 },
              ]}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#64748B" strokeOpacity={0.1} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#94A3B8" }} />
              <YAxis tick={{ fill: "#94A3B8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  borderColor: "#334155",
                  color: "#F1F5F9",
                }}
              />
              <Area type="monotone" dataKey="value" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
