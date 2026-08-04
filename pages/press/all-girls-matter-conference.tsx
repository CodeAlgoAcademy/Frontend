import React from "react";
import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import { useTranslation } from "react-i18next";

export default function AllGirlsMatterConference() {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title={t("allGirlsMatter.title")} date={t("allGirlsMatter.date")} />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/all-girls-matter-conference.jpeg"
               imageDetail={t("allGirlsMatter.caption1")}
               className="lg:!object-top"
            />

            <main className="mt-6">
               <section className="my-4">
                  <p className="mt-3">{t("allGirlsMatter.p1")}</p>
                  <p className="my-3">{t("allGirlsMatter.p2")}</p>
                  <p>{t("allGirlsMatter.p3")}</p>
                  <p>{t("allGirlsMatter.p4")}</p>
                  <p>{t("allGirlsMatter.p5")}</p>
               </section>
               <section className="my-4">
                  <p>
                     {t("allGirlsMatter.p6")}{" "}
                     <Link text="Sign up today" link="https://www.codealgoacademy.com" />
                  </p>
                  <p>{t("allGirlsMatter.p7")}</p>
                  <i className="cursor-pointer font-bold text-mainRed">{t("allGirlsMatter.hashtags")}</i>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
