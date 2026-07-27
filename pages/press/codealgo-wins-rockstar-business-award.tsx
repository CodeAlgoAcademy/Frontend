import React from "react";
import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import { useTranslation } from "react-i18next";

export default function CodeAlgoWinsRockstarBusinessAward() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("rockstarAward.title")} date={t("rockstarAward.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/codealgo-wins-rockstar-business-award.jpeg"
               imageDetail={t("rockstarAward.caption1")}
               className="lg:!object-top"
            />

            <main className="mt-6">
               <section className="my-4">
                  <DropCapsParagraph text={t("rockstarAward.dropCaps")} />
                  <p className="mt-3">{t("rockstarAward.p1")}</p>
                  <p className="mt-3">{t("rockstarAward.p2")}</p>
               </section>
               <section className="my-4">
                  <BlogTitle title={t("rockstarAward.h1")} />
                  <p className="mt-1">
                     {t("rockstarAward.p3")} <Link link="https://www.codealgoacademy.com" text="Sign up here" />
                  </p>

                  <BlogTitle title={t("rockstarAward.h2")} />
                  <p className="mt-1">{t("rockstarAward.p4")}</p>
                  <p className="mt-1">{t("rockstarAward.p5")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
