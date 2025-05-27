"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  X,
  ArrowUpDown,
  ArrowDown,
  ArrowUp
} from "lucide-react"
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface DataTableProps<T> {
  data: T[]
  columns: {
    id: string
    header: string
    accessorKey?: keyof T
    cell?: (item: T) => React.ReactNode
    sortable?: boolean
    filterable?: boolean
    filterOptions?: { value: string, label: string }[]
  }[]
  onRowClick?: (item: T) => void
  searchPlaceholder?: string
  perPageOptions?: number[]
  pageCount?: number
  onExport?: () => void
  onImport?: () => void
  noDataText?: string
  className?: string
}

export function DataTable<T extends { id: string | number }>({ 
  data: initialData,
  columns,
  onRowClick,
  searchPlaceholder = "Tìm kiếm...",
  perPageOptions = [10, 20, 50, 100],
  pageCount: controlledPageCount,
  onExport,
  onImport,
  noDataText = "Không có dữ liệu để hiển thị",
  className
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(perPageOptions[0])
  const [totalItems, setTotalItems] = useState(initialData.length)
  const [filters, setFilters] = useState<Record<string, string[]>>({}) 
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null, direction: 'asc' | 'desc' | null }>({ 
    key: null,
    direction: null
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Cập nhật data khi initialData thay đổi
  useEffect(() => {
    setData(initialData)
    setTotalItems(initialData.length)
  }, [initialData])

  // Xử lý lọc và tìm kiếm dữ liệu
  const filteredData = useMemo(() => {
    // Áp dụng tìm kiếm
    let result = [...initialData]

    if (searchTerm) {
      result = result.filter((item) => {
        return columns.some((column) => {
          const key = column.accessorKey
          if (!key) return false
          
          const value = item[key]
          if (value === null || value === undefined) return false
          
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        })
      })
    }

    // Áp dụng các bộ lọc
    Object.entries(filters).forEach(([columnId, filterValues]) => {
      if (filterValues.length === 0) return

      result = result.filter((item) => {
        const column = columns.find(col => col.id === columnId)
        if (!column || !column.accessorKey) return true

        const value = String(item[column.accessorKey])
        return filterValues.includes(value)
      })
    })

    // Áp dụng sắp xếp
    if (sortConfig.key && sortConfig.direction) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T]
        const bValue = b[sortConfig.key as keyof T]

        if (aValue === bValue) return 0
        
        const direction = sortConfig.direction === 'asc' ? 1 : -1
        
        if (aValue === null || aValue === undefined) return 1 * direction
        if (bValue === null || bValue === undefined) return -1 * direction
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * direction
        }
        
        return ((aValue as any) > (bValue as any) ? 1 : -1) * direction
      })
    }

    return result
  }, [initialData, searchTerm, filters, sortConfig])

  // Dữ liệu đã phân trang
  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage
    const end = start + perPage
    return filteredData.slice(start, end)
  }, [filteredData, page, perPage])

  // Tổng số trang
  const totalPages = Math.ceil(filteredData.length / perPage)

  // Xử lý thay đổi trang
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  // Xử lý thay đổi số lượng item mỗi trang
  const handlePerPageChange = (value: string) => {
    setPerPage(Number(value))
    setPage(1) // Reset về trang đầu tiên khi thay đổi số lượng item/trang
  }

  // Xử lý thay đổi sắp xếp
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column || !column.sortable || !column.accessorKey) return

    setSortConfig(current => {
      if (current.key === column.accessorKey) {
        // Nếu đang sắp xếp theo cột này, thay đổi hướng sắp xếp hoặc hủy sắp xếp
        if (current.direction === 'asc') {
          return { key: column.accessorKey, direction: 'desc' }
        } else if (current.direction === 'desc') {
          return { key: null, direction: null }
        }
      }
      
      // Nếu chưa sắp xếp theo cột này, bắt đầu sắp xếp tăng dần
      return { key: column.accessorKey, direction: 'asc' }
    })
  }

  // Xử lý thêm/xóa bộ lọc
  const handleFilterChange = (columnId: string, value: string, checked: boolean) => {
    setFilters(current => {
      const currentFilters = current[columnId] || []
      
      if (checked) {
        if (!currentFilters.includes(value)) {
          const newFilters = [...currentFilters, value]
          if (newFilters.length === 1) {
            setActiveFilters(prev => [...prev, columnId])
          }
          return { ...current, [columnId]: newFilters }
        }
      } else {
        const newFilters = currentFilters.filter(v => v !== value)
        if (newFilters.length === 0) {
          setActiveFilters(prev => prev.filter(id => id !== columnId))
        }
        return { ...current, [columnId]: newFilters }
      }
      
      return current
    })
  }

  // Xóa tất cả bộ lọc cho một cột
  const clearColumnFilters = (columnId: string) => {
    setFilters(current => {
      const newFilters = { ...current }
      delete newFilters[columnId]
      return newFilters
    })
    setActiveFilters(prev => prev.filter(id => id !== columnId))
  }

  // Xóa tất cả bộ lọc
  const clearAllFilters = () => {
    setFilters({})
    setActiveFilters([])
    setSearchTerm("")
    setSortConfig({ key: null, direction: null })
  }

  // Hiển thị icon sắp xếp
  const renderSortIcon = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column || !column.sortable || !column.accessorKey) return null

    if (sortConfig.key !== column.accessorKey) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />
    }

    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" /> 
      : <ArrowDown className="h-4 w-4 ml-1" />
  }

  // Hiển thị phân trang
  const renderPagination = () => {
    if (totalPages <= 1) return null

    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink 
              onClick={() => handlePageChange(1)} 
              disabled={page === 1}
              className="cursor-pointer bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
            >
              <ChevronsLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationLink 
              onClick={() => handlePageChange(Math.max(page - 1, 1))} 
              disabled={page === 1}
              className="cursor-pointer bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Hiển thị các trang với ellipsis khi cần */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1
            // Hiển thị trang hiện tại, trang đầu, trang cuối và các trang lân cận
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= page - 1 && pageNumber <= page + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink 
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={page === pageNumber}
                    className="cursor-pointer bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white data-[active=true]:bg-sky-600 data-[active=true]:text-white"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Hiển thị ellipsis thay vì tất cả các trang
            if (pageNumber === page - 2 || pageNumber === page + 2) {
              return <PaginationEllipsis key={pageNumber} className="text-slate-400" />
            }

            return null
          })}

          <PaginationItem>
            <PaginationLink 
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))} 
              disabled={page === totalPages}
              className="cursor-pointer bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink 
              onClick={() => handlePageChange(totalPages)} 
              disabled={page === totalPages}
              className="cursor-pointer bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50"
            >
              <ChevronsRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Tìm kiếm */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-slate-800 border-slate-700 text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Hiển thị số lượng bản ghi mỗi trang */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Hiển thị:</span>
            <Select
              value={String(perPage)}
              onValueChange={handlePerPageChange}
            >
              <SelectTrigger className="w-[70px] bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {perPageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Badge hiển thị số lượng bộ lọc đang active */}
          {activeFilters.length > 0 && (
            <Badge 
              variant="outline" 
              className="bg-slate-800 text-white cursor-pointer hover:bg-slate-700"
              onClick={clearAllFilters}
            >
              {activeFilters.length} bộ lọc đang hoạt động
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}

          {/* Nút xuất dữ liệu */}
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="gap-1 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <Download className="h-4 w-4" />
              Xuất
            </Button>
          )}

          {/* Nút nhập dữ liệu */}
          {onImport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onImport}
              className="gap-1 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <Upload className="h-4 w-4" />
              Nhập
            </Button>
          )}
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-850 text-slate-400 text-sm">
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.id} 
                    className="px-6 py-4 text-left font-medium"
                    onClick={() => column.sortable && handleSort(column.id)}
                    style={column.sortable ? { cursor: 'pointer' } : {}}
                  >
                    <div className="flex items-center">
                      <span>{column.header}</span>
                      {column.sortable && renderSortIcon(column.id)}
                      
                      {/* Popover cho bộ lọc */}
                      {column.filterable && column.filterOptions && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={`p-0 h-6 w-6 ml-1 ${filters[column.id]?.length ? 'text-sky-400' : 'text-slate-400'}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Filter className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent 
                            className="w-56 p-3 bg-slate-800 border-slate-700 text-white"
                            align="start"
                          >
                            <div className="space-y-2">
                              <h4 className="font-medium">Lọc theo {column.header}</h4>
                              <div className="space-y-1">
                                {column.filterOptions.map((option) => (
                                  <div key={option.value} className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={`${column.id}-${option.value}`}
                                      checked={filters[column.id]?.includes(option.value) || false}
                                      onCheckedChange={(checked) => 
                                        handleFilterChange(column.id, option.value, !!checked)
                                      }
                                    />
                                    <Label htmlFor={`${column.id}-${option.value}`} className="text-sm font-normal">
                                      {option.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                              
                              {filters[column.id]?.length > 0 && (
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  onClick={() => clearColumnFilters(column.id)}
                                  className="p-0 h-auto text-sky-400 mt-2"
                                >
                                  Xóa bộ lọc
                                </Button>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr 
                    key={String(item.id)} 
                    className="hover:bg-slate-700/30"
                    onClick={() => onRowClick && onRowClick(item)}
                    style={onRowClick ? { cursor: 'pointer' } : {}}
                  >
                    {columns.map((column) => (
                      <td key={`${String(item.id)}-${column.id}`} className="px-6 py-4">
                        {column.cell 
                          ? column.cell(item)
                          : column.accessorKey
                            ? String(item[column.accessorKey] || '')
                            : ''
                        }
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-slate-400"
                  >
                    {searchTerm || Object.values(filters).some(f => f.length > 0)
                      ? "Không tìm thấy kết quả phù hợp. Vui lòng thử lại với từ khóa hoặc bộ lọc khác."
                      : noDataText
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Thông tin phân trang */}
        <div className="text-sm text-slate-400">
          Hiển thị {paginatedData.length} trên tổng số {filteredData.length} bản ghi
        </div>
        
        {/* Phân trang */}
        {renderPagination()}
      </div>
    </div>
  )
}
