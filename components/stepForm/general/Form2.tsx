import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "store/authSlice";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

export default function ParentSignUp2() {
   const dispatch = useDispatch();
   const auth = useSelector((state: RootState) => state?.user?.auth);
   const isStudent = auth?.is_student;
   const { t } = useTranslation("auth");
   return (
      <div key={2}>
          <h1 className="text-[32px] font-bold">{t("createYourAccount")}</h1>
          <label className="mt-6 block text-xl font-semibold">{t("firstName")}</label>
         <input
            value={auth?.firstname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               dispatch(updateUser({ key: "firstname", value: e.target.value }));
            }}
            type="text"
            className="auth-input"
            required
            placeholder={t("enterYourFirstname")}
         />

          <label className="mt-6 block text-xl font-semibold">{isStudent ? t("lastInitial") : t("lastName")}</label>

         <input
            value={auth?.lastname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               let value = e.target.value;
               if (isStudent) {
                  value = value.charAt(0);
               }

               dispatch(updateUser({ key: "lastname", value }));
            }}
            type="text"
            className="auth-input"
            required
            placeholder={isStudent ? t("enterYourLastInitial") : t("enterYourLastname")}
            maxLength={isStudent ? 1 : undefined}
         />
      </div>
   );
}
