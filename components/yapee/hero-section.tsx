import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[450px] md:h-[calc(100vh-80px)] md:min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.jpg')",
            backgroundPosition: "center bottom"
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/70 to-orange-500/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            Thiết Bị Nhà Thông Minh Cho Cuộc Sống Hiện Đại
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
            Khám phá bộ sưu tập các thiết bị thông minh cao cấp giúp kết nối và tối ưu hóa không gian sống của bạn.
          </p>
          <div>
            <Button
              size="lg"
              className="bg-white text-red-500 hover:bg-gray-100 transform transition hover:scale-105 duration-300 ease-out"
            >
              Mua Ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Gradient fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />
    </section>
  )
}
