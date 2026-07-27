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
            <BlogTitle
               title={t("virusesBacteria.title")}
               date={t("virusesBacteria.date")}
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/save.PNG"
               imageDetail={t("virusesBacteria.caption1")}
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4 flex flex-col gap-[1rem]">
                  <DropCapsParagraph text={t("virusesBacteria.dropCaps")} />
                  <p className="mt-4">{t("virusesBacteria.p1")}</p>
                  <p className="mt-4">{t("virusesBacteria.p2")}</p>
                  <p className="mt-4">{t("virusesBacteria.p3")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
