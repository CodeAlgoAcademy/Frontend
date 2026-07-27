import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LincSucessCoding() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body=""
            title={t("lincStudent.headerTitle")}
            image="/assets/blog/press/linc.png"
            date="May 2025"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("lincStudent.title")} date={t("lincStudent.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/lincgirl.png"
               imageDetail={t("lincStudent.caption1")}
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text={t("lincStudent.dropCaps")} />
                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">{t("lincStudent.p1")}</p>
                        <p className="mt-5">{t("lincStudent.p2")}</p>
                        <p className="mt-5">{t("lincStudent.p3")}</p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/press/linclass.png"
                           imageDetail={t("lincStudent.caption2")}
                        />
                     </div>
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-5">{t("lincStudent.p4")}</p>
                  <p className="mt-5">{t("lincStudent.p5")}</p>
                  <ImagesContainer
                     image="/assets/blog/press/lincboy.png"
                     imageDetail={t("lincStudent.caption3")}
                     imageHeight={450}
                  />
                  <p className="mt-5">{t("lincStudent.p6")}</p>
                  <p className="mt-5">{t("lincStudent.p7")}</p>
               </section>

               <section className="mt-3">
                  <i className="my-5 block">{t("lincStudent.i1")}</i>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                     {[
                        "lincsection.png",
                        "linclesson.png",
                        "lincless.png",
                        "linc.png",
                        "lincboy.png",
                        "linclass.png"
                     ].map((img, index) => {
                        return (
                           <img
                              key={index}
                              src={`/assets/blog/press/${img}`}
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
