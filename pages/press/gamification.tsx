import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import RelatedArticles from "@/components/press/RelatedArticles";
import React from "react";
import ReactPlayer from "react-player";

export default function Index() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="When Triumfia Houmbie Fulks noticed a lack of Black and female software engineers, it gave the CodeAlgo Academy co-founder pause, she said. " date=" January 03, 2024" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/triumfia.jpg"
               imageDetail="Sedric Hibler and Triumfia Houmbie Fulks, CodeAlgo Academy"
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text="CodeAlgo Academy uses gamification to teach coding skills to students in kindergarten through eighth grade, so they can develop their technology literacy and enter the workforce better prepared for STEM careers." />
                  <p className="mt-5">
                     With the beta platform launched this year, Fulks and co-founder Sedric Hibler aim to dispel misconceptions surrounding coding—such as the belief that the field is overly challenging, 
                     tedious, and that individuals lack access to coding platforms that are user-friendly and easy to use.
                     
                  </p>
                  <p>
                     “We decided to create CodeAlgo to bridge that gap and enable more underrepresented people to enter the field, 
                     providing them with the opportunity to secure an internship or job right out of high school,” said Fulks.
                     Both founders feel lucky for their own long-term career growth in software engineering, and want to extend that success in STEM career paths to others, they said.
                  </p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">
                           “Being an immigrant in the U.S. and searching for a job after graduation with a non-STEM degree can be quite challenging,” said Fulks.
                            “The chances of securing something like that are very slim.”
                            Last-minute pivoting to pursue a STEM degree without a mentor or coach, 
                            Fulks taught herself coding to secure a job in software engineering. Recognizing the challenges she faced, Fulks aspires to streamline the path to success.
                        </p>
                        <p className="mt-5">
                           “We want to ensure that we provide opportunities to youth so they can see it as a viable path.
                            We know not everyone can be a software engineer, but let’s broaden the perspective,” said Hibler.
                           Fulks challenges the idea that coding is inherently difficult, she said, emphasizing that, like any new skill, patience is crucial in the learning process.
                            “As a Black woman entrepreneur, I’m thinking of all the challenges and the barriers that I had to cross to get to this
                           point,” she said.
                           “What you don’t know is always going to be hard because you don’t know anything about it,” she said.
                        </p>
                        <p className="mt-5">
                           Because of the startup’s focus on youth, particularly middle school-aged students, Fulks believes it’s important to avoid traditional coding’s intimidating nature, 
                           where a combination of a bunch of random-seeming letters and instructions might deter young learners. 
                        </p>
                        <p className="mt-5">
                          “I can see a kid getting bored with it pretty quickly. So how do we make that fun and engaging? That’s how the gamification came into play,” said Fulks.
                           With CodeAlgo Academy, the duo developed a more accessible approach to coding education to make it more inclusive, and also fun to play for K-8 students.
                        </p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/press/triumfiaspeech.jpg"
                           imageDetail={"riumfia Houmbie Fulks, CodeAlgo Academy, LaunchKC"}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p>
                    In the founders eyes’, getting people to sign up for the CodeAlgo Academy beta platform was one the biggest achievements of 2023. 
                    They slowly added people on their waitlist to the site to test it and provide them with feedback. 
                  </p>
                  <p>
                    Now CodeAlgo Academy is getting to a point where it needs to be easy for anyone to sign up and play immediately, 
                    the duo said, noting that taking the platform fully live is their main goal for 2024.
                  </p>
                  <p>
                    “We were able to get as many more users than we initially anticipated,” said Fulks. “So fingers crossed for making the actual program live to a larger public audience for next year.”
                  </p>
                  {/* <i className="mt-3 block">
                     Click <Link link="https://www.startlandnews.com/2022/11/altcap-your-biz-2022/" text="here" /> to read about the 2022 AltCap Your
                     Biz grand prize winner.
                  </i> */}
                  {/* <i className="mt-3 block">
                     Watch a video featuring Elaina Paige Thomas below, then keep reading for more AltCap Your Biz awardees.
                  </i> */}
                  {/* <div className="mt-6  h-[500px] w-full">
                     <ReactPlayer width={"100%"} height={"100%"} url="https://www.youtube.com/watch?v=7eX-ZWc4Pgo&t=7s" playing={true} muted={true} controls={true} />
                  </div> */}
               </section>
               {/* <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/triumfia.jpg"
               imageDetail="Sedric Hibler and Triumfia Houmbie Fulks, CodeAlgo Academy"
               className="lg:!object-cover"
            />     */}

{/* 
               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/altcap-your-biz2.jpg"
                     imageDetail={"Vine Street Brewing; photo by Tommy Felts, Startland News"}
                     className="lg:!object-cover"
                  />
                  <p className="mt-3">
                     Kemet Coleman and Elliott Ivory, co-founders of <Link link="https://vinestbrewing.com/" text="Vine Street Brewing"></Link>,
                     secured the second place $10,000 cash prize, propelling their brewery’s mission to foster inclusivity through art, community
                     service, music, and the love of beer
                  </p>
                  <p className="mt-3">
                     “I think we brought something authentic and unique, and something that could potentially be scaled more,” said co-founder
                     Coleman.
                  </p>
                  <p className="mt-3">
                     With plans to expand their production capacity and build a new state-of-the-art cold room, the team has big dreams of pushing the
                     margin on the brewery’s innovation.
                  </p>
                  <p className="mt-3">
                     “I think Alt Cap does a really good job at supporting local businesses, and we’re serious about ours, we’ve got good
                     opportunities,” Coleman said.
                  </p>
               </section> */}

               {/* <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/altcap-your-biz6.jpg"
                     imageDetail={"CodeAlgo Academy; photo by Tommy Felts, Startland News"}
                     className="lg:!object-top"
                  />
                  <p className="mt-3">
                     The fan favorite of the night, Triumfia Houmbie Fulks was awarded $2,500 for her startup,{" "}
                     <Link link="https://codealgoacademy.com/" text="CodeAlgo Academy" />, a 3D Computer Science gaming platform that teaches K-8
                     students coding.
                  </p>
                  <p className="mt-3">
                     “The fans saw the results,” said Fulks, who recently earned a winning spot among 2023 LaunchKC grant recipients. “As an engineer,
                     I wish I had the chance to learn coding early on, and I feel like there are a lot of young people who also didn’t get that
                     chance. So we are providing the opportunity for them to learn that you can.”
                  </p>
               </section> */}

               {/* <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/altcap-your-biz4.jpg"
                     imageDetail={"Godfrey Riddle, Civic Saint, and Roy Scott, Healthy Hip Hop, center; photo by Tommy Felts, Startland News"}
                     className="lg:!object-cover"
                  />
                  <p className="mt-3">
                     The $5,000 Changemaker award was split equally between Godfrey Riddle, founder of{" "}
                     <Link link="https://www.civicsaint.com/" text="Civic Saint" />, a sustainable housing organization, and Roy Scott, founder of
                     Healthy Hip Hop, an online platform offering hip-hop for children and families.
                  </p>
                  <RelatedArticles
                     link="https://www.startlandnews.com/2023/09/godfrey-riddle-civic-saint-affordable-housing/"
                     title="Godfrey Riddle wants to build you a home; How Civic Saint’s eco-friendly bricks could reshape the foundation of affordable housing"
                  />
               </section> */}

               {/* <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="flex-[.9]">
                     <p className="mt-5">Additional pitchers who competed Thursday included: </p>
                     <p className="mt-5">
                        <Link text="Co-Angler" link="http://coangler.com/" /> (John Bledsoe), Springfield, Missouri — An online platform dedicated to
                        connecting anyone and everyone who shares a passion for fishing.
                     </p>
                     <p className="mt-5">
                        <Link text="Nexodesk" link="https://nexodesk.com/" /> (Jimmy James, Lopez Maradiaga), Kansas City, Kansas — Designed for
                        startup and business owners, Nexodesk creates solutions for tech problems with professional services.
                     </p>
                     <p className="mt-5">
                        <Link text="The Black Pantry" link=" http://theblackpantry.co/" /> (Brian Roberts), Kansas City, Missouri — A one-stop shop
                        for all things Black-owned, such as quality pantry and self care products.
                     </p>
                     <p className="mt-5">
                        <Link text=" The AI Hub" link="https://www.theaihubkc.org/" /> (James Spikes, Taylor Burris), Kansas City, Missouri — An art
                        incubator with co-working lounges, fully equipped studios, and hubs to develop skills.
                     </p>

                     <p className="mt-5">
                        <Link text="VenBoo" link="http://myvenboo.com/" /> (Juaquan Herron), Kansas City, Missouri — An app allowing organizers to
                        post their vendor opportunities and connect with different vendors across the Midwest.
                     </p>
                     <p className="mt-5">
                        <Link text="Wrax" link="http://www.mywrax.com/" /> (Frankie Elder-Reedy), Pleasanton, Kansas — A harness designed to better
                        fit breasts and prevent bouncing during workouts.
                     </p>
                     <p className="mt-5">
                        <Link text="Yes! Athletics" link="http://www.yesathleticsusa.com/" /> (Deb North), Topeka, Kansas — A women-owned sporting
                        goods company that offers feminine styles and colors in traditionally male sports gear.
                     </p>
                  </div>
                  <div className="flex-1">
                     <ImagesContainer
                        imageHeight={500}
                        image="/assets/blog/altcap-your-biz5.jpg"
                        imageDetail={"Godfrey Riddle, Civic Saint, and Roy Scott, Healthy Hip Hop; photo by Tommy Felts, Startland News"}
                     />
                  </div>
               </section> */}
            </main>
         </div>
         <Footer />
      </section>
   );
}
