"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "smart-speakers", name: "Loa thông minh" },
  { id: "smart-lights", name: "Đèn thông minh" },
  { id: "security", name: "An ninh" },
  { id: "thermostats", name: "Điều nhiệt" },
  { id: "cameras", name: "Camera" },
  { id: "entertainment", name: "Giải trí" },
  { id: "kitchen", name: "Nhà bếp" },
]

interface CategoryNavProps {
  onCategoryChange?: (categoryId: string) => void
}

export function CategoryNav({ onCategoryChange }: CategoryNavProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [headerHeight, setHeaderHeight] = useState(64) // Default height
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get actual header height
    const header = document.querySelector("header")
    if (header) {
      setHeaderHeight(header.offsetHeight)
    }
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    }

    // Scroll to products section
    const productsSection = document.getElementById("products")
    if (productsSection) {
      const yOffset = -headerHeight - (navRef.current?.offsetHeight || 0) - 20
      const y = productsSection.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div
      ref={navRef}
      className="sticky z-30 bg-gray-100 dark:bg-gray-800/50 py-3 shadow-sm"
      style={{ top: `${headerHeight}px` }}
    >
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  selectedCategory === category.id
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
