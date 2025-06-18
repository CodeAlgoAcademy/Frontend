import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
// import Link from "@/components/press/Link";
// import RelatedArticles from "@/components/press/RelatedArticles";
import React from "react";

export default function LincSucessCoding() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <Header
            body=""
            title={`Success code: LINC student create online games, spark future aspirations`}
            image="/assets/blog/press/linc.png"
            date="May 2025"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="LINC student create online games, spark future aspirations" date="May 22, 2025" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/lincgirl.png"
               imageDetail="It was an important opportunity, said LINC Caring Communities Coordinator Darryl Bush, for the LINC students at King to see successful people who look like them."
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text="After some four months of weekly after-school workshops, demonstration day arrived for a dozen LINC students at King Elementary School.

                  In turn at the front of the room, students each put their avatars into play on the big screen, sending their creations running and leaping through alien worlds out of their own imaginations. ." />
                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">
                           “And then, a little enticement.” Sedric Hibler, one of the instructors from CodeAlgo Academy in Kansas City, put a question back on the students: 
                           How much money do you think you can make as a coder creating games?
                        </p>
                        <p className="mt-5">
                           “The fact that the students had kept working over several months at learning about the role of computer coding — and 
                           that they were now curious of its rewards as a career — is exactly what Hibler and the partners who brought the program to LINC wanted to hear.”
                           The answer, of course, was millions of dollars.
                        </p>
                        <p className="mt-5">
                           “So keep on building,” Hibler said. “That’s how you get good. That’s how you associate with the possible things you can do for money.”
                           Hibler and his CodeAlgo co-founder Triumfia Fulks taught the class at King with Dadja Batale. of Phierx.Tech,
                            with funding support from the National Alliance of Faith and Justice and its POP (Pen or Pencil) mentoring program.
                            It was an important opportunity, said LINC Caring Communities Coordinator Darryl Bush, for the LINC students at King to see successful people who look like them.
                        </p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/press/linclass.png"
                           imageDetail={
                              "“For the kids to see three Black facilitators — all three of them engineers — gives them positive role models,"
                           }
                        />
                     </div>
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-5">
                     “Bush said. “The sooner we can get them to know the scholarships that are available and the opportunities available, the better.”
                     These are the kind of collaborations that fit the mission of the National Alliance of Faith and Justice, said the alliance’s national coordinator, 
                     Dr. Janice Cade.{" "}
                  </p>
                  <p className="mt-5">
                     Cade worked with the alliance’s Kansas City POP (Pen or Pencil) liaison Phyllis Ragsdale to pilot the opportunity here. 
                     Kansas City Public Schools, with the district’s manager of student experiences, Zandra Winfield, teamed up with LINC to bring it all together after school at King.
                  </p>
                  <ImagesContainer
                     image="/assets/blog/press/lincboy.png"
                     imageDetail="“You can see the progress” of the students, Ragsdale said. “You can see how they became more autonomous.”"
                     imageHeight={450}
                  />
                  <p className="mt-5">
                     {/* <Link text="CodeAlgo Academy (Triumfia Houmbie Fulks)" link="https://www.linkedin.com/in/triumfia-houmbie-fulks-3842a1179/" />{" "} */}
                    Cade, Ragsdale and WInfield were all on hand for the culmination of the pilot, watching the presentations as the students received their CodeAlgo Academy certificates.
                  </p>
                  <p className="mt-5">
                     “CodeAlgo used the Roblox game creation system to give the class of beginner designers a taste of what’s possible, Hibler said.”
                     They get a glimpse of the Python coding language as they start building computer literacy. And all along the way, he said, “they get to learn problem-solving.”
                     “The kids were focused,” Bush said. They’re getting the kind of tools and inspiration that will lead them to a future where they are “financially independent.”
                  </p>
               </section>

               {/* <section className="mt-3">
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
               </section> */}

               <section className="mt-3">
                  <i className="my-5 block">
                     Check out a brief photo gallery from the LaunchKC event below; photos by Tommy Felts and Nikki Overfelt Chifalu, Startland News
                  </i>

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
