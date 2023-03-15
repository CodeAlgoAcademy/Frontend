import React, { Dispatch, SetStateAction } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

export const PaymentConfirmation = (props: { setConfirmationModalOpen: Dispatch<SetStateAction<boolean>> }) => {
   return (
      <section className="fixed top-0 left-0 z-[3] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.6)]">
         <div className="mx-auto min-h-[400px] w-[92vw] max-w-[700px] rounded-md border-2 border-[#2073fa] bg-white p-8">
            <header className="flex items-center justify-between gap-4 text-[23px] text-[#333]">
               <h2>Payment Confirmation</h2>
               <GiCancel
                  onClick={() => {
                     props.setConfirmationModalOpen(false);
                  }}
               />
            </header>
            <p className="mt-4 text-center">We sent a 4 digit code to the email you provided, enter the code in the field below to continue</p>

            <form className="mx-auto mt-12 w-full max-w-[300px]">
               <input
                  type="number"
                  maxLength={4}
                  minLength={0}
                  className="mx-auto w-full rounded-md border-2 px-3 py-3 outline-none focus:border-[#2073fa]"
               />
               <button
                  className="mx-auto mt-4 block w-full rounded-md border-2 bg-[#2073fa] px-3 py-3 text-white outline-none focus:border-[#2073fa]"
                  type="submit"
               >
                  Proceed
               </button>
            </form>
         </div>
      </section>
   );
};

export const PaymentMade = (props: { setPaidModalOpened: Dispatch<SetStateAction<boolean>> }) => {
   return (
      <section className="fixed top-0 left-0 z-[3] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.6)]">
         <div className="mx-auto min-h-[400px] w-[92vw] max-w-[700px] rounded-md border-2 border-[#2073fa] bg-white p-8">
            <header className="flex items-center justify-between gap-4 text-[23px] text-[#333]">
               <h2>Payment Confirmation</h2>
               <GiCancel
                  onClick={() => {
                     //  props.setConfirmationModalOpen(false);
                  }}
               />
            </header>
            <p className="mt-4 text-center">We sent a 4 digit code to the email you provided, enter the code in the field below to continue</p>

            <div className="mt-12 flex w-full flex-col items-center justify-center gap-y-4 text-center">
               <span className="text-center text-[80px] text-[#2073fa]">
                  <BiCheckCircle />
               </span>
               <p className="text-[20px]">Payment Successful</p>
            </div>
         </div>
      </section>
   );
};
