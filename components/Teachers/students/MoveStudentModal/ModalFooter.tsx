import React from "react";
import { useTranslation } from "react-i18next";

interface ModalFooterProps {
   onBack?: () => void;
   backLabel?: string;
   onPrimary?: () => void;
   primaryLabel: string;
   primaryDisabled?: boolean;
   testId?: string;
}

const ModalFooter = ({ onBack, backLabel, onPrimary, primaryLabel, primaryDisabled, testId }: ModalFooterProps) => {
   const { t } = useTranslation("teacher");
   return (
   <div className="mt-6 flex justify-start gap-x-3">
      {onBack && (
         <button
            type="button"
            className="rounded-full bg-gray-100 px-6 py-3 text-[15px] font-semibold text-gray-500 transition-colors hover:bg-gray-200"
            onClick={onBack}
         >
            {backLabel || t("back")}
         </button>
      )}
      {onPrimary && (
         <button
            type="button"
            className="rounded-full bg-blue-600 px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={primaryDisabled}
            onClick={onPrimary}
            data-testid={testId}
         >
            {primaryLabel}
         </button>
      )}
   </div>
   );
};

export default ModalFooter;