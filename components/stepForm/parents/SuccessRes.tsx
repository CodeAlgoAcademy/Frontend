import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetChild } from "store/parentChildSlice";
import { useTranslation } from "react-i18next";

const ParentSignUp7 = () => {
   const { t } = useTranslation("auth");
   return (
      <div>
         <p className="text-center text-2xl font-medium">{t("childAccountReady")}</p>
      </div>
   );
};

export default ParentSignUp7;
