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
// import "../styles/SyncfusionMaterial.min.css";

import { useEffect } from "react";                      
import { useRouter } from "next/router";                 
import Script from "next/script";                       

registerLicense(`${process.env.NEXT_PUBLIC_SYNC_FUSION_LICENSE}`);

const GA_MEASUREMENT_ID = 'G-K648E5ZLW4';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
     useEffect(() => {                                      
    const handleRouteChange = (url: string) => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

    
   return (
        <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GA_MEASUREMENT_ID}');
        </script>
           
      <Provider store={store}>
         <Layout>
            <Head>
               <title>CodeAlgo Academy</title>
            </Head>
            <Component {...pageProps} />
         </Layout>
      </Provider>
   );
}

export default MyApp;
