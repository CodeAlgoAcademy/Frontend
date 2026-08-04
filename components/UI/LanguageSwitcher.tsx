import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "utils";

interface LanguageSwitcherProps {
   className?: string;
   variant?: "navbar" | "sidebar" | "compact";
}

const LanguageSwitcher = ({ className, variant = "navbar" }: LanguageSwitcherProps) => {
   const { i18n } = useTranslation();
   const currentLang = i18n.language?.substring(0, 2) || "en";

   const toggleLanguage = (lang: string) => {
      i18n.changeLanguage(lang);
      try {
         localStorage.setItem("i18nextLng", lang);
      } catch {}
   };

   if (variant === "compact") {
      return (
         <div className={cn("flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-0.5", className)}>
            <button
               onClick={() => toggleLanguage("en")}
               className={cn(
                  "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
                  currentLang === "en" ? "bg-mainColor text-white" : "text-gray-500 hover:text-gray-700"
               )}
            >
               EN
            </button>
            <button
               onClick={() => toggleLanguage("fr")}
               className={cn(
                  "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
                  currentLang === "fr" ? "bg-mainColor text-white" : "text-gray-500 hover:text-gray-700"
               )}
            >
               FR
            </button>
         </div>
      );
   }

   if (variant === "sidebar") {
      return (
         <div className={cn("flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-0.5", className)}>
            <button
               onClick={() => toggleLanguage("en")}
               className={cn(
                  "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
                  currentLang === "en" ? "bg-mainColor text-white" : "text-gray-500 hover:text-gray-700"
               )}
            >
               EN
            </button>
            <button
               onClick={() => toggleLanguage("fr")}
               className={cn(
                  "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
                  currentLang === "fr" ? "bg-mainColor text-white" : "text-gray-500 hover:text-gray-700"
               )}
            >
               FR
            </button>
         </div>
      );
   }

   return (
      <div className={cn("flex items-center gap-1 rounded-lg border border-white/30 bg-white/10 p-0.5", className)}>
         <button
            onClick={() => toggleLanguage("en")}
            className={cn(
               "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
               currentLang === "en" ? "bg-white text-mainColor" : "text-white/70 hover:text-white"
            )}
         >
            EN
         </button>
         <button
            onClick={() => toggleLanguage("fr")}
            className={cn(
               "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
               currentLang === "fr" ? "bg-white text-mainColor" : "text-white/70 hover:text-white"
            )}
         >
            FR
         </button>
      </div>
   );
};

export default LanguageSwitcher;
