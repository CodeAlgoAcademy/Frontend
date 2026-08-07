import React from "react";
import { useTranslation } from "react-i18next";

export default function AnswerTableHeader() {
  const { t } = useTranslation("teacher");
  return (
    <div className="grid grid-cols-[1fr_120px_150px_140px] gap-x-4 px-6 py-2.5 bg-white border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
      <span>{t("questions")}</span>
      <span>{t("answer")}</span>
      <span>{t("time")}</span>
      <span className="text">{t("duration")}</span>
    </div>
  );
}