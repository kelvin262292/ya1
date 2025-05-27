import type React from "react"
import { YapeeHeader } from "@/components/yapee/header"
import { YapeeFooter } from "@/components/yapee/footer"
import { CartProvider } from "@/components/yapee/cart-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Yapee - Smart Home Devices",
  description: "Shop for the latest smart home devices and technology",
}

export default function YapeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <YapeeHeader />
        <div className="flex-1">{children}</div>
        <YapeeFooter />
      </div>
    </CartProvider>
  )
}
