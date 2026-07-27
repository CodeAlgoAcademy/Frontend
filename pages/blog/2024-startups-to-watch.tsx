import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import RelatedArticles from "@/components/press/RelatedArticles";
import React from "react";
import { useTranslation } from "react-i18next";

export default function StartupsToWatch() {
   const { t } = useTranslation("blog");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />

         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title={t("startupsToWatch.title")}
               date={t("startupsToWatch.date")}
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/2024-startups-to-watch.jpg"
               imageDetail={t("startupsToWatch.imageDetail")}
            />
            <i>
               {t("startupsToWatch.editorNote")}
            </i>
            <main className="mt-6">
               <section className="my-4">
                  <DropCapsParagraph text={t("startupsToWatch.dropCaps")} />
                  <p className="mt-3">
                     {t("startupsToWatch.content.introQuote")}
                  </p>
               </section>
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="flex-[.75]">
                     <p>
                        <Link link="https://codealgoacademy.com/" text="CodeAlgo Academy" /> {t("startupsToWatch.content.gamification")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.betaLaunch")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.mission")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.founders")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.immigrantStory")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.pivot")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.youthFocus")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.challengingCoding")}
                     </p>

                     <p className="mt-3">{t("startupsToWatch.content.hardQuote")}</p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.gamificationApproach")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.funQuote")}
                     </p>

                     <p className="mt-3">
                        {t("startupsToWatch.content.accessibleApproach")}
                     </p>
                  </div>
                  <div className="flex-[.25]">
                     <img src="/assets/blog/2024-startups-to-watch-1.jpg" className="h-[300px] w-full object-contain object-center" alt="" />

                     <i className="mt-2 block">
                        <b>Elevator pitch</b>: {t("startupsToWatch.sidebar.elevatorPitch")}
                     </i>

                     <ul className="list-disc pl-2">
                        <li>
                           <i>
                              <b>Founder:</b> {t("startupsToWatch.sidebar.founder")}
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Founding year:</b> {t("startupsToWatch.sidebar.foundingYear")}
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Current employee count:</b> {t("startupsToWatch.sidebar.employeeCount")}
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Funding to date:</b> {t("startupsToWatch.sidebar.funding")}
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Noteworthy investors:</b> {t("startupsToWatch.sidebar.investors")}
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Noteworthy programs completed:</b> {t("startupsToWatch.sidebar.programs")}
                           </i>
                        </li>
                     </ul>
                  </div>
               </section>

               <section className="my-4">
                  <ImagesContainer
                     imageHeight={450}
                     image="/assets/blog/2024-startups-to-watch-2.jpg"
                     imageDetail={t("startupsToWatch.imageDetail")}
                  />

                  <p className="mt-3">
                     {t("startupsToWatch.conclusion.betaAchievement")}
                  </p>

                  <p className="mt-3">
                     {t("startupsToWatch.conclusion.liveGoal")}
                  </p>

                  <p className="mt-3">
                     {t("startupsToWatch.conclusion.usersQuote")}
                  </p>

                  <p className="mt-3">
                     {t("startupsToWatch.conclusion.expansion")}
                  </p>

                  <hr className="my-4 border-[1.5px]" />

                  <i>
                     {t("startupsToWatch.conclusion.fullList")}{" "}
                     <Link text="here" link="https://www.startlandnews.com/2024/01/2024-startups-to-watch/" />
                  </i>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
