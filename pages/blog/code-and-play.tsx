import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

const CoDesigResearchProgram = () => {
   const { t } = useTranslation("blog");
   return (
      <section className="min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("codeAndPlay.subtitle")}
            title={t("codeAndPlay.title")}
            image="/assets/blog/learining1.jpg"
            date={t("codeAndPlay.date")}
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <p className="mt-5">
               {t("codeAndPlay.intro")}
            </p>
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="mt-6 flex-1">
                     <p className="mt-3">
                        <b>{t("codeAndPlay.sections.funTitle")}:</b>
                        <br />
                        {t("codeAndPlay.sections.funText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("codeAndPlay.sections.motivationTitle")}:</b>
                        <br />
                        {t("codeAndPlay.sections.motivationText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("codeAndPlay.sections.growthTitle")}:</b>
                        <br />
                        {t("codeAndPlay.sections.growthText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("codeAndPlay.sections.pathsTitle")}:</b>
                        <br />
                        {t("codeAndPlay.sections.pathsText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("codeAndPlay.sections.feedbackTitle")}:</b>
                        <br />
                        {t("codeAndPlay.sections.feedbackText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("codeAndPlay.sections.applicationTitle")}:</b>
                        <br />
                        {t("codeAndPlay.sections.applicationText")}
                     </p>
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-3">
                     <b>Conclusion:</b>
                     <br />
                     {t("codeAndPlay.conclusion")}
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CoDesigResearchProgram;
