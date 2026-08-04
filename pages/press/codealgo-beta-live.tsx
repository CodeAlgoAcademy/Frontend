import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function CodeAlgoBetaLive() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("codealgoBetaLive.title")} date={t("codealgoBetaLive.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/codealgo-beta-live.png"
               imageDetail={t("codealgoBetaLive.caption1")}
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4">
                  <DropCapsParagraph text={t("codealgoBetaLive.dropCaps")} />
               </section>

               <section className="mt-3">
                  <BlogTitle title={t("codealgoBetaLive.h1")} className="!text-[1.2rem]" />
                  <p>{t("codealgoBetaLive.p1")}</p>
               </section>

               <section className="mt-3">
                  <BlogTitle title={t("codealgoBetaLive.h2")} className="!text-[1.2rem]" />
                  <div>
                     <BlogTitle title={t("codealgoBetaLive.p2")} className="!text-[1.1rem]" />
                  </div>
                  <div>
                     <BlogTitle title={t("codealgoBetaLive.p3")} className="!text-[1.1rem]" />
                  </div>
                  <div>
                     <BlogTitle title={t("codealgoBetaLive.p4")} className="!text-[1.1rem]" />
                  </div>
               </section>

               <section className="mt-3">
                  <BlogTitle title={t("codealgoBetaLive.h3")} className="!text-[1.2rem]" />
                  <p className="mt-1">{t("codealgoBetaLive.p5")}</p>
                  <div>
                     <BlogTitle title={t("codealgoBetaLive.h4")} className="!text-[1.1rem]" />
                     <p>{t("codealgoBetaLive.p6")}</p>
                     <ImagesContainer
                        imageHeight={450}
                        image="/assets/blog/codealgo-beta-live3.png"
                        imageDetail={t("codealgoBetaLive.caption2")}
                        className="lg:!object-cover"
                     />
                  </div>

                  <div>
                     <BlogTitle title={t("codealgoBetaLive.h5")} className="!text-[1.1rem]" />
                     <p>{t("codealgoBetaLive.p7")}</p>
                     <ImagesContainer
                        imageHeight={450}
                        image="/assets/blog/codealgo-beta-live2.png"
                        imageDetail={t("codealgoBetaLive.caption3")}
                        className="lg:!object-cover"
                     />
                  </div>

                  <div>
                     <BlogTitle title={t("codealgoBetaLive.h6")} className="!text-[1.1rem]" />
                     <p>{t("codealgoBetaLive.p8")}</p>
                     <ImagesContainer
                        imageHeight={450}
                        image="/assets/blog/codealgo-beta-live1.png"
                        imageDetail={t("codealgoBetaLive.caption4")}
                        className="lg:!object-cover"
                     />
                  </div>
               </section>

               <section className="mt-3">
                  <BlogTitle title={t("codealgoBetaLive.h7")} className="!text-[1.2rem]" />
                  <p className="mt-1">{t("codealgoBetaLive.p9")}</p>
                  <p className="mt-1">{t("codealgoBetaLive.p10")}</p>
                  <p className="mt-1">
                     {t("codealgoBetaLive.p11")} <Link text="Get started now!" link="https://www.codealgoacademy.com" />
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
