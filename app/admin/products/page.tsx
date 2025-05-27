"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon, Pencil, AlertCircle } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Product } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProductsPage() {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Định nghĩa các trạng thái có thể có cho sản phẩm
  const statusOptions = [
    { value: "active", label: "Hoạt động" },
    { value: "inactive", label: "Không hoạt động" },
  ]

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      if (!response.ok) {
        throw new Error('Không thể tải danh sách sản phẩm');
      }
      const data = await response.json();
      setProducts(data.products || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Định nghĩa các danh mục sản phẩm
  const categoryOptions = Array.from(
    new Set(products.map((product) => product.category))
  ).map((category) => ({
    value: category,
    label: category,
  }))

  // Xử lý xuất dữ liệu
  const handleExport = () => {
    toast({
      title: "Xuất dữ liệu",
      description: "Đang xuất dữ liệu sản phẩm...",
    })
    // Giả lập quá trình xuất dữ liệu
    setTimeout(() => {
      toast({
        title: "Xuất dữ liệu thành công",
        description: "Dữ liệu sản phẩm đã được xuất thành công.",
      })
    }, 1500)
  }

  // Xử lý nhập dữ liệu
  const handleImport = () => {
    toast({
      title: "Nhập dữ liệu",
      description: "Tính năng nhập dữ liệu đang được phát triển.",
    })
  }

  // Xử lý khi click vào một sản phẩm
  const handleRowClick = (product: any) => {
    router.push(`/admin/products/edit/${product.id}`)
  }

  // Xử lý xóa sản phẩm
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return

    try {
      const response = await fetch(`/api/admin/products/${selectedProduct}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Không thể xóa sản phẩm');
      }

      // Cập nhật danh sách sản phẩm
      setProducts(products.filter(p => p.id !== selectedProduct));
      
      toast({
        title: "Đã xóa sản phẩm",
        description: `Sản phẩm với ID: ${selectedProduct} đã được xóa thành công.`,
      })
    } catch (err) {
      toast({
        title: "Lỗi",
        description: err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa sản phẩm',
        variant: "destructive"
      })
    }

    setSelectedProduct(null)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Sản phẩm</h2>
        <Button className="bg-sky-500 hover:bg-sky-600" asChild>
          <Link href="/admin/products/add">
            <PlusIcon className="h-4 w-4 mr-2" />
            Thêm sản phẩm mới
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-slate-400">Đang tải dữ liệu...</div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="text-red-400 mb-4">{error}</div>
          <Button
            onClick={fetchProducts}
            className="bg-sky-500 hover:bg-sky-600"
          >
            Thử lại
          </Button>
        </div>
      ) : (
        <DataTable
          data={products}
        columns={[
          {
            id: "product",
            header: "Sản phẩm",
            accessorKey: "name",
            sortable: true,
            cell: (product) => (
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0 rounded-md bg-slate-700 mr-3">
                  {/* Ảnh sản phẩm sẽ hiển thị ở đây */}
                </div>
                <div>
                  <div className="font-medium text-white">{product.name}</div>
                  <div className="text-sm text-slate-400">ID: {product.id}</div>
                </div>
              </div>
            ),
          },
          {
            id: "category",
            header: "Danh mục",
            accessorKey: "category",
            sortable: true,
            filterable: true,
            filterOptions: categoryOptions,
          },
          {
            id: "price",
            header: "Giá",
            accessorKey: "price",
            sortable: true,
            cell: (product) => `$${product.price.toFixed(2)}`,
          },
          {
            id: "stock",
            header: "Tồn kho",
            accessorKey: "stock",
            sortable: true,
          },
          {
            id: "status",
            header: "Trạng thái",
            accessorKey: "status",
            sortable: true,
            filterable: true,
            filterOptions: statusOptions,
            cell: (product) => (
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                product.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {statusOptions.find(s => s.value === product.status)?.label || product.status}
              </span>
            ),
          },
          {
            id: "actions",
            header: "Thao tác",
            cell: (product) => (
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sky-400 hover:text-sky-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/admin/products/edit/${product.id}`)
                  }}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Sửa
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProduct(product.id)
                      }}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Xóa
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-800 border-slate-700 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600">
                        Hủy bỏ
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={handleDeleteProduct}
                      >
                        Xóa sản phẩm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ),
          },
        ]}
        onRowClick={handleRowClick}
        searchPlaceholder="Tìm kiếm sản phẩm..."
        onExport={handleExport}
        onImport={handleImport}
        />
      )}
    </div>
  )
}
