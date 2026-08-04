import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Index() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("gamification.title")} date={t("gamification.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/triumfia.jpg"
               imageDetail={t("gamification.caption1")}
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text={t("gamification.dropCaps")} />
                  <p className="mt-5">{t("gamification.p1")}</p>
                  <p>{t("gamification.p2")}</p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">{t("gamification.p3")}</p>
                        <p className="mt-5">{t("gamification.p4")}</p>
                        <p className="mt-5">{t("gamification.p5")}</p>
                        <p className="mt-5">{t("gamification.p6")}</p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/press/triumfiaspeech.jpg"
                           imageDetail={t("gamification.caption2")}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p>{t("gamification.p7")}</p>
                  <p>{t("gamification.p8")}</p>
                  <p>{t("gamification.p9")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
