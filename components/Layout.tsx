import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { refreshToken } from "utils/getTokens";
import ErrorModal from "./errorModal";
import Preloader from "./preloader";
import { useDispatch } from "react-redux";
import { closePreloader } from "../store/fetchSlice";

interface Props {
   children?: ReactNode;
}
const Layout = ({ children }: Props) => {
   const dispatch = useDispatch();
   const router = useRouter();
   useEffect(() => {
      const tokens = localStorage.getItem("token");
      if (
         router.pathname !== "/" &&
         !router.pathname.toLowerCase().includes("/signup") &&
         router.pathname !== "/selectUserType" &&
         router.pathname !== "/comingSoon" &&
         router.pathname !== "/404" &&
         !router.pathname.includes("/verify-email") &&
         !router.pathname.includes("/change-password") &&
         !tokens
      ) {
         router.push("/login");
      }
   }, [router]);
   useEffect(() => {
      dispatch(closePreloader());
   }, [dispatch]);
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
