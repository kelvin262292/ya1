'use client'

import { cn } from "@/lib/utils"
import { useState } from "react"
import type { ReactNode } from "react"
import { Expand, Minimize, BarChart, LineChart, PieChart, AreaChart, RefreshCw } from "lucide-react"

interface ChartCardProps {
  title: string
  value: string
  subtitle: string
  isPositive: boolean
  children: ReactNode
  chartTypes?: ("line" | "bar" | "pie" | "area")[]
  defaultChartType?: "line" | "bar" | "pie" | "area"
  onChartTypeChange?: (type: "line" | "bar" | "pie" | "area") => void
  onRefresh?: () => void
}

export function ChartCard({ 
  title, 
  value, 
  subtitle, 
  isPositive, 
  children,
  chartTypes = [],
  defaultChartType,
  onChartTypeChange,
  onRefresh
}: ChartCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeChartType, setActiveChartType] = useState<"line" | "bar" | "pie" | "area">(defaultChartType || "line")
  
  const handleChartTypeChange = (type: "line" | "bar" | "pie" | "area") => {
    setActiveChartType(type)
    if (onChartTypeChange) {
      onChartTypeChange(type)
    }
  }

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh()
    }
  }

  const chartIconMap = {
    line: LineChart,
    bar: BarChart,
    pie: PieChart,
    area: AreaChart
  }

  return (
    <div className={cn(
      "bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300",
      isExpanded ? "fixed top-4 left-4 right-4 bottom-4 z-50" : ""
    )}>
      <div className="p-6 flex justify-between">
        <div className="flex flex-col space-y-1">
          <h3 className="text-slate-300 font-medium">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
          <p className={cn("text-sm", isPositive ? "text-green-400" : "text-red-400")}>{subtitle}</p>
        </div>
        <div className="flex space-x-2 items-start">
          {chartTypes.length > 0 && (
            <div className="flex bg-slate-700 rounded-md p-0.5">
              {chartTypes.map((type) => {
                const Icon = chartIconMap[type]
                return (
                  <button 
                    key={type}
                    onClick={() => handleChartTypeChange(type)}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      activeChartType === type 
                        ? "bg-slate-600 text-sky-400" 
                        : "text-slate-400 hover:text-slate-300"
                    )}
                    title={`Switch to ${type} chart`}
                  >
                    <Icon size={16} />
                  </button>
                )
              })}
            </div>
          )}
          
          {onRefresh && (
            <button 
              className="p-1.5 rounded-md text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition-colors"
              onClick={handleRefresh}
              title="Refresh data"
            >
              <RefreshCw size={16} />
            </button>
          )}
          
          <button 
            className="p-1.5 rounded-md text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? <Minimize size={16} /> : <Expand size={16} />}
          </button>
        </div>
      </div>
      <div className={cn("px-2 pb-4", isExpanded ? "h-[calc(100%-80px)]" : "")}>
        {children}
      </div>
    </div>
  )
}
