import React from "react";
import { IoMdConstruct } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const comingSoon = () => {
   const router = useRouter();
   const { t } = useTranslation("pages");
   return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-4 bg-[#ecedf3] p-6">
         <h1 className="text-mainColor flex items-center justify-center gap-x-2 text-[27px] font-bold xs:text-[32px] sm:text-[43px] md:text-[64px]">
            {t("comingSoon")}{" "}
            <span>
               <IoMdConstruct />
            </span>
         </h1>
         <p className="text-center text-[18px] font-bold text-gray-800">{t("comingSoonMessage")}</p>

         <button
            className="bg-mainColor flex items-center gap-x-2 rounded-full py-3 px-6 text-[15px] font-bold text-white"
            onClick={() => {
               router.back();
            }}
         >
            <span>
               <FaArrowLeft />
            </span>
            {t("returnToRegistration")}
         </button>
      </div>
   );
};
export default comingSoon;
