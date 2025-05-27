import { ChartCard } from "@/components/admin/chart-card"
import {
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
  Legend,
} from "recharts"

// Mock data for analytics charts
const trafficSourcesData = [
  { name: "Direct", value: 30 },
  { name: "Organic Search", value: 40 },
  { name: "Referral", value: 15 },
  { name: "Social Media", value: 15 },
]

const revenueByMonthData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 8000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 9500 },
  { name: "Jul", value: 11000 },
  { name: "Aug", value: 9000 },
  { name: "Sep", value: 12000 },
  { name: "Oct", value: 14000 },
  { name: "Nov", value: 16000 },
  { name: "Dec", value: 18000 },
]

const deviceUsageData = [
  { name: "Desktop", value: 45 },
  { name: "Mobile", value: 40 },
  { name: "Tablet", value: 15 },
]

const conversionFunnelData = [
  { name: "Visitors", value: 5000 },
  { name: "Product Views", value: 3500 },
  { name: "Add to Cart", value: 2200 },
  { name: "Checkout", value: 1200 },
  { name: "Purchase", value: 800 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white">Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Traffic Sources" value="4 sources" subtitle="Organic Search leads with 40%" isPositive={true}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSourcesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {trafficSourcesData.map((entry, index) => (
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue by Month" value="$105,500" subtitle="+22% from last year" isPositive={true}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByMonthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Conversion Funnel" value="16%" subtitle="Visitor to purchase rate" isPositive={true}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={conversionFunnelData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
