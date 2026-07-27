import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

export default function Safety3() {
   const dispatch = useDispatch();
   const child = useSelector((state: RootState) => state.parentChild);
   const router = useRouter();
   const { t } = useTranslation("auth");
   const { t: tCommon } = useTranslation("common");
   return (
      <div key={8}>
          <h1 className="text-[30px] font-bold">{t("whoCanPlayWith", { name: child?.fullName })}</h1>
         <p className="text-[14px] font-[400]">
            {/* CodeAlgo allows parents to limit students multiplayer interactions. Please enter the email or username of your student’s friends below. A
            request will be sent to the linked parent account. They can then accept or decline the request. */}
             {t("multiplayerDescription")}
         </p>
          <label className="mt-6 block text-xl font-semibold">{t("friendEmailOrUsername")}</label>
         <input
            className="auth-input"
            type="text"
            required
            value={child?.friend}
            onChange={(e) => {
               dispatch(updateChild({ key: "friend", value: e.target.value }));
            }}
         />
          <p className="mt-4 text-center text-[14px] font-semibold">{t("updateListNote")}</p>{" "}
         <p
            className="mt-4 text-center text-[14px] font-semibold underline"
            onClick={() => {
               router.push("/parents");
            }}
         >
             {tCommon("skip")}
         </p>
      </div>
   );
}
