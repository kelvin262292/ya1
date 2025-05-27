import { Button } from "@/components/ui/button"
import { mockOrders } from "@/lib/mock-data"

export default function OrdersPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white">Orders</h2>

      <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-850 text-slate-400 text-sm">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Order ID</th>
                <th className="px-6 py-4 text-left font-medium">Customer</th>
                <th className="px-6 py-4 text-left font-medium">Date</th>
                <th className="px-6 py-4 text-left font-medium">Total</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <span className="text-sky-400">#{order.id}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-300">{order.date}</td>
                  <td className="px-6 py-4 text-slate-300">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-500 text-green-50"
                          : order.status === "Shipped"
                            ? "bg-purple-500 text-purple-50"
                            : order.status === "Processing"
                              ? "bg-blue-500 text-blue-50"
                              : order.status === "Pending"
                                ? "bg-yellow-500 text-yellow-50"
                                : "bg-red-500 text-red-50"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-sky-400 hover:text-sky-300">
                      View
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
