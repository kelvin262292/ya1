import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Không tìm thấy trang</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến một URL khác.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Về trang chủ</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/yapee">Khám phá sản phẩm</Link>
          </Button>
        </div>
        
        <div className="mt-12">
          <h3 className="text-lg font-medium mb-4">Bạn có thể thử:</h3>
          <ul className="space-y-2 text-left">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Kiểm tra lại URL đã nhập</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Sử dụng thanh tìm kiếm để tìm sản phẩm</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Truy cập <Link href="/yapee/contact" className="text-red-500 hover:underline">trang liên hệ</Link> để được hỗ trợ</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 