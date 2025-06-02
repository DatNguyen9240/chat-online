import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routeConfig, isValidRoute } from '@/configs/route-config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Cho phép truy cập các file tĩnh và API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Kiểm tra route có hợp lệ không
  if (!isValidRoute(pathname, routeConfig)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Cấu hình các route cần áp dụng middleware
export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.).*)'],
};
