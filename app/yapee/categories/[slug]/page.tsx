'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, SlidersHorizontal, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

type Props = {
  params: { slug: string }
}

export default function CategoryPage({ params }: Props) {
  const { slug } = params
  const { toast } = useToast()
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 50000000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  
  const productsPerPage = 9
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  
  // Lấy danh sách sản phẩm theo danh mục
  useEffect(() => {
    // Trong thực tế, sẽ gọi API với slug để lấy sản phẩm theo danh mục
    const categoryProducts = mockProducts.filter(
      product => product.category.toLowerCase() === slug.replace(/-/g, ' ')
    )
    setProducts(categoryProducts)
    setFilteredProducts(categoryProducts)
  }, [slug])
  
  // Lọc và sắp xếp sản phẩm
  useEffect(() => {
    let result = [...products]
    
    // Lọc theo giá
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Lọc theo thương hiệu
    if (selectedBrands.length > 0) {
      // Giả sử mỗi sản phẩm có thuộc tính brand (trong thực tế)
      // result = result.filter(product => selectedBrands.includes(product.brand))
      
      // Vì mockProducts không có thuộc tính brand, chúng ta sẽ bỏ qua bước này
    }
    
    // Lọc theo tình trạng kho
    if (inStockOnly) {
      result = result.filter(product => product.status !== "Out of Stock")
    }
    
    // Sắp xếp
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // Giả sử có trường createdAt (trong thực tế)
        // result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "featured":
      default:
        // Sản phẩm featured sẽ hiển thị trước
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }
    
    setFilteredProducts(result)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc thay đổi
  }, [products, sortBy, priceRange, selectedBrands, inStockOnly])
  
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Cuộn lên đầu trang khi chuyển trang
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }
  
  const resetFilters = () => {
    setPriceRange([0, 50000000])
    setSelectedBrands([])
    setInStockOnly(false)
  }
  
  const addToWishlist = (product: Product) => {
    toast({
      title: "Đã thêm vào danh sách yêu thích",
      description: `${product.name} đã được thêm vào danh sách yêu thích.`,
    })
  }
  
  // Danh sách thương hiệu giả định
  const brands = ["Apple", "Samsung", "Xiaomi", "Dell", "Google"]
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul className="flex items-center space-x-2">
          <li><Link href="/yapee" className="hover:text-red-500">Trang chủ</Link></li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/yapee/categories" className="hover:text-red-500">Danh mục</Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium">{categoryName}</span>
          </li>
        </ul>
      </div>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {filteredProducts.length} sản phẩm
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-lg mb-4">Bộ lọc</h2>
              
              <Accordion type="single" collapsible defaultValue="price" className="w-full">
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">Giá</AccordionTrigger>
                  <AccordionContent>
                    <div className="py-2">
                      <Slider
                        defaultValue={[0, 50000000]}
                        max={50000000}
                        step={1000000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-6"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[0])}
                        </span>
                        <span>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="brand">
                  <AccordionTrigger className="py-2">Thương hiệu</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`brand-${brand}`} 
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => handleBrandChange(brand)}
                          />
                          <label 
                            htmlFor={`brand-${brand}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="availability">
                  <AccordionTrigger className="py-2">Tình trạng</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="in-stock" 
                        checked={inStockOnly}
                        onCheckedChange={() => setInStockOnly(!inStockOnly)}
                      />
                      <label 
                        htmlFor="in-stock"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Còn hàng
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Separator className="my-4" />
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={resetFilters}
              >
                Đặt lại bộ lọc
              </Button>
            </div>
          </div>
        </div>
        
        {/* Filters - Mobile */}
        <Sheet>
          <div className="lg:hidden flex items-center justify-between mb-4">
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Bộ lọc
              </Button>
            </SheetTrigger>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Nổi bật</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Bộ lọc</SheetTitle>
              <SheetDescription>
                Lọc sản phẩm theo các tiêu chí dưới đây
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-4">
              <Accordion type="single" collapsible defaultValue="price" className="w-full">
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">Giá</AccordionTrigger>
                  <AccordionContent>
                    <div className="py-2">
                      <Slider
                        defaultValue={[0, 50000000]}
                        max={50000000}
                        step={1000000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-6"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[0])}
                        </span>
                        <span>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="brand">
                  <AccordionTrigger className="py-2">Thương hiệu</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-brand-${brand}`} 
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => handleBrandChange(brand)}
                          />
                          <label 
                            htmlFor={`mobile-brand-${brand}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="availability">
                  <AccordionTrigger className="py-2">Tình trạng</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mobile-in-stock" 
                        checked={inStockOnly}
                        onCheckedChange={() => setInStockOnly(!inStockOnly)}
                      />
                      <label 
                        htmlFor="mobile-in-stock"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Còn hàng
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <SheetFooter>
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Đặt lại bộ lọc
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        {/* Products */}
        <div className="flex-1">
          {/* Sort - Desktop */}
          <div className="hidden lg:flex items-center justify-end mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sắp xếp theo:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Nổi bật</SelectItem>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                  <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {currentProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
                Không tìm thấy sản phẩm nào
              </h2>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                Hãy thử điều chỉnh bộ lọc của bạn
              </p>
              <Button onClick={resetFilters}>Đặt lại bộ lọc</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={product.imageUrl || "/placeholder.jpg"}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </div>
                      )}
                      
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="absolute top-2 right-2 rounded-full opacity-80 hover:opacity-100"
                        onClick={() => addToWishlist(product)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <Link href={`/yapee/products/${product.id}`} className="block">
                        <h3 className="text-lg font-medium line-clamp-2 hover:text-red-500 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-2">
                        {product.category}
                      </p>
                      
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
                      
                      <div className="mt-2">
                        <Button className="w-full">Thêm vào giỏ</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="join">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="join-item"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className="join-item"
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="join-item"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}