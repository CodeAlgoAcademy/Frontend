import React, { ReactNode } from "react";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
interface Props {
  children?: ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider clientId="1015154836917-ria2t0r69q3jgc9td4cqb76h7lmnkann.apps.googleusercontent.com">
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
