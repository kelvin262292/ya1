"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, showToast } = useCart()
  const [isHovering, setIsHovering] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    showToast({
      message: `${product.name} đã được thêm vào giỏ hàng!`,
      type: "success",
    })
  }

  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 transform-gpu">
          <Image
            src={product.imageUrl || `/products/${product.id}.jpg`}
            alt={product.name}
            className={cn(
              "object-cover w-full h-full transition-transform duration-500",
              isHovering ? "scale-110" : "scale-100",
            )}
            width={400}
            height={400}
          />
        </div>

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            GIẢM {discountPercentage}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{product.category}</div>

        <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center">
          <div className="flex text-yellow-500">
            {Array.from({length:5}, (_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? (
                  <span className="text-yellow-500">★</span>
                ) : i < product.rating ? (
                  <span className="text-yellow-500">★</span>
                ) : (
                  <span className="text-gray-300 dark:text-gray-600">★</span>
                )}
              </span>
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg text-red-500 dark:text-red-400">
            {product.price.toLocaleString("vi-VN")}₫
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {product.originalPrice.toLocaleString("vi-VN")}₫
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button onClick={handleAddToCart} className="w-full bg-red-500 hover:bg-red-600 text-white">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  )
}
