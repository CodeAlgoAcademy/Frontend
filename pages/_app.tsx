import { Provider } from "react-redux";
import { store } from "../store/store";
import Layout from "@/components/layouts/Layout";
import type { AppProps } from "next/app";
import { registerLicense } from "@syncfusion/ej2-base";
import "../styles/globals.css";
import "../styles/GeneralNav.css";
import "../styles/Calendar.css";
import Head from "next/head";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../i18n";
import { useEffect } from "react";
import i18n from "../i18n";
import { detectLanguage } from "../i18n";

registerLicense(`${process.env.NEXT_PUBLIC_SYNC_FUSION_LICENSE}`);

function MyApp({ Component, pageProps }: AppProps) {
   useEffect(() => {
      const detected = detectLanguage();
      if (detected !== i18n.language) {
         i18n.changeLanguage(detected);
      }
   }, []);

   return (
      <Provider store={store}>
         <Layout>
           <Head>
  <title>CodeAlgo Academy | Online Coding Classes for Kids</title>
  <meta name="description" content="CodeAlgo Academy teaches kids ages 6-18 to code through fun, game-based lessons. Learn Python, algorithms & more." />
</Head>
            <Component {...pageProps} />
         </Layout>
      </Provider>
   );
}

export default MyApp;
