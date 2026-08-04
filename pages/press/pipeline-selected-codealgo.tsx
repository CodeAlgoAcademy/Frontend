import Header from "@/components/press/Header";
import Navbar from "@/components/navbar/home/Navbar";
import React from "react";
import ImagesContainer from "@/components/press/ImagesContainer";
import BlogTitle from "@/components/press/BlogTitle";
import Footer from "@/components/home/new-home/footer";
import { useTranslation } from "react-i18next";

const newMembers = [
   {
      name: "Lee Zuvanich",
      company: "Appsta",
      link: "https://www.appsta.co",
      linkedin: "https://www.linkedin.com/in/leezuvanich/",
      location: "",
      desc: "A global marketplace that uses AI to standardize software development pricing for app founders. Fractional CTOs available 24/7.",
   },
   {
      name: "\u2022\tNic Bianchi",
      company: "Bianchi Candle Co",
      link: "https://bianchicandleco.com/",
      linkedin: "https://www.linkedin.com/in/nic-bianchi-609b9217b/",
      location: "Omaha",
      desc: " A tight-knit group that genuinely enjoys being together and collaborating: Our vibe is perseverance and warmth. We get a lot done. We work hard. We laugh hard. We get fired up about growth and the unknown.",
   },
   {
      name: "Megan Orear ",
      company: "Celerity Enterprises",
      link: "https://celerityenterprises.com/",
      linkedin: "https://www.linkedin.com/in/megan-o-rear-5282643/",
      location: "Kansas City",
      desc: "A creative organization focused on providing innovative technical solutions to companies utilizing special pricing agreements; transforming antiquated processes into a swift, dynamic, and profitable opportunity for manufacturers, distributors and manufacturer rep agencies.",
   },
   {
      name: "Mandy Shoemaker",
      company: "Dementia Engagement Solutions",
      link: "https://connectivities.us/pages/about",
      linkedin: "https://www.linkedin.com/in/mandypec/",
      location: "Overland Park",
      desc: "Offers caregivers space and time for meaningful, mindful connection with loved ones and residents through a curated monthly subscription service.",
   },
   {
      name: "Jonathan Ruiz",
      company: "EB Systems",
      link: "https://ebsystems.co/",
      linkedin: "https://www.linkedin.com/in/jon-ruiz-47063373/",
      location: "Kansas City",
      desc: " An industry leader in mobile apps, Bluetooth technology, and proprietary Beacon Reader technology that help to drive the \u201cInternet of Things\u201d (IoT) industry for a range of industries and clients. ",
   },
   {
      name: "Robert Disberger ",
      company: "GovBuilt LLC",
      link: "",
      linkedin: "https://www.linkedin.com/in/robert-disberger-ab45a639/",
      location: "Topeka",
      desc: " New and innovative software approach for regulation software focused on permitting, licensing, planning, code enforcement and inspections.",
   },
   {
      name: "Sarah Hill",
      company: "Healium",
      link: "https://www.tryhaelium.com",
      linkedin: "https://www.linkedin.com/in/sarahhill1/",
      location: "Columbia",
      desc: "An interactive immersive media company that specializes in biometrically controlled content powered by the user\u2019s wearables. In five peer-reviewed journals, Healium has been shown to reduce anxiety and improve mood in as little as four minutes.",
   },
   {
      name: "Scott Campbell",
      company: "KBS Service",
      link: "https://www.killbusyseason.com/about",
      linkedin: "https://www.linkedin.com/in/campbellscottf/",
      location: "Prairie Village",
      desc: " A community of finance and accounting professionals who promote the dynamic talent that comes from public accounting and partners with high-growth, small and middle-market businesses to give them access to previously inaccessible game-changing talent.",
   },
   {
      name: "Eliot Arnold",
      company: "Mood Spark AI",
      link: "https://www.getmoodspark.com/",
      linkedin: "https://www.linkedin.com/in/campbellscottf/",
      location: "Kansas City, Kansas",
      desc: "The world\u2019s first mood improving digital companion: detects sadness and uplifts with conversation, memories and video visits from friends and family.",
   },
   {
      name: "Tashara Earl",
      company: "Shades of Color",
      link: "https://shadesofcolorbeauty.com/",
      linkedin: "https://www.linkedin.com/in/tashara-earl-mba-ma-b5958634/",
      location: "St. Louis",
      desc: "Provides a diverse, equitable, and inclusive global platform to empower beauty entrepreneurs and consumers with personalized solutions to buy and sell products for their unique needs, culture, and lifestyle.",
   },
   {
      name: "Molly O\u2019Neil",
      company: "Superb",
      link: "https://www.superbshifts.com/",
      linkedin: "https://www.linkedin.com/in/molly-o%E2%80%99neil-43555b86/",
      location: "Omaha",
      desc: " Simple-to-use technology solution putting power back in the hands of senior care facilities.",
   },
   {
      name: "Jon Broek",
      company: "Tenfold Security",
      link: "https://tenfoldsecurity.com/",
      linkedin: "https://www.linkedin.com/in/jon-broek-tenfold/",
      location: "Kansas City, Kansas",
      desc: "Cloud security consulting and threat management services.",
   },
   {
      name: "Audra Dinell",
      company: "The Thread: Women\u2019s Leadership Collective",
      link: "https://www.thethreadwlc.com/",
      linkedin: "https://www.linkedin.com/in/audradinell/",
      location: "Wichita",
      desc: "An experience and community of female leaders creating space for themselves and others to continuously level up in their careers as well as their lives as a whole.",
   },
];

const cohortMembers = [
   {
      name: "LaToya Bass",
      company: "Alignment Business Solutions",
      link: "https://www.alignmentbusinesssolution.com/our-services",
      linkedin: "https://www.linkedin.com/in/latoya-bass-8b0ab6158/",
      location: "Kansas City",
      desc: "A digital business management company helps coaches, accountants and bookkeepers with streamlining operations to ensure that the business runs efficiently and effectively in all areas.",
   },
   {
      name: "Dr. Brandy Archie",
      company: "AskSAMIE",
      link: "https://asksamie.com/",
      linkedin: "https://www.linkedin.com/in/drbrandyarchie/",
      location: "Kansas City",
      desc: "The app builds a curated digital cart of adaptive equipment for patients recovering from significant health events or medical procedures, taking into account their specific physical needs and environmental constraints.",
   },
   {
      name: "Shapree Marshall",
      company: "A Traveled Path Homes ",
      link: "",
      linkedin: "https://www.linkedin.com/in/shapree-marshall-a4035a2b/",
      location: "Kansas City",
      desc: "Workforce housing.",
   },
   {
      name: "Brian Roberts",
      company: "Black Pantry KC",
      link: "https://www.instagram.com/theblackpantry/?hl=en",
      linkedin: "https://www.linkedin.com/in/briankrobertsii/",
      location: "Kansas City",
      desc: "A curated retail space to discover, create awareness and support Black products that meet a premium quality and brand standard.",
   },
   {
      name: ["Triumfia Houmbie Fulks", "Sedric Hibler"],
      company: "CodeAlgo Academy",
      link: "https://www.codealgoacademy.com",
      linkedin: ["https://www.linkedin.com/in/triumfia-houmbie-fulks-3842a1179/", "https://www.linkedin.com/in/sedric-hibler/"],
      location: "Kansas City",
      desc: "A gaming platform that teaches elementary and middle school students how to code.",
   },
   {
      name: ["Tam Tran", "Roger Ngo"],
      company: "Data Appraisal",
      link: "https://dataappraisal.ai/",
      linkedin: ["https://www.linkedin.com/in/tamtranio/", "https://www.linkedin.com/in/roger-ngo-47254b3/"],
      location: "Overland Park",
      desc: "Unlocking enterprise data\u2019s monetary value \u2014 using an automated proprietary approach \u2014 to allow companies to monetize their enterprise data assets.",
   },
   {
      name: "Melissa Weed",
      company: "Honey Does LLC",
      link: "https://honeydoesllc.com/",
      linkedin: "https://www.linkedin.com/in/melissa-weed-msm-emp-b27a1a1b7/",
      location: "Pittsburg",
      desc: "Residential, commercial and rental property cleaning service in the 4-State region (Kansas, Missouri, Oklahoma and Arkansas).",
   },
   {
      name: ["Andrew Ozor", "William Barnhart"],
      company: "Inspectorly",
      link: "",
      linkedin: ["https://www.linkedin.com/in/andrew-ozor/", "https://www.linkedin.com/in/william-barnhart-b1515493/"],
      location: "",
      desc: "A software startup that focuses on delivering business automation to inspection business owners and connecting these owners to nearby inspection jobs requested by big companies that care about geographically disperse infrastructure.",
   },
   {
      name: "Jenifer Fennell",
      company: "J.R. Allen Consulting ",
      link: "",
      linkedin: "https://www.linkedin.com/in/jenifer-fennell-6b070331/",
      location: "",
      hyper: {
         text: "Keep Living: A Journal for Healing Through Your Grief.",
         link: "https://www.amazon.com/Keep-Living-Journal-Healing-Through/dp/057877545X",
      },
      desc: "Publisher of ",
   },
   {
      name: "Chelsey M",
      company: "KC Black Owned",
      link: "https://www.kcblackowned.org/",
      linkedin: "https://www.linkedin.com/in/dr-chelsey-m-879977210/",
      location: "Kansas City",
      desc: "Provides an online platform and marketing services to enhance the visibility of Black-owned businesses.",
   },
   {
      name: "Kalia McKinley",
      company: "OCD Diva & Co",
      link: "https://www.ocddivaandco.com/",
      linkedin: "https://www.linkedin.com/in/kmckinleyocddiva/",
      location: "Shawnee",
      desc: "A compassionate organizing, cleaning and decluttering company with unique packing and unpacking services.",
   },
   {
      name: "JQ Sirls",
      company: "PageMaster",
      link: "https://www.pagemaster.pro/bedtime-story-generator",
      linkedin: "",
      location: "Kansas City",
      desc: "AI-powered bedtime story generator to create a special experience for your child.",
   },
];

const PipelineSelectedCodeAlgo = () => {
   const { t } = useTranslation("press");
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body={t("pipelineSelectedCodealgo.headerBody")}
            title={t("pipelineSelectedCodealgo.headerTitle")}
            image="/assets/blog/article2.jpg"
            date="January 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title={t("pipelineSelectedCodealgo.title")}
               link="https://www.startlandnews.com/author/tfelts/"
               by="Tommy Felts"
               date={t("pipelineSelectedCodealgo.date")}
            />
            <ImagesContainer imageHeight={450} image="/assets/blog/article2-1.jpg" imageDetail="" />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="mt-6 flex-1">
                     <p className="mt-3">{t("pipelineSelectedCodealgo.p1")}</p>
                     <p className="mt-3">{t("pipelineSelectedCodealgo.p2")}</p>
                  </div>
                  <div className="flex-[0.7]">
                     <ImagesContainer image="/assets/blog/article2-3.jpg" imageDetail={t("pipelineSelectedCodealgo.caption1")} imageHeight={300} />
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-5">{t("pipelineSelectedCodealgo.p3")}</p>
                  <p className="mt-5">
                     <i>
                        Click{" "}
                        <a
                           className="text-mainRed underline"
                           href="https://www.pipelineentrepreneurs.com/about"
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           here
                        </a>{" "}
                        to learn more about Pipeline Entrepreneurs.
                     </i>
                  </p>

                  <p className="mt-5">
                     <i className="#444"> {t("pipelineSelectedCodealgo.p4")}</i>{" "}
                     said Vincent, executive director of Pipeline.{" "}
                     <i className="#444">{t("pipelineSelectedCodealgo.p5")}</i>
                  </p>
               </section>
               <section className="mt-3">
                  <ImagesContainer image="/assets/blog/article2-2.jpg" imageDetail={t("pipelineSelectedCodealgo.caption2")} imageHeight={450} />
                  <div className="mt-5">
                     <h3 className="mb-3 font-bold">{t("pipelineSelectedCodealgo.h1")}</h3>
                     <ul className="flex flex-col gap-y-4">
                        {newMembers.map((member, index) => {
                           return (
                              <li key={index} className="block">
                                 <h2 className="text-[1rem]">
                                    <>
                                       {index + 1}.{"  "}
                                       <a
                                          href={member.linkedin}
                                          className="text-mainRedunderline font-bold"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                       >
                                          {member.name}
                                       </a>
                                       ,{" "}
                                       <a href={member.link} className="text-mainRedunderline" target="_blank" rel="noopener noreferrer">
                                          {member.company}
                                       </a>{" "}
                                       {member.location && `(${member.location})`}
                                       {" — "} {member.desc}
                                    </>
                                 </h2>
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={450}
                     image="/assets/blog/article2-4.jpg"
                     imageDetail={t("pipelineSelectedCodealgo.caption3")}
                  />
                  <div className="mt-5">
                     <h3 className="mb-3 font-bold">{t("pipelineSelectedCodealgo.h2")}</h3>
                     <ul className="flex flex-col gap-y-4">
                        {cohortMembers.map((member, index) => {
                           return (
                              <li key={index} className="block">
                                 <h2 className="text-[1rem]">
                                    <>
                                       {index + 1}.{"  "}
                                       {typeof member.name === "string" ? (
                                          <>
                                             <a
                                                href={member.linkedin as string}
                                                className="text-mainRedunderline font-bold"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
                                                {member.name}
                                             </a>
                                             ,{" "}
                                             <a
                                                href={member.link as string}
                                                className="text-mainRedunderline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
                                                {member.company}
                                             </a>{" "}
                                             {member.location && `(${member.location})`}
                                          </>
                                       ) : (
                                          <>
                                             <a
                                                href={member.linkedin[0]}
                                                className="text-mainRedunderline font-bold"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
                                                {member.name[0]}
                                             </a>{" "}
                                             and{" "}
                                             <a
                                                href={member.linkedin[1]}
                                                className="text-mainRedunderline font-bold"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
                                                {member.name[1]}
                                             </a>
                                             ,{" "}
                                             <a
                                                href={member.link as string}
                                                className="text-mainRedunderline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
                                                {member.company}
                                             </a>{" "}
                                             {member.location && `(${member.location})`}
                                          </>
                                       )}
                                       {" — "} {member.desc}{" "}
                                       {member.hyper && (
                                          <i>
                                             {'"'}
                                             <a href={member.hyper.link} className="text-mainRedunderline" target="_blank" rel="noopener noreferrer">
                                                {member.hyper.text}
                                             </a>
                                             {'"'}
                                          </i>
                                       )}
                                    </>
                                 </h2>
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               </section>
               <section className="mt-3">
                  <p className="mt-5">{t("pipelineSelectedCodealgo.p6")}</p>
                  <p className="mt-3">{t("pipelineSelectedCodealgo.p7")}</p>
                  <p className="mt-3">
                     <i>{t("pipelineSelectedCodealgo.p8")}</i>
                  </p>
                  <p className="mt-3">{t("pipelineSelectedCodealgo.p9")}</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default PipelineSelectedCodeAlgo;
