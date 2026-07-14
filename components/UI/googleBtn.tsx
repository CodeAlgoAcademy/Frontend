import { FC, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import {
   loginWithGoogle,
   signUpWithGoogle,
   loginWithApple,
   signUpWithApple,
   updateAccountType,
   confirmAddRole,
} from "services/authService";
import { openErrorModal } from "store/fetchSlice";
import RoleConfirmationModal from "../modals/RoleConfirmationModal";

declare global {
   interface Window {
      AppleID?: {
         auth: {
            init: (config: {
               clientId: string;
               scope: string;
               redirectURI: string;
               usePopup: boolean;
            }) => void;
            signIn: () => Promise<{
               code: string;
               id_token: string;
               user?: {
                  name: { firstName: string; lastName: string };
                  email: string;
               };
            }>;
         };
      };
   }
}

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



   const handleAppleClick = async () => {
      try {
         if (!window.AppleID) {
            dispatch(
               openErrorModal({
                  errorText: ["Apple Sign In is loading. Please try again in a moment."],
               })
            );
            return;
         }

window.AppleID.auth.init({
   clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "",
   scope: "name email",
   redirectURI: "https://codealgoacademy.com", // Then try this
   usePopup: true,
});


         const response = await window.AppleID.auth.signIn();
         console.log(response);

         if (!response?.id_token) {
            return;
         }

         const currentPath = router.pathname;
         const firstName = response.user?.name?.firstName || "";
         const lastName = response.user?.name?.lastName || "";

         if (currentPath.includes("/login")) {
            const data = await dispatch(
               loginWithApple({
                  id_token: response.id_token,
                  role: account.toLowerCase(),
               }) as any
            );

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
         } else if (currentPath.includes("/signup")) {
            const signUpData = await dispatch(
               signUpWithApple({
                  id_token: response.id_token,
                  role: account.toLowerCase(),
                  first_name: firstName,
                  last_name: lastName,
               }) as any
            );

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
      } catch (err: any) {
    console.log("APPLE ERROR");
    console.log(err);
    console.log(JSON.stringify(err, null, 2));
    console.log("APPLE CLIENT ID:", process.env.NEXT_PUBLIC_APPLE_CLIENT_ID);
console.log(typeof process.env.NEXT_PUBLIC_APPLE_CLIENT_ID);

    dispatch(
        openErrorModal({
            errorText: [
                err?.error ||
                err?.message ||
                "Something went wrong during Apple authentication."
            ],
        })
    );
}
   };

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
         <button
            onClick={handleAppleClick}
            className="mt-6 flex h-[2.5rem] w-full items-center justify-center gap-4 rounded-xl bg-neutral-100/70 text-center font-semibold text-black"
            type="button"
         >
            <i className="text-[22px]">
               <FaApple />
            </i>
            <span>{router.pathname.includes("/login") ? "Sign in" : "Sign up"} with Apple</span>
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
