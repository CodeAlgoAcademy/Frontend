import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

const CodeAlgoJoinsGoodieNation = () => {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("goodieNation.headerBody")}
            title={t("goodieNation.headerTitle")}
            image="/assets/blog/article4.png"
            date="March 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("goodieNation.title")} />
            <ImagesContainer imageHeight={400} imageDetail="" image="/assets/blog/article4-2.jpg" />
            <main className="mt-6">
               <p className="mt-3">{t("goodieNation.p1")}</p>
               <p className="mt-3">{t("goodieNation.p2")}</p>
               <p className="mt-3">{t("goodieNation.p3")}</p>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CodeAlgoJoinsGoodieNation;
