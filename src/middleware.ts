import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Danh sách các route hợp lệ trong ứng dụng
  const validRoutes = [
    "/",
    "/login",
    "/register",
    "/chat",
    "/profile",
    "/user",
  ];

  // Danh sách các route con hợp lệ của /user
  const validUserSubRoutes = ["/user/setting", "/user/profile"];

  // Kiểm tra xem có phải là route con hợp lệ của /user không
  const isValidUserSubRoute = validUserSubRoutes.some((route) => {
    return pathname === route || pathname === `${route}/`;
  });

  // Cho phép truy cập các file tĩnh và API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Nếu route không tồn tại
  if (!validRoutes.includes(pathname) && !isValidUserSubRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Cấu hình các route cần áp dụng middleware
export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.).*)",
  ],
};
