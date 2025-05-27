"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

// Mock data
const products = [
  {
    id: "1",
    name: "Laptop Gaming XYZ",
    description: "Laptop Gaming cao cấp với cấu hình mạnh mẽ, phù hợp cho gaming và đồ họa nặng.",
    price: 25000000,
    discount: 10,
    category: "Laptop",
    status: "Còn hàng",
    stock: 15,
    image: "https://placehold.co/600x400",
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2023-04-20T10:30:00Z",
    specifications: [
      { name: "CPU", value: "Intel Core i7-12700H" },
      { name: "RAM", value: "16GB DDR5" },
      { name: "Ổ cứng", value: "512GB SSD" },
      { name: "Card đồ họa", value: "NVIDIA RTX 3060 6GB" },
      { name: "Màn hình", value: "15.6 inch, 2K, 165Hz" },
    ],
  },
  {
    id: "2",
    name: "Smartphone ABC Pro",
    description: "Điện thoại cao cấp với camera chất lượng cao và thời lượng pin dài.",
    price: 12000000,
    discount: 5,
    category: "Điện thoại",
    status: "Còn hàng",
    stock: 30,
    image: "https://placehold.co/600x400",
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-04-15T14:20:00Z",
    specifications: [
      { name: "Màn hình", value: "6.7 inch, AMOLED, 120Hz" },
      { name: "CPU", value: "Snapdragon 8 Gen 2" },
      { name: "RAM", value: "12GB" },
      { name: "Bộ nhớ trong", value: "256GB" },
      { name: "Camera", value: "50MP + 12MP + 10MP" },
      { name: "Pin", value: "5000mAh" },
    ],
  },
  {
    id: "3",
    name: "Tai nghe không dây DEF",
    description: "Tai nghe bluetooth chống ồn chủ động, thời lượng pin 30 giờ.",
    price: 3500000,
    discount: 0,
    category: "Phụ kiện",
    status: "Hết hàng",
    stock: 0,
    image: "https://placehold.co/600x400",
    createdAt: "2023-03-05T11:30:00Z",
    updatedAt: "2023-03-05T11:30:00Z",
    specifications: [
      { name: "Loại", value: "Over-ear" },
      { name: "Kết nối", value: "Bluetooth 5.2" },
      { name: "Thời lượng pin", value: "30 giờ" },
      { name: "Chống nước", value: "IPX4" },
      { name: "Microphone", value: "Có, tích hợp" },
    ],
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<(typeof products)[0] | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Tải dữ liệu sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Tìm sản phẩm trong mock data
        const foundProduct = products.find(p => p.id === params.id)
        
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          toast({
            title: "Lỗi",
            description: "Không tìm thấy thông tin sản phẩm.",
            variant: "destructive",
          })
          router.push("/admin/products")
        }
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Đã xảy ra lỗi khi tải thông tin sản phẩm.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, router])

  // Xử lý xoá sản phẩm
  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Xoá sản phẩm thành công",
        description: "Sản phẩm đã được xoá khỏi hệ thống.",
      })
      
      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi xoá sản phẩm. Vui lòng thử lại.",
        variant: "destructive",
      })
      setIsDeleteDialogOpen(false)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/admin/products" className="text-slate-400 hover:text-slate-300 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Skeleton className="h-8 w-64 bg-slate-700" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-24 bg-slate-700" />
            <Skeleton className="h-9 w-24 bg-slate-700" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-40 bg-slate-700" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full bg-slate-700" />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-56 bg-slate-700" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-slate-700" />
                  <Skeleton className="h-6 w-48 bg-slate-700" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-slate-700" />
                  <Skeleton className="h-6 w-48 bg-slate-700" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-slate-700" />
                  <Skeleton className="h-6 w-48 bg-slate-700" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-40 bg-slate-700" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-slate-700" />
                  <Skeleton className="h-6 w-full bg-slate-700" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48 bg-slate-700" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <Skeleton className="h-6 w-32 bg-slate-700" />
                <Skeleton className="h-6 w-full bg-slate-700" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin/products" className="text-slate-400 hover:text-slate-300 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Chi tiết sản phẩm</h2>
        </div>
        {product && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-slate-800 border-slate-700 hover:bg-slate-700"
              asChild
            >
              <Link href={`/admin/products/edit/${product.id}`}>
                <Edit className="mr-1.5 h-4 w-4" />
                Sửa
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Xoá
            </Button>
          </div>
        )}
      </div>

      {product && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Hình ảnh sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square w-full overflow-hidden rounded-md">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Tên sản phẩm</p>
                    <p className="text-lg font-medium text-white">{product.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-400">Giá bán</p>
                      <p className="text-lg font-medium text-white">{formatCurrency(product.price)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Giảm giá</p>
                      <p className="text-lg font-medium text-white">{product.discount}%</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-400">Danh mục</p>
                      <Badge variant="outline" className="mt-1 bg-slate-900">
                        {product.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Trạng thái</p>
                      <Badge 
                        className="mt-1" 
                        variant={product.status === "Còn hàng" ? "default" : "destructive"}
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Số lượng tồn</p>
                    <p className="text-lg font-medium text-white">{product.stock}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Mô tả sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-200">{product.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Thông số kỹ thuật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <p className="text-sm font-medium text-slate-400">{spec.name}</p>
                    <p className="text-sm text-white">{spec.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent className="bg-slate-900 border border-slate-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Xác nhận xoá sản phẩm</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  Bạn có chắc chắn muốn xoá sản phẩm <span className="text-white font-medium">{product.name}</span>? 
                  Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel 
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                  disabled={isDeleting}
                >
                  Huỷ bỏ
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Đang xử lý..." : "Xoá sản phẩm"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  )
}
