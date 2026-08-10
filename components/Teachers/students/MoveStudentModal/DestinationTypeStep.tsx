import React from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ModalFooter from "./ModalFooter";

interface DestinationTypeStepProps {
   sourceOrgId?: string | number;
   onSelect: (type: "own" | "teacher") => void;
   onBack: () => void;
}

const DestinationTypeStep = ({ sourceOrgId, onSelect, onBack }: DestinationTypeStepProps) => {
   const { t } = useTranslation("teacher");
   return (
   <div>
      <div className="grid gap-4 sm:grid-cols-2">
         <button
            type="button"
            onClick={() => onSelect("own")}
            className="flex flex-col items-center gap-y-5 rounded-2xl border border-gray-100 p-6 text-center shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
         >
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-[38px] text-blue-600">
               <FaChalkboardTeacher />
            </span>
            <span className="text-[16px] font-semibold text-gray-800">{t("toAnotherClassInMyAccount")}</span>
         </button>

         <button
            type="button"
            onClick={() => onSelect("teacher")}
            disabled={!sourceOrgId}
            title={!sourceOrgId ? t("classNotLinkedToOrg") : ""}
            className={`flex flex-col items-center gap-y-5 rounded-2xl border border-gray-100 p-6 text-center shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md ${
               !sourceOrgId ? "cursor-not-allowed opacity-40 hover:border-gray-100 hover:shadow-sm" : ""
            }`}
            data-testid="move-to-teacher-option"
         >
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-[38px] text-blue-600">
               <FaUserGraduate />
            </span>
            <span className="text-[16px] font-semibold text-gray-800">{t("toAnotherTeachersClass")}</span>
         </button>
      </div>

      {!sourceOrgId && (
         <p className="mt-4 rounded-md bg-amber-50 px-4 py-3 text-center text-[13px] text-amber-700">
            {t("classNotLinkedToOrgBody")}
         </p>
      )}

      <ModalFooter onBack={onBack} primaryLabel={""} />
   </div>
   );
};

export default DestinationTypeStep;