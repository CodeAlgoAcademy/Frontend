import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

export default function CodeAlgoAcademyEdtechPlatform() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("edtechPlatform.title")} date={t("edtechPlatform.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/codealgopoto.jpg"
               imageDetail={t("edtechPlatform.caption1")}
               className="lg:!object-cover"
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text={t("edtechPlatform.dropCaps")} />
                  <p className="mt-5">{t("edtechPlatform.p1")}</p>
                  <p>{t("edtechPlatform.p2")}</p>
                  <p>{t("edtechPlatform.p3")}</p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <h2>{t("edtechPlatform.h1")}</h2>
                        <p className="mt-5">{t("edtechPlatform.p4")}</p>
                        <p className="mt-5">{t("edtechPlatform.p5")}</p>
                        <p className="mt-5">{t("edtechPlatform.p6")}</p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/press/CodeAlgo-Academy-logo.webp"
                           imageDetail={""}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p className="mt-5">{t("edtechPlatform.p7")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/press/demonstrates.jpg"
                     imageDetail={t("edtechPlatform.caption2")}
                     imageHeight={450}
                  />
                  <h1>{t("edtechPlatform.h2")}</h1>
                  <p className="mt-5">{t("edtechPlatform.p8")}</p>
                  <p className="mt-5">{t("edtechPlatform.p9")}</p>
                  <p className="mt-5">{t("edtechPlatform.p10")}</p>
                  <p className="mt-5">{t("edtechPlatform.p11")}</p>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/press/Triumfia-Houmbie-Fulks-CodeAlgo-Academy.jpg"
                     imageDetail={t("edtechPlatform.caption3")}
                     imageHeight={450}
                  />
                  <h1>{t("edtechPlatform.h3")}</h1>
                  <p className="mt-5">{t("edtechPlatform.p12")}</p>
                  <p className="mt-5">{t("edtechPlatform.p13")}</p>
                  <p className="mt-5">{t("edtechPlatform.p14")}</p>
                  <p className="mt-5">{t("edtechPlatform.p15")}</p>
                  <p className="mt-5">{t("edtechPlatform.p16")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
