import { cn } from "@/lib/utils"
import { ArrowUpRight, RefreshCw } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  detailLink?: string
  detailLinkText?: string
  onRefresh?: () => Promise<{value: string, change: string, isPositive: boolean} | void>
  refreshInterval?: number
}

export function StatCard({ 
  title, 
  value, 
  change, 
  isPositive,
  detailLink,
  detailLinkText = "View report",
  onRefresh,
  refreshInterval
}: StatCardProps) {
  const [currentData, setCurrentData] = useState({value, change, isPositive})
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return
    
    setIsRefreshing(true)
    try {
      const newData = await onRefresh()
      if (newData) {
        setCurrentData(newData)
      }
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-md relative group">
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {onRefresh && (
          <button 
            onClick={handleRefresh}
            className={cn(
              "p-1.5 rounded-md text-slate-400 hover:text-sky-400 hover:bg-slate-700 transition-colors",
              isRefreshing && "animate-spin text-sky-400"
            )}
            disabled={isRefreshing}
            title="Refresh data"
          >
            <RefreshCw size={16} />
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-white text-2xl font-bold">{currentData.value}</p>
        <div className="flex items-center">
          <span className={cn("text-sm", currentData.isPositive ? "text-green-400" : "text-red-400")}>{currentData.change}</span>
          <span className="text-slate-400 text-xs ml-1">vs. last period</span>
        </div>
        
        {detailLink && (
          <div className="pt-2">
            <Link 
              href={detailLink} 
              className="flex items-center text-sm text-sky-400 hover:text-sky-300 transition-colors"
            >
              {detailLinkText}
              <ArrowUpRight className="ml-1" size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
