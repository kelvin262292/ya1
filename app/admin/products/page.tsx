import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

export default function ProductsPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Products</h2>
        <Button className="bg-sky-500 hover:bg-sky-600">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-850 text-slate-400 text-sm">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Product</th>
                <th className="px-6 py-4 text-left font-medium">Category</th>
                <th className="px-6 py-4 text-left font-medium">Price</th>
                <th className="px-6 py-4 text-left font-medium">Stock</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-md bg-slate-700 mr-3">
                        {/* Product image would go here */}
                      </div>
                      <div>
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-sm text-slate-400">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{product.category}</td>
                  <td className="px-6 py-4 text-slate-300">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-slate-300">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "In Stock"
                          ? "bg-green-500 text-green-50"
                          : product.status === "Low Stock"
                            ? "bg-yellow-500 text-yellow-50"
                            : "bg-red-500 text-red-50"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-sky-400 hover:text-sky-300">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
