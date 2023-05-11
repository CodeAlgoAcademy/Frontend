import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import React from "react";

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
                  content="3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves as they play.CodeAlgo Academy"
               />
               <meta
                  property="twitter:description"
                  content="3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves as they play.CodeAlgo Academy"
               />
               <meta property="image" content="https://gcdnb.pbrd.co/images/9lHbIun6obws.jpg?o=1" />

               <meta property="og:image" content="https://gcdnb.pbrd.co/images/9lHbIun6obws.jpg?o=1" />
               <meta property="twitter:image" content="https://gcdnb.pbrd.co/images/9lHbIun6obws.jpg?o=1" />
               <meta property="image" content="https://gcdnb.pbrd.co/images/9lHbIun6obws.jpg?o=1" />
            </Head>
            <body>
               <Main />
               <NextScript />

               <script async src="https://www.googletagmanager.com/gtag/js?id=G-BT6M4N6SS1"></script>
               <script async src="../utils/analytics.js"></script>
            </body>
         </Html>
      );
   }
}

export default MyDocument;
