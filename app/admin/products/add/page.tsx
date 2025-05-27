"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AddProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Sample product categories
  const categories = [
    { id: "smart-speakers", name: "Loa thông minh" },
    { id: "smart-lights", name: "Đèn thông minh" },
    { id: "security", name: "An ninh" },
    { id: "thermostats", name: "Điều nhiệt" },
    { id: "entertainment", name: "Giải trí" },
    { id: "kitchen", name: "Nhà bếp" },
    { id: "cameras", name: "Camera" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message (in real implementation, you'd use a toast or redirect)
    alert("Sản phẩm đã được tạo thành công!")
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin/products" className="text-slate-400 hover:text-slate-300 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Thêm sản phẩm mới</h2>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link href="/admin/products">Hủy</Link>
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-sky-500 hover:bg-sky-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-slate-800 border-b border-slate-700 w-full justify-start rounded-none h-auto p-0">
          <TabsTrigger 
            value="general" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Thông tin chung
          </TabsTrigger>
          <TabsTrigger 
            value="media" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Hình ảnh & Media
          </TabsTrigger>
          <TabsTrigger 
            value="variants" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Biến thể
          </TabsTrigger>
          <TabsTrigger 
            value="inventory" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Kho hàng
          </TabsTrigger>
          <TabsTrigger 
            value="seo" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            SEO
          </TabsTrigger>
          <TabsTrigger 
            value="related" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-sky-500 data-[state=active]:text-white px-4 py-3 data-[state=active]:shadow-none"
          >
            Sản phẩm liên quan
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* General Information Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription className="text-slate-400">Nhập thông tin cơ bản về sản phẩm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Tên sản phẩm *</Label>
                    <Input 
                      id="product-name" 
                      placeholder="Nhập tên sản phẩm"
                      className="bg-slate-900 border-slate-700 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-id">Mã sản phẩm</Label>
                    <Input 
                      id="product-id" 
                      placeholder="VD: P001"
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Giá (VND) *</Label>
                    <Input 
                      id="price" 
                      placeholder="0"
                      type="number"
                      className="bg-slate-900 border-slate-700 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original-price">Giá gốc (VND)</Label>
                    <Input 
                      id="original-price" 
                      placeholder="0"
                      type="number"
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục *</Label>
                    <Select required>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short-desc">Mô tả ngắn</Label>
                  <Textarea 
                    id="short-desc" 
                    placeholder="Mô tả ngắn gọn về sản phẩm"
                    className="bg-slate-900 border-slate-700 text-white"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả chi tiết</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Mô tả đầy đủ về sản phẩm, tính năng, thông số kỹ thuật..."
                    className="bg-slate-900 border-slate-700 text-white"
                    rows={6}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <Label htmlFor="featured" className="font-normal">Sản phẩm nổi bật</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Hình ảnh sản phẩm</CardTitle>
                <CardDescription className="text-slate-400">Tải lên hình ảnh sản phẩm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-10 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 rounded-full bg-slate-700">
                      <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Kéo thả hoặc <span className="text-sky-400">duyệt file</span></p>
                      <p className="text-slate-400 text-sm mt-1">Hỗ trợ JPG, PNG hoặc WEBP có kích thước dưới 5MB</p>
                    </div>
                    <Button variant="outline" className="mt-2">
                      Chọn file
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {/* Placeholder for uploaded images */}
                  <div className="aspect-square bg-slate-700 rounded-md flex items-center justify-center text-slate-400">
                    Ảnh 1
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Variants Tab */}
          <TabsContent value="variants" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Biến thể sản phẩm</CardTitle>
                <CardDescription className="text-slate-400">Quản lý các biến thể như màu sắc, kích thước</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-medium">Thuộc tính</h4>
                    <p className="text-slate-400 text-sm">Thêm các thuộc tính như màu sắc, kích thước</p>
                  </div>
                  <Button variant="outline">Thêm thuộc tính</Button>
                </div>
                
                <div className="border border-slate-700 rounded-md p-4 mt-4">
                  <p className="text-slate-400 text-center">Chưa có thuộc tính nào. Thêm thuộc tính để tạo biến thể sản phẩm.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Thông tin kho hàng</CardTitle>
                <CardDescription className="text-slate-400">Quản lý kho hàng và thông tin vận chuyển</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sku">Mã SKU</Label>
                    <Input 
                      id="sku" 
                      placeholder="SKU-001"
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Mã vạch</Label>
                    <Input 
                      id="barcode" 
                      placeholder="123456789012"
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Số lượng tồn kho *</Label>
                    <Input 
                      id="stock" 
                      placeholder="0"
                      type="number"
                      className="bg-slate-900 border-slate-700 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="track-inventory" defaultChecked />
                  <Label htmlFor="track-inventory" className="font-normal">Theo dõi tồn kho</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="allow-backorders" />
                  <Label htmlFor="allow-backorders" className="font-normal">Cho phép đặt hàng khi hết hàng</Label>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="low-stock-threshold">Ngưỡng cảnh báo sắp hết hàng</Label>
                  <Input 
                    id="low-stock-threshold" 
                    placeholder="5"
                    type="number"
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Tối ưu hóa cho công cụ tìm kiếm (SEO)</CardTitle>
                <CardDescription className="text-slate-400">Cải thiện khả năng hiển thị trên các công cụ tìm kiếm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input 
                    id="meta-title" 
                    placeholder="Meta title cho sản phẩm"
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                  <p className="text-sm text-slate-400">Tối ưu: 50-60 ký tự</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea 
                    id="meta-description" 
                    placeholder="Mô tả ngắn gọn về sản phẩm cho công cụ tìm kiếm"
                    className="bg-slate-900 border-slate-700 text-white"
                    rows={3}
                  />
                  <p className="text-sm text-slate-400">Tối ưu: 150-160 ký tự</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-keywords">Meta Keywords</Label>
                  <Input 
                    id="meta-keywords" 
                    placeholder="Từ khóa liên quan, phân cách bằng dấu phẩy"
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Related Products Tab */}
          <TabsContent value="related" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Sản phẩm liên quan</CardTitle>
                <CardDescription className="text-slate-400">Chọn các sản phẩm liên quan để hiển thị cùng với sản phẩm này</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="mb-4">Thêm sản phẩm liên quan</Button>
                
                <div className="border border-slate-700 rounded-md p-4">
                  <p className="text-slate-400 text-center">Chưa có sản phẩm liên quan nào.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
} 