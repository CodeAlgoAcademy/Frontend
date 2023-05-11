import http from "axios.config";
import Image from "next/image";
import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { closePreloader, openPreloader } from "store/fetchSlice";
import { RootState } from "store/store";

const EmailVerification = () => {
   const dispatch = useDispatch();
   const { email } = useSelector((state: RootState) => state.user.auth);

   const resendEmail = async () => {
      dispatch(openPreloader({ loadingText: "Resending Email" }));
      const { data } = await http.post("/auth/registration/resend-email/", {
         email,
      });
      dispatch(closePreloader());
   };

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
               <p>If you {"didn't"} receive the link, click on</p>
               <button onClick={resendEmail} className="mt-2 w-[150px] rounded-md bg-[#2073fe] p-3 text-white shadow-md">
                  Resend link
               </button>
            </footer>
         </div>
      </section>
   );
};

export default EmailVerification;
