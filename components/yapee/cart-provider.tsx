"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "@/lib/types"
import { Toast } from "./toast"

interface CartItem extends Product {
  quantity: number
}

interface ToastConfig {
  message: string
  type: "success" | "error"
  visible?: boolean
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  showToast: (config: Omit<ToastConfig, "visible">) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [toastConfig, setToastConfig] = useState<ToastConfig>({
    message: "",
    type: "success",
    visible: false,
  })

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const showToast = ({ message, type }: Omit<ToastConfig, "visible">) => {
    setToastConfig({ message, type, visible: true })

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToastConfig((prev) => ({ ...prev, visible: false }))
    }, 3000)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        showToast,
      }}
    >
      {children}
      <Toast message={toastConfig.message} type={toastConfig.type} visible={toastConfig.visible || false} />
    </CartContext.Provider>
  )
}
