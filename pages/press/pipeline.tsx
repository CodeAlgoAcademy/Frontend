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
            <BlogTitle title={t("pipeline.title")} date={t("pipeline.date")} />
            <ImagesContainer
               imageHeight={700}
               image="/assets/blog/press/pipeline.jpg"
               imageDetail={t("pipeline.caption1")}
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text={t("pipeline.dropCaps")} />
                  <p className="mt-5">{t("pipeline.p1")}</p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">{t("pipeline.p2")}</p>
                        <p className="mt-5">{t("pipeline.p3")}</p>
                        <p className="mt-5">{t("pipeline.p4")}</p>
                        <p className="mt-5">
                           <span dangerouslySetInnerHTML={{ __html: t("pipeline.p5") }} />
                        </p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/press/melissa.jpg"
                           imageDetail={t("pipeline.caption2")}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={700}
                     image="/assets/blog/press/candice.jpg"
                     imageDetail={t("pipeline.caption3")}
                     className="lg:!object-cover"
                  />
                  <p className="mt-3">{t("pipeline.p6")}</p>
                  <p className="mt-3">{t("pipeline.p7")}</p>
                  <p className="mt-3">{t("pipeline.p8")}</p>
                  <p className="mt-3">{t("pipeline.p9")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/press/jessica.jpg"
                     imageDetail={t("pipeline.caption4")}
                     className="lg:!object-top"
                  />
                  <p className="mt-3">{t("pipeline.p10")}</p>
                  <p className="mt-3">{t("pipeline.p11")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
