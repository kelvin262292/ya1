import { HeroSection } from "@/components/yapee/hero-section"
import { CategoryNav } from "@/components/yapee/category-nav"
import { ProductsSection } from "@/components/yapee/products-section"
import { PromotionsSection } from "@/components/yapee/promotions-section"
import { TestimonialSection } from "@/components/yapee/testimonial-section"

export default function YapeePage() {
  return (
    <main>
      <HeroSection />
      <CategoryNav />
      <ProductsSection />
      <PromotionsSection />
      <TestimonialSection />
    </main>
  )
}
