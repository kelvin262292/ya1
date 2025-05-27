import { Heading } from '@/components/ui/heading'
import { ProductsSection } from '@/components/yapee/products-section'

export default function ProductsPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Heading size='lg'>Danh Sách Sản Phẩm</Heading>
      <p>Khám phá các sản phẩm nổi bật của chúng tôi.</p>
      <div className='mt-8'>
        <ProductsSection />
      </div>
    </div>
  )
}