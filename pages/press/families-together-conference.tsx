import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

const FamiliesTogetherConference = () => {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("familiesTogether.headerBody")}
            title={t("familiesTogether.headerTitle")}
            image="/assets/blog/article6.png"
            date="September 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("familiesTogether.title")} />
            <h2 className="mb-4 mt-2 font-bold">{t("familiesTogether.h1")}</h2>

            <section className="mt-3">
               <ImagesContainer
                  title={t("familiesTogether.session1Title")}
                  subtitle={` - ${t("familiesTogether.session1Speaker")}`}
                  image="/assets/blog/article6-2.jpg"
                  imageDetail={t("familiesTogether.session1Caption")}
                  imageHeight={400}
               />
               <p className="mt-3">{t("familiesTogether.session1P1")}</p>
               <p className="mt-3">{t("familiesTogether.session1P2")}</p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title={t("familiesTogether.session2Title")}
                  subtitle={` - ${t("familiesTogether.session2Speaker")}`}
                  image="/assets/blog/article6-3.jpg"
                  imageDetail={t("familiesTogether.session2Caption")}
                  imageHeight={400}
               />
               <p className="mt-3">{t("familiesTogether.session2P1")}</p>
               <p className="mt-3">{t("familiesTogether.session2P2")}</p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title={t("familiesTogether.session3Title")}
                  subtitle={` - ${t("familiesTogether.session3Speaker")}`}
                  image="/assets/blog/article6-4.jpg"
                  imageDetail={t("familiesTogether.session3Caption")}
                  imageHeight={400}
               />
               <p className="mt-3">{t("familiesTogether.session3P1")}</p>
               <p className="mt-3">{t("familiesTogether.session3P2")}</p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title={t("familiesTogether.session4Title")}
                  subtitle={` - ${t("familiesTogether.session4Speaker")}`}
                  image="/assets/blog/article6-5.png"
                  imageDetail={t("familiesTogether.session4Caption")}
                  imageHeight={600}
               />
               <p className="mt-3">{t("familiesTogether.session4P1")}</p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title={t("familiesTogether.session5Title")}
                  subtitle={` - ${t("familiesTogether.session5Speaker")}`}
                  image="/assets/blog/article6-6.jpg"
                  imageDetail={t("familiesTogether.session5Caption")}
                  imageHeight={450}
               />
               <p className="mt-3">{t("familiesTogether.session5P1")}</p>
               <p className="mt-3">{t("familiesTogether.session5P2")}</p>
            </section>

            <section className="mt-3">
               <div className="flex flex-nowrap items-start justify-center gap-4">
                  <div className="flex-[0.7]">
                     <ImagesContainer imageHeight={900} imageDetail="" image="/assets/blog/article6-7.png" />
                  </div>
                  <div className="flex-1">
                     <h2 className="mt-5 mb-1 text-[1.4rem] font-bold text-mainRed">{t("familiesTogether.session6Title")}</h2>
                     <p className="mt-3">{t("familiesTogether.session6P1")}</p>
                     <p className="mt-3">{t("familiesTogether.session6P2")}</p>
                     <p className="mt-3">{t("familiesTogether.session6P3")}</p>
                  </div>
               </div>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title={t("familiesTogether.session7Title")}
                  subtitle={` - ${t("familiesTogether.session7Speaker")}`}
                  image="/assets/blog/article6-9.jpg"
                  imageDetail={t("familiesTogether.session7Caption")}
                  imageHeight={450}
               />
               <p className="mt-3">{t("familiesTogether.session7P1")}</p>
               <p className="mt-3">{t("familiesTogether.session7P2")}</p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title={t("familiesTogether.session8Title")}
                  subtitle={` - ${t("familiesTogether.session8Speaker")}`}
                  image="/assets/blog/article6-10.jpg"
                  imageDetail={t("familiesTogether.session8Caption")}
                  imageHeight={450}
               />
               <p className="mt-3">{t("familiesTogether.session8P1")}</p>
               <p className="mt-3">{t("familiesTogether.session8P2")}</p>
            </section>

            <section className="mt-3">
               <div className="flex flex-nowrap items-start justify-center gap-4">
                  <div className="flex-[0.7]">
                     <ImagesContainer imageDetail="" imageHeight={900} image="/assets/blog/article6-11.png" />
                  </div>
                  <div className="flex-1">
                     <h2 className="mt-5 mb-1 text-[1.4rem] font-bold text-mainRed">{t("familiesTogether.session9Title")}</h2>
                     <p className="mt-3">{t("familiesTogether.session9P1")}</p>
                     <p className="mt-3">{t("familiesTogether.session9P2")}</p>
                     <p className="mt-3">{t("familiesTogether.session9P3")}</p>
                     <p className="mt-3">{t("familiesTogether.session9P4")}</p>
                  </div>
               </div>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title={t("familiesTogether.session10Title")}
                  subtitle={` - ${t("familiesTogether.session10Speaker")}`}
                  image="/assets/blog/article6-12.jpg"
                  imageDetail={t("familiesTogether.session10Caption")}
                  imageHeight={450}
               />
               <p className="mt-3">{t("familiesTogether.session10P1")}</p>
               <p className="mt-3">{t("familiesTogether.session10P2")}</p>
            </section>
         </div>
         <Footer />
      </section>
   );
};

export default FamiliesTogetherConference;
