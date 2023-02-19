import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Layout } from "../components";
import type { AppProps } from "next/app";
import { registerLicense } from "@syncfusion/ej2-base";
import "../styles/globals.css";
import "../styles/GeneralNav.css";
import "../styles/Calendar.css";

registerLicense(`${process.env.NEXT_PUBLIC_SYNC_FUSION_LICENSE}`);

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </PersistGate>
      </Provider>
   );
}
export default MyApp;
