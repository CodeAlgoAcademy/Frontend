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

registerLicense(`${process.env.NEXT_PUBLIC_SYNC_FUSION_LICENSE}`);

function MyApp({ Component, pageProps }: AppProps) {
   return (
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
