'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Share2, Facebook, Twitter, Linkedin, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Dữ liệu mẫu cho bài viết
const BLOG_POSTS = [
  {
    id: "post-1",
    slug: "top-10-smartphone-2023",
    title: "Top 10 smartphone đáng mua nhất năm 2023",
    excerpt: "Khám phá những mẫu điện thoại thông minh tốt nhất năm 2023 với nhiều tính năng đột phá và hiệu năng mạnh mẽ.",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
    category: "Điện thoại",
    author: "Nguyễn Văn A",
    date: "2023-12-15",
    readTime: "5 phút đọc",
    featured: true,
    content: `
      <p>Năm 2023 đã chứng kiến sự ra mắt của nhiều mẫu smartphone đột phá với công nghệ tiên tiến và thiết kế ấn tượng. Trong bài viết này, chúng tôi sẽ điểm qua 10 mẫu điện thoại thông minh đáng mua nhất trong năm nay.</p>
      
      <h2>1. iPhone 15 Pro Max</h2>
      <p>Apple đã một lần nữa khẳng định vị thế dẫn đầu với iPhone 15 Pro Max. Sản phẩm này nổi bật với chip A17 Pro mạnh mẽ, camera 48MP với khả năng zoom quang học 5x và màn hình ProMotion 120Hz sắc nét. Thời lượng pin cũng được cải thiện đáng kể so với thế hệ trước.</p>
      
      <h2>2. Samsung Galaxy S23 Ultra</h2>
      <p>Flagship của Samsung tiếp tục gây ấn tượng với camera 200MP, bút S-Pen tích hợp và hiệu năng vượt trội nhờ chip Snapdragon 8 Gen 2. Màn hình Dynamic AMOLED 2X với độ phân giải QHD+ mang lại trải nghiệm hình ảnh sống động.</p>
      
      <h2>3. Google Pixel 8 Pro</h2>
      <p>Google Pixel 8 Pro nổi bật với khả năng xử lý hình ảnh nhờ AI và chip Tensor G3. Camera của Pixel tiếp tục là điểm mạnh với nhiều tính năng chụp ảnh đêm, xóa phông và Magic Eraser được cải tiến.</p>
      
      <h2>4. Xiaomi 13 Ultra</h2>
      <p>Xiaomi 13 Ultra là một trong những smartphone có hệ thống camera ấn tượng nhất năm 2023, với 4 camera sau được đồng phát triển với Leica. Thiết bị này còn sở hữu màn hình AMOLED E6 120Hz và sạc nhanh 120W.</p>
      
      <h2>5. OnePlus 11</h2>
      <p>OnePlus 11 mang đến hiệu năng mạnh mẽ với chip Snapdragon 8 Gen 2, sạc siêu nhanh 100W và màn hình AMOLED 120Hz. Hệ thống camera được tinh chỉnh bởi Hasselblad cho chất lượng hình ảnh xuất sắc.</p>
      
      <h2>6. Vivo X90 Pro+</h2>
      <p>Vivo X90 Pro+ gây ấn tượng với camera chính 1-inch, chip xử lý hình ảnh V2 và khả năng chụp đêm vượt trội. Sản phẩm này cũng sở hữu màn hình cong 2K+ AMOLED và sạc nhanh 80W.</p>
      
      <h2>7. Oppo Find X6 Pro</h2>
      <p>Oppo Find X6 Pro nổi bật với thiết kế sang trọng, camera Hasselblad 50MP và màn hình AMOLED 120Hz. Hiệu năng của máy được đảm bảo với chip Snapdragon 8 Gen 2 và RAM lên đến 16GB.</p>
      
      <h2>8. Asus ROG Phone 7 Ultimate</h2>
      <p>Dành cho game thủ, Asus ROG Phone 7 Ultimate mang đến hiệu năng không đối thủ với Snapdragon 8 Gen 2, hệ thống tản nhiệt tiên tiến và pin 6000mAh. Màn hình AMOLED 165Hz mang lại trải nghiệm chơi game mượt mà.</p>
      
      <h2>9. Nothing Phone (2)</h2>
      <p>Nothing Phone (2) tiếp tục gây ấn tượng với thiết kế Glyph Interface độc đáo, hiệu năng ổn định và trải nghiệm Android gần như nguyên bản. Đây là lựa chọn tuyệt vời cho những người dùng yêu thích sự khác biệt.</p>
      
      <h2>10. Motorola Edge 40 Pro</h2>
      <p>Motorola Edge 40 Pro đánh dấu sự trở lại mạnh mẽ của Motorola với màn hình cong 165Hz, sạc nhanh 125W và camera 50MP. Thiết bị này cũng có khả năng chống nước IP68 và giao diện người dùng gần với Android gốc.</p>
      
      <h2>Kết luận</h2>
      <p>Năm 2023 chứng kiến sự cạnh tranh khốc liệt giữa các nhà sản xuất smartphone, mang đến cho người dùng nhiều lựa chọn tuyệt vời. Tùy thuộc vào nhu cầu và ngân sách, bạn có thể lựa chọn một trong những mẫu điện thoại trên để có trải nghiệm công nghệ tốt nhất.</p>
    `
  },
  {
    id: "post-2",
    slug: "cach-chon-laptop-phu-hop",
    title: "Cách chọn laptop phù hợp với nhu cầu của bạn",
    excerpt: "Hướng dẫn chi tiết giúp bạn lựa chọn chiếc laptop phù hợp với công việc, học tập và nhu cầu giải trí.",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    category: "Laptop",
    author: "Trần Thị B",
    date: "2023-12-10",
    readTime: "8 phút đọc",
    featured: true,
    content: `
      <p>Việc lựa chọn một chiếc laptop phù hợp có thể là một thách thức, đặc biệt khi thị trường có quá nhiều lựa chọn. Bài viết này sẽ hướng dẫn bạn cách chọn laptop phù hợp với nhu cầu cụ thể của mình.</p>
      
      <h2>Xác định mục đích sử dụng</h2>
      <p>Trước khi bắt đầu tìm kiếm laptop, hãy xác định rõ mục đích sử dụng chính của bạn:</p>
      <ul>
        <li><strong>Công việc văn phòng:</strong> Xử lý văn bản, bảng tính, email, họp trực tuyến</li>
        <li><strong>Học tập:</strong> Nghiên cứu, làm bài tập, tham gia lớp học trực tuyến</li>
        <li><strong>Thiết kế đồ họa:</strong> Photoshop, Illustrator, InDesign</li>
        <li><strong>Chơi game:</strong> Các tựa game nhẹ hoặc game đòi hỏi cấu hình cao</li>
        <li><strong>Lập trình:</strong> Viết code, chạy các IDE, máy ảo</li>
        <li><strong>Giải trí:</strong> Xem phim, lướt web, nghe nhạc</li>
      </ul>
      
      <h2>Cân nhắc về hiệu năng</h2>
      
      <h3>Bộ vi xử lý (CPU)</h3>
      <p>CPU là "bộ não" của laptop, quyết định khả năng xử lý thông tin:</p>
      <ul>
        <li><strong>Intel Core i3/Ryzen 3:</strong> Phù hợp cho công việc văn phòng cơ bản và lướt web</li>
        <li><strong>Intel Core i5/Ryzen 5:</strong> Cân bằng giữa hiệu năng và giá thành, phù hợp cho đa số người dùng</li>
        <li><strong>Intel Core i7/Ryzen 7:</strong> Hiệu năng cao, phù hợp cho đồ họa và chơi game</li>
        <li><strong>Intel Core i9/Ryzen 9:</strong> Hiệu năng cực cao cho công việc chuyên nghiệp</li>
      </ul>
      
      <h3>RAM</h3>
      <p>RAM quyết định khả năng đa nhiệm của laptop:</p>
      <ul>
        <li><strong>4GB:</strong> Đủ cho công việc văn phòng cơ bản</li>
        <li><strong>8GB:</strong> Tiêu chuẩn cho hầu hết người dùng</li>
        <li><strong>16GB trở lên:</strong> Cần thiết cho đồ họa, chơi game và lập trình</li>
      </ul>
      
      <h3>Ổ cứng</h3>
      <p>Lựa chọn giữa tốc độ và dung lượng:</p>
      <ul>
        <li><strong>SSD:</strong> Tốc độ nhanh, ít tiêu thụ điện, nhưng giá cao</li>
        <li><strong>HDD:</strong> Dung lượng lớn, giá rẻ, nhưng chậm hơn</li>
        <li><strong>Kết hợp cả hai:</strong> SSD cho hệ điều hành và ứng dụng, HDD cho lưu trữ</li>
      </ul>
      
      <h2>Màn hình</h2>
      <p>Màn hình ảnh hưởng trực tiếp đến trải nghiệm sử dụng:</p>
      <ul>
        <li><strong>Kích thước:</strong> 13-14 inch (di động), 15-16 inch (cân bằng), 17 inch (thay thế desktop)</li>
        <li><strong>Độ phân giải:</strong> Full HD (1920x1080) là tiêu chuẩn tối thiểu</li>
        <li><strong>Tấm nền:</strong> IPS cho góc nhìn rộng, màu sắc chính xác; OLED cho màu đen sâu, tương phản cao</li>
        <li><strong>Tần số quét:</strong> 60Hz (tiêu chuẩn), 120Hz trở lên (cho game và trải nghiệm mượt mà)</li>
      </ul>
      
      <h2>Card đồ họa (GPU)</h2>
      <p>GPU quan trọng cho đồ họa và chơi game:</p>
      <ul>
        <li><strong>Đồ họa tích hợp:</strong> Đủ cho công việc văn phòng và giải trí cơ bản</li>
        <li><strong>Card đồ họa rời:</strong> Cần thiết cho đồ họa chuyên nghiệp và chơi game</li>
      </ul>
      
      <h2>Pin và tính di động</h2>
      <p>Cân nhắc thời lượng pin và trọng lượng nếu bạn thường xuyên di chuyển:</p>
      <ul>
        <li><strong>Thời lượng pin:</strong> 8 giờ trở lên là lý tưởng cho người thường xuyên di chuyển</li>
        <li><strong>Trọng lượng:</strong> Dưới 1.5kg là lý tưởng cho việc mang theo hàng ngày</li>
      </ul>
      
      <h2>Kết luận</h2>
      <p>Việc chọn laptop phù hợp phụ thuộc vào nhu cầu cụ thể của bạn. Hãy cân nhắc kỹ các yếu tố trên và đừng ngần ngại đầu tư vào những tính năng quan trọng đối với công việc hoặc sở thích của bạn. Một chiếc laptop phù hợp sẽ là người bạn đồng hành đáng tin cậy trong nhiều năm tới.</p>
    `
  }
]

// Danh sách các bài viết liên quan
const RELATED_POSTS = [
  {
    id: "post-3",
    slug: "thiet-bi-thong-minh-cho-nha",
    title: "5 thiết bị thông minh nên có trong mỗi gia đình",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Nhà thông minh",
    date: "2023-12-05"
  },
  {
    id: "post-4",
    slug: "so-sanh-ios-vs-android",
    title: "iOS vs Android: Đâu là lựa chọn tốt nhất cho bạn?",
    imageUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Hệ điều hành",
    date: "2023-11-28"
  },
  {
    id: "post-5",
    slug: "cong-nghe-ai-trong-smartphone",
    title: "Công nghệ AI trong smartphone hiện đại",
    imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Công nghệ",
    date: "2023-11-20"
  }
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Mô phỏng việc lấy dữ liệu bài viết từ API
    const fetchPost = () => {
      setLoading(true)
      // Tìm bài viết theo slug
      const foundPost = BLOG_POSTS.find(p => p.slug === params.slug)
      
      setTimeout(() => {
        setPost(foundPost || null)
        setLoading(false)
      }, 500)
    }
    
    fetchPost()
  }, [params.slug])
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }
  
  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!post) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Không tìm thấy bài viết</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Button asChild>
          <Link href="/yapee/blog">Quay lại trang Blog</Link>
        </Button>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Back to blog */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <Link href="/yapee/blog">
            <ChevronLeft className="h-4 w-4" />
            <span>Quay lại Blog</span>
          </Link>
        </Button>
      </div>
      
      {/* Post header */}
      <div className="mb-8">
        <Badge className="mb-4">{post.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
        
        <div className="flex flex-wrap gap-4 items-center text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
      
      {/* Featured image */}
      <div className="relative aspect-[21/9] mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Post content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12"
               dangerouslySetInnerHTML={{ __html: post.content }}>
          </div>
          
          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">Công nghệ</Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">{post.category}</Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">Hướng dẫn</Badge>
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">Yapee</Badge>
            </div>
          </div>
          
          {/* Share */}
          <div className="mb-12">
            <h3 className="text-lg font-bold mb-4">Chia sẻ</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Author */}
          <div className="mb-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-bold mb-2">{post.author}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Chuyên gia công nghệ với hơn 10 năm kinh nghiệm trong lĩnh vực đánh giá và tư vấn sản phẩm. 
                  Tốt nghiệp Đại học Bách Khoa Hà Nội, chuyên ngành Điện tử - Viễn thông.
                </p>
                <Button variant="outline" size="sm">Xem tất cả bài viết</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related posts */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Bài viết liên quan</h3>
                <div className="space-y-4">
                  {RELATED_POSTS.map((relatedPost) => (
                    <div key={relatedPost.id} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedPost.imageUrl}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Badge className="mb-1 text-xs">{relatedPost.category}</Badge>
                        <Link href={`/yapee/blog/${relatedPost.slug}`} className="block">
                          <h4 className="text-sm font-medium hover:text-red-500 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(relatedPost.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Danh mục</h3>
                <div className="space-y-2">
                  <Link href="/yapee/blog?category=Điện thoại" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    Điện thoại
                  </Link>
                  <Link href="/yapee/blog?category=Laptop" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    Laptop
                  </Link>
                  <Link href="/yapee/blog?category=Công nghệ" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    Công nghệ
                  </Link>
                  <Link href="/yapee/blog?category=Gaming" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    Gaming
                  </Link>
                  <Link href="/yapee/blog?category=Nhà thông minh" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    Nhà thông minh
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Newsletter */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Đăng ký nhận tin</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Nhận thông tin mới nhất về công nghệ và khuyến mãi đặc biệt.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  />
                  <Button className="w-full">Đăng ký</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Comments section - phần này có thể phát triển thêm */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Bình luận (0)</h2>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Hãy là người đầu tiên bình luận về bài viết này!
          </p>
          <Button>Đăng nhập để bình luận</Button>
        </div>
      </div>
    </div>
  )
}