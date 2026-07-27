import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

export default function ParentSignUp4() {
   const dispatch = useDispatch();
   const child = useSelector((state: RootState) => state.parentChild);
   const { t } = useTranslation("auth");

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(updateChild({ key: "fullName", value: e.target.value }));
   };

   return (
      <div key={3}>
          <h1 className="text-[32px] font-bold">{t("addStudentAccounts")}</h1>
         <div className="mt-6">
            <div className="relative">
               <input
                  type="text"
                  name="name"
                  id="name"
                   placeholder={t("studentsName")}
                  className={styles.input}
                  value={child?.fullName}
                  onChange={onChange}
                  required
               />
                <label htmlFor="name" className={styles.label}>
                   {t("studentsName")}
                </label>
            </div>
         </div>
      </div>
   );
}

const styles = {
   label: "pointer-events-none absolute top-3 left-2 origin-left -translate-y-1/2 transform text-[12px] text-slate-500 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-800 peer-focus:top-3 peer-focus:pl-0 peer-focus:text-[12px] peer-focus:text-slate-500",
   input: "bg-white peer mt-1 w-full px-2 py-3 placeholder:text-transparent focus:border-slate-100 focus:outline-none rounded-xl",
};
