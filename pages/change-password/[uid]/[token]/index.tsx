import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthButton } from "@/components/UI/Button";
import http from "axios.config";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";
import { errorResolver } from "utils/errorResolver";

const ResetPassword = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [password, setPassword] = useState<string>("");
   const [confirmPassword, setConfirmPassword] = useState<string>("");
   const [modalOpened, setModalOpened] = useState<boolean>(false);

   const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         dispatch(openErrorModal({ errorText: ["Passwords do not match"] }));
      } else {
         dispatch(openPreloader({ loadingText: "Changing Password" }));
         try {
            await http.patch("/auth/password-reset/change/", {
               password: password,
               token: router.query.token,
               uidb64: router.query.uid,
            });
            dispatch(closePreloader());
            setModalOpened(true);
         } catch (error) {
            errorResolver(error);
         }
      }
   };

   return (
      <>
         <AuthLayout>
            <>
               <div className="text-center">
                  <h1 className="text-[26px] font-bold">Forgot Password</h1>
                  <p className="text-gray-800">Enter your new password</p>
               </div>
               <form className="mt-6 flex w-full flex-col gap-y-4" onSubmit={handleSubmit}>
                  <div className="w-full">
                     <input
                        value={password}
                        onChange={(e) => {
                           setPassword(e.target.value);
                        }}
                        minLength={8}
                        type="password"
                        required
                        className="auth-input"
                        placeholder="Enter Your New Password"
                     />
                  </div>
                  <div className="w-full">
                     <input
                        value={confirmPassword}
                        onChange={(e) => {
                           setConfirmPassword(e.target.value);
                        }}
                        minLength={8}
                        type="password"
                        required
                        className="auth-input"
                        placeholder="Confirm Your New Password"
                     />
                     {password !== "" && confirmPassword !== "" && password !== confirmPassword && (
                        <p className="mt-2 text-[14px] text-red-600">Passwords do not match!</p>
                     )}
                  </div>
                  <AuthButton text="Reset Password" />
               </form>
            </>
         </AuthLayout>
         {modalOpened && (
            <section
               className={"fixed top-0 left-0 flex min-h-screen w-full items-center justify-center bg-[rgba(0,0,0,.6)]"}
               data-testid="success-modal"
            >
               <div className={`relative z-20 mx-auto w-[90vw] max-w-[500px] rounded-md bg-white p-8 shadow-md`}>
                  <div className="text-center text-[22px] font-bold">
                     <h1>Password reset was successful!</h1>
                  </div>
                  <Link href="/login/select-account-type">
                     <button className="mt-6 flex w-full items-center justify-center gap-x-4 rounded-md bg-orange-400 py-3 font-bold text-white shadow-md">
                        <i>
                           <FaArrowLeft />
                        </i>
                        Return to login
                     </button>
                  </Link>
               </div>
            </section>
         )}
      </>
   );
};

export default ResetPassword;
