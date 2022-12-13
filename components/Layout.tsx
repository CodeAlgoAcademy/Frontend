import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { refreshToken } from "utils/getTokens";
import ErrorModal from "./errorModal";
import Preloader from "./preloader";

interface Props {
  children?: ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const tokens = localStorage.getItem("token");
    if (
      router.pathname !== "/login" &&
      router.pathname !== "/" &&
      router.pathname !== "/signup" &&
      !tokens
    ) {
      router.push("/login");
    }
  }, []);
  useEffect(() => {
    const tokens = localStorage.getItem("token");

    if (
      router.pathname !== "/login" &&
      router.pathname !== "/signup" &&
      tokens
    ) {
      const interval: NodeJS.Timer = setInterval(refreshToken, 180000);
      refreshToken();

      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  return (
    // <GoogleOAuthProvider
    //   clientId={
    //     "1015154836917-ria2t0r69q3jgc9td4cqb76h7lmnkann.apps.googleusercontent.com"
    //   }
    // >
    <div>
      <Head>
        <title>CodeAlgo Academy</title>
      </Head>
      <main>{children}</main>
      <ErrorModal />
      <Preloader />
    </div>
    // </GoogleOAuthProvider>
  );
};

export default Layout;
