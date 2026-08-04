import { useTranslation } from "react-i18next";

export function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation("teacher");
  if (status === "completed")
    return <span className="text-green-500 text-[11px] font-semibold mt-0.5">✓ {t("completed")}</span>;
  if (status === "in_progress")
    return <span className="text-blue-500 text-[11px] font-semibold mt-0.5">🕐 {t("inProgress")}</span>;
  return <span className="text-slate-400 text-[11px] font-semibold mt-0.5">🕐 {t("notStarted")}</span>;
}