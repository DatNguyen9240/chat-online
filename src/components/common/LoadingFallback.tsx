"use client";

import { useEffect } from "react";

export default function LoadingFallback() {
  // Force a reflow to ensure animation works properly
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Outer spinning circle */}
          <div className="w-20 h-20 border-8 border-gray-200 rounded-full animate-spin"></div>
          {/* Inner spinning circle (opposite direction) */}
          <div
            className="absolute top-0 left-0 w-20 h-20 border-8 border-transparent border-t-blue-600 rounded-full animate-spin"
            style={{ animationDirection: "normal", animationDuration: "0.8s" }}
          ></div>
        </div>
        <div className="text-xl font-medium text-gray-800">Đang tải...</div>
      </div>
    </div>
  );
}
