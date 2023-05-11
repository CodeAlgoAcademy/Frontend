import axios from "axios";
import http from "axios.config";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiLoaderCircle } from "react-icons/bi";
import { BsExclamationTriangle } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { openErrorModal, openPreloader, closePreloader } from "store/fetchSlice";
import { RootState } from "store/store";

const VerifyWithKey = () => {
   const { email } = useSelector((state: RootState) => state.user.auth);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<boolean>(true);
   const [mounted, setMounted] = useState<boolean>(false);
   const dispatch = useDispatch();
   const router = useRouter();
   const key = router?.query?.key;

   const verifyEmail = async () => {
      if (key) {
         setLoading(true);
         setError(false);
         try {
            const { data } = await http.post("/auth/confirm-email/", {
               key: router.query.key,
            });
            const signUpType = JSON.parse(localStorage.getItem("parent-signup") as string);

            localStorage.removeItem("parent-signup");
            setLoading(false);
            setError(false);
            if (signUpType) {
               window.open("", "_self");
               window.close();
            }
         } catch (error: any) {
            console.log(error.message);
            dispatch(openErrorModal({ errorText: [error.message] }));
            setLoading(false);
            setError(true);
         }
         setMounted(true);
      }
   };

   const resendEmail = async () => {
      dispatch(openPreloader({ loadingText: "Resending Email" }));
      const { data } = await http.post("/auth/registration/resend-email/", {
         email,
      });
      dispatch(closePreloader());
   };

   useEffect(() => {
      if (!mounted) {
         verifyEmail();
      }
   });

   return (
      <section className="flex min-h-screen w-full items-center justify-center bg-[#ECEDF3]">
         <div className="mx-auto w-[90vw] max-w-[600px] rounded-md bg-white p-6 shadow-lg">
            {loading && !error && (
               <div className="flex flex-col items-center justify-center gap-y-4">
                  <div
                     className="h-[50px] w-[50px] animate-spin rounded-full border-[6px] border-[lightblue] border-t-[#2073fa]"
                     data-testid="loader"
                  ></div>
                  <p className="text-[21px] font-bold" data-testid="loading-message">
                     Verifying your email address
                  </p>
               </div>
            )}
            {!loading && !error && (
               <div>
                  <span className="mb-2 flex w-full items-center justify-center text-center text-[70px] text-green-600">
                     <FiCheckCircle />
                  </span>
                  <p className="mt-4 text-center text-[21px] font-bold" data-testid="success-message">
                     Your Account has been verified successfully
                  </p>
                  <div className="mt-4 border-t-4 pt-4">
                     <Link href={"/login"}>
                        <button className=" mx-auto flex items-center gap-x-2 rounded-md bg-[#2073fe] py-3 px-5 text-white">
                           <BiArrowBack /> Back to login
                        </button>
                     </Link>
                  </div>
               </div>
            )}
            {error && (
               <div>
                  <span className="mb-2 flex w-full items-center justify-center text-center text-[70px] text-red-600">
                     <BsExclamationTriangle />
                  </span>
                  <p className="mt-4 text-center text-[21px] font-bold">Unable to verify account</p>
                  <div className="mt-4 border-t-4 pt-4">
                     <button className=" mx-auto flex items-center gap-x-2 rounded-md bg-[#2073fe] py-3 px-5 text-white" onClick={resendEmail}>
                        <BiLoaderCircle /> Resend Link
                     </button>
                  </div>
               </div>
            )}
         </div>
      </section>
   );
};

export default VerifyWithKey;
