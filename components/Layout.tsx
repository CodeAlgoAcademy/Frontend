import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { refreshToken } from "utils/getTokens";
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
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <div>
        <Head>
          <title>CodeAlgo Academy</title>
        </Head>
        <main>{children}</main>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Layout;
