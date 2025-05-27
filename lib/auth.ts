export const checkPermission = (user: User, requiredRole: Role) => {
  return user.roles.includes(requiredRole);
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware kiểm tra quyền truy cập Admin
export function middleware(request: NextRequest) {
  const user = getCurrentUser(); // Giả lập lấy user từ session/cookie
  if (!user?.roles.includes('admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/app/admin/:path*', // Áp dụng cho tất cả route Admin
};