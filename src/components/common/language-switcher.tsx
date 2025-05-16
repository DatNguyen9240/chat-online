// src/components/language-switcher.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { i18n } from "@/configs/i18n-config";
import type { Locale } from "@/configs/i18n-config";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>("en");

  // Lấy ngôn ngữ từ cookie khi component mount
  useEffect(() => {
    const savedLocale =
      (document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1] as Locale) || i18n.defaultLocale;
    setCurrentLocale(savedLocale);
  }, []);

  const switchLanguage = (locale: Locale) => {
    // Lưu ngôn ngữ vào cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`; // 1 năm
    setCurrentLocale(locale);

    // Refresh trang để áp dụng ngôn ngữ mới
    router.refresh();
  };

  return (
    <div className="language-switcher">
      <select
        value={currentLocale}
        onChange={(e) => switchLanguage(e.target.value as Locale)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  );
}
