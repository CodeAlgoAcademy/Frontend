import React from 'react';
import { useTranslation } from "react-i18next";

export default function ThankyouForm() {
  const { t } = useTranslation("auth");
  return (
    <div key={9}>
      <h1 className="font-bold text-[32px]">{t("thanksForJoining")}</h1>
      <p className="block text-xl font-semibold mt-6">{t("parentHubReady")}</p>
    </div>
  );
}
