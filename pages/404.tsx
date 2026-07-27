import React, { useEffect } from "react";
import Head from "next/head";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
   const router = useRouter();
   const { t } = useTranslation("pages");

   return (
      <>
         <Head>
            <title>Page Not Found!</title>
         </Head>
         <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-4 bg-[#ECEDF3] py-[40px]">
            <h1 className="text-mainColor text-[27px] font-bold xs:text-[32px] sm:text-[64px] md:text-[100px] lg:text-[150px]">{t("pageNotFound")}</h1>
            <p className="text-[18px] font-bold text-gray-800">{t("pageNotFoundMessage")}</p>

            <button
               className="bg-mainColor flex items-center gap-x-2 rounded-full py-2 px-6 text-[15px] font-bold text-white"
               onClick={() => {
                  router.back();
               }}
            >
               <span>
                  <FaArrowLeft />
               </span>
               Back
            </button>
         </div>
      </>
   );
};

export default ErrorPage;
