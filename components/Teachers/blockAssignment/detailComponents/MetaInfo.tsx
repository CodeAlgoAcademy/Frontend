import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface MetaInfoProps {
  startDateRaw: string | null;
  questionCount: number;
  studentCount: number;
}

export function MetaInfo({ startDateRaw, questionCount, studentCount }: MetaInfoProps) {
  const { t } = useTranslation("teacher");
  const startDate = startDateRaw
    ? format(new Date(startDateRaw), "MM/dd/yyyy, hh:mm aa").toUpperCase()
    : "N/A";

  return (
    <div className="flex flex-wrap gap-8 mb-4">
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">{t("startDate")}</span>
        <span className="text-[13px] font-bold text-blue-600">{startDate}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">{t("endDate")}</span>
        <span className="text-[13px] font-bold text-slate-400">{t("na")}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">{t("parameter")}</span>
        <span className="text-[13px] font-bold text-blue-600">{questionCount || t("all")} {t("questions")}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">{t("progress")}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">{t("students")}</span>
        <span className="text-[13px] font-bold text-blue-600">
          {studentCount} {studentCount !== 1 ? t("studentPlural") : t("studentSingular")}
        </span>
      </div>
    </div>
  );
}