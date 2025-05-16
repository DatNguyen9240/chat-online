import { RouteConfig } from "@/types/Config/Route";

export const routeConfig: RouteConfig[] = [
  {
    path: "/",
  },
  {
    path: "/login",
  },
  {
    path: "/register",
  },
  {
    path: "/chat",
  },
  {
    path: "/profile",
  },
  {
    path: "/user",
    children: [
      {
        path: "/user/setting",
      },
      {
        path: "/user/profile",
      },
      {
        path: "/user/[id]",
        isDynamic: true,
      },
    ],
  },
];

// Hàm kiểm tra route có hợp lệ không
export function isValidRoute(pathname: string, routes: RouteConfig[]): boolean {
  // Kiểm tra các route đặc biệt của Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return true;
  }

  // Kiểm tra từng route trong cấu hình
  for (const route of routes) {
    // Kiểm tra route chính xác
    if (pathname === route.path || pathname === `${route.path}/`) {
      return true;
    }

    // Kiểm tra route động
    if (route.isDynamic) {
      const pattern = route.path.replace(/\[.*?\]/, "[^/]+");
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(pathname)) {
        return true;
      }
    }

    // Kiểm tra các route con
    if (route.children) {
      if (isValidRoute(pathname, route.children)) {
        return true;
      }
    }
  }

  return false;
}
