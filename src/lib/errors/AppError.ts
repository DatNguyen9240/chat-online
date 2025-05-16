export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const ErrorMessages = {
  GENERAL_ERROR: "Đã xảy ra lỗi không xác định",
  NOT_FOUND: "Không tìm thấy trang",
  UNAUTHORIZED: "Bạn cần đăng nhập để tiếp tục",
  FORBIDDEN: "Bạn không có quyền truy cập",
  SERVER_ERROR: "Đã xảy ra lỗi trên máy chủ",
  NETWORK_ERROR: "Lỗi kết nối mạng",
  VALIDATION_ERROR: "Dữ liệu không hợp lệ",
} as const;
