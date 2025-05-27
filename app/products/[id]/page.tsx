"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/yapee/product-card"
import { toast } from "@/components/ui/use-toast"
import { Heart, Minus, Plus, ShoppingCart, Share2, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Dữ liệu mẫu
const products = [
  {
    id: "1",
    name: "Laptop Gaming XYZ",
    price: 25000000,
    originalPrice: 28000000,
    discount: 10,
    image: "https://placehold.co/600x400",
    category: "Laptop",
    status: "Còn hàng",
    rating: 4.5,
    ratingCount: 120,
    isFeatured: true,
    description: "Laptop Gaming cao cấp với cấu hình mạnh mẽ, phù hợp cho gaming và đồ họa nặng.",
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400"
    ],
    stock: 15,
    sku: "LP-XYZ-001",
    specifications: [
      { name: "CPU", value: "Intel Core i7-12700H" },
      { name: "RAM", value: "16GB DDR5" },
      { name: "Ổ cứng", value: "512GB SSD" },
      { name: "Card đồ họa", value: "NVIDIA RTX 3060 6GB" },
      { name: "Màn hình", value: "15.6 inch, 2K, 165Hz" },
      { name: "Hệ điều hành", value: "Windows 11 Home" },
      { name: "Pin", value: "4-cell, 90Wh" },
      { name: "Trọng lượng", value: "2.3 kg" }
    ],
    variants: [
      { name: "RAM", options: ["8GB", "16GB", "32GB"] },
      { name: "Ổ cứng", options: ["256GB", "512GB", "1TB"] }
    ],
    reviews: [
      {
        id: "r1",
        user: "Nguyễn Văn A",
        rating: 5,
        date: "2023-05-10",
        comment: "Sản phẩm rất tốt, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận."
      },
      {
        id: "r2",
        user: "Trần Thị B",
        rating: 4,
        date: "2023-04-25",
        comment: "Laptop chạy mượt, mát, chơi game rất tốt. Chỉ tiếc là hơi nặng."
      },
      {
        id: "r3",
        user: "Lê Văn C",
        rating: 5,
        date: "2023-04-15",
        comment: "Cấu hình mạnh, màn hình đẹp, âm thanh tốt. Rất hài lòng với sản phẩm."
      }
    ],
    relatedProducts: ["2", "4", "7"]
  },
  {
    id: "2",
    name: "Smartphone ABC Pro",
    price: 12000000,
    originalPrice: 15000000,
    discount: 20,
    image: "https://placehold.co/600x400",
    category: "Điện thoại",
    status: "Còn hàng",
    rating: 4.8,
    ratingCount: 254,
    isFeatured: true,
    description: "Điện thoại cao cấp với camera chất lượng cao và thời lượng pin dài.",
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400"
    ],
    stock: 30,
    sku: "SP-ABC-001",
    specifications: [
      { name: "Màn hình", value: "6.7 inch, AMOLED, 120Hz" },
      { name: "CPU", value: "Snapdragon 8 Gen 2" },
      { name: "RAM", value: "12GB" },
      { name: "Bộ nhớ trong", value: "256GB" },
      { name: "Camera", value: "50MP + 12MP + 10MP" },
      { name: "Pin", value: "5000mAh" },
      { name: "Hệ điều hành", value: "Android 13" }
    ],
    variants: [
      { name: "Màu sắc", options: ["Đen", "Trắng", "Xanh"] },
      { name: "Bộ nhớ trong", options: ["128GB", "256GB", "512GB"] }
    ],
    reviews: [
      {
        id: "r1",
        user: "Phạm Văn D",
        rating: 5,
        date: "2023-05-15",
        comment: "Camera chụp rất đẹp, pin trâu, cầm rất vừa tay."
      },
      {
        id: "r2",
        user: "Hoàng Thị E",
        rating: 4,
        date: "2023-05-05",
        comment: "Thiết kế đẹp, hiệu năng tốt. Chỉ tiếc là không có jack tai nghe."
      }
    ],
    relatedProducts: ["3", "5", "6"]
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<(typeof products)[0] | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [relatedProductsData, setRelatedProductsData] = useState<typeof products>([])
  
  // Tải dữ liệu sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Tìm sản phẩm trong dữ liệu mẫu
        const foundProduct = products.find(p => p.id === productId)
        
        if (foundProduct) {
          setProduct(foundProduct)
          
          // Thiết lập giá trị mặc định cho biến thể
          if (foundProduct.variants) {
            const defaultVariants: Record<string, string> = {}
            foundProduct.variants.forEach(variant => {
              defaultVariants[variant.name] = variant.options[0]
            })
            setSelectedVariants(defaultVariants)
          }
          
          // Tải sản phẩm liên quan
          if (foundProduct.relatedProducts) {
            const related = products.filter(p => 
              foundProduct.relatedProducts.includes(p.id)
            )
            setRelatedProductsData(related)
          }
        } else {
          // Sản phẩm không tồn tại
          toast({
            title: "Không tìm thấy sản phẩm",
            description: "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
            variant: "destructive"
          })
          router.push("/products")
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error)
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải thông tin sản phẩm. Vui lòng thử lại sau.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProduct()
  }, [productId, router])
  
  // Tăng số lượng sản phẩm
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1)
    }
  }
  
  // Giảm số lượng sản phẩm
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }
  
  // Thêm vào giỏ hàng
  const addToCart = () => {
    if (!product) return
    
    // Giả lập thêm vào giỏ hàng
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng.`,
    })
  }
  
  // Mua ngay
  const buyNow = () => {
    if (!product) return
    
    // Thêm vào giỏ hàng và chuyển đến trang thanh toán
    addToCart()
    router.push("/checkout")
  }
  
  // Thêm/xóa khỏi danh sách yêu thích
  const toggleWishlist = () => {
    setIsInWishlist(prev => !prev)
    
    toast({
      title: isInWishlist 
        ? "Đã xóa khỏi danh sách yêu thích" 
        : "Đã thêm vào danh sách yêu thích",
      description: isInWishlist
        ? `${product?.name} đã được xóa khỏi danh sách yêu thích.`
        : `${product?.name} đã được thêm vào danh sách yêu thích.`
    })
  }
  
  // Chia sẻ sản phẩm
  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href
      })
    } else {
      // Sao chép liên kết vào clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Đã sao chép liên kết",
        description: "Liên kết sản phẩm đã được sao chép vào clipboard."
      })
    }
  }
  
  // Xử lý thay đổi biến thể
  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: value
    }))
  }
  
  // Hiển thị skeleton khi đang tải
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-6 w-64" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            
            <div className="pt-4">
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    )
  }
  
  // Hiển thị thông báo nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
        <p className="text-gray-600 mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Button asChild>
          <Link href="/products">Quay lại trang sản phẩm</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb 
        segments={[
          { name: "Trang chủ", href: "/" },
          { name: "Sản phẩm", href: "/products" },
          { name: product.name, href: `/products/${product.id}` }
        ]} 
        className="mb-6" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hình ảnh sản phẩm */}
        <div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
              className="p-4"
            />
            
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500">
                -{product.discount}%
              </Badge>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`h-20 w-20 rounded-md overflow-hidden border cursor-pointer
                  ${activeImage === index ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200'}`}
                onClick={() => setActiveImage(index)}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={image}
                    alt={`${product.name} - Hình ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Thông tin sản phẩm */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          
          {/* Đánh giá */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.rating} ({product.ratingCount} đánh giá)</span>
          </div>
          
          {/* Giá */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Tình trạng: <span className="font-medium text-green-600">{product.status}</span>
            </p>
            <p className="text-sm text-gray-600">
              SKU: {product.sku}
            </p>
          </div>
          
          {/* Mô tả ngắn */}
          <p className="text-gray-700">{product.description}</p>
          
          {/* Biến thể sản phẩm */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4">
              {product.variants.map((variant, variantIndex) => (
                <div key={variantIndex}>
                  <p className="font-medium mb-2">{variant.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant={selectedVariants[variant.name] === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVariantChange(variant.name, option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Số lượng */}
          <div>
            <p className="font-medium mb-2">Số lượng</p>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                disabled={product.stock <= quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="ml-4 text-sm text-gray-600">
                {product.stock} sản phẩm có sẵn
              </span>
            </div>
          </div>
          
          {/* Nút thêm vào giỏ hàng và mua ngay */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={addToCart} 
              variant="outline"
              className="flex-1"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Thêm vào giỏ hàng
            </Button>
            <Button 
              onClick={buyNow} 
              className="flex-1"
            >
              Mua ngay
            </Button>
          </div>
          
          {/* Nút yêu thích và chia sẻ */}
          <div className="flex gap-4 pt-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleWishlist}
              className={isInWishlist ? "text-red-500" : ""}
            >
              <Heart className={`mr-2 h-4 w-4 ${isInWishlist ? "fill-red-500" : ""}`} />
              {isInWishlist ? "Đã yêu thích" : "Thêm vào yêu thích"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={shareProduct}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Chia sẻ
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tabs thông tin chi tiết */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="mb-4">
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá ({product.reviews.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="text-gray-700">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="py-3 px-4 font-medium">{spec.name}</td>
                      <td className="py-3 px-4">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{review.user}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
              
              <Button variant="outline">Viết đánh giá</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sản phẩm liên quan */}
      {relatedProductsData.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProductsData.map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
