"use client";

import { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi-IN", name: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ko-KR", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

const LangSwitcher = () => {
  const [activeLocale, setActiveLocale] = useState("en");

  // Read locale from cookie on mount
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const localeCookie = cookies.find((row) => row.startsWith("lingo-locale="));
    if (localeCookie) {
      const locale = localeCookie.split("=")[1];
      setActiveLocale(locale);
    }
  }, []);

  // Set locale cookie and update state
  const setLocale = (locale: string) => {
    // Set cookie with 1 year expiration
    const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
    document.cookie = `lingo-locale=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;

    setActiveLocale(locale);

    // Reload page to apply new locale
    window.location.reload();
  };

  const currentLanguage =
    languages.find((lang) => lang.code === activeLocale) || languages[0];

  return (
    <div className="my-6 mx-4 lg:mx-0 lg:my-0 bg-transparent">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent border-0">
            <Globe className="h-4 w-4" />
            <div className="hidden">
              <span className="">{currentLanguage.name}</span>
              <span className="">{currentLanguage.flag}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLocale(language.code)}
              className="cursor-pointer flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </span>
              {activeLocale === language.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LangSwitcher;
