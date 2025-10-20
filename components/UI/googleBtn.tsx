import { FC, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle, signUpWithGoogle, updateAccountType, confirmAddRole } from "services/authService";
import { openErrorModal } from "store/fetchSlice";
import RoleConfirmationModal from "../modals/RoleConfirmationModal";

const GoogleBtn: FC = () => {
   const credentials = useSelector((state: RootState) => state.user?.auth);
   const dispatch = useDispatch();
   const router = useRouter();

   const [confirmationData, setConfirmationData] = useState<{
      confirmation_token: string;
      message: string;
   } | null>(null);
   const account: "Parent" | "Teacher" | "Student" | "Organizer" = router.pathname.includes("parent")
      ? "Parent"
      : router.pathname.includes("teacher")
      ? "Teacher"
      : router.pathname.includes("organizer")
      ? "Organizer"
      : "Student";

   const handleRoleConfirmation = async (token: string) => {
      const result = await dispatch(confirmAddRole(token) as any);

      if (!result?.payload?.error) {
         if (account === "Teacher") {
            router.push("/teachers/addClass");
         } else if (account === "Parent") {
            router.push("/parents");
         } else if (account === "Organizer") {
            router.push("/organizers");
         } else {
            window.location.href = "https://play.codealgoacademy.com";
         }
      }

      setConfirmationData(null);
   };

   const handleClick = useGoogleLogin({
      onSuccess: async (codeResponse) => {
         try {
            const currentPath = router.pathname;
            if (currentPath.includes("/login")) {
               const data = await dispatch(loginWithGoogle(codeResponse.access_token) as any);

               if (!data?.payload?.error) {
                  if (currentPath === "/login/teacher" && !data.payload.is_teacher)
                     return dispatch(openErrorModal({ errorText: ["Invalid credentials"] }));

                  if (currentPath === "/login/parent" && !data.payload.is_parent)
                     return dispatch(openErrorModal({ errorText: ["Invalid credentials"] }));

                  if (currentPath === "/login/organizer" && !data.payload.is_organizer)
                     return dispatch(openErrorModal({ errorText: ["Invalid credentials"] }));
                  if (currentPath === "/login/teacher") {
                     router.push("/teachers/addClass");
                  } else if (currentPath === "/login/parent") {
                     router.push("/parents");
                  } else if (currentPath === "/login/organizer") {
                     router.push("/organizers");
                  } else {
                     window.location.href = "https://play.codealgoacademy.com";
                  }
               }
            }
            else if (currentPath.includes("/signup")) {
               const signUpData = await dispatch(
                  signUpWithGoogle({
                     access_token: codeResponse.access_token,
                     role: account.toLowerCase(),
                  }) as any
               );

               if (signUpData?.payload?.role_addition_required && signUpData?.payload?.confirmation_token) {
                  setConfirmationData({
                     confirmation_token: signUpData.payload.confirmation_token,
                     message: signUpData.payload.message,
                  });
                  return;
               }

               if (signUpData?.payload?.access_token && !signUpData?.payload?.error) {
                  const updateData = await dispatch(updateAccountType(account) as any);

                  if (!updateData?.payload?.error) {
                     if (account === "Teacher") {
                        router.push("/teachers/addClass");
                     } else if (account === "Parent") {
                        router.push("/parents");
                     } else if (account === "Organizer") {
                        router.push("/organizers");
                     } else {
                        window.location.href = "https://play.codealgoacademy.com";
                     }
                  }
               }
            }
         } catch (err) {
            dispatch(
               openErrorModal({
                  errorText: ["Something went wrong during Google authentication."],
               })
            );
         }
      },
   });

   return (
      <div className="relative w-full flex-1">
         <button
            onClick={() => handleClick()}
            className="mt-6 flex h-[2.5rem] w-full items-center justify-center gap-4 rounded-xl bg-neutral-100/70 text-center font-semibold text-black"
            type="button"
         >
            <i className="text-[22px]">
               <FcGoogle />
            </i>
            <span>{router.pathname.includes("/login") ? "Sign in" : "Sign up"} with Google</span>
         </button>

         {confirmationData && (
            <RoleConfirmationModal
               isOpen={!!confirmationData}
               onClose={() => setConfirmationData(null)}
               confirmationData={confirmationData}
               intendedRole={account}
               onConfirm={handleRoleConfirmation}
            />
         )}
      </div>
   );
};

export default GoogleBtn;
