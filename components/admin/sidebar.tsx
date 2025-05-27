"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { HomeIcon } from "./icons/home-icon"
import { BoxIcon } from "./icons/box-icon"
import { ShoppingBagIcon } from "./icons/shopping-bag-icon"
import { UsersIcon } from "./icons/users-icon"
import { ChartBarIcon } from "./icons/chart-bar-icon"
import { motion } from 'framer-motion';
const sidebarVariants = {
  open: { width: 240 },
  collapsed: { width: 60 }
};

const NAV_ITEMS = [
  { name: "Dashboard", icon: HomeIcon, path: "/admin" },
  { name: "Products", icon: BoxIcon, path: "/admin/products" },
  { name: "Orders", icon: ShoppingBagIcon, path: "/admin/orders" },
  { name: "Customers", icon: UsersIcon, path: "/admin/customers" },
  { name: "Analytics", icon: ChartBarIcon, path: "/admin/analytics" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "bg-slate-900 text-slate-300 h-screen shrink-0 transition-all duration-300",
        isCollapsed ? "w-16" : "w-60 md:w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div
          className={cn(
            "flex items-center h-16 px-4 md:px-6 border-b border-slate-800",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center space-x-2">
              <BoxIcon className="h-6 w-6 text-sky-400" />
              <span className="font-bold text-white">Yapee Admin</span>
            </Link>
          )}
          {isCollapsed && <BoxIcon className="h-6 w-6 text-sky-400" />}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white", isCollapsed && "hidden")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 md:p-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "flex items-center rounded-lg py-2 px-3 transition-colors",
                  isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  isCollapsed && "justify-center px-2",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User/Footer */}
        <div className={cn("p-4 md:p-6 border-t border-slate-800", isCollapsed ? "text-center" : "")}>
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
              A
            </div>
            {!isCollapsed && (
              <div>
                <div className="text-sm font-medium text-white">Admin User</div>
                <div className="text-xs text-slate-400">admin@yapee.com</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
