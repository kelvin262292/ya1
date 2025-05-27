import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Yapee Microservices</h1>
          <nav className="space-x-4">
            <Link href="/yapee" className="hover:underline">
              Customer Site
            </Link>
            <Link href="/admin" className="hover:underline">
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Yapee E-commerce Platform</h2>
            <p className="text-xl text-muted-foreground">
              A modern e-commerce solution with microservices architecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">Customer Interface</h3>
                <p className="text-muted-foreground">
                  Browse products, manage your cart, and place orders with our intuitive customer-facing interface.
                </p>
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/yapee">Visit Customer Site</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">Admin Dashboard</h3>
                <p className="text-muted-foreground">
                  Manage products, orders, customers, and view analytics with our comprehensive admin dashboard.
                </p>
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/admin">Visit Admin Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 Yapee E-commerce. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
