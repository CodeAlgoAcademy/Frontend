import React, { Dispatch, SetStateAction } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { useTranslation } from "react-i18next";

export const PaymentConfirmation = (props: { setConfirmationModalOpen: Dispatch<SetStateAction<boolean>> }) => {
   const { t } = useTranslation("parent");
   return (
      <section className="fixed top-0 left-0 z-[3] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.6)]">
         <div className="mx-auto min-h-[400px] w-[92vw] max-w-[700px] rounded-md border-2 border-mainColor bg-white p-8">
            <header className="flex items-center justify-between gap-4 text-[23px] text-[#333]">
               <h2>{t("paymentConfirmation")}</h2>
               <GiCancel
                  onClick={() => {
                     props.setConfirmationModalOpen(false);
                  }}
               />
            </header>
            <p className="mt-4 text-center">{t("sentCodeEmail")}</p>

            <form className="mx-auto mt-12 w-full max-w-[300px]">
               <input
                  type="number"
                  maxLength={4}
                  minLength={0}
                  className="mx-auto w-full rounded-md border-2 px-3 py-3 outline-none focus:border-mainColor"
               />
               <button
                  className="mx-auto mt-4 block w-full rounded-md border-2 bg-mainColor px-3 py-3 text-white outline-none focus:border-mainColor"
                  type="submit"
               >
                  {t("proceed")}
               </button>
            </form>
         </div>
      </section>
   );
};

export const PaymentMade = (props: { setPaidModalOpened: Dispatch<SetStateAction<boolean>> }) => {
   const { t } = useTranslation("parent");
   return (
      <section className="fixed top-0 left-0 z-[3] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.6)]">
         <div className="mx-auto min-h-[400px] w-[92vw] max-w-[700px] rounded-md border-2 border-mainColor bg-white p-8">
            <header className="flex items-center justify-between gap-4 text-[23px] text-[#333]">
               <h2>{t("paymentConfirmation")}</h2>
               <GiCancel onClick={() => {}} />
            </header>

            <div className="mt-12 flex w-full flex-col items-center justify-center gap-y-4 text-center">
               <span className="text-center text-[80px] text-mainColor">
                  <BiCheckCircle />
               </span>
               <p className="text-[20px]">{t("paymentSuccessful")}</p>
            </div>
         </div>
      </section>
   );
};
