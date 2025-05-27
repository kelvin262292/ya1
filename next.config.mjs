/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      // Thêm picsum.photos để hỗ trợ placeholder images
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },
}

export default nextConfig
