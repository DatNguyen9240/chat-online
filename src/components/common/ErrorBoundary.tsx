"use client";

import React, { ErrorInfo, ReactNode } from "react";
import { ErrorDisplay } from "@/lib/errors/ErrorDisplay";
import { AppError } from "@/lib/errors/AppError";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const appError = new AppError(
        this.state.error?.message || "Đã xảy ra lỗi không xác định",
        this.state.error instanceof AppError
          ? this.state.error.statusCode
          : 500,
        this.state.error instanceof AppError ? this.state.error.code : undefined
      );

      return <ErrorDisplay error={appError} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
