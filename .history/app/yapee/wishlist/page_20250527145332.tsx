"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

export default function WishlistPage() {
  const { toast } = useToast()
  const [wishlist, setWishlist] = useState<Product[]>([])
  
  // Giả lập dữ liệu wishlist từ localStorage
  useEffect(() => {
    // Trong thực tế, sẽ lấy từ API hoặc localStorage
    const savedWishlist = localStorage.getItem("yapee-wishlist")
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        // Lấy thông tin đầy đủ của sản phẩm từ mockProducts
        const fullProducts = parsedWishlist.map((id: string) => 
          mockProducts.find(product => product.id === id)
        ).filter(Boolean)
        setWishlist(fullProducts)
      } catch (error) {
        console.error("Lỗi khi đọc wishlist:", error)
      }
    } else {
      // Thêm một số sản phẩm mẫu vào wishlist để demo
      const sampleWishlist = mockProducts.slice(0, 3)
      setWishlist(sampleWishlist)
      localStorage.setItem("yapee-wishlist", JSON.stringify(sampleWishlist.map(p => p.id)))
    }
  }, [])

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
    
    // Cập nhật localStorage
    const updatedWishlist = wishlist.filter(item => item.id !== productId).map(p => p.id)
    localStorage.setItem("yapee-wishlist", JSON.stringify(updatedWishlist))
    
    toast({
      title: "Đã xóa khỏi danh sách yêu thích",
      description: "Sản phẩm đã được xóa khỏi danh sách yêu thích của bạn.",
    })
  }

  const addToCart = (product: Product) => {
    // Trong thực tế, sẽ sử dụng context hoặc API để thêm vào giỏ hàng
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng.`,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Heart className="text-red-500" />
          Danh sách yêu thích
        </h1>
        <Link href="/yapee">
          <Button variant="outline">Tiếp tục mua sắm</Button>
        </Link>
      </div>
      
      <Separator className="mb-6" />
      
      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
            Danh sách yêu thích trống
          </h2>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Bạn chưa thêm sản phẩm nào vào danh sách yêu thích
          </p>
          <Link href="/yapee">
            <Button>Khám phá sản phẩm</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    onClick={() => removeFromWishlist(product.id)}
                    className="rounded-full opacity-80 hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-4">
                  <Link href={`/yapee/products/${product.id}`} className="block">
                    <h3 className="text-lg font-medium line-clamp-2 hover:text-red-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {product.category}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    {product.originalPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-500">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    size="sm" 
                    onClick={() => addToCart(product)}
                    className="rounded-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Thêm vào giỏ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 