import React from "react";
import { useTranslation } from "react-i18next";

interface ModalHeaderProps {
  assignmentTitle?: string;
  onClose: () => void;
}

export default function ModalHeader({ assignmentTitle, onClose }: ModalHeaderProps) {
  const { t } = useTranslation("teacher");
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-0">
      <button
        onClick={onClose}
        className="flex items-center gap-1.5 text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-colors px-4 py-1.5 rounded-full shadow-sm"
      >
        ← {t("backToAssignment", { title: assignmentTitle ?? t("assignment") })}
      </button>
      <button
        onClick={onClose}
        className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 text-lg transition-colors"
      >
        ✕
      </button>
    </div>
  );
}