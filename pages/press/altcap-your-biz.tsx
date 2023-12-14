import Footer from "@/components/home/Footer";
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
      <section className="press-page min-h-screen w-full bg-[#f7f8ff]">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="Big winner at GEWKC: AltCap Your Biz turns The Next Paige with $42K+ in prizes" date="November 17, 2023" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/altcap-your-biz.jpg"
               imageDetail="Elaina Paige Thomas, The Next Paige, celebrates after winning the grand prize at the 2023 AltCap Your Biz pitch competition; photo by Tommy Felts, Startland Newl"
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text="The value of local support should not be underestimated or taken for granted, said Elaina Thomas, winner of the $25,000 grand prize at Thursday’s AltCap Your Biz pitch competition." />
                  <p className="mt-5">
                     “I feel blessed, I feel like I am in the right place, I could’ve started The Next Paige anywhere I wanted to, nationally, and I’m
                     so glad I started in Kansas City,” said Thomas, founder of The Next Paige, Kansas City’s first Black-owned talent agency.
                  </p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">
                           “The support here has been so amazing on what we are trying to do here by bringing this industry back to Kansas City,” she
                           added. “I can’t do it alone.”
                        </p>
                        <p className="mt-5">
                           The <Link link="https://www.altcap.org/acyb" text="AltCap Your Biz: Pitch Competition" />, in its eighth year, fuels Kansas
                           City innovators, giving them the opportunity to pitch their business and win big during Global Entrepreneurship Week-Kansas
                           City with cash prizes to accelerate their growth.
                        </p>
                        <p className="mt-5">
                           On her winning night, Thomas, full of gratitude, reflected on the personal journey it took her to get to the rewarding
                           moment.
                        </p>
                        <p className="mt-5">
                           “As a Black woman entrepreneur, I’m thinking of all the challenges and the barriers that I had to cross to get to this
                           point,” she said.
                        </p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/altcap-your-biz1.jpg"
                           imageDetail={"The Next Paige; photo by Tommy Felts, Startland News"}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p>
                     “I was a former performer and now a business woman. It’s an emotional moment and it’s not a theory, this is facts. I think the
                     judges connected to the impact, we are doers in this community, and the evidence is tangible,” said Thomas.
                  </p>
                  <i className="mt-3 block">
                     Click <Link link="https://www.startlandnews.com/2022/11/altcap-your-biz-2022/" text="here" /> to read about the 2022 AltCap Your
                     Biz grand prize winner.
                  </i>
                  <i className="mt-3 block">
                     Watch a video featuring Elaina Paige Thomas below, then keep reading for more AltCap Your Biz awardees.
                  </i>

                  <div className="mt-6  h-[500px] w-full">
                     <ReactPlayer width={"100%"} height={"100%"} url="https://youtu.be/bqsv3uxLyrQ" playing={true} muted={true} controls={true} />
                  </div>
               </section>

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
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/altcap-your-biz3.jpg"
                     imageDetail={"CodeAlgo Academy; photo by Tommy Felts, Startland News"}
                     className="lg:!object-cover"
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
               </section>

               <section className="mt-3">
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
               </section>

               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
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
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
