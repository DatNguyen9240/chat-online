"use client";

import { useState, useEffect } from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback";

// Giống như App.tsx trong Vite
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingFallback />;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
