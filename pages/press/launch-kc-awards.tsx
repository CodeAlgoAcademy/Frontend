import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import RelatedArticles from "@/components/press/RelatedArticles";
import React from "react";

export default function LaunchKcAwards() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body=""
            title={`LaunchKC awards $300K: Six new startups enter the winners’ circle with KC investments`}
            image="/assets/blog/launch-kc-award.jpg"
            date="November 2023"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="LaunchKC awards $300K: Six new startups enter the winners’ circle with KC investments" date="November 15, 2023" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/launch-kc-award.jpg"
               imageDetail="2023 LaunchKC winners: Steven Coen, SaRA Health; Jannae Gammage, Foresight; Neelima Parasker, Lotus TMS; Learie Hercules, Heft IQ; Holly Andra Small, Lotus TMS; Triumfia Houmbie Fulks and Sedric Hibler, CodeAlgo Academy; Ryan Cowdrey and Blake Herren, Raven Space Systems; photo by Mark McDonald, Downtown Council"
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text="Emerging entrepreneurs don’t need Silicon Valley to launch or scale their startups, said Holly Andra Small, leader of one of six companies announced Tuesday as $50,000 winners in LaunchKC’s grants competition. ." />
                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">
                           “We were so excited,” said Small, reflecting Tuesday night on the just-revealed grant funding for her intermodal trucking
                           startup, Lotus TMS. “We’re ready to make a big impact, and Kansas City has been a great place to launch, no pun intended.”
                        </p>
                        <p className="mt-5">
                           “We see Kansas City as the place where transportation and logistics tech is going to be centered,” added Small, who
                           co-founded the company with veteran tech entrepreneur Neelima Parasker.
                        </p>
                        <p className="mt-5">
                           LaunchKC on Tuesday hosted its Libations + Liftoff event at J. Rieger & Co. distillery, publicly announcing the six winners
                           of $50,000 non-dilutive grants — startups that ranged from 3D printing for space cargo to AI and education tech. The
                           gathering was among the first marquee events for the 2023 edition of Global Entrepreneurship Week-Kansas City.
                        </p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/launch-kc-award-1.jpg"
                           imageDetail={
                              "Neelima Parasker and Holly Andra Small, Lotus TMS, at the 2023 LaunchKC reveal celebration; photo by Tommy Felts, Startland News"
                           }
                        />
                     </div>
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-5">
                     “Today’s startups are tomorrow’s job creators and economic engines,” said Jim Erickson, director of strategic initiatives for the
                     Economic Development Corporation of Kansas City, Missouri (EDCKC), which runs LaunchKC alongside the Downtown Council.{" "}
                  </p>
                  <p className="mt-5">
                     LaunchKC’s grant winner selection process included LaunchKC staff, industry experts, entrepreneurs, past grant recipients, and
                     business leaders, and featured three rounds of judging, conducting in-person interviews with the 13 finalists.
                  </p>
                  <p className="mt-5">
                     The six winning startups each received grants and access to such comprehensive support services as office space, technical
                     assistance, and networking opportunities.
                  </p>
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-2.jpg"
                     imageDetail="Triumfia Houmbie Fulks, CodeAlgo Academy, LaunchKC; photo by Tommy Felts, Startland News"
                     imageHeight={450}
                  />
                  <p className="mt-5">
                     <Link text="CodeAlgo Academy (Triumfia Houmbie Fulks)" link="https://www.linkedin.com/in/triumfia-houmbie-fulks-3842a1179/" />{" "}
                     Kansas City, Missouri — The first Black female led 3D Computer Science gaming platform in Missouri, teaching K-8 students how to
                     code, making learning fun and tailored.
                  </p>
                  <p className="mt-5">
                     “CodeAlgo allows students to stay ahead and be ahead by providing them real coding language through gamification,” said Fulks,
                     co-founder of CodeAlgo. “Studies show that 90 percent of Americans spend about eight hours a week playing video games. If they
                     could only spend a fraction of that on CodeAlgo, they can learn logical skills.”
                  </p>

                  <p className="mt-5">
                     “The LaunchKC grant is going to allow us to bring over 400 people currently on our waitlist, and also make our platform available
                     to hundreds and thousands of users here in Missouri.”
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-3.jpg"
                     imageDetail="Jannae Gammage, Foresight, LaunchKC; photo by Tommy Felts, Startland News"
                     imageHeight={450}
                  />
                  <p className="mt-5">
                     <Link text="Foresight (Jannae Gammage)" link="https://www.linkedin.com/in/jannaegammage/" /> Kansas City, Missouri — A tech
                     platform featuring an AI-powered lending assistant specially trained to streamline administrative work across the lending cycle,
                     including evaluation, eligibility and document verification, macro and micro economic data and more.
                  </p>
                  <p className="mt-5">
                     Gammage is currently tackling a big problem with Foresight: addressing capital access issues for small businesses aiming to
                     bridge gaps with vendors. She noted that 74 percent of submitted applications are incomplete or incorrect, revealing a large
                     knowledge gap.
                  </p>

                  <p className="mt-5">
                     “We are super proud to finally come out of stealth mode and unveil the Foresight rollout to around 200 banks over the next six
                     months which represents around $100 million that will be poured into small businesses all over the nation,” said Gammage, founder
                     of Foresight.
                  </p>

                  <p className="mt-5">
                     “We’re super grateful for LaunchKC as the $50,000 will allow us to focus on bringing $10 million of that right into our backyard
                     Kansas City.”
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-4.jpg"
                     imageDetail="Learie Hercules, Heft IQ, LaunchKC; photo by Tommy Felts, Startland News"
                     imageHeight={500}
                  />

                  <p className="mt-5">
                     <Link text="Heft IQ (Learie Hercules)" link="https://www.linkedin.com/in/leariehercules/"></Link>, Leawood, Kansas — An AI-driven
                     supply chain advanced analytics platform.
                  </p>
                  <p className="mt-5">
                     “We are Heft IQ. We do all the heavy lifting, all of the AI driven inventory optimization, and everything else that Amazon.com
                     uses to compete with your brand,” said Hercules, founder of Heft IQ.{" "}
                  </p>

                  <p className="mt-5">
                     “We’re looking for brands, we’re looking for other logistics companies, and we’re looking for investors who are aligned with our
                     vision to build the operating system of the supply chain right here in Kansas.”
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-5.jpg"
                     imageDetail="Holly Andra Small, Lotus TMS, LaunchKC; photo by Tommy Felts, Startland News"
                     imageHeight={500}
                  />
                  <p className="mt-5">
                     <Link text=" Lotus TMS (Holly Andra Small, Neelima Parasker)" link="https://www.linkedin.com/in/hollyandra/"></Link> Overland
                     Park, Kansas — A women-owned Cloud-based Transportation Management Software created by and for draymen. Easily customize tables,
                     tags, and permissions with an intuitive interface to streamline and transform trucking operations.
                  </p>
                  <p className="mt-3">
                     “Our incredible team have created a robust state of the art streamlined, easy to use transportation management software for
                     intermodal trucking that both the 27-year-old and the 77-year-old in the office know how to use and love to,” said Small.
                  </p>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-6.jpg"
                     imageDetail="Blake Herren, Raven Space Systems, LaunchKC; photo by Tommy Felts, Startland News"
                     imageHeight={500}
                  />
                  <p className="mt-5">
                     <Link text=" Raven Space Systems (Blake Herren, Ryan Cowdrey)" link="https://www.linkedin.com/in/bherren/" /> Kansas City, Kansas
                     — Creating the first entirely 3D printed reentry capsules for affordable and accessible return of cargo from space.
                  </p>
                  <p className="mt-5">
                     “What I’m holding in my hand is the world’s first 3D printed object that would survive free entry from space,” said Herren,
                     co-founder of Raven Space Systems.{" "}
                  </p>
                  <p className="mt-5">
                     “This technology is a breakthrough in composite manufacturing, and we will be scaling it up in the next year,” he said.
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-7.jpg"
                     imageDetail="Steven Coen, SaRA Health, LaunchKC; photo by Tommy Felts, Startland News"
                     imageHeight={500}
                  />
                  <p className="mt-5">
                     <Link text="SaRA Health (Steven Coen)" link="https://www.linkedin.com/in/stevenmcoen/" /> Kansas City, Missouri — A “stress-free”
                     and “simple” platform turns practice leaders and owners into heroes for their providers and patients while improving the
                     viability of their businesses.
                  </p>
                  <p className="mt-3">
                     “At SaRA, we help physical therapy practices get their patients on a steeper road to recovery,” said Coen, co-founder of SaRA
                     Health. “They do it quicker. They do it at a lower total cost to the system, while still providing better margin to the PT
                     practice.”
                  </p>
                  <p className="mt-3">
                     “Today, we have 54 across 30 states including three of the largest physical therapy practices in the US,” said Coen. “Thanks to
                     this LaunchKC grant that’s going to allow us to further build out our product and our sales.”
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/launch-kc-award-8.jpg"
                     imageDetail="2023 LaunchKC staff and winners; photo by Mark McDonald, Downtown Council"
                     imageHeight={500}
                  />
                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-1">
                        <p className="mt-5">LaunchKC does not take equity in the companies it supports, its leaders emphasized.</p>
                        <p className="mt-5">
                           LaunchKC has a dual mission: fostering the growth of existing startups in Kansas City, Missouri (KCMO), and attracting
                           early-stage companies with high growth potential, and with this cohort, they are actively doing just that.
                        </p>
                        <p className="mt-5">
                           “We are proud that LaunchKC companies have created close to 1,000 jobs and attracted over $400 million of follow-on
                           investment for Kansas City,” said Erickson.{" "}
                        </p>
                        <p className="mt-5">
                           These six new winners join LaunchKC’s portfolio, adding to the 109 companies funded since 2015. Sixty-seven percent of
                           these supported businesses are led by females and/or minorities.
                        </p>
                     </div>
                     <div className="flex-[.7]">
                        <ImagesContainer
                           image="/assets/blog/launch-kc-award-9.jpg"
                           imageDetail="LaunchKC attendees celebrate winners at the Libations + Liftoff event at J. Rieger & Co. distillery; photo by Nikki Overfelt Chifalu, Startland News"
                           imageHeight={300}
                        />
                     </div>
                  </div>
               </section>

               <section className="mt-3 hidden gap-2 lg:flex">
                  {["launch-kc-award-10.jpg", "launch-kc-award-11.jpg", "launch-kc-award-12.jpg"].map((img, index) => {
                     return (
                        <img
                           key={index}
                           src={`/assets/blog/${img}`}
                           className="h-[500px]  flex-1 cursor-pointer object-cover object-top hover:opacity-90"
                        />
                     );
                  })}
               </section>

               <section className="mt-3">
                  <p className="mt-5">
                     “Every entrepreneur we work with has the potential to build the next big headquarters in KC,” said Becca Castro, strategic
                     initiatives manager at EDCKC and the lead organizer of LaunchKC.
                  </p>
                  <p className="mt-5">
                     “One of our focuses at EDCKC is to support these growing early-stage companies so they can have the greatest economic impact in
                     our community for years to come.”
                  </p>

                  <i className="my-5 block">
                     Check out a brief photo gallery from the LaunchKC event below; photos by Tommy Felts and Nikki Overfelt Chifalu, Startland News
                  </i>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                     {[
                        "launch-kc-award-13.jpg",
                        "launch-kc-award-14.jpg",
                        "launch-kc-award-15.jpg",
                        "launch-kc-award-16.jpg",
                        "launch-kc-award-17.jpg",
                        "launch-kc-award-18.jpg",
                        "launch-kc-award-19.jpg",
                        "launch-kc-award-20.jpg",
                     ].map((img, index) => {
                        return (
                           <img
                              key={index}
                              src={`/assets/blog/${img}`}
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
