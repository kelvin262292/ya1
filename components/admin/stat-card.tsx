import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
}

export function StatCard({ title, value, change, isPositive }: StatCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-md">
      <div className="space-y-2">
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
        <div className="flex items-center">
          <span className={cn("text-sm", isPositive ? "text-green-400" : "text-red-400")}>{change}</span>
          <span className="text-slate-400 text-xs ml-1">vs. last period</span>
        </div>
      </div>
    </div>
  )
}
