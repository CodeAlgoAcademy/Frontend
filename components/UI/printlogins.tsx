import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { openGeneratingModal, closeGeneratingModal, openSuccessModal } from "store/modalSlice";
import { useTranslation } from "react-i18next";

export default function PrintLoginsButton() {
   const dispatch = useDispatch();
   const currentClass = useSelector((state: RootState) => state.currentClass);
   const { t } = useTranslation("common");

   const handlePrintLogins = async () => {
      
      if (!currentClass.id) {
         console.error(t("noClassSelected"));
         alert(t("pleaseSelectClassFirst"));
         return;
      }
      dispatch(openGeneratingModal(t("generating")));
      try {
         await new Promise(resolve => setTimeout(resolve, 2000));
         dispatch(closeGeneratingModal());
         dispatch(openSuccessModal({
            message: t("generatedPdfReady"),
            studentId: "",
            type: "pdf"
         }));
         
      } catch (error) {
         dispatch(closeGeneratingModal());
      }
   };

   return (
      <button
         onClick={handlePrintLogins}
         className="rounded-[20px] border-2 bg-[#f3f3f3] px-4 py-2 text-[.8rem] font-bold text-[#313131] md:px-4 md:py-2 md:text-[1rem] hover:bg-[#e8e8e8] transition-colors duration-200"
         title="Print student login credentials"
      >
         {t("printLogins")}
      </button>
   );
}