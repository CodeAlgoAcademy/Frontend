import React from "react";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  title,
  onClose,
  onConfirm,
  loading = false,
}: DeleteConfirmationModalProps) {
  const { t } = useTranslation("teacher");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">         
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t("deleteAssignment")}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
             {t("deleteAssignmentConfirm")}{" "}
             <strong className="text-slate-900">"{title}"</strong>{" "}
             {t("deleteAssignmentWarning")}
          </p>
        </div>

        <div className="flex border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors border-r border-slate-100"
          >
             {t("cancel")}
          </button>
          <button
             onClick={onConfirm}
             disabled={loading}
             className="flex-1 px-4 py-4 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
             {loading ? t("deleting") : t("yesDeletePermanently")}
          </button>
        </div>
      </div>
    </div>
  );
}