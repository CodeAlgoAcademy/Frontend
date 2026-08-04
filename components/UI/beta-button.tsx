import React from "react";
import { useTranslation } from "react-i18next";

export default function BetaButton() {
   const { t } = useTranslation("common");
   return (
      <button
         className="rounded-[20px] border-2 bg-[#f3f3f3] px-4 py-0 text-[.8rem]  font-bold text-[#313131] md:px-2 md:text-[1rem]"
         title={t("betaTitle")}
      >
         {t("beta")}
      </button>
   );
}
