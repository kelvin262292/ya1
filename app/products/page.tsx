"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { 
  Slider 
} from "@/components/ui/slider"
import { ProductCard } from "@/components/yapee/product-card"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

// Gọi API lấy dữ liệu thực tế
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);

// Dữ liệu sản phẩm
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
    isFeatured: true
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
    isFeatured: true
  },
  {
    id: "3",
    name: "Tai nghe không dây DEF",
    price: 3500000,
    originalPrice: 3500000,
    discount: 0,
    image: "https://placehold.co/600x400",
    category: "Phụ kiện",
    status: "Còn hàng",
    rating: 4.3,
    ratingCount: 98,
    isFeatured: false
  },
  {
    id: "4",
    name: "Máy tính bảng Ultra",
    price: 8000000,
    originalPrice: 8500000,
    discount: 5,
    image: "https://placehold.co/600x400",
    category: "Máy tính bảng",
    status: "Còn hàng",
    rating: 4.4,
    ratingCount: 75,
    isFeatured: true
  },
  {
    id: "5",
    name: "Đồng hồ thông minh Pro",
    price: 5000000,
    originalPrice: 5500000,
    discount: 10,
    image: "https://placehold.co/600x400",
    category: "Smartwatch",
    status: "Còn hàng",
    rating: 4.6,
    ratingCount: 110,
    isFeatured: true
  },
  {
    id: "6",
    name: "Camera an ninh HomeGuard",
    price: 2800000,
    originalPrice: 3000000,
    discount: 7,
    image: "https://placehold.co/600x400",
    category: "Thiết bị thông minh",
    status: "Còn hàng",
    rating: 4.2,
    ratingCount: 65,
    isFeatured: false
  },
  {
    id: "7",
    name: "Bàn phím cơ Gaming",
    price: 1900000,
    originalPrice: 2200000,
    discount: 15,
    image: "https://placehold.co/600x400",
    category: "Phụ kiện",
    status: "Còn hàng",
    rating: 4.7,
    ratingCount: 130,
    isFeatured: false
  },
  {
    id: "8",
    name: "Màn hình Gaming 27 inch",
    price: 7500000,
    originalPrice: 8000000,
    discount: 6,
    image: "https://placehold.co/600x400",
    category: "Màn hình",
    status: "Còn hàng",
    rating: 4.5,
    ratingCount: 88,
    isFeatured: false
  }
]

// Dữ liệu danh mục
const categories = [
  { id: "laptop", name: "Laptop" },
  { id: "smartphone", name: "Điện thoại" },
  { id: "tablet", name: "Máy tính bảng" },
  { id: "smartwatch", name: "Smartwatch" },
  { id: "accessories", name: "Phụ kiện" },
  { id: "monitor", name: "Màn hình" },
  { id: "smart-devices", name: "Thiết bị thông minh" }
]

// Khoảng giá
const priceRanges = [
  { id: "range-1", name: "Dưới 2 triệu", min: 0, max: 2000000 },
  { id: "range-2", name: "2 - 5 triệu", min: 2000000, max: 5000000 },
  { id: "range-3", name: "5 - 10 triệu", min: 5000000, max: 10000000 },
  { id: "range-4", name: "10 - 20 triệu", min: 10000000, max: 20000000 },
  { id: "range-5", name: "Trên 20 triệu", min: 20000000, max: Infinity }
]

// Các tùy chọn sắp xếp
const sortOptions = [
  { value: "popular", label: "Phổ biến nhất" },
  { value: "newest", label: "Mới nhất" },
  { value: "price-asc", label: "Giá: Thấp đến cao" },
  { value: "price-desc", label: "Giá: Cao đến thấp" },
  { value: "discount", label: "Khuyến mãi tốt nhất" },
  { value: "rating", label: "Đánh giá cao nhất" }
]

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [productList, setProductList] = useState<typeof products>([])
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([])
  
  // Các trạng thái lọc
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000])
  const [sortBy, setSortBy] = useState("popular")
  
  // Trạng thái hiển thị filter trên mobile
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  
  // Tải dữ liệu sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setProductList(products)
        setFilteredProducts(products)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Lọc sản phẩm mỗi khi các bộ lọc thay đổi
  useEffect(() => {
    let results = [...productList]
    
    // Lọc theo tên sản phẩm
    if (searchTerm) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Lọc theo danh mục
    if (selectedCategories.length > 0) {
      results = results.filter(product => 
        selectedCategories.includes(product.category)
      )
    }
    
    // Lọc theo khoảng giá
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Sắp xếp sản phẩm
    switch (sortBy) {
      case "popular":
        results = results.sort((a, b) => b.ratingCount - a.ratingCount)
        break
      case "newest":
        results = results.sort((a, b) => b.id.localeCompare(a.id))
        break
      case "price-asc":
        results = results.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        results = results.sort((a, b) => b.price - a.price)
        break
      case "discount":
        results = results.sort((a, b) => b.discount - a.discount)
        break
      case "rating":
        results = results.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    
    setFilteredProducts(results)
    setCurrentPage(1)
  }, [searchTerm, selectedCategories, priceRange, sortBy, productList])
  
  // Xử lý thay đổi danh mục
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }
  
  // Xử lý thay đổi khoảng giá
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]])
  }

  // Reset tất cả bộ lọc
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setPriceRange([0, 50000000])
    setSortBy("popular")
  }

  // Tính các sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb 
        segments={[
          { name: "Trang chủ", href: "/" },
          { name: "Sản phẩm", href: "/products" }
        ]} 
        className="mb-6" 
      />
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Tất cả sản phẩm</h1>
      
      {/* Thanh tìm kiếm và sắp xếp */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
          
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bộ lọc trên mobile */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-80 max-w-full p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Bộ lọc</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileFilter(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Lọc theo danh mục */}
              <div>
                <h3 className="font-medium mb-2">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-category-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() => handleCategoryChange(category.name)}
                      />
                      <Label htmlFor={`mobile-category-${category.id}`}>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lọc theo giá */}
              <div>
                <h3 className="font-medium mb-2">Giá ({formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])})</h3>
                <Slider 
                  defaultValue={[0, 50000000]} 
                  max={50000000} 
                  step={500000}
                  onValueChange={handlePriceRangeChange}
                  className="my-6"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>0đ</span>
                  <span>50.000.000đ</span>
                </div>
              </div>
            
              {/* Nút reset và áp dụng */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Đặt lại
                </Button>
                <Button onClick={() => setShowMobileFilter(false)} className="flex-1">
                  Áp dụng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Bộ lọc desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-bold text-lg mb-4">Bộ lọc</h2>
            
            {/* Lọc theo danh mục */}
            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories" className="border-b">
                <AccordionTrigger className="py-3">Danh mục</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => handleCategoryChange(category.name)}
                        />
                        <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            {/* Lọc theo khoảng giá */}
            <Accordion type="single" collapsible defaultValue="price">
              <AccordionItem value="price" className="border-b">
                <AccordionTrigger className="py-3">Khoảng giá</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="mb-4">
                      <p className="mb-2 text-sm">
                        {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                      </p>
                      <Slider 
                        defaultValue={[0, 50000000]} 
                        max={50000000} 
                        step={500000}
                        onValueChange={handlePriceRangeChange}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>0đ</span>
                      <span>50.000.000đ</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Button 
              onClick={resetFilters} 
              variant="outline" 
              className="w-full mt-4"
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        </div>
        
        {/* Danh sách sản phẩm */}
        <div className="flex-1">
          {/* Hiển thị số lượng kết quả và các filter đã chọn */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">
              {filteredProducts.length} sản phẩm
            </span>
            
            {/* Hiển thị các lọc đã chọn */}
            {selectedCategories.length > 0 && selectedCategories.map(category => (
              <div key={category} className="flex items-center bg-gray-100 text-sm px-2 py-1 rounded-full">
                {category}
                <button
                  className="ml-1"
                  onClick={() => handleCategoryChange(category)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            {/* Hiển thị khoảng giá đã chọn nếu khác mặc định */}
            {(priceRange[0] > 0 || priceRange[1] < 50000000) && (
              <div className="flex items-center bg-gray-100 text-sm px-2 py-1 rounded-full">
                {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                <button
                  className="ml-1"
                  onClick={() => setPriceRange([0, 50000000])}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Không tìm thấy sản phẩm nào</h3>
                  <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                  <Button onClick={resetFilters}>Đặt lại bộ lọc</Button>
                </div>
              )}
              
              {/* Phân trang */}
              {filteredProducts.length > 0 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) handlePageChange(currentPage - 1)
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1
                      // Hiển thị trang 1, trang hiện tại và các trang liền kề, và trang cuối
                      if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(page)
                              }}
                              isActive={page === currentPage}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      }
                      
                      // Hiển thị dấu ... giữa các trang không liên tiếp
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )
                      }
                      
                      return null
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) handlePageChange(currentPage + 1)
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
