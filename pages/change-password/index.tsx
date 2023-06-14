import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaPaperPlane, FaTimes } from "react-icons/fa";
import http from "axios.config";
import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthButton } from "@/components/UI/Button";

const ChangePassword = () => {
   const [modalOpened, setModalOpened] = useState<boolean>(false);
   const [email, setEmail] = useState<string>("");

   const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      await http.post("/auth/password-reset/", {
         email,
      });
      setEmail("");
      setModalOpened(true);
   };

   return (
      <>
         <AuthLayout>
            <>
               <div className="text-center">
                  <h1 className="text-[26px] font-bold">Forgot Password</h1>
                  <p className="text-gray-800">Enter your email address to reset your password</p>
               </div>
               <form data-testid="form" className="mt-6 flex w-full flex-col gap-y-2" onSubmit={handleSubmit}>
                  <div className="w-full">
                     <input
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                        }}
                        type="email"
                        required
                        className="auth-input"
                        placeholder="Enter Your Email Address"
                     />
                  </div>
                  <AuthButton text="Reset Password" />
               </form>
            </>
         </AuthLayout>

         {modalOpened && (
            <section
               data-testid="success-modal"
               className={"fixed top-0 left-0 z-[10] flex min-h-[100vh] w-[100vw] items-center justify-center bg-[rgba(0,0,0,.6)]"}
            >
               <div className={` relative z-20 mx-auto w-[90vw] max-w-[500px] rounded-md bg-white p-8 shadow-md`}>
                  <div className="flex items-center justify-between">
                     <span className="flex cursor-pointer items-center gap-x-4 text-[17px] font-bold">
                        <i className="text-[22px] text-orange-400">
                           <FaPaperPlane />
                        </i>{" "}
                        Password Reset
                     </span>
                     <span
                        className="cursor-pointer text-[22px] font-bold text-[darkred]"
                        onClick={() => {
                           setModalOpened(false);
                        }}
                     >
                        <FaTimes />
                     </span>
                  </div>
                  <div className="mt-8 text-center text-[22px] font-bold">
                     <h1>A password reset link has been sent to your email!</h1>
                  </div>
               </div>
            </section>
         )}
      </>
   );
};

export default ChangePassword;
