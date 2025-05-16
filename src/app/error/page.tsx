"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { AppError } from "@/lib/errors/AppError";
import { ErrorDisplay } from "@/lib/errors/ErrorDisplay";

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorType = searchParams.get("error");
  const message = searchParams.get("message") || "Đã xảy ra lỗi";
  const statusCode = parseInt(searchParams.get("statusCode") || "500");

  const error = new AppError(message, statusCode, errorType || undefined);

  return <ErrorDisplay error={error} onRetry={() => router.push("/")} />;
}
