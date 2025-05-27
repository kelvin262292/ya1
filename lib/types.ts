import type React from "react"
// Common types
export interface Product {
  id: string
  name: string
  description?: string
  fullDescription?: string
  price: number
  originalPrice?: number
  stock: number
  category: string
  imageUrl?: string
  imageUrls?: string[]
  status: "active" | "inactive"
  featured?: boolean
  sku?: string
  barcode?: string
  variants?: ProductVariant[]
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  relatedProducts?: string[]
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface ProductVariant {
  name: string
  options: string[]
}

export interface Order {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  date: string
  total: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded"
  items: OrderItem[]
  shippingAddress?: Address
  billingAddress?: Address
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  variant?: {
    [key: string]: string
  }
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  dateJoined: string
  totalOrders: number
  totalSpent: number
  lastPurchase?: string
  addresses?: Address[]
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
export interface ChartData {
  name: string
  value: number
}

export interface LineChartData {
  name: string
  [key: string]: string | number
}

// Navigation types
export interface NavItemType {
  name: string
  icon: React.ComponentType<{ className?: string }>
  path: string
}
