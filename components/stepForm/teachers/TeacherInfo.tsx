import React, { ChangeEvent, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "store/authSlice";
import { RootState } from "store/store";
import { countryList } from "../../signup/countries";
import UsernameButton2 from "../../signup/usernameButton2";
import { useTranslation } from "react-i18next";

export default function OtherInfoTeacher() {
   const dispatch = useDispatch();
   const { schoolName, username } = useSelector((state: RootState) => state.user.auth);
   const { t } = useTranslation("auth");
   return (
      <div>
          <h1 className="text-[32px] font-bold">{t("createYourAccount")}</h1>
          <label className="mt-6 block text-xl font-semibold">{t("schoolName")}</label>
         <input
            type="text"
            className="auth-input"
            placeholder={t("enterSchoolName")}
            value={schoolName}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               dispatch(updateUser({ key: "schoolName", value: e.target.value }));
            }}
         />

          <label className="mt-6 block text-xl font-semibold">{t("selectSchoolCountry")}</label>
         <select
            className="auth-input"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
               const value = event.target.options[event.target.selectedIndex].value;
               dispatch(updateUser({ key: "schoolCountry", value }));
               dispatch(updateUser({ key: "country", value }));
            }}
         >
             <option value="Select School Country" disabled>
                {t("selectSchoolCountry")}
            </option>
            {countryList.map((countryOption: string, index: number): ReactNode => {
               return (
                  <option value={countryOption} key={index}>
                     {countryOption}
                  </option>
               );
            })}
         </select>
      </div>
   );
}
