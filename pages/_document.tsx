import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import React from "react";
import Script from "next/script";

class MyDocument extends Document {
   static async getInitialProps(ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
   }

   render() {
      return (
         <Html>
            <Head>
               <meta name="description" content="CodeAlgo Academy" />
               <meta property="og:title" content="CodeAlgo Academy" />
               <meta property="twitter:title" content="CodeAlgo Academy" />
               <meta
                  property="og:description"
                  content="3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves as they play."
               />
               <meta
                  property="twitter:description"
                  content="3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves as they play."
               />
               <meta property="image" content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8QefXQKCgVvSMakQ7GI5NWvcoyrCm49_yMRwvihd8&s" />

               <meta property="og:image" content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8QefXQKCgVvSMakQ7GI5NWvcoyrCm49_yMRwvihd8&s" />
               <meta property="twitter:image" content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8QefXQKCgVvSMakQ7GI5NWvcoyrCm49_yMRwvihd8&s" />
               <meta property="image" content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8QefXQKCgVvSMakQ7GI5NWvcoyrCm49_yMRwvihd8&s" />
            </Head>
            <body>
               <Main />
               <NextScript />

               <Script async src="https://www.googletagmanager.com/gtag/js?id=G-BT6M4N6SS1" strategy="afterInteractive" />
               <Script id="google-analytics" strategy="afterInteractive">
                  {`window.dataLayer = window.dataLayer || [];

                     function gtag() {
                        dataLayer.push(arguments);
                     }

                     gtag("js", new Date());

                     gtag("config", "G-BT6M4N6SS1");
                  `}
               </Script>
            </body>
         </Html>
      );
   }
}

export default MyDocument;
