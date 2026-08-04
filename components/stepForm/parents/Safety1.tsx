import React from 'react';
import { useTranslation } from "react-i18next";

export default function Safety1() {
  const { t } = useTranslation("auth");
  return (
    <div key={6}>
      <h1 className="font-bold text-[32px]">{t("letsTalkSafety")}</h1>
      <p className="block text-xl mb-[2.5rem] font-semibold mt-6 ">
        {t("setParentalPermissions")}
      </p>
    </div>
  );
}
