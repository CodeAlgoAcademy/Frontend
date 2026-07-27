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
            body={t("vaccinationForKids.subtitle")}
            title={t("vaccinationForKids.title")}
            image="/assets/blog/cdc-TDoPeUSOD1c-unsplash.jpg"
            date={t("vaccinationForKids.date")}
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <p className="mt-5">
               {t("vaccinationForKids.intro")}
            </p>
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="mt-6 flex-1">
                     <p className="mt-3">
                        <b>{t("vaccinationForKids.sections.guardiansTitle")}:</b>
                        <br />
                        {t("vaccinationForKids.sections.guardiansText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("vaccinationForKids.sections.havenTitle")}:</b>
                        <br />
                        {t("vaccinationForKids.sections.havenText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("vaccinationForKids.sections.publicHealthTitle")}:</b>
                        <br />
                        {t("vaccinationForKids.sections.publicHealthText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("vaccinationForKids.sections.standardTitle")}:</b>
                        <br />
                        {t("vaccinationForKids.sections.standardText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("vaccinationForKids.sections.learningTitle")}:</b>
                        <br />
                        {t("vaccinationForKids.sections.learningText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("vaccinationForKids.sections.scienceTitle")}:</b>
                        <br />
                        {t("vaccinationForKids.sections.scienceText")}
                     </p>
                     <p className="mt-3">
                        <b>{t("vaccinationForKids.sections.ethicalTitle")}:</b>
                        <br />
                        {t("vaccinationForKids.sections.ethicalText")}
                     </p>
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-3">
                     <b>Conclusion:</b>
                     <br /> {t("vaccinationForKids.conclusion")}
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CoDesigResearchProgram;
