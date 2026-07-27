import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";
import { useTranslation } from "react-i18next";

export default function HowCodingHelpsKids() {
   const { t } = useTranslation("blog");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />

         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title={t("howCodingHelpsKids.title")}
               date={t("howCodingHelpsKids.date")}
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/codinghelpkids1.png"
               imageDetail={t("howCodingHelpsKids.imageDetail")}
            />

            <main className="mt-6">
               <section className="my-4">
                  <DropCapsParagraph text={t("howCodingHelpsKids.dropCaps")} />
               </section>

               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     {t("howCodingHelpsKids.sections.decompositionTitle")}
                  </h2>
                  <p>
                     {t("howCodingHelpsKids.sections.decompositionText")}
                  </p>
               </section>

               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     {t("howCodingHelpsKids.sections.variablesTitle")}
                  </h2>
                  <p>
                     {t("howCodingHelpsKids.sections.variablesText")}
                  </p>
               </section>

               <ImagesContainer
                  imageHeight={380}
                  image="/assets/blog/codingkids3.png"
                  imageDetail={t("howCodingHelpsKids.imageDetail")}
               />

               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     {t("howCodingHelpsKids.sections.geometryTitle")}
                  </h2>
                  <p>
                     {t("howCodingHelpsKids.sections.geometryText")}
                  </p>
               </section>

               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     {t("howCodingHelpsKids.sections.logicTitle")}
                  </h2>
                  <p>
                     {t("howCodingHelpsKids.sections.logicText")}
                  </p>
               </section>

               <hr className="my-6 border-[1.5px]" />

               <p className="text-sm italic text-gray-500">
                  {t("howCodingHelpsKids.cta")}{" "}
                  <a
                     href="https://codealgoacademy.com/"
                     className="text-purple-600 underline hover:text-purple-800"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     codealgoacademy.com
                  </a>
                  .
               </p>
            </main>
         </div>

         <Footer />
      </section>
   );
}
