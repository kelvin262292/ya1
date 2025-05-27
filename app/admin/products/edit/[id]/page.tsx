"use client"

import { useState, useEffect } from "react"
import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, Upload, Plus, Minus, X, AlertCircle } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { toast } from "@/components/ui/use-toast"

export default function EditProductPage({ params }: { params: { id: string }}) {
  const router = useRouter()
  const productId = params.id
  
  // Tìm sản phẩm từ dữ liệu mẫu
  const product = mockProducts.find(p => p.id === productId)
  
  // Kiểm tra nếu không tìm thấy sản phẩm
  if (!product) {
    return notFound()
  }
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories] = useState([
    "Điện thoại", "Laptop", "Máy tính bảng", "Phụ kiện", "Smartwatch", "Thiết bị thông minh"
  ])
  
  const [formData, setFormData] = useState({
    name: product.name,
    id: product.id,
    price: product.price,
    originalPrice: product.originalPrice || "",
    category: product.category,
    shortDescription: product.description || "",
    fullDescription: product.fullDescription || "",
    isFeatured: product.featured || false,
    images: [] as File[],
    currentImages: product.imageUrls || [product.imageUrl || ""],
    variants: product.variants || [],
    sku: product.sku || "",
    barcode: product.barcode || "",
    stock: product.stock,
    trackInventory: true,
    metaTitle: product.metaTitle || product.name,
    metaDescription: product.metaDescription || product.description || "",
    metaKeywords: product.metaKeywords || "",
    relatedProducts: product.relatedProducts || []
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Giả lập API call
    try {
      // Đây là nơi để thực hiện API call cập nhật sản phẩm
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Cập nhật thành công",
        description: "Sản phẩm đã được cập nhật thành công",
        variant: "default",
      })
      
      // Chuyển về trang danh sách sản phẩm
      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật sản phẩm",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Xử lý thêm biến thể mới
  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { name: "Màu sắc", options: ["Đen", "Trắng"] }]
    }))
  }
  
  // Xử lý xóa biến thể
  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }))
  }
  
  // Xử lý thêm tùy chọn cho biến thể
  const addOptionToVariant = (variantIndex: number) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[variantIndex].options.push("")
      return { ...prev, variants: updatedVariants }
    })
  }
  
  // Xử lý xóa tùy chọn khỏi biến thể
  const removeOptionFromVariant = (variantIndex: number, optionIndex: number) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[variantIndex].options = updatedVariants[variantIndex].options
        .filter((_, i) => i !== optionIndex)
      return { ...prev, variants: updatedVariants }
    })
  }
  
  // Xử lý thay đổi tên biến thể
  const handleVariantNameChange = (value: string, index: number) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[index].name = value
      return { ...prev, variants: updatedVariants }
    })
  }
  
  // Xử lý thay đổi giá trị tùy chọn
  const handleOptionChange = (value: string, variantIndex: number, optionIndex: number) => {
    setFormData(prev => {
      const updatedVariants = [...prev.variants]
      updatedVariants[variantIndex].options[optionIndex] = value
      return { ...prev, variants: updatedVariants }
    })
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            asChild
          >
            <Link href="/admin/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Chỉnh sửa sản phẩm</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/products">Hủy</Link>
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="bg-sky-500 hover:bg-sky-600"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="bg-slate-800 border-slate-700 grid grid-cols-3 md:grid-cols-6 mb-6">
          <TabsTrigger value="general">Thông tin chung</TabsTrigger>
          <TabsTrigger value="media">Hình ảnh</TabsTrigger>
          <TabsTrigger value="variants">Biến thể</TabsTrigger>
          <TabsTrigger value="inventory">Kho hàng</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="related">Sản phẩm liên quan</TabsTrigger>
        </TabsList>
        
        <form className="space-y-8">
          {/* Tab Thông tin chung */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin sản phẩm</CardTitle>
                <CardDescription>
                  Nhập thông tin cơ bản của sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên sản phẩm</Label>
                    <Input
                      id="name"
                      placeholder="Nhập tên sản phẩm"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-id">Mã sản phẩm</Label>
                    <Input
                      id="product-id"
                      placeholder="Nhập mã sản phẩm"
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      disabled
                    />
                    <p className="text-xs text-slate-400">Mã sản phẩm không thể thay đổi sau khi đã tạo</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Giá bán (VNĐ)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Nhập giá bán"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original-price">Giá gốc (VNĐ)</Label>
                    <Input
                      id="original-price"
                      type="number"
                      placeholder="Nhập giá gốc (trước khi giảm giá)"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value ? Number(e.target.value) : ""})}
                    />
                    <p className="text-xs text-slate-400">Để trống nếu không có giảm giá</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="short-description">Mô tả ngắn</Label>
                  <Textarea
                    id="short-description"
                    placeholder="Nhập mô tả ngắn cho sản phẩm"
                    rows={3}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="full-description">Mô tả chi tiết</Label>
                  <Textarea
                    id="full-description"
                    placeholder="Nhập mô tả chi tiết về sản phẩm"
                    rows={6}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({...formData, isFeatured: Boolean(checked)})}
                  />
                  <Label htmlFor="featured">Sản phẩm nổi bật</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Hình ảnh */}
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh sản phẩm</CardTitle>
                <CardDescription>
                  Tải lên hình ảnh cho sản phẩm. Hình đầu tiên sẽ là hình ảnh chính.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-slate-700 rounded-md p-6 text-center hover:bg-slate-800/50 transition cursor-pointer">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-slate-400" />
                    <h3 className="text-lg font-medium">Kéo thả hình ảnh vào đây</h3>
                    <p className="text-sm text-slate-400">hoặc click để chọn file</p>
                    <p className="text-xs text-slate-500">PNG, JPG, WEBP tối đa 5MB</p>
                    <Button variant="outline" size="sm">
                      Chọn file
                    </Button>
                  </div>
                </div>
                
                {/* Hiển thị hình ảnh hiện tại */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.currentImages.map((image, index) => (
                    <div key={index} className="relative group border border-slate-700 rounded-md overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Sản phẩm ${index + 1}`} 
                        className="w-full aspect-square object-cover" 
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {index === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-sky-500 text-white text-center text-xs py-1">
                          Hình ảnh chính
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Biến thể */}
          <TabsContent value="variants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Biến thể sản phẩm</CardTitle>
                <CardDescription>
                  Thêm các biến thể như màu sắc, kích thước, v.v.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.variants.length === 0 ? (
                  <div className="border border-slate-700 rounded-md p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <AlertCircle className="h-8 w-8 text-slate-400" />
                      <h3 className="text-lg font-medium">Chưa có biến thể</h3>
                      <p className="text-sm text-slate-400">Thêm biến thể cho sản phẩm như màu sắc, kích thước...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formData.variants.map((variant, index) => (
                      <div key={index} className="border border-slate-700 rounded-md p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="space-y-2 flex-1 mr-4">
                            <Label htmlFor={`variant-name-${index}`}>Tên biến thể</Label>
                            <Input
                              id={`variant-name-${index}`}
                              value={variant.name}
                              onChange={(e) => handleVariantNameChange(e.target.value, index)}
                              placeholder="Ví dụ: Màu sắc, Kích thước..."
                            />
                          </div>
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="flex-shrink-0"
                            onClick={() => removeVariant(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {variant.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center space-x-2">
                              <Input
                                value={option}
                                onChange={(e) => handleOptionChange(e.target.value, index, optIndex)}
                                placeholder="Giá trị tùy chọn"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeOptionFromVariant(index, optIndex)}
                                className="text-red-500"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addOptionToVariant(index)}
                            className="mt-2"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm tùy chọn
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button
                  variant="outline"
                  onClick={addVariant}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm biến thể
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Kho hàng */}
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin kho hàng</CardTitle>
                <CardDescription>
                  Quản lý tồn kho và mã số sản phẩm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sku">Mã SKU</Label>
                    <Input
                      id="sku"
                      placeholder="Nhập mã SKU"
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Mã vạch</Label>
                    <Input
                      id="barcode"
                      placeholder="Nhập mã vạch"
                      value={formData.barcode}
                      onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stock">Số lượng tồn kho</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="Nhập số lượng tồn kho"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="track-inventory"
                    checked={formData.trackInventory}
                    onCheckedChange={(checked) => setFormData({...formData, trackInventory: Boolean(checked)})}
                  />
                  <Label htmlFor="track-inventory">Theo dõi tồn kho</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab SEO */}
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tối ưu SEO</CardTitle>
                <CardDescription>
                  Cải thiện hiển thị trên các công cụ tìm kiếm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Tiêu đề Meta</Label>
                  <Input
                    id="meta-title"
                    placeholder="Nhập tiêu đề meta"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Mô tả Meta</Label>
                  <Textarea
                    id="meta-description"
                    placeholder="Nhập mô tả meta"
                    rows={3}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta-keywords">Từ khóa Meta</Label>
                  <Input
                    id="meta-keywords"
                    placeholder="Nhập từ khóa meta, phân tách bằng dấu phẩy"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData({...formData, metaKeywords: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab Sản phẩm liên quan */}
          <TabsContent value="related" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sản phẩm liên quan</CardTitle>
                <CardDescription>
                  Chọn các sản phẩm liên quan để hiển thị cùng sản phẩm này
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Chọn sản phẩm liên quan</Label>
                  <div className="border border-slate-700 rounded-md p-4 space-y-2">
                    <p className="text-sm text-slate-400">Tính năng này sẽ được phát triển trong tương lai.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
} 