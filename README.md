# QUY TRÌNH CỦA WEBHOOK

1. Cấu hình Webhook trong Clerk Dashboard:

   - Thêm endpoint URL: `https://<your-deployment>.convex.cloud/clerk-user-webhook`
   - Chọn các events cần gửi webhook (user.created, user.updated, etc.)

2. Khi có sự kiện xảy ra (đăng ký, đăng nhập, cập nhật thông tin):

   - Clerk tự động gửi POST request đến endpoint đã cấu hình
   - Request chứa thông tin về sự kiện và dữ liệu user

3. Convex nhận và xử lý webhook:

   - Xác thực webhook thông qua `CLERK_WEBHOOK_SECRET`
   - Cập nhật database dựa trên thông tin từ webhook
   - Đồng bộ dữ liệu user giữa Clerk và Convex

4. Trong ứng dụng:
   - `<ConvexProviderWithClerk client={convex} useAuth={useAuth}>` kết nối Clerk với Convex
   - Cho phép ứng dụng sử dụng dữ liệu user đã được đồng bộ
