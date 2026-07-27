import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

export default function BlackAmbition() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />

         <Header
            body=""
            title={t("blackAmbition.headerTitle")}
            image="/assets/blog/press/blackambition.png"
            date="June 2025"
         />

         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title={t("blackAmbition.title")}
               date={t("blackAmbition.date")}
            />

            {/* VIDEO */}
            <div className="my-6 flex justify-center">
               <video
                  src="https://blackambitionprize.com/wp-content/uploads/2025/06/Congratulations-2025-Semifinalists-1-1.mov"
                  controls
                  className="w-full max-w-[900px] rounded-md shadow-md"
               />
            </div>

            <main className="mt-6">
               <section className="my-4 flex flex-col gap-[1rem]">
                  <DropCapsParagraph text={t("blackAmbition.dropCaps")} />

                  <p className="mt-5">{t("blackAmbition.p1")}</p>

                  <p className="mt-5">{t("blackAmbition.p2")}</p>
               </section>

               <ImagesContainer
                  image="/assets/blog/press/blackam.png"
                  imageDetail={t("blackAmbition.caption1")}
                  imageHeight={420}
               />

               <p className="mt-5">{t("blackAmbition.p3")}</p>

               <p className="mt-5">{t("blackAmbition.p4")}</p>
            </main>
         </div>

         <Footer />
      </section>
   );
}
