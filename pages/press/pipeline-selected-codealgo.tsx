import Header from "@/components/press/Header";
import Navbar from "@/components/navbar/home/Navbar";
import React from "react";
import RelatedArticles from "@/components/press/RelatedArticles";
import ImagesContainer from "@/components/press/ImagesContainer";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import BlogTitle from "@/components/press/BlogTitle";
import Footer from "@/components/home/new-home/footer";

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
      name: "•	Nic Bianchi",
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
      desc: " An industry leader in mobile apps, Bluetooth technology, and proprietary Beacon Reader technology that help to drive the “Internet of Things” (IoT) industry for a range of industries and clients. ",
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
      desc: "An interactive immersive media company that specializes in biometrically controlled content powered by the user’s wearables. In five peer-reviewed journals, Healium has been shown to reduce anxiety and improve mood in as little as four minutes.",
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
      desc: "The world’s first mood improving digital companion: detects sadness and uplifts with conversation, memories and video visits from friends and family.",
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
      name: "Molly O’Neil",
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
      company: "The Thread: Women’s Leadership Collective",
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
      desc: "Unlocking enterprise data’s monetary value — using an automated proprietary approach — to allow companies to monetize their enterprise data assets.",
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
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body="Pipeline has extended an exclusive invitation to CodeAlgo Academy to join their Pathfinder program, marking a significant milestone in our journey toward excellence!"
            title={`Pipeline has selected CodeAlgo Academy to join their Pathfinder`}
            image="/assets/blog/article2.jpg"
            date="January 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title="Meet the Midwest’s future serial entrepreneurs: Pipeline reveals 2023 fellowship, Pathfinder cohort"
               link="https://www.startlandnews.com/author/tfelts/"
               by="Tommy Felts"
               date="January 31, 2023"
            />
            <ImagesContainer imageHeight={450} image="/assets/blog/article2-1.jpg" imageDetail="" />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="mt-6 flex-1">
                     <p className="mt-3">
                        2023 Pipeline fellows: top, Audra Dinell, The Thread: Women’s Leadership Collective; Scott Campbell, KBS Service; Tashara
                        Earl, Shades of Color; Robert Disbenger, GovBuilt; middle, Eliot Arnold, Mood Spark AI; Megan Orear, Celerity Enterprises; Lee
                        Zuvanich, Appsta; Sarah Hill, Healium; Jon Broek, Tenfold Security; bottom, Jonathan Ruiz, EB Systems; Mandy Shoemaker,
                        Dementia Engagement Solutions; Nic Bianchi, Bianchi Candle Co; Molly O’Neil, Superb
                     </p>
                     <p className="mt-3">
                        Nearly 30 of the region’s most promising founders now have access to an industry-agnostic network that focuses solely on
                        serial high-growth entrepreneurs — without taking equity in the startups it serves, said Melissa Vincent.
                     </p>
                  </div>
                  <div className="flex-[0.7]">
                     <ImagesContainer image="/assets/blog/article2-3.jpg" imageDetail="Melissa Vincent, Pipeline Entrepreneurs" imageHeight={300} />
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-5">
                     Pipeline Entrepreneurs on Tuesday officially announced its new roster of high-profile fellows, as well as members of its latest
                     Pipeline Pathfinder cohort, which provides programming specifically for minority, women, and rural based entrepreneurs.
                  </p>
                  <p className="mt-5">
                     <i>
                        Click{" "}
                        <a
                           className="text-mainPink underline"
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
                     <i className="#444">
                        {" "}
                        “Our hope for the future with these two cohorts is that as they go through the program there continues to be an amazing
                        continuum of resources specifically for high-growth entrepreneurs who are in the Midwest,”
                     </i>{" "}
                     said Vincent, executive director of Pipeline.{" "}
                     <i className="#444">
                        “And because we have that unique purpose, when you see these new cohorts going through the program, it’s incredibly exciting
                        to think about the impact that they’re going to have not just economically on the region but also because they carry forward
                        that Pipeline spirit.”
                     </i>
                  </p>
               </section>
               <section className="mt-3">
                  <ImagesContainer image="/assets/blog/article2-2.jpg" imageDetail="2023 Pipeline Fellows and Pathfinders" imageHeight={450} />
                  <div className="mt-5">
                     <h3 className="mb-3 font-bold">New members of Pipeline’s elite fellowship class include: </h3>
                     <ul className="flex flex-col gap-y-4">
                        {newMembers.map((member, index) => {
                           return (
                              <li key={index} className="block">
                                 <h2 className="text-[1rem]">
                                    <>
                                       {index + 1}.{"  "}
                                       <a
                                          href={member.linkedin}
                                          className="font-bold text-mainPink underline"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                       >
                                          {member.name}
                                       </a>
                                       ,{" "}
                                       <a href={member.link} className="text-mainPink underline" target="_blank" rel="noopener noreferrer">
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
                     imageDetail={
                        <>
                           <span className="font-bold">2023 Pipeline Pathfinder cohort: </span>
                           top, Dr. Brandy Archie, AskSAMIE; Brian Roberts, Black Pantry KC; Chelsey M, KC Black Owned; JQ Sirls, PageMaster; middle,
                           LaToya Bass, Alignment Business Solutions; Shapree Marshall, A Traveled Path Homes; Melissa Weed, Honey Does LLC; Jenifer
                           Fennell, J.R. Allen Consulting; bottom, Sedric Hibler and Triumfia Houmbie Fulks, CodeAlgo Academy; Tam Tran and Roger Ngo,
                           Data Appraisal
                        </>
                     }
                  />
                  <div className="mt-5">
                     <h3 className="mb-3 font-bold">Members of the Pathfinder cohort include: </h3>
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
                                                className="font-bold text-mainPink underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
                                                {member.name}
                                             </a>
                                             ,{" "}
                                             <a
                                                href={member.link as string}
                                                className="text-mainPink underline"
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
                                                className="font-bold text-mainPink underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
                                                {member.name[0]}
                                             </a>{" "}
                                             and{" "}
                                             <a
                                                href={member.linkedin[1]}
                                                className="font-bold text-mainPink underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
                                                {member.name[1]}
                                             </a>
                                             ,{" "}
                                             <a
                                                href={member.link as string}
                                                className="text-mainPink underline"
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
                                             <a
                                                href={member.hyper.link}
                                                className="text-mainPink underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                             >
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
                  <p className="mt-5">
                     The two new groups of fellows and <i>“Pathfinders”</i> gathered Jan. 26 in Kansas City for New Fellow Orientation to experience
                     their first taste of Pipeline together before being split apart throughout their fellowship year to go through their own
                     development in their respective cohorts.
                  </p>
                  <p className="mt-3">
                     Many of the fellows and Pathfinders expressed a similar sentiment of eagerness and readiness to be in their position, Vincent
                     said, whereas others expressed how alert and grateful they were to be sitting amongst some of the best in the Midwest.
                  </p>
                  <p className="mt-3">
                     <i>
                        “Pipeline is excited to be able to create programming that bridges the gap between existing resources while also collaborating
                        and partnering with other community builders to create an equal playing field within our entrepreneurial ecosystem,”
                     </i>{" "}
                     said Vincent.{" "}
                     <i>
                        {" "}
                        “The goal being to continue to build our network and provide the best resources, programming, and opportunities possible to
                        both our Pipeline Fellowship and the Pathfinder Program.”
                     </i>
                  </p>
                  <RelatedArticles
                     link="https://www.startlandnews.com/2022/05/pipeline-innovators-gala-2022/"
                     title="Pipeline Innovators gala adds glamour, top honors back into the mix for celebration of fellows"
                  />
                  <p className="mt-3">
                     Pipeline boasts a community of 180 members, which in the fellowship’s 16 years have generated more than $2.5 billion in revenues;
                     employed more than 4,000 people in Kansas, Nebraska and Missouri; are doing business in more than 85 countries; and have raised
                     more than $900 million in outside capital since joining Pipeline, according to the fellowship.
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default PipelineSelectedCodeAlgo;
