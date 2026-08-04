import Header from "@/components/press/Header";
import Navbar from "@/components/navbar/home/Navbar";
import React from "react";
import ImagesContainer from "@/components/press/ImagesContainer";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import BlogTitle from "@/components/press/BlogTitle";
import Footer from "@/components/home/new-home/footer";
import { useTranslation } from "react-i18next";

const PurePitchRally = () => {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("purePitchRally.headerBody")}
            title={t("purePitchRally.headerTitle")}
            image="/assets/blog/article1.jpg"
            date="October 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title={t("purePitchRally.title")}
               link="https://www.startlandnews.com/author/gwinoverfeltsteinmetz"
               by="Matthew Gwin, Nikki Overfelt Chifalu, and Channa Steinmetz"
               date={t("purePitchRally.date")}
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/article1-1.jpg"
               imageDetail={t("purePitchRally.caption1")}
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="mt-6 flex-1">
                     <DropCapsParagraph text={t("purePitchRally.dropCaps")} />
                     <p className="mt-3">
                        <i className="text-[#444]">{t("purePitchRally.p1")}</i>
                     </p>
                     <p className="mt-3">{t("purePitchRally.p2")}</p>
                     <p className="mt-3">{t("purePitchRally.p3")}</p>
                     <p className="mt-3">{t("purePitchRally.p4")}</p>
                  </div>
                  <div className="flex-[0.7]">
                     <ImagesContainer
                        image="/assets/blog/article1-2.jpg"
                        imageDetail={t("purePitchRally.caption2")}
                        imageHeight={300}
                     />
                  </div>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-3.jpg"
                     imageDetail={t("purePitchRally.caption3")}
                     imageHeight={450}
                  />
                  <p className="mt-5">{t("purePitchRally.p5")}</p>
                  <p className="mt-5">{t("purePitchRally.p6")}</p>
                  <p className="mt-5">{t("purePitchRally.p7")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-4.jpg"
                     imageDetail={t("purePitchRally.caption4")}
                     imageHeight={450}
                  />
                  <div className="mt-2 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[0.7]">
                        <ImagesContainer
                           image="/assets/blog/article1-5.jpg"
                           imageDetail={t("purePitchRally.caption5")}
                           imageHeight={300}
                        />
                     </div>
                     <div className="mt-6 flex-1">
                        <p className="mt-3">{t("purePitchRally.p8")}</p>
                        <p className="mt-3">
                           <i className="text-[#444]">{t("purePitchRally.p9")}</i>
                        </p>
                        <p className="mt-3">{t("purePitchRally.p10")}</p>
                        <p className="mt-3">{t("purePitchRally.p11")}</p>
                     </div>
                  </div>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-6.jpg"
                     imageDetail={t("purePitchRally.caption6")}
                     imageHeight={500}
                     title="Routine Success"
                     link="https://sites.google.com/view/routine-success/home"
                     subtitle=", Matt Gunter: $16,000"
                  />
                  <p className="mt-5">{t("purePitchRally.p12")}</p>
                  <p className="mt-3">
                     <i className="text-[#444]">{t("purePitchRally.p13")}</i>
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-7.jpg"
                     imageDetail={t("purePitchRally.caption7")}
                     imageHeight={500}
                     title="Hermes"
                     link="https://www.hermeslst.com/"
                     subtitle=", Rick Macartney: $15,000"
                  />
                  <p className="mt-5">{t("purePitchRally.p14")}</p>
                  <p className="mt-3">{t("purePitchRally.p15")}</p>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-8.jpg"
                     imageDetail={t("purePitchRally.caption8")}
                     imageHeight={500}
                     title="CodeAlgo Academy"
                     link="https://www.codealgoacademy.com/"
                     subtitle=", Triumfia Houmbie Fulks: $13,000"
                  />
                  <p className="mt-5">{t("purePitchRally.p16")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-9.jpg"
                     imageDetail={t("purePitchRally.caption9")}
                     imageHeight={500}
                     title="Health Partners MD"
                     link="https://heartlandweightloss.com/about-us/"
                     subtitle=", Dr. Courtney Younglove: $11,000"
                  />
                  <p className="mt-5">{t("purePitchRally.p17")}</p>
                  <p className="mt-3">{t("purePitchRally.p18")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-10.jpg"
                     imageDetail={t("purePitchRally.caption10")}
                     imageHeight={500}
                     title="Marma"
                     link="https://www.marmanutrition.com/"
                     subtitle=", Meredith Evans McAllister: $9,000"
                  />
                  <p className="mt-5">{t("purePitchRally.p19")}</p>
                  <p className="mt-3">{t("purePitchRally.p20")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-11.jpg"
                     imageDetail={t("purePitchRally.caption11")}
                     imageHeight={500}
                     title="Spyder"
                     link="https://www.spyderloop.com/"
                     subtitle=", Nedra Barr: $8,000"
                  />
                  <p className="mt-5">{t("purePitchRally.p21")}</p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-12.jpg"
                     imageDetail={t("purePitchRally.caption12")}
                     imageHeight={500}
                     title="YAT"
                     link="https://yat.ai/"
                     subtitle=", Robert Goss: $2,000"
                  />
                  <p className="mt-5">{t("purePitchRally.p22")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default PurePitchRally;
