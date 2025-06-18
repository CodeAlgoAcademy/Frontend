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
            <BlogTitle title="Pipeline’s new cohorts show ‘power of diversity’; here’s who’s joining the elite entrepreneur network" date="February 01, 2024" />
            <ImagesContainer
               imageHeight={700}
               image="/assets/blog/press/pipeline.jpg"
               imageDetail="2024 Pipeline Fellows: Anastasia Grenfell, Victress Empowered Movement; 
               Ashley McClellan, MedCurate; Brandy Archie, AskSAMIE; Chrystal Graves, Liquid Hair Institute; 
               Chuck Schneider, Redpoint Summit; Elaina Thomas, The Next Paige; Jennifer Lea, Entry Envy; 
               JQ Sirls, O.R.B.I.T Inc. (Storytailor.ai); Marissa Whalen, Little Movements Apparel; Stephanie Clark, 
               GMP PROS; Tam Tran, DataAppraisal; Taylor Stormberg, Pando PEO; and Triumfia Houmbie-Fulks, CodeAlgo"
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text="The value of local support should not be underestimated or taken for granted, said Elaina Thomas, winner of the $25,000 grand prize at Thursday’s AltCap Your Biz pitch competition." />
                  <p className="mt-5">
                     Pipeline’s roster of high-growth Midwest entrepreneurs swelled Thursday as the premier fellowship 
                     network officially announced more than two dozen founders joining its 2024 Fellowship and Pathfinder Program.
                  </p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">
                          “The selected Fellows and Pathfinders represent the power and impact of diverse companies, leaders and regions being represented in a cohort,” said Vincent, executive director of Pipeline Entrepreneurs. “These cohorts reflect the state of innovation as we know that diverse companies and founders are key indicators for driving innovation, economic growth, and creating a thriving and inclusive ecosystem. 
                          The power of that diversity component helps elevate the ecosystem as a whole and allows for more collaboration with other ecosystem builders.”
                        </p>
                        <p className="mt-5">
                           This year’s cohorts are made up of 13 Fellows and 15 Pathfinders — founders who have not yet taken their entrepreneurship role full-time and who are minority, women, 
                           or rural based entrepreneurs — representing companies across the region (Kansas, Missouri and Nebraska) and from a wide range of industries.
                        </p>
                        <p className="mt-5">
                           “2024 marks one of the most competitive recruiting years for the organization — seeing more applications in both quality and quantity than ever before,” said Vincent. 
                           “We had four founders from our 2023 Pathfinder class progress to a place of working full time on their startup and become Fellows in 2024. I think this really speaks to both the success of the programming as well as the momentum that continues to build as we are seeing later stage companies as we enter our third year in the Pathfinder Program.”
                        </p>
                        <p className="mt-5">
                          Two of the newly announced fellows — <span className="text-red-600 font-bold">Triumfia Houmbie-Fulks</span>  and JQ Sirls — lead companies that recently were named among Startland News’ Kansas City Startups to Watch in 2024. 
                          And Dr. Brandy Archie’s startup was featured on the 2023 list.
                        </p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                        imageHeight={300}
                        image="/assets/blog/press/melissa.jpg"
                        imageDetail={"Melissa Vincent, Pipeline Entrepreneurs, speaks at Global Entrepreneurship Week Kansas City in November 2023 about the concept of “scaling deep”; photo by Tommy Felts, Startland News"}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={700}
                     image="/assets/blog/press/candice.jpg"
                     imageDetail={"2024 Pipeline Pathfinders: Candice McField, As for Me and My Body; Denisha Jones, Sweet Peaches Cobblers LLC; Doug Miller, Impower Health Inc,; Frankie Elder-Reedy, Wrax; Jacqueline Nguyen, Cafê Cà Phê; James Atwater, InReturn Strategies; Janae Barnett, EVE Beverages; LaToya Ebony Sirls, Someday Sunday LLC; Maurice Bass, Sol-Engine Design; Monica Wearren, Good Moves; Robert Gill, Rogue Innovations; Ryan Klataske, Applied Ethnographic Services; Shaniqua Jones-Williams, SendBack; James Spikes and Taylor Burris, The AI Hub: An Art Incubator"}
                     className="lg:!object-cover"
                  />
                  <p className="mt-3">
                     After the intensive interview process, the Fellows and Pathfinders gathered together Jan. 25 in Kansas City at the Fontaine Hotel to kick off their year at orientation. During those sessions, the cohorts were able to meet one another as well as other members of the organization and community, Vincent said.
                  </p>
                  <p className="mt-3">
                    The opener event gave an overview of the program and what to expect over the next 12 months. Members of the new cohorts were also able to hear from alumni of the organization about their experience in Pipeline and what the program means to them and how it impacted them as both founders and in their businesses.
                  </p>
                  <p className="mt-3">
                     “We have definitely seen a meaningful impact from the changes we made within Pipeline,” Vincent said. “As an ecosystem builder, one of the things we pride ourselves on is the ability to be able to scale up and deep meaning that we help businesses that are growing and scaling ‘up’ but we also scale ‘deep,’ meaning that we understand the power of building connections and having the community support is crucial in the success of the program.”
                  </p>
                  <p className="mt-3">
                    “The ability to provide access to this network is one of our strongest differentiators as we create the building blocks between going from Pathfinder to Fellow and then Fellow to member as membership is for the life of the entrepreneur,” she continued. 
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     imageHeight={500}
                     image="/assets/blog/press/jessica.jpg"
                     imageDetail={"Jessica Loseke, Midwest Barrel Co., Lincoln, Nebraska, accepts the 2022 Innovator of the Year award at the 2023 Pipeline Innovators Gala; photo by Channa Steinmetz, Startland News"}
                     className="lg:!object-top"
                  />
                  <p className="mt-3">
                     Pipeline boasts a community of over 200 plus members in its 17 years and they have generated more than $2.5 billion in revenue; employ more than 4,000 people in Kansas, Nebraska, and Missouri; are doing business in more than 85 countries; and have raised more than $900 million in outside capital since joining Pipeline.
                  </p>
                  <p className="mt-3">
                     “Our hope for the future with these two cohorts is that as they go through the program there continues to be an amazing continuum of resources specifically for high-growth entrepreneurs who are in the Midwest,” Vincent said. “There’s not any other resource that focuses solely on serial high-growth entrepreneurs that is industry agnostic and doesn’t take equity in the startups that they serve.”
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
