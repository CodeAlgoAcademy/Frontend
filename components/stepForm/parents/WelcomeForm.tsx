import React from "react";
import { useTranslation } from "react-i18next";

export default function WelcomeForm() {
   const { t } = useTranslation("auth");
   return (
      <div key={10}>
         <h1 className="text-[32px] font-bold">{t("welcomeToCodeAlgo")}</h1>
         <p className="mt-4 text-xl font-semibold">{t("timeToAddStudents")}</p>
      </div>
   );
}
