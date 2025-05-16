import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routeConfig, isValidRoute } from "@/configs/route-config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Kiểm tra route có hợp lệ không
  if (!isValidRoute(pathname, routeConfig)) {
    // Tạo HTML tùy chỉnh cho trang lỗi
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Không tìm thấy trang</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background-color: #f9fafb;
            }
            .error-container {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              max-width: 28rem;
            }
            .error-icon {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            .error-title {
              font-size: 1.5rem;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 0.5rem;
            }
            .error-message {
              color: #6b7280;
              margin-bottom: 1rem;
            }
            .button-container {
              display: flex;
              gap: 1rem;
              justify-content: center;
            }
            .button {
              padding: 0.5rem 1rem;
              border-radius: 0.375rem;
              font-weight: 500;
              cursor: pointer;
              border: none;
              color: white;
            }
            .primary-button {
              background-color: #3b82f6;
            }
            .primary-button:hover {
              background-color: #2563eb;
            }
            .secondary-button {
              background-color: #6b7280;
            }
            .secondary-button:hover {
              background-color: #4b5563;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <div class="error-icon">🔍</div>
            <h1 class="error-title">Không tìm thấy trang</h1>
            <p class="error-message">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <div class="button-container">
              <button class="button primary-button" onclick="window.location.href='/'">Về trang chủ</button>
              <button class="button secondary-button" onclick="window.history.back()">Quay lại</button>
            </div>
          </div>
        </body>
      </html>
    `;

    // Trả về response với HTML tùy chỉnh
    return new NextResponse(html, {
      status: 404,
      headers: {
        "Content-Type": "text/html",
      },
    });
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
