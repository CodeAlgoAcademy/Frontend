import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

const CoDesigResearchProgram = () => {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("codesignResearch.headerBody")}
            title={t("codesignResearch.headerTitle")}
            image="/assets/blog/article3.png"
            date="April 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("codesignResearch.title")} />
            <p className="mt-5">{t("codesignResearch.p1")}</p>
            <ImagesContainer imageHeight={400} imageDetail="" image="/assets/blog/article3-2.png" />

            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="mt-6 flex-1">
                     <p className="mt-3">{t("codesignResearch.p2")}</p>
                     <p className="mt-3">{t("codesignResearch.p3")}</p>
                     <p className="mt-3">{t("codesignResearch.p4")}</p>
                  </div>

                  <div className="flex-[0.7]">
                     <ImagesContainer image="/assets/blog/article3-3.jpg" imageDetail="" imageHeight={350} />
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-3">{t("codesignResearch.p5")}</p>
                  <p className="mt-3">{t("codesignResearch.p6")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CoDesigResearchProgram;
