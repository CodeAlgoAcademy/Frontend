import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import RelatedArticles from "@/components/press/RelatedArticles";
import React from "react";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";

export default function Index() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("altcapYourBiz.title")} date={t("altcapYourBiz.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/altcap-your-biz.jpg"
               imageDetail={t("altcapYourBiz.caption1")}
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text={t("altcapYourBiz.dropCaps")} />
                  <p className="mt-5">{t("altcapYourBiz.p1")}</p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">{t("altcapYourBiz.p2")}</p>
                        <p className="mt-5">{t("altcapYourBiz.p3")}</p>
                        <p className="mt-5">{t("altcapYourBiz.p4")}</p>
                        <p className="mt-5">{t("altcapYourBiz.p5")}</p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/altcap-your-biz1.jpg"
                           imageDetail={t("altcapYourBiz.caption2")}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p>{t("altcapYourBiz.p6")}</p>
                  <i className="mt-3 block">
                     Click <Link link="https://www.startlandnews.com/2022/11/altcap-your-biz-2022/" text="here" /> to read about the 2022 AltCap Your
                     Biz grand prize winner.
                  </i>
                  <i className="mt-3 block">
                     Watch a video featuring Elaina Paige Thomas below, then keep reading for more AltCap Your Biz awardees.
                  </i>

                  <div className="mt-6  h-[500px] w-full">
                     <ReactPlayer width={"100%"} height={"100%"} url="https://youtu.be/bqsv3uxLyrQ" playing={true} muted={true} controls={true} />
                  </div>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/altcap-your-biz2.jpg"
                     imageDetail={t("altcapYourBiz.caption3")}
                     className="lg:!object-cover"
                  />
                  <p className="mt-3">{t("altcapYourBiz.p9")}</p>
                  <p className="mt-3">{t("altcapYourBiz.p10")}</p>
                  <p className="mt-3">{t("altcapYourBiz.p11")}</p>
                  <p className="mt-3">{t("altcapYourBiz.p12")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/altcap-your-biz6.jpg"
                     imageDetail={t("altcapYourBiz.caption4")}
                     className="lg:!object-top"
                  />
                  <p className="mt-3">{t("altcapYourBiz.p13")}</p>
                  <p className="mt-3">{t("altcapYourBiz.p14")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/altcap-your-biz4.jpg"
                     imageDetail={t("altcapYourBiz.caption5")}
                     className="lg:!object-cover"
                  />
                  <p className="mt-3">{t("altcapYourBiz.p15")}</p>
                  <RelatedArticles
                     link="https://www.startlandnews.com/2023/09/godfrey-riddle-civic-saint-affordable-housing/"
                     title="Godfrey Riddle wants to build you a home; How Civic Saint's eco-friendly bricks could reshape the foundation of affordable housing"
                  />
               </section>

               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="flex-[.9]">
                     <p className="mt-5">{t("altcapYourBiz.p16")}</p>
                     <p className="mt-5">{t("altcapYourBiz.p17")}</p>
                     <p className="mt-5">{t("altcapYourBiz.p18")}</p>
                     <p className="mt-5">{t("altcapYourBiz.p19")}</p>
                     <p className="mt-5">{t("altcapYourBiz.p20")}</p>
                     <p className="mt-5">{t("altcapYourBiz.p21")}</p>
                     <p className="mt-5">{t("altcapYourBiz.p22")}</p>
                     <p className="mt-5">{t("altcapYourBiz.p23")}</p>
                  </div>
                  <div className="flex-1">
                     <ImagesContainer
                        imageHeight={500}
                        image="/assets/blog/altcap-your-biz5.jpg"
                        imageDetail={t("altcapYourBiz.caption6")}
                     />
                  </div>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
