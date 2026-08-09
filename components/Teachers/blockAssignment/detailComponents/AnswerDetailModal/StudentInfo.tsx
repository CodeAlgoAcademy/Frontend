import React from "react";
import { useTranslation } from "react-i18next";

interface StudentInfoProps {
  username?: string;
  correctCount: number;
  totalCount: number;
  pct: number;
  perfColor: string;
}

export default function StudentInfo({ username, correctCount, totalCount, pct, perfColor }: StudentInfoProps) {
  const { t } = useTranslation("teacher");
  return (
    <div className="px-6 pt-4 pb-3 border-b border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900">{username ?? t("student")}</h2>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-1 mt-3 text-sm text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-500">{t("performance")}</span>
          <span className={`font-bold ${perfColor}`}>
            {correctCount}/{totalCount} ({pct}%)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-slate-500">{t("completed")}</span>
          <span className="font-bold text-slate-700">{pct === 100 ? t("yes") : t("no")}</span>
        </div>
      </div>
    </div>
  );
}