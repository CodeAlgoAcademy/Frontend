import Header from "@/components/press/Header";
import Navbar from "@/components/navbar/home/Navbar";
import React from "react";
import RelatedArticles from "@/components/press/RelatedArticles";
import ImagesContainer from "@/components/press/ImagesContainer";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import BlogTitle from "@/components/press/BlogTitle";
import Footer from "@/components/home/new-home/footer";

const PurePitchRally = () => {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body="CodeAlgo Academy wins $13,000 from land sharks!"
            title={`CodeAlgo Academy wins $13,000 from the PurePitch Rally`}
            image="/assets/blog/article1.jpg"
            date="October 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title="Just Funded Big ‘Pure Pitch’ winners swim with the sharks, earn thousands in cash on the spot"
               link="https://www.startlandnews.com/author/gwinoverfeltsteinmetz"
               by="Matthew Gwin, Nikki Overfelt Chifalu, and Channa Steinmetz"
               date="October 18, 2022"
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/article1-1.jpg"
               imageDetail="Dr. Brandy Archie, AskSAMIE, at the 2022 Pure Pitch Rally"
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="mt-6 flex-1">
                     <DropCapsParagraph
                        text="A winning afternoon at the Pure Pitch Rally is validation Dr. Brandy Archie’s healthtech accessibility app is providing connections
                  people actually need, she said."
                     />
                     <p className="mt-3">
                        <i className="text-[#444]">“That’s the most important thing to me,”</i> said Archie, founder of AskSAMIE.{" "}
                        <i className="text-[#444]">
                           “The funds are going to a good cause, but this lets me know that this new idea that I have is something that resonates with
                           people and something people can benefit from.”
                        </i>
                     </p>
                     <p className="mt-3">
                        AskSAMIE was the most-funded venture at Monday’s Pure Pitch Rally, taking home $20,000 to add to an 
                        <a
                           target={"_blank"}
                           rel="noopener noreferrer"
                           href="https://www.startlandnews.com/2022/07/asksamie/"
                           className="text-mainPink underline"
                        >
                           impressive year of fundraising
                        </a>{" "}
                        for the early stage tech startup.
                     </p>
                     <p className="mt-3">
                        An occupational therapist, Archie launched the AskSAMIE {"(Solving Accessibility with Mobile Innovative Equipment)"} platform
                        in January to expand the reach of her company{" "}
                        <a target={"_blank"} rel="noopener noreferrer" href="https://www.accessableliving.com/">
                           AccessAble Living 
                        </a>{" "}
                        beyond the KC metro area.
                     </p>
                     <p className="mt-3">
                        The app builds a curated digital cart of adaptive equipment for patients recovering from significant health events or medical
                        procedures, taking into account their specific physical needs and environmental constraints.
                     </p>
                  </div>
                  <div className="flex-[0.7]">
                     <ImagesContainer
                        image="/assets/blog/article1-2.jpg"
                        imageDetail="Dr. Brandy Archie, AskSAMIE, 2022 Pure Pitch Rally"
                        imageHeight={300}
                     />
                  </div>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-3.jpg"
                     imageDetail="Dr. Brandy Archie, AskSAMIE, 2022 Pure Pitch Rally"
                     imageHeight={450}
                  />
                  <p className="mt-5">
                     Archie founded AccessAble Living in 2017 to fill a gap that exists because insurance will not cover the costs of environmental
                     accommodations that would allow patients to remain in their homes while aging or recovering from serious medical events.
                  </p>
                  <p className="mt-5">
                     One hundred million homes in the United States are not aging-ready, Archie said, and 8 million older adults live in a home today
                     that they cannot fully access.
                  </p>

                  <RelatedArticles
                     link="https://www.startlandnews.com/2022/07/asksamie/"
                     title="Healthtech app bridges care access gap: Recovery takes time, but patients need mobility today"
                  />
                  <p className="mt-5">
                     Archie told the Pure Pitch Rally audience of “land sharks” — investors{" "}
                     {`(a who’s who of high-profile startup founders, backers and community members)`} who donate one or more $1,000 checks to the
                     pitcher{"(s)"} of their choice — that she will use the funding to help marketing efforts and hire staff to execute strategy.
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-4.jpg"
                     imageDetail="Serial founder Toby Rush announces his pick of the eight pitchers at the 2022 Pure Pitch Rally"
                     imageHeight={450}
                  />
                  <div className="mt-2 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[0.7]">
                        <ImagesContainer
                           image="/assets/blog/article1-5.jpg"
                           imageDetail="Karen Fenaroli, founder of the Pure Pitch Rally"
                           imageHeight={300}
                        />
                     </div>
                     <div className="mt-6 flex-1">
                        <p className="mt-3">
                           Many sharks cited a personal connection as the reason for their selection, which Archie said speaks to the pervasiveness of
                           the problem she hopes to solve.
                        </p>
                        <p className="mt-3">
                           <i className="text-[#444]">
                              “It personalizes what I’ve experienced in my career,” she said. “Everybody is impacted by this, but mostly only one or
                              two times, so you don’t have enough time to try to solve the problem. I am trying to do that.”
                           </i>
                        </p>
                        <p className="mt-3">
                           Seven fellow Kansas City tech startup entrepreneurs joined Archie on stage Monday, and each one walked away with thousands
                           of dollars to put toward their own venture. Additionally, Plexpod awarded one year of office space to all eight pitchers.
                           Up to $1 million in spot-cash funding and resources were to be doled out, from land shark checks and event sponsor
                           resources and prizes.
                        </p>
                        <p className="mt-3">
                           Monday’s event marked the seventh edition of the pitch competition, and the first hosted at the Burns and McDonnell campus.
                           Karen Fenaroli, founder of the event, announced that the eighth annual Pure Pitch Rally is already scheduled for Oct. 16,
                           2023.
                        </p>
                     </div>
                  </div>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-6.jpg"
                     imageDetail="Matt Gunter, Routine Success, 2022 Pure Pitch Rally"
                     imageHeight={500}
                     title="Routine Success"
                     link="https://sites.google.com/view/routine-success/home"
                     subtitle=", Matt Gunter: $16,000"
                  />
                  <p className="mt-5">
                     The winner of the $3,000 People’s Choice Award, Routine Success is a mobile app that empowers neurodiverse teens and young adults
                     to achieve independence.
                  </p>
                  <p className="mt-3">
                     <i className="text-[#444]">
                        {
                           '"Neurodiverse individuals and their parents, mentors, or teachers can create fully customizable routines that help them develop organizational, social, and executive functioning skills. Gunter was inspired to create the platform as a result of raising his 17-year-old son, Peter, who is neurodiverse,"'
                        }
                     </i>{" "}
                     he said.
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-7.jpg"
                     imageDetail="Rick Macartney, Hermes LST, 2022 Pure Pitch Rally"
                     imageHeight={500}
                     title="Hermes"
                     link="https://www.hermeslst.com/"
                     subtitle=", Rick Macartney: $15,000"
                  />
                  <p className="mt-5">
                     Hermes is a platform that aims to reduce inefficiencies in the vehicle registration and titling process by offering a universally
                     compliant packet and a nationwide network of agents to deliver documents to local DMV offices.
                  </p>
                  <p className="mt-3">
                     Macartney said 40 million vehicles had to be registered and titled in 2021, and promised that Hermes would allow these
                     transactions to be completed in less than a quarter of the current industry average time.
                  </p>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-8.jpg"
                     imageDetail="Triumfia Fulks, codeAlgo Academy, 2022 Pure Pitch Rally"
                     imageHeight={500}
                     title="CodeAlgo Academy"
                     link="https://www.codealgoacademy.com/"
                     subtitle=", Triumfia Houmbie Fulks: $13,000"
                  />
                  <p className="mt-5">
                     CodeAlgo Academy uses gamification to teach coding skills to students in kindergarten through eighth grade, so they can develop
                     programming skills and analytical thinking before reaching high school, and then be better prepared to enter the workforce after
                     graduation.
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-9.jpg"
                     imageDetail="Courtney Younglove, Health Partners, MD, 2022 Pure Pitch Rally"
                     imageHeight={500}
                     title="Health Partners MD"
                     link="https://heartlandweightloss.com/about-us/"
                     subtitle=", Dr. Courtney Younglove: $11,000"
                  />
                  <p className="mt-5">
                     Health Partners MD provides a disease management platform to employers so they can work with their employees to treat obesity as
                     a disease and reduce healthcare costs. The platform connects employers with on-site and near-site clinics that target obesity and
                     related conditions. 
                  </p>
                  <p className="mt-3">
                     Younglove’s own clinic in Overland Park specializes in weight loss treatment, and that work prompted her to found Health Partners
                     MD in order to “change the weight of the world.”
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-10.jpg"
                     imageDetail="Meredith McAllister, Marma, 2022 Pure Pitch Rally"
                     imageHeight={500}
                     title="Marma"
                     link="https://www.marmanutrition.com/"
                     subtitle=", Meredith Evans McAllister: $9,000"
                  />
                  <p className="mt-5">
                     Marma is a platform that empowers women with personalized nutrition guidance during pregnancy and the birthing years, so they can
                     feel confident and nourished as they transition to motherhood. 
                  </p>
                  <p className="mt-3">
                     McAllister’s work as a nutritionist and personal pregnancy experience inform her work. She noted that 95 percent of pregnant and
                     postpartum people — including herself — are nutritionally deficient, which can lead to a higher risk of illness, infertility, and
                     birth complications.
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-11.jpg"
                     imageDetail="Nedra Barr, Spyder, 2022 Pure Pitch Rally"
                     imageHeight={500}
                     title="Spyder"
                     link="https://www.spyderloop.com/"
                     subtitle=", Nedra Barr: $8,000"
                  />
                  <p className="mt-5">
                     Spyder is a “self-service” global platform that uses technology to automate the financial supply chain and provide companies with
                     secure data and document management. Companies in the insurance and financial services industries can then reduce their
                     technology spending and access more accurate insights in order to make smarter business decisions.
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/article1-12.jpg"
                     imageDetail="Robert Goss, YAT, 2022 Pure Pitch Rally"
                     imageHeight={500}
                     title="YAT"
                     link="https://yat.ai/"
                     subtitle=", Robert Goss: $2,000"
                  />
                  <p className="mt-5">
                     Driven by proprietary algorithms, YAT Augmented Logistics connects brokers in the trucking and transportation industry with a
                     “one-stop shop” platform that gives them pricing and capacity management tools, reducing supply chain fragmentation.
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default PurePitchRally;
