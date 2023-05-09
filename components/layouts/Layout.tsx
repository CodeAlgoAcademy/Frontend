import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getUserFromLocalStorage, refreshToken } from "utils/getTokens";
import ErrorModal from "../UI/errorModal";
import Preloader from "../UI/preloader";
import { useDispatch } from "react-redux";
import { closePreloader } from "../../store/fetchSlice";
import { addUserFromLocalStorage } from "store/authSlice";

interface Props {
   children?: ReactNode;
}
const Layout = ({ children }: Props) => {
   const dispatch = useDispatch();
   const router = useRouter();

   useEffect(() => {
      const token = typeof window !== "undefined" && JSON.parse(localStorage.getItem("token") as string);

      const unrestricted = [
         "/",
         "/404",
         "/login/teacher",
         "/login/parent",
         "/login/select-account-type",
         "/signup/select-account-type",
         "/coming-soon",
         "/signup/teacher",
         "/signup/student",
         "/signup/parent",
         "/about-us",
         "/contact",
      ];

      if (
         !token &&
         !unrestricted.includes(router.pathname) &&
         !router.pathname.includes("/verify-email") &&
         !router.pathname.includes("/change-password") &&
         !router.pathname.includes("/press")
      ) {
         router.push("/login/select-account-type");
      }
   }, []);

   useEffect(() => {
      if (typeof window !== "undefined") {
         const user = getUserFromLocalStorage();
         dispatch(addUserFromLocalStorage(user));
      }
   }, [router]);

   return (
      <GoogleOAuthProvider clientId={"354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com"}>
         <div>
            <Head>
               <title>CodeAlgo Academy</title>
            </Head>
            <main>{children}</main>
            <ErrorModal />
            <Preloader />
         </div>
      </GoogleOAuthProvider>
   );
};

export default Layout;
