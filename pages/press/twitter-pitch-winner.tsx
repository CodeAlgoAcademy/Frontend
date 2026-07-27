import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

const TwitterPitchWinners = () => {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("twitterPitch.headerBody")}
            title={t("twitterPitch.headerTitle")}
            image="/assets/blog/article5.png"
            date="April 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("twitterPitch.title")} />
            <main className="mt-6">
               <p>{t("twitterPitch.p1")}</p>
               <p className="mt-3">{t("twitterPitch.p2")}</p>
               <p className="mt-3">{t("twitterPitch.p3")}</p>
               <ImagesContainer imageHeight={500} imageDetail="" image="/assets/blog/article5-2.png" />
               <p className="mt-3">{t("twitterPitch.p4")}</p>
               <p className="mt-3">{t("twitterPitch.p5")}</p>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default TwitterPitchWinners;
