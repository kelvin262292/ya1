import type { Product, Order, Customer, Testimonial } from "./types"

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "PHONE-001",
    name: "iPhone 14 Pro Max",
    description: "Smartphone cao cấp với màn hình Dynamic Island, camera 48MP",
    fullDescription: "iPhone 14 Pro Max là dòng điện thoại cao cấp nhất của Apple với màn hình 6.7 inch Super Retina XDR, trang bị Dynamic Island, chip A16 Bionic mạnh mẽ và hệ thống camera 48MP đột phá. Thiết bị có khả năng chống nước, chống bụi và pin lâu dài.",
    price: 28990000,
    originalPrice: 31990000,
    stock: 25,
    category: "Điện thoại",
    imageUrl: "/placeholder.jpg",
    status: "active",
    featured: true,
    sku: "APL-IP14PM-256",
    barcode: "1234567890123",
    variants: [
      {
        name: "Màu sắc",
        options: ["Đen", "Bạc", "Vàng", "Tím"]
      },
      {
        name: "Dung lượng",
        options: ["128GB", "256GB", "512GB", "1TB"]
      }
    ]
  },
  {
    id: "PHONE-002",
    name: "Samsung Galaxy S23 Ultra",
    description: "Smartphone cao cấp với bút S Pen và camera 108MP",
    price: 26990000,
    stock: 18,
    category: "Điện thoại",
    imageUrl: "/placeholder.jpg",
    status: "active",
    featured: true,
    variants: [
      {
        name: "Màu sắc",
        options: ["Đen", "Xanh", "Kem", "Tím"]
      }
    ]
  },
  {
    id: "PHONE-003",
    name: "Xiaomi Redmi Note 12 Pro",
    description: "Smartphone tầm trung với màn hình AMOLED 120Hz",
    price: 5990000,
    originalPrice: 7490000,
    stock: 50,
    category: "Điện thoại",
    imageUrl: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "LAPTOP-001",
    name: "MacBook Pro M2",
    description: "Laptop mỏng nhẹ với hiệu năng mạnh mẽ từ chip M2",
    price: 35990000,
    originalPrice: 38990000,
    stock: 10,
    category: "Laptop",
    imageUrl: "/placeholder.jpg",
    status: "active",
    featured: true
  },
  {
    id: "LAPTOP-002",
    name: "Dell XPS 13",
    description: "Laptop mỏng nhẹ với màn hình InfinityEdge",
    price: 32990000,
    stock: 8,
    category: "Laptop",
    imageUrl: "/placeholder.jpg",
    status: "inactive",
  },
  {
    id: "TABLET-001",
    name: "iPad Pro M2",
    description: "Máy tính bảng chuyên nghiệp với chip M2 mạnh mẽ",
    price: 25990000,
    stock: 15,
    category: "Máy tính bảng",
    imageUrl: "/placeholder.jpg",
    status: "active",
    featured: true
  },
  {
    id: "TABLET-002",
    name: "Samsung Galaxy Tab S9 Ultra",
    description: "Máy tính bảng cao cấp với màn hình lớn và bút S Pen",
    price: 24990000,
    stock: 0,
    category: "Máy tính bảng",
    imageUrl: "/placeholder.jpg",
    status: "inactive"
  },
  {
    id: "ACCS-001",
    name: "Tai nghe Apple AirPods Pro 2",
    description: "Tai nghe không dây với chống ồn chủ động và âm thanh không gian",
    price: 5990000,
    originalPrice: 6990000,
    stock: 30,
    category: "Phụ kiện",
    imageUrl: "/placeholder.jpg",
    status: "active"
  },
  {
    id: "WATCH-001",
    name: "Apple Watch Series 8",
    description: "Đồng hồ thông minh với tính năng theo dõi sức khỏe toàn diện",
    price: 9990000,
    stock: 12,
    category: "Smartwatch",
    imageUrl: "/placeholder.jpg",
    status: "active",
    variants: [
      {
        name: "Màu sắc",
        options: ["Đen", "Bạc", "Đỏ"]
      },
      {
        name: "Kích thước",
        options: ["41mm", "45mm"]
      }
    ]
  },
  {
    id: "SMART-001",
    name: "Loa thông minh Google Nest Hub",
    description: "Loa thông minh tích hợp màn hình cảm ứng và Google Assistant",
    price: 2990000,
    originalPrice: 3490000,
    stock: 0,
    category: "Thiết bị thông minh",
    imageUrl: "/placeholder.jpg",
    status: "inactive"
  }
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      avatar: "https://example.com/avatars/avatar1.jpg",
    },
    date: "2023-12-15",
    total: 28990000,
    status: "Delivered",
    paymentStatus: "Paid",
    items: [
      {
        productId: "PHONE-001",
        productName: "iPhone 14 Pro Max",
        quantity: 1,
        price: 28990000,
        variant: {
          "Màu sắc": "Đen",
          "Dung lượng": "256GB"
        }
      }
    ],
    shippingAddress: {
      street: "123 Đường Lê Lợi",
      city: "Quận 1",
      state: "TP. Hồ Chí Minh",
      postalCode: "700000",
      country: "Việt Nam"
    }
  },
  {
    id: "ORD-002",
    customer: {
      name: "Trần Thị B",
      email: "tranthib@example.com"
    },
    date: "2023-12-16",
    total: 7990000,
    status: "Processing",
    paymentStatus: "Paid",
    items: [
      {
        productId: "ACCS-001",
        productName: "Tai nghe Apple AirPods Pro 2",
        quantity: 1,
        price: 5990000
      },
      {
        productId: "ACCS-002",
        productName: "Ốp lưng iPhone 14 Pro Max",
        quantity: 1,
        price: 2000000
      }
    ]
  },
  {
    id: "ORD-003",
    customer: {
      name: "Lê Văn C",
      email: "levanc@example.com"
    },
    date: "2023-12-17",
    total: 35990000,
    status: "Shipped",
    paymentStatus: "Paid",
    items: [
      {
        productId: "LAPTOP-001",
        productName: "MacBook Pro M2",
        quantity: 1,
        price: 35990000
      }
    ]
  },
  {
    id: "ORD-004",
    customer: {
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      avatar: "https://example.com/avatars/avatar2.jpg",
    },
    date: "2023-12-18",
    total: 25990000,
    status: "Pending",
    paymentStatus: "Pending",
    items: [
      {
        productId: "TABLET-001",
        productName: "iPad Pro M2",
        quantity: 1,
        price: 25990000
      }
    ]
  },
  {
    id: "ORD-005",
    customer: {
      name: "Hoàng Văn E",
      email: "hoangvane@example.com"
    },
    date: "2023-12-19",
    total: 9990000,
    status: "Cancelled",
    paymentStatus: "Refunded",
    items: [
      {
        productId: "WATCH-001",
        productName: "Apple Watch Series 8",
        quantity: 1,
        price: 9990000,
        variant: {
          "Màu sắc": "Đen",
          "Kích thước": "45mm"
        }
      }
    ]
  }
]

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    avatar: "https://example.com/avatars/avatar1.jpg",
    dateJoined: "2023-01-15",
    totalOrders: 5,
    totalSpent: 50000000,
    lastPurchase: "2023-12-15",
    addresses: [
      {
        street: "123 Đường Lê Lợi",
        city: "Quận 1",
        state: "TP. Hồ Chí Minh",
        postalCode: "700000",
        country: "Việt Nam"
      }
    ]
  },
  {
    id: "CUS-002",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    dateJoined: "2023-02-20",
    totalOrders: 3,
    totalSpent: 35000000,
    lastPurchase: "2023-12-16"
  },
  {
    id: "CUS-003",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    avatar: "https://example.com/avatars/avatar3.jpg",
    dateJoined: "2023-03-10",
    totalOrders: 2,
    totalSpent: 45000000,
    lastPurchase: "2023-12-17"
  },
  {
    id: "CUS-004",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    avatar: "https://example.com/avatars/avatar2.jpg",
    dateJoined: "2023-04-05",
    totalOrders: 1,
    totalSpent: 25990000,
    lastPurchase: "2023-12-18"
  },
  {
    id: "CUS-005",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    dateJoined: "2023-05-12",
    totalOrders: 1,
    totalSpent: 0,
    lastPurchase: "2023-12-19"
  }
]

// Mock Testimonials
export const mockTestimonials: Testimonial[] = [
  {
    id: "T001",
    name: "Nguyen Van A",
    title: "Kỹ sư phần mềm",
    location: "Hà Nội",
    quote:
      "Tôi đã mua loa thông minh và đèn thông minh từ Yapee. Chất lượng sản phẩm tuyệt vời và dịch vụ khách hàng rất chu đáo. Tôi sẽ tiếp tục mua sắm tại đây!",
    avatarUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "T002",
    name: "Tran Thi B",
    title: "Giáo viên",
    location: "Hồ Chí Minh",
    quote:
      "Camera an ninh của Yapee đã giúp tôi cảm thấy an tâm hơn về ngôi nhà của mình. Chất lượng hình ảnh rõ nét và ứng dụng rất dễ sử dụng.",
    avatarUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "T003",
    name: "Le Van C",
    title: "Kiến trúc sư",
    location: "Đà Nẵng",
    quote:
      "Tôi đã trang bị toàn bộ ngôi nhà với các thiết bị thông minh từ Yapee. Mọi thứ hoạt động liền mạch với nhau và đã thực sự nâng cao chất lượng cuộc sống của tôi.",
    avatarUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "T004",
    name: "Pham Thi D",
    title: "Bác sĩ",
    location: "Cần Thơ",
    quote:
      "Dịch vụ giao hàng nhanh chóng và sản phẩm đúng như mô tả. Tôi đặc biệt hài lòng với bộ điều nhiệt thông minh, nó đã giúp tôi tiết kiệm đáng kể chi phí điện.",
    avatarUrl: "/placeholder.svg?height=200&width=200",
  },
]
