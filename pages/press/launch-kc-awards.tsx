import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LaunchKcAwards() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("launchKcAwards.title")} date={t("launchKcAwards.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/launch-kc-award.jpg"
               imageDetail={t("launchKcAwards.caption1")}
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text={t("launchKcAwards.dropCaps")} />
                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">{t("launchKcAwards.p1")}</p>
                        <p className="mt-5">{t("launchKcAwards.p2")}</p>
                        <p className="mt-5">{t("launchKcAwards.p3")}</p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/launch-kc-award-1.jpg"
                           imageDetail={t("launchKcAwards.caption2")}
                        />
                     </div>
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-5">{t("launchKcAwards.p4")}</p>
                  <p className="mt-5">{t("launchKcAwards.p5")}</p>
                  <p className="mt-5">{t("launchKcAwards.p6")}</p>
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-2.jpg"
                     imageDetail={t("launchKcAwards.caption3")}
                     imageHeight={450}
                  />
                  <p className="mt-5">{t("launchKcAwards.p7")}</p>
                  <p className="mt-5">{t("launchKcAwards.p8")}</p>
                  <p className="mt-5">{t("launchKcAwards.p9")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-3.jpg"
                     imageDetail={t("launchKcAwards.caption4")}
                     imageHeight={450}
                  />
                  <p className="mt-5">{t("launchKcAwards.p10")}</p>
                  <p className="mt-5">{t("launchKcAwards.p11")}</p>
                  <p className="mt-5">{t("launchKcAwards.p12")}</p>
                  <p className="mt-5">{t("launchKcAwards.p13")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-4.jpg"
                     imageDetail={t("launchKcAwards.caption5")}
                     imageHeight={500}
                  />
                  <p className="mt-5">{t("launchKcAwards.p14")}</p>
                  <p className="mt-5">{t("launchKcAwards.p15")}</p>
                  <p className="mt-5">{t("launchKcAwards.p16")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-5.jpg"
                     imageDetail={t("launchKcAwards.caption6")}
                     imageHeight={500}
                  />
                  <p className="mt-5">{t("launchKcAwards.p17")}</p>
                  <p className="mt-3">{t("launchKcAwards.p18")}</p>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-6.jpg"
                     imageDetail={t("launchKcAwards.caption7")}
                     imageHeight={500}
                  />
                  <p className="mt-5">{t("launchKcAwards.p19")}</p>
                  <p className="mt-5">{t("launchKcAwards.p20")}</p>
                  <p className="mt-5">{t("launchKcAwards.p21")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-7.jpg"
                     imageDetail={t("launchKcAwards.caption8")}
                     imageHeight={500}
                  />
                  <p className="mt-5">{t("launchKcAwards.p22")}</p>
                  <p className="mt-3">{t("launchKcAwards.p23")}</p>
                  <p className="mt-3">{t("launchKcAwards.p24")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-8.jpg"
                     imageDetail={t("launchKcAwards.caption9")}
                     imageHeight={500}
                  />
                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-1">
                        <p className="mt-5">{t("launchKcAwards.p25")}</p>
                        <p className="mt-5">{t("launchKcAwards.p26")}</p>
                        <p className="mt-5">{t("launchKcAwards.p27")}</p>
                        <p className="mt-5">{t("launchKcAwards.p28")}</p>
                     </div>
                     <div className="flex-[.7]">
                        <ImagesContainer
                           image="/assets/blog/launch-kc-award-9.jpg"
                           imageDetail={t("launchKcAwards.caption10")}
                           imageHeight={300}
                        />
                     </div>
                  </div>
               </section>

               <section className="mt-3 hidden gap-2 lg:flex">
                  {["launch-kc-award-10.jpg", "launch-kc-award-11.jpg", "launch-kc-award-12.jpg"].map((img, index) => {
                     return (
                        <img
                           key={index}
                           src={`/assets/blog/${img}`}
                           className="h-[500px]  flex-1 cursor-pointer object-cover object-top hover:opacity-90"
                        />
                     );
                  })}
               </section>

               <section className="mt-3">
                  <p className="mt-5">{t("launchKcAwards.p29")}</p>
                  <p className="mt-5">{t("launchKcAwards.p30")}</p>

                  <i className="my-5 block">{t("launchKcAwards.i1")}</i>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                     {[
                        "launch-kc-award-13.jpg",
                        "launch-kc-award-14.jpg",
                        "launch-kc-award-15.jpg",
                        "launch-kc-award-16.jpg",
                        "launch-kc-award-17.jpg",
                        "launch-kc-award-18.jpg",
                        "launch-kc-award-19.jpg",
                        "launch-kc-award-20.jpg",
                     ].map((img, index) => {
                        return (
                           <img
                              key={index}
                              src={`/assets/blog/${img}`}
                              className="h-[200px]  flex-1 cursor-pointer object-cover object-top hover:opacity-90"
                           />
                        );
                     })}
                  </div>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
