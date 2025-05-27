import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { mockCustomers } from "@/lib/mock-data"

export default function CustomersPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Customers</h2>
        <Button className="bg-sky-500 hover:bg-sky-600">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-850 text-slate-400 text-sm">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Customer</th>
                <th className="px-6 py-4 text-left font-medium">Email</th>
                <th className="px-6 py-4 text-left font-medium">Orders</th>
                <th className="px-6 py-4 text-left font-medium">Total Spent</th>
                <th className="px-6 py-4 text-left font-medium">Last Order</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 flex-shrink-0 rounded-full ${customer.avatarColor} mr-3 flex items-center justify-center text-white font-medium`}
                      >
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{customer.name}</div>
                        <div className="text-sm text-slate-400">ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{customer.email}</td>
                  <td className="px-6 py-4 text-slate-300">{customer.orders}</td>
                  <td className="px-6 py-4 text-slate-300">${customer.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-slate-300">{customer.lastOrder}</td>
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
