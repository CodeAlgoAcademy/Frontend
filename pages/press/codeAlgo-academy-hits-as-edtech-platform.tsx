import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";



export default function CodeAlgoAcademyEdtechPlatform () {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="CodeAlgo Academy hits classrooms as the edtech platform (and founder) proves independence" date=" February 03, 2026" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/codealgopoto.jpg"
               imageDetail="Triumfia Houmbie Fulks, CodeAlgo Academy; photo by Taylor Wilmore, Startland News

"
               className="lg:!object-cover"
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text="After years of putting the building blocks together, Triumfia Houmbie Fulks’ edtech startup has officially entered the game, the founder said, noting she launched the coding platform into area schools this fall." />
                  <p className="mt-5">
                     The move pushes Kansas City-based CodeAlgo Academy beyond beta and into real K-8 classrooms where students are actively solving problems, creating games, and shaping how the product evolves, Fulks said. 
                    Its rollout followed a long stretch of development and testing, with the founder focused on building a platform that could operate smoothly once it reached teachers and students.
                     
                  </p>
                  <p>
                    “That was a long time coming,” said Fulks. “Prior to having an official rollout, we were required to send [facilitators directly into classrooms] for many years.”
                    What makes this phase different: independence. The platform no longer requires engineers or facilitators to be present, giving teachers the ability to use it directly in their classrooms.
                  </p>
                  <p>
                    “We’re getting a lot of positive feedback, and it’s been very beneficial,” said Fulks.
                    The launch also reflects a new chapter for Fulks, who is now leading CodeAlgo Academy as its sole founder.
                  </p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <h2>
                            Early classroom wins add up
                        </h2>
                        <p className="mt-5">
                          CodeAlgo Academy began rolling out to schools in September and has steadily expanded its footprint across the Kansas City area.
“We are working with two districts right now, and we also have two charter schools in Kansas City,” said Fulks, noting about eight schools total are using the platform.
                        </p>
                        <p className="mt-5">
                          Student engagement followed quickly. In just a few months, activity on the platform added up, giving the team early confirmation that students weren’t just logging in, they were staying engaged.

“Since we launched from September to date, we’ve had over 10,000 problems solved on CodeAlgo by the students,” said Fulks. “That alone tells you how active people are on the platform.”
                        </p>
                        <p className="mt-5">
                           Teachers are also noticing changes in how students approach learning, particularly around logic and persistence.
                        </p>
                        
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/press/CodeAlgo-Academy-logo.webp"
                           imageDetail={""}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p className="mt-5">
                          One of the biggest things we’re hearing from schools is that they’re seeing the platform help their students learn at much faster rates compared to their peers,” said Fulks. “It provides students with the skill sets they need to think critically and solve complex problems.”
                            Even outside of coding lessons, educators are seeing added benefits.
                            “There are math elements when you’re doing coding, and that’s something the schools are noticing,” said Fulks.
                        </p>
                  </section>

                  <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/press/demonstrates.jpg"
                     imageDetail="Triumfia Houmbie Fulks demonstrates CodeAlgo Academy gameplay; photo by Taylor Wilmore, Startland News."
                     imageHeight={450}
                  />
                  <h1>
                  Where creativity meets code
                  </h1>
                  <p className="mt-5">
                    At the heart of CodeAlgo Academy is the belief that students learn best when they’re allowed to explore and build. The platform gives young people space to move beyond structured challenges and into creator mode.
                  </p>
                  <p className="mt-5">
                    “They’re able to create their own levels and publish them so anyone else can play,” said Fulks.
                    The experience is divided into two primary learning paths: Kindergarten through sixth grade students focus on algorithmic thinking, while middle school students transition into immersive Python coding.
                  </p>
                  <p className="mt-5">
                   Students have been vocal about what they enjoy and what they want improved.
                    “We’re getting feedback from them, and the goal is to take that feedback and iterate,” she said. “That will always be a constant process.”
                  </p>
                  <p className="mt-5">
                 That creativity is also shaping new coming content. Fulks plans to release a World Cup-themed soccer game inside CodeAlgo Academy timed with the <a href="https://fifaworldcup26.hospitality.fifa.com/" className="text-green">FIFA World Cup</a>, allowing players across the world to learn and play together on the platform.
                  </p>

               </section>
                  <section className="mt-3">
                   <ImagesContainer
                     image="/assets/blog/press/Triumfia-Houmbie-Fulks-CodeAlgo-Academy.jpg"
                     imageDetail="Triumfia Houmbie Fulks, CodeAlgo Academy; photo by Taylor Wilmore, Startland News."
                     imageHeight={450}
                  />
                  <h1>
                  Built to run on its own
                  </h1>
                  <p className="mt-5">
                   For Fulks, one of the most important shifts has been watching the platform function independently in classrooms.
                “The biggest point for us was getting it to a place where it no longer requires a human presence,” said Fulks. “That was the biggest ‘aha’ moment.”
                  </p>
                  <p className="mt-5">
                    Now operating lean, CodeAlgo Academy is focused on expanding school partnerships while keeping development responsive. The team is also thinking about access beyond school walls, with plans for parents to eventually download the app and engage alongside their children.
                  </p>
                  <p className="mt-5">
                   “We want to democratize coding so that even if your school is not offering CodeAlgo today, your children can still access it by downloading the app,” said Fulks.
                  </p>
                  <p className="mt-5">
                 Fulks sees the current phase as foundational rather than finished, with more refinement and expansion ahead as the team continues learning from schools and students.
                  </p>
                  <p className="mt-5">
              “I feel like this is just the tip of the iceberg,” she said. “But at least we’re going somewhere that we’ve always wanted to be.”
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}

