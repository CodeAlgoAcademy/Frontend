import Footer from "@/components/home/Footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import RelatedArticles from "@/components/press/RelatedArticles";
import React from "react";

export default function StartupsToWatch() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff]">
         <Navbar />

         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title="2024 Startups to Watch: CodeAlgo Academy gamifies coding to build equity into new wave of software engineers"
               date="November 15, 2023"
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/2024-startups-to-watch.jpg"
               imageDetail="Sedric Hibler and Triumfia Houmbie Fulks, CodeAlgo Academy"
            />
            <i>
               Editor’s note: Startland News editors selected 10 Kansas City scaling businesses to spotlight for its annual Startups to Watch list.
               Now in its ninth year, this feature recognizes founders and startups that editors believe will make some of the biggest, most
               compelling news in the coming 12 months. The following is one of 2024’s companies.
            </i>
            <main className="mt-6">
               <section className="my-4">
                  <DropCapsParagraph text="When Triumfia Houmbie Fulks noticed a lack of Black and female software engineers, it gave the CodeAlgo Academy co-founder pause, she said. " />
                  <p className="mt-3">
                     “You start asking yourself, why aren’t there a lot of us in this field that is so lucrative — you can literally start making six
                     figures right out of high school; Are people just not pursuing it?” asked Fulks.
                  </p>
               </section>
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="flex-[.75]">
                     <p>
                        <Link link="https://codealgoacademy.com/" text="CodeAlgo Academy" /> uses gamification to teach coding skills to students in
                        kindergarten through eighth grade, so they can develop their technology literacy and enter the workforce better prepared for
                        STEM careers.
                     </p>

                     <p className="mt-3">
                        With the beta platform launched this year, Fulks and co-founder{" "}
                        <Link link="https://www.linkedin.com/in/sedric-hibler/" text="Sedric Hibler" /> aim to dispel misconceptions surrounding
                        coding—such as the belief that the field is overly challenging, tedious, and that individuals lack access to coding platforms
                        that are user-friendly and easy to use.
                     </p>

                     <p className="mt-3">
                        “We decided to create CodeAlgo to bridge that gap and enable more underrepresented people to enter the field, providing them
                        with the opportunity to secure an internship or job right out of high school,” said Fulks.
                     </p>

                     <p className="mt-3">
                        Both founders feel lucky for their own long-term career growth in software engineering, and want to extend that success in
                        STEM career paths to others, they said
                     </p>

                     <p className="mt-3">
                        “Being an immigrant in the U.S. and searching for a job after graduation with a non-STEM degree can be quite challenging,”
                        said Fulks. “The chances of securing something like that are very slim.”
                     </p>

                     <p className="mt-3">
                        Last-minute pivoting to pursue a STEM degree without a mentor or coach, Fulks taught herself coding to secure a job in
                        software engineering. Recognizing the challenges she faced, Fulks aspires to streamline the path to success.
                     </p>

                     <p className="mt-3">
                        “We want to ensure that we provide opportunities to youth so they can see it as a viable path. We know not everyone can be a
                        software engineer, but let’s broaden the perspective,” said Hibler.
                     </p>

                     <p className="mt-3">
                        Fulks challenges the idea that coding is inherently difficult, she said, emphasizing that, like any new skill, patience is
                        crucial in the learning process.
                     </p>

                     <p className="mt-3">“What you don’t know is always going to be hard because you don’t know anything about it,” she said.</p>

                     <p className="mt-3">
                        Because of the startup’s focus on youth, particularly middle school-aged students, Fulks believes it’s important to avoid
                        traditional coding’s intimidating nature, where a combination of a bunch of random-seeming letters and instructions might
                        deter young learners.
                     </p>

                     <p className="mt-3">
                        “I can see a kid getting bored with it pretty quickly. So how do we make that fun and engaging? That’s how the gamification
                        came into play,” said Fulks.
                     </p>

                     <p className="mt-3">
                        With CodeAlgo Academy, the duo developed a more accessible approach to coding education to make it more inclusive, and also
                        fun to play for K-8 students.
                     </p>
                  </div>
                  <div className="flex-[.25]">
                     <img src="/assets/blog/2024-startups-to-watch-1.jpg" className="h-[300px] w-full object-contain object-center" alt="" />

                     <i className="mt-2 block">
                        <b>Elevator pitch</b>: CodeAlgo began with a simple idea: Early exposure to programming is crucial to creating the programmers
                        of our next generation. Our mission is to provide an in class and online programming gaming platform where parents and
                        teachers can help their K-12 students become great problem solvers.
                     </i>

                     <ul className="list-disc pl-2">
                        <li>
                           <i>
                              <b>Founder:</b> Triumfia Houmbie Fulks, Sedric Hibler
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Founding year:</b> 2022
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Current employee count:</b> 2
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Funding to date:</b> $100,000+
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Noteworthy investors:</b> Polsinelli Law Firm, CommunityAmerica Credit Union
                           </i>
                        </li>

                        <li>
                           <i>
                              <b>Noteworthy programs completed:</b> LaunchKC, Pipeline Pathfinders, AltCapYourBiz, Goodie Nation, Pure Pitch Rally
                           </i>
                        </li>
                     </ul>
                  </div>
               </section>

               <section className="my-4">
                  <ImagesContainer
                     imageHeight={450}
                     image="/assets/blog/2024-startups-to-watch-2.jpg"
                     imageDetail="Triumfia Houmbie Fulks, CodeAlgo Academy, LaunchKC; photo by Tommy Felts, Startland News"
                  />

                  <p className="mt-3">
                     In the founders eyes’, getting people to sign up for the CodeAlgo Academy beta platform was one the biggest achievements of 2023.
                     They slowly added people on their waitlist to the site to test it and provide them with feedback.
                  </p>

                  <p className="mt-3">
                     Now CodeAlgo Academy is getting to a point where it needs to be easy for anyone to sign up and play immediately, the duo said,
                     noting that taking the platform fully live is their main goal for 2024.
                  </p>

                  <p className="mt-3">
                     “We were able to get as many more users than we initially anticipated,” said Fulks. “So fingers crossed for making the actual
                     program live to a larger public audience for next year.”
                  </p>

                  <p className="mt-3">
                     The team also wants to increase its staff — looking to hire an additional developer — as well as ramp up marketing to be able to
                     increase the number of users on the platform, and finalize pending patents.
                  </p>

                  <hr className="my-4 border-[1.5px]" />

                  <i>
                     Click <Link text="here" link="https://www.startlandnews.com/2024/01/2024-startups-to-watch/" /> to view the full list of Startups
                     to Watch — presented with support from the Ewing Marion Kauffman Foundation, and independently produced by Startland News.
                  </i>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
