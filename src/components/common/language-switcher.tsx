// src/components/language-switcher.tsx
"use client";

import { useTranslation } from "react-i18next";
import { lang } from "@/i18n";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="px-4 py-2 border rounded-md bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        {lang.map((item) => {
          const [key, value] = Object.entries(item)[0];
          return (
            <option key={key} value={key}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
