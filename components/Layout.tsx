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
  useEffect(() => {
    dispatch(closePreloader());
  }, []);
  return (
    <GoogleOAuthProvider
      clientId={
        "938918217756-66tfl176c3pvfgb5r9e75jtm2p04g9s9.apps.googleusercontent.com"
      }
    >
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
