import React from "react";
import { useTranslation } from "react-i18next";

const SelectedBadge = ({ count }: { count: number }) => {
   const { t } = useTranslation("teacher");
   return (
      <p className="mt-3 text-[14px] font-semibold text-blue-600">
         {t("studentsSelectedCount", { count })}
      </p>
   );
};

export default SelectedBadge;