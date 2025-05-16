import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Kiểm tra xem route có tồn tại không
  const pathname = request.nextUrl.pathname;

  // Danh sách các route hợp lệ trong ứng dụng
  const validRoutes = [
    "/",
    "/login",
    "/register",
    "/chat",
    "/profile",
    // Thêm các route khác của ứng dụng vào đây
  ];

  // Nếu route không tồn tại và không phải là route của Next.js
  if (
    !validRoutes.includes(pathname) &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/static")
  ) {
    // Tạo URL mới cho trang error
    const url = new URL("/error", request.url);
    url.searchParams.set("error", "NotFoundError");
    url.searchParams.set("message", "Không tìm thấy trang");
    url.searchParams.set("statusCode", "404");

    // Sử dụng rewrite để giữ nguyên URL gốc
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Cấu hình các route cần áp dụng middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
