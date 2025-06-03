import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routeConfig, isValidRoute } from '@/configs/route-config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Cho phép truy cập các file tĩnh, API, và trang login/register
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/assets') ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Kiểm tra route có hợp lệ không
  if (!isValidRoute(pathname, routeConfig)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Các route cần đăng nhập (trừ /login, /register)
  const publicRoutes = ['/', '/login', '/register'];
  const token = request.cookies.get('__session');
  if (!publicRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Cấu hình các route cần áp dụng middleware
export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.).*)'],
};
