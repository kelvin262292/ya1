import type React from "react"
// Common types
export interface Product {
  id: string
  name: string
  category: string
  categoryId: string
  price: number
  originalPrice?: number
  stock: number
  status: string
  rating: number
  reviewCount: number
  imageUrl?: string
  description?: string
}

export interface Order {
  id: string
  customer: string
  date: string
  total: number
  status: string
  items?: OrderItem[]
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Customer {
  id: string
  name: string
  email: string
  orders: number
  totalSpent: number
  lastOrder: string
  avatarColor: string
}

export interface Testimonial {
  id: string
  name: string
  title: string
  location: string
  quote: string
  avatarUrl?: string
}

// Chart data types
export interface ChartDataItem {
  name: string
  value: number
}

// Navigation types
export interface NavItemType {
  name: string
  icon: React.ComponentType<{ className?: string }>
  path: string
}
