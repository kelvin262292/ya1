"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { mockProducts } from "@/lib/mock-data"
import { CategoryNav } from "./category-nav"

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts =
    selectedCategory === "all"
      ? mockProducts
      : mockProducts.filter((product) => product.categoryId === selectedCategory)

  return (
    <section id="products" className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Sản Phẩm Nổi Bật</h2>

        <CategoryNav onCategoryChange={setSelectedCategory} />

        <div className="mt-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Không tìm thấy sản phẩm nào trong danh mục này.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
