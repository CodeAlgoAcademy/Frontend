import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const ContactModal = () => {
   const { t } = useTranslation("modals");
   return (
      <section
         className="fixed top-0 left-0 z-[5] flex h-screen w-[100vw] items-center justify-center bg-[rgba(0,0,0,0.5)]"
         data-testid="contact-modal"
      >
         <div className="flex h-[300px] w-[92vw] max-w-[500px] flex-col items-center justify-around gap-4 rounded-md bg-white p-6">
            <h2 className="mb-2 text-center text-[24px] text-gray-900">
               {t("thankYouForReachingOut")}
            </h2>
            <Link href="/">
               <button className="w-full rounded-md bg-mainRed p-3 font-semibold text-white">{t("gotIt")}</button>
            </Link>
         </div>
      </section>
   );
};

export default ContactModal;
