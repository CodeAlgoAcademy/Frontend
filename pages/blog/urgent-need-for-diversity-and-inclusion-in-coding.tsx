import Footer from "@/components/home/new-home/footer";

import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

const CodeAlgoJoinsGoodieNation = () => {
   const { t } = useTranslation("blog");
   return (
      <section className="min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("diversityInCoding.title")}
            title={``}
            image="/assets/blog/diversity-in-tech.png"
            date={t("diversityInCoding.date")}
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("diversityInCoding.title")} />
            {/* <ImagesContainer imageHeight={400} imageDetail="" image="/assets/blog/article4-2.jpg" /> */}
            <main className="mt-6">
               <p className="mt-3">
                  {t("diversityInCoding.intro")}
               </p>
               <p className="mt-3">
                  <b>{t("diversityInCoding.sections.realWorldTitle")}:</b>
                  <br />
                  {t("diversityInCoding.sections.realWorldText")}
               </p>
               <p className="mt-3">
                  <b>{t("diversityInCoding.sections.innovationTitle")}:</b>
                  <br />
                  {t("diversityInCoding.sections.innovationText")}
               </p>
               <p className="mt-3">
                  <b>{t("diversityInCoding.sections.opportunityTitle")}:</b>
                  <br />
                  {t("diversityInCoding.sections.opportunityText")}
               </p>
               <p className="mt-3">
                  <b>{t("diversityInCoding.sections.realityTitle")}:</b>
                  <br />
                  {t("diversityInCoding.sections.realityText")}
               </p>
               <p className="mt-3">
                  <b>{t("diversityInCoding.sections.economicTitle")}:</b>
                  <br />
                  {t("diversityInCoding.sections.economicText")}
               </p>
               <p className="mt-3">
                  <b>{t("diversityInCoding.sections.inclusiveTitle")}:</b>
                  <br />
                  {t("diversityInCoding.sections.inclusiveText")}
               </p>
               <p className="mt-3">
                  {t("diversityInCoding.conclusion")}
               </p>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CodeAlgoJoinsGoodieNation;
