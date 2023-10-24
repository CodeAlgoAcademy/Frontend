import React, { FC, useCallback, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle, signUpWithGoogle, updateAccountType } from "services/authService";
import { openErrorModal } from "store/fetchSlice";
import { storeUserLogin } from "store/authSlice";
import { ILoginReducerArg } from "types/interfaces";
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
               /**
                * Check the account type and check if the route matches the account type
                * If it matches, store the user info
                */

               if (router.pathname === "/login/teacher") {
                  if (!data?.payload?.user?.is_teacher) {
                     dispatch(openErrorModal({ errorText: ["This is not a teacher's account"] }));
                     return;
                  } else {
                     router.push("/teachers/addClass");
                  }
               } else if (router.pathname === "/login/parent") {
                  if (!data?.payload?.user?.is_parent) {
                     dispatch(openErrorModal({ errorText: ["This is not a parent's account"] }));
                     return;
                  } else {
                     router.push("/parents");
                  }
               } else if (router.pathname === "/login/organizer") {
                  if (!data?.payload?.user?.is_organizer) {
                     dispatch(openErrorModal({ errorText: ["This is not an admin account"] }));
                     return;
                  } else {
                     router.push("/organizers");
                  }
               } else {
                  // students
                  window.location.href = "http://www.play.codealgoacademy.com";
                  return;
               }

               dispatch(storeUserLogin(data?.payload as ILoginReducerArg));
            }
         } else if (router.pathname.includes("/signup")) {
            const signUpData = await dispatch(signUpWithGoogle(codeResponse.access_token));
            if (!signUpData?.error?.message) {
               await dispatch(storeUserLogin(signUpData?.payload));
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
