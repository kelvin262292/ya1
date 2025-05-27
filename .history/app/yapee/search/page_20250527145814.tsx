"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search as SearchIcon, ChevronLeft, ChevronRight, SlidersHorizontal, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const initialQuery = searchParams.get("q") || ""
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 50000000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  
  const productsPerPage = 9
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  
  // Tìm kiếm sản phẩm khi query thay đổi
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])
  
  // Tạo danh sách danh mục từ sản phẩm tìm thấy
  const categories = [...new Set(products.map(product => product.category))]
  
  const performSearch = (query: string) => {
    setIsSearching(true)
    
    // Giả lập tìm kiếm từ mock data
    // Trong thực tế, sẽ gọi API search
    setTimeout(() => {
      if (!query.trim()) {
        setProducts([])
        setFilteredProducts([])
        setIsSearching(false)
        return
      }
      
      const queryLower = query.toLowerCase()
      const results = mockProducts.filter(product => 
        product.name.toLowerCase().includes(queryLower) || 
        product.description?.toLowerCase().includes(queryLower) ||
        product.category.toLowerCase().includes(queryLower)
      )
      
      setProducts(results)
      setFilteredProducts(results)
      setIsSearching(false)
      
      // Tạo gợi ý tìm kiếm
      const relatedTerms = [...new Set(
        results
          .flatMap(product => [
            product.name.split(' '),
            product.category.split(' '),
            product.description?.split(' ') || []
          ])
          .flat()
          .filter(term => 
            term.length > 3 && 
            term.toLowerCase().includes(queryLower) && 
            term.toLowerCase() !== queryLower
          )
      )].slice(0, 5)
      
      setSuggestions(relatedTerms)
    }, 500) // Giả lập độ trễ mạng
  }
  
  // Lọc và sắp xếp sản phẩm
  useEffect(() => {
    let result = [...products]
    
    // Lọc theo giá
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Lọc theo danh mục
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category))
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
  }, [products, sortBy, priceRange, selectedCategories, inStockOnly])
  
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Cuộn lên đầu trang khi chuyển trang
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
  
  const resetFilters = () => {
    setPriceRange([0, 50000000])
    setSelectedCategories([])
    setInStockOnly(false)
    setSortBy("featured")
  }
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)
    
    // Cập nhật URL với query mới
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url.toString())
  }
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    performSearch(suggestion)
    
    // Cập nhật URL với query mới
    const url = new URL(window.location.href)
    url.searchParams.set("q", suggestion)
    window.history.pushState({}, "", url.toString())
  }
  
  const addToWishlist = (product: Product) => {
    toast({
      title: "Đã thêm vào danh sách yêu thích",
      description: `${product.name} đã được thêm vào danh sách yêu thích.`,
    })
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-5 w-5 border-2 border-red-500 rounded-full border-t-transparent"></div>
              </div>
            )}
          </div>
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </div>
      </form>
      
      {/* Search suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Gợi ý tìm kiếm:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Kết quả tìm kiếm cho "{initialQuery}"
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {filteredProducts.length} sản phẩm được tìm thấy
        </p>
      </div>
      
      <Separator className="mb-6" />
      
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
                
                <AccordionItem value="category">
                  <AccordionTrigger className="py-2">Danh mục</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
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
                
                <AccordionItem value="category">
                  <AccordionTrigger className="py-2">Danh mục</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-category-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <label 
                            htmlFor={`mobile-category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
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
          
          {isSearching ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin h-12 w-12 border-4 border-red-500 rounded-full border-t-transparent"></div>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="text-center py-16">
              <SearchIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
                Không tìm thấy sản phẩm nào
              </h2>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc của bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetFilters} variant="outline">Đặt lại bộ lọc</Button>
                <Link href="/yapee">
                  <Button>Quay lại trang chủ</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={product.imageUrl || "https://via.placeholder.com/400"}
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