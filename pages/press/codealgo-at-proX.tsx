import React from "react";
import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import { useTranslation } from "react-i18next";

const CodeAlgoAtProX = () => {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("proxHiringFair.title")} date={t("proxHiringFair.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/codealgo-at-proX.jpeg"
               imageDetail={t("proxHiringFair.caption1")}
               className="lg:!object-top"
            />

            <main className="mt-6">
               <section className="my-4">
                  <p className="my-3">{t("proxHiringFair.p1")}</p>
                  <p>{t("proxHiringFair.p2")}</p>
                  <p>{t("proxHiringFair.p3")}</p>
                  <p>{t("proxHiringFair.p4")}</p>
                  <p>{t("proxHiringFair.p5")}</p>
               </section>
               <section className="my-4">
                  <p>
                     {t("proxHiringFair.p6")} <Link text="here" link="https://www.codealgoacademy.com" />
                  </p>
                  <p>{t("proxHiringFair.p7")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CodeAlgoAtProX;
