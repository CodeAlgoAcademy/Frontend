import React from "react";
import { useTranslation } from "react-i18next";

const BillingTableHeader = () => {
   const { t } = useTranslation("parent");
   return (
      <div className="flex min-w-fit bg-[#C5C5C5] px-5 py-2">
         <p className="min-w-[150px] flex-1">{t("invoice")}</p>
         <p className="min-w-[150px] flex-1">{t("planInterval")}</p>
         <p className="min-w-[150px] flex-1">{t("activationDate")}</p>
         <p className="min-w-[150px] flex-1">{t("expirationDate")}</p>
         <p className="min-w-[150px] flex-1">{t("status")}</p>
         <p className="min-w-[100px]">{t("action")}</p>
      </div>
   );
};

export default BillingTableHeader;