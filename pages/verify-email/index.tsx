import http from "axios.config";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { resendEmail } from "services/authService";
import { closePreloader, openPreloader } from "store/fetchSlice";
import { RootState } from "store/store";
import { ILocalStorageItems } from "types/interfaces/localstorage.interface";

const EmailVerification = () => {
   const dispatch = useDispatch();
   const { email } = useSelector((state: RootState) => state.user.auth);

   // store the email temporarily in locastorage
   useEffect(() => {
      localStorage.setItem(ILocalStorageItems.emailToBeVerified, email);
   }, []);

   return (
      <section className="flex min-h-screen w-full items-center justify-center bg-[#ECEDF3]">
         <div className="w-[90vw] max-w-[600px] rounded-md bg-white p-8 shadow-lg">
            <div className="py-6">
               <span className="mb-2 flex w-full items-center justify-center text-center text-[70px] text-green-600">
                  <FiCheckCircle />
               </span>
               <p className="text-center text-[20px]">
                  An email verification link has been sent to your email address <span className="font-[800]">{email}</span>
               </p>
            </div>
            <footer className="w-full border-t-2 pt-4 text-center">
               <button onClick={() => dispatch(resendEmail(email))} className="mt-2 w-[150px] rounded-md bg-orange-400 p-3 text-white shadow-md">
                  Resend link
               </button>
            </footer>
         </div>
      </section>
   );
};

export default EmailVerification;
