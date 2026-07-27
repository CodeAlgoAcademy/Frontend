import Footer from "@/components/home/new-home/footer";

import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

const GuidanceInCoding = () => {
   const { t } = useTranslation("blog");
   return (
      <section className="min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("guidanceInCoding.subtitle")}
            title={t("guidanceInCoding.title")}
            image="/assets/blog/guidance1.jpg"
            date={t("guidanceInCoding.date")}
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <p className="mt-5">
               {t("guidanceInCoding.intro")}
            </p>
            <main className="mt-6">
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.digitalAgeTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.digitalAgeText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.problemSolvingTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.problemSolvingText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.creativityTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.creativityText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.screenTimeTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.screenTimeText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.confidenceTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.confidenceText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.parentalTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.parentalText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.balanceTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.balanceText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.interactiveTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.interactiveText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.realWorldTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.realWorldText")}
               </p>
               <p className="mt-3">
                  <b>{t("guidanceInCoding.sections.collaborationTitle")}:</b>
                  <br />
                  {t("guidanceInCoding.sections.collaborationText")}
               </p>
               <p className="mt-3">
                  <b>Conclusion:</b>
                  <br />
                  {t("guidanceInCoding.conclusion")}
               </p>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default GuidanceInCoding;
