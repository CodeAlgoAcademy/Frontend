import React, { FC, useCallback, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle, signUpWithGoogle, updateAccountType } from "services/authService";
const GoogleBtn: FC = () => {
   const credentials = useSelector((state: RootState) => state.user?.auth);
   const dispatch = useDispatch();
   const router = useRouter();

   const account: "Parent" | "Teacher" | "Student" | "Organizer" = router.pathname.includes("parent")
      ? "Parent"
      : router.pathname.includes("teacher")
      ? "Teacher"
      : router.pathname.includes("organizer")
      ? "Organizer"
      : "Student";

   const handleClick = useGoogleLogin({
      onSuccess: async (codeResponse) => {
         if (router?.pathname.includes("/login")) {
            const data = await dispatch(loginWithGoogle(codeResponse.access_token));
            if (!data?.error?.message) {
               if (data?.payload?.is_teacher) {
                  router.push("/teachers/addClass");
               } else if (data?.payload?.is_parent) {
                  router.push("/parents");
               } else if (data?.payload?.is_organizer) {
                  router.push("/organizers");
               } else {
                  window.location.href = "http://www.play.codealgoacademy.com";
               }
            }
         } else if (router.pathname.includes("/signup")) {
            const data = await dispatch(signUpWithGoogle(codeResponse.access_token));
            if (!data?.error?.message) {
               const data = await dispatch(updateAccountType(account));
               if (!data?.error?.message) {
                  if (credentials?.is_teacher) {
                     router.push("/teachers/addClass");
                  } else if (credentials?.is_parent) {
                     router.push("/parents");
                  } else if (credentials?.is_organizer) {
                     router.push("/organizers");
                  } else {
                     window.location.href = "http://www.play.codealgoacademy.com";
                  }
               }
            }
         }
      },
   });
   return (
      <div className="relative w-full flex-1">
         <button
            onClick={() => {
               handleClick();
            }}
            className="mt-6 flex h-[2.5rem] w-full items-center justify-center gap-4 rounded-xl bg-neutral-100/70 text-center font-semibold text-black"
            type="button"
         >
            <i className="text-[22px]">
               <FcGoogle />
            </i>
            <span>{router?.pathname.includes("/login") ? "Sign in" : "Sign up"} with Google</span>
         </button>
      </div>
   );
};

export default GoogleBtn;
