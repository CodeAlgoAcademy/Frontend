import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

export default function CodeAlgoAcademyAccessToKCsWorldCup() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title={t("herStartup.title")}
               date={t("herStartup.date")}
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/press/1.jpg"
               imageDetail={t("herStartup.caption1")}
               className="lg:!object-cover"
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <p>{t("herStartup.p1")}</p>
                  <p>{t("herStartup.p2")}</p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">{t("herStartup.p3")}</p>
                        <p className="mt-5">{t("herStartup.p4")}</p>
                        <p className="mt-5 text-mainColor font-bold text-lg">{t("herStartup.h1")}</p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={500}
                           image="/assets/press/2.jpg"
                           imageDetail={t("herStartup.caption2")}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p className="mt-5">{t("herStartup.p5")}</p>
                  <p className="mt-5">{t("herStartup.p6")}</p>
                  <p className="mt-5">{t("herStartup.p7")}</p>
                  <p className="mt-5">{t("herStartup.p8")}</p>
                  <p className="mt-5">{t("herStartup.p9")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/press/3.jpg"
                     imageDetail={t("herStartup.caption3")}
                     imageHeight={450}
                  />
                  <h2 className="text-mainColor font-bold text-lg">{t("herStartup.h2")}</h2>
                  <p className="mt-5">{t("herStartup.p10")}</p>
                  <p className="mt-5">{t("herStartup.p11")}</p>
                  <p className="mt-5">{t("herStartup.p12")}</p>
                  <p className="mt-5">{t("herStartup.p13")}</p>
                  <p className="mt-5">{t("herStartup.p14")}</p>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/press/4.jpg"
                     imageDetail={t("herStartup.caption4")}
                     imageHeight={450}
                  />

                  <p className="mt-5">{t("herStartup.p15")}</p>
                  <p className="mt-5">{t("herStartup.p16")}</p>
                  <p className="mt-5">{t("herStartup.p17")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/press/5.jpg"
                     imageDetail={t("herStartup.caption5")}
                     imageHeight={450}
                  />

                  <h2 className="text-mainColor font-bold text-lg">{t("herStartup.h3")}</h2>

                  <p className="mt-5">{t("herStartup.p18")}</p>
                  <p className="mt-5">{t("herStartup.p19")}</p>
                  <p className="mt-5">{t("herStartup.p20")}</p>
                  <p className="mt-5">{t("herStartup.p21")}</p>
                  <p className="mt-5">{t("herStartup.p22")}</p>
                  <p className="mt-5">{t("herStartup.p23")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
