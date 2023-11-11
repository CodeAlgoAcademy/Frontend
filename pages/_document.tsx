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
               <title>CodeAlgo Academy</title>
               <meta
                  name="description"
                  content="3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves as they play."
               />

               {/* <!-- Facebook Meta Tags --> */}
               <meta property="og:url" content="https://www.codealgoacademy.com" />
               <meta property="og:type" content="website" />
               <meta property="og:title" content="CodeAlgo Academy" />
               <meta
                  property="og:description"
                  content="3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves as they play."
               />
               <meta property="og:image" content="https://res.cloudinary.com/dtori4rq2/image/upload/v1693174037/background2_1_rxj5w3.jpg" />
               <meta property="og:image:alt" content="CodeAlgo Home Page" />

               {/* <!-- Twitter Meta Tags --> */}
               <meta name="twitter:card" content="summary_large_image" />
               <meta property="twitter:domain" content="codealgoacademy.com" />
               <meta property="twitter:url" content="https://www.codealgoacademy.com" />
               <meta name="twitter:title" content="CodeAlgo Academy" />
               <meta
                  name="twitter:description"
                  content="3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves as they play."
               />
               <meta name="twitter:image" content="https://res.cloudinary.com/dtori4rq2/image/upload/v1693174037/background2_1_rxj5w3.jpg" />
               <meta name="title" content="CodeAlgo Academy" />
               <meta
                  name="description"
                  content="3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves as they play."
               />
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
