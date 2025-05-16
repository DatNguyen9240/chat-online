"use client";

import React from "react";
import { AppError, ErrorMessages } from "./AppError";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ErrorDisplayProps {
  error: Error | AppError;
  onRetry?: () => void;
}

const errorConfig: Record<
  number,
  {
    icon: React.ReactNode;
    title: string;
    color: string;
    description?: string;
  }
> = {
  401: {
    icon: <span className="text-5xl">🔒</span>,
    title: "Chưa đăng nhập",
    color: "#D97706", // yellow-600
    description: "Bạn cần đăng nhập để tiếp tục.",
  },
  403: {
    icon: <span className="text-5xl">⛔</span>,
    title: "Không có quyền truy cập",
    color: "#DC2626", // red-600
    description: "Bạn không có quyền truy cập trang này.",
  },
  404: {
    icon: <span className="text-5xl">🔍</span>,
    title: "Không tìm thấy trang",
    color: "#2563EB", // blue-600
    description: "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
  },
  429: {
    icon: <span className="text-5xl">⏳</span>,
    title: "Quá nhiều yêu cầu",
    color: "#EA580C", // orange-600
    description: "Bạn thao tác quá nhanh, vui lòng thử lại sau.",
  },
  500: {
    icon: <span className="text-5xl">💥</span>,
    title: "Lỗi máy chủ",
    color: "#B91C1C", // red-700
    description: "Đã xảy ra lỗi không xác định trên hệ thống.",
  },
};

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
}) => {
  const router = useRouter();
  const message =
    error instanceof AppError ? error.message : ErrorMessages.GENERAL_ERROR;
  const statusCode = error instanceof AppError ? error.statusCode : 500;

  const config = errorConfig[statusCode] || {
    icon: <span className="text-5xl">❗</span>,
    title: "Đã xảy ra lỗi",
    color: "#DC2626", // red-600
    description: undefined,
  };

  const getActionButtons = () => {
    switch (statusCode) {
      case 401:
        return (
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Đăng nhập
          </Link>
        );
      case 403:
        return (
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Về trang chủ
          </Link>
        );
      case 404:
        return (
          <>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Về trang chủ
            </Link>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Quay lại
            </button>
          </>
        );
      case 429:
        return (
          <button
            onClick={onRetry || (() => window.location.reload())}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Thử lại sau
          </button>
        );
      default:
        return (
          <>
            <button
              onClick={onRetry || (() => window.location.reload())}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Thử lại
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Về trang chủ
            </Link>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <div style={{ color: config.color }} className="mb-4">
          {config.icon}
        </div>
        <h2 style={{ color: config.color }} className="text-2xl font-bold mb-2">
          {config.title}
        </h2>
        {config.description && (
          <div className="mb-2 text-gray-500 text-center">
            {config.description}
          </div>
        )}
        <p className="mb-4 text-center">{message}</p>
        <div className="flex gap-4">{getActionButtons()}</div>
      </div>
    </div>
  );
};
