import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

export default function ParentSignUp4() {
   const dispatch = useDispatch();
   const child = useSelector((state: RootState) => state.parentChild);
   const { t } = useTranslation("auth");
   const { t: tCommon } = useTranslation("common");

   const onChange = (e: any) => {
      dispatch(updateChild({ key: e.target.name, value: e.target.value }));
   };

   return (
      <div key={4}>
          <h1 className="text-[32px] font-bold">{t("tellUsMoreAbout", { name: child?.fullName })}</h1>
          <label className="mt-6 block text-xl font-semibold">{t("birthday")}</label>
         <input className="auth-input" type="date" name="dob" value={child?.dob} onChange={onChange} required />
          <label className="mt-6 block text-xl font-semibold capitalize">{t("codingExperience")}</label>
          <select name="codingExperience" value={child?.codingExperience} onChange={onChange} className="auth-input mb-[2.5rem]" id="" required>
             <option value="experienced">{tCommon("experienced")}</option>
             <option value="standard">{tCommon("standard")}</option>
             <option value="beginner">{tCommon("beginner")}</option>
             <option value="amateur">{tCommon("amateur")}</option>
          </select>
      </div>
   );
}
