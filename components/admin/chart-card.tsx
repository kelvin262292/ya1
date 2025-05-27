import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ChartCardProps {
  title: string
  value: string
  subtitle: string
  isPositive: boolean
  children: ReactNode
}

export function ChartCard({ title, value, subtitle, isPositive, children }: ChartCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col space-y-1">
          <h3 className="text-slate-300 font-medium">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
          <p className={cn("text-sm", isPositive ? "text-green-400" : "text-red-400")}>{subtitle}</p>
        </div>
      </div>
      <div className="px-2 pb-4">{children}</div>
    </div>
  )
}
