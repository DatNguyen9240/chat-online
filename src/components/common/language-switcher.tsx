// src/components/language-switcher.tsx
"use client";

import { useTranslation } from "react-i18next";
import { lang } from "@/i18n";
import { Button } from "@/components/ui/Button";
import { Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Badge } from "@/components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const getCurrentLanguageName = () => {
    const currentLang = lang.find(
      (item) => Object.keys(item)[0] === i18n.language
    );
    return currentLang ? Object.values(currentLang)[0] : "";
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Globe className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className="bg-white text-black border shadow-md rounded-md px-3 py-1.5 text-sm z-[100]"
        >
          {getCurrentLanguageName()}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" side="top" className="w-[150px]">
        {lang.map((item) => {
          const [key, value] = Object.entries(item)[0];
          return (
            <DropdownMenuItem
              key={key}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => i18n.changeLanguage(key)}
            >
              <span>{value}</span>
              {i18n.language === key && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-medium"
                >
                  {key.toUpperCase().slice(0, 2)}
                </Badge>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
