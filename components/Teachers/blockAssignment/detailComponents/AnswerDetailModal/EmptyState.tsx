import React from "react";
import { useTranslation } from "react-i18next";

export default function EmptyState() {
  const { t } = useTranslation("teacher");
  return (
    <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
      {t("noAnswersRecorded")}
    </div>
  );
}