import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";

export default function CodeAlgoAcademyAccessToKCsWorldCup() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title="Her startup needed a user test lab: Access to KC’s World Cup marketplace opened door to rapid, live iteration"
               date="July 16, 2026"
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/press/1.jpg"
               imageDetail="Triumfia Houmbie Fulks poses in the CodeAlgo Academy booth at the City of Entrepreneurs marketplace at Union Station."
               className="lg:!object-cover"
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <p>
                     CodeAlgo Academy left Union Station with more than just new customers. The edtech startup wrapped its FIFA World Cup-timed
                     residency with a new product roadmap shaped by thousands of conversations throughout the five-week City of Entrepreneurs
                     marketplace.the ability to use it directly in their classrooms.
                  </p>
                  <p>
                     Every parent who stopped by, every child who tapped a screen, and every international visitor who asked a question, helped retool
                     the next version of CodeAlgo’s coding platform, said Triumfia Houmbie Fulks.
                  </p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">
                           “It has been fantastic. There have been lots of learning opportunities,” the CodeAlgo Academy founder told Startland News.
                           “Being in front of actual users and seeing the user experience firsthand puts everything into a completely different
                           perspective. You’re seeing different demographics and different kinds of people using it, and you’re adapting to make it
                           useful for everyone.”
                        </p>
                        <p className="mt-5">
                           Earlier this year, CodeAlgo Academy expanded beyond its beta phase and into more Kansas City classrooms, while introducing
                           a direct-to-parent subscription model. At Union Station, Fulks had the opportunity to put both strategies to the test,
                           introducing the platform to families from around the world instead of just to educators alone.{" "}
                        </p>
                        <p className="mt-5 text-mainColor font-bold text-lg">
                           ICYMI: CodeAlgo Academy hits classrooms as the edtech platform (and founder) proves independence
                        </p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={500}
                           image="/assets/press/2.jpg"
                           imageDetail={
                              "Triumfia Houmbie Fulks, CodeAlgo Academy, demonstrates her platform to young visitors at Union Station during the five-week City of Entrepreneurs marketplace; "
                           }
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p className="mt-5">
                     During the five-week activation, CodeAlgo Academy surpassed 30,000 coding challenges solved, launched its Android and IOS app,
                     and rolled out multilingual support.
                  </p>

                  <p className="mt-5">That pace wouldn’t have been possible without a development team working behind the scenes, said Fulks.</p>

                  <p className="mt-5">
                     “Shout out to my team. They showed up and shut it down,” she said. “We were doing live iteration. We’d get feedback at 11 a.m.,
                     and by noon it was already being implemented.”
                  </p>

                  <p className="mt-5">
                     The opportunity itself came through the Prospect Business Association, which selected CodeAlgo Academy to participate in its
                     section of the City of Entrepreneurs marketplace during the World Cup festivities.
                  </p>
                  <p className="mt-5">
                     “For many small businesses, access is one of the greatest barriers to growth,” said Simone Curls, CEO of the Prospect Business
                     Association. “The City of Entrepreneurs gave entrepreneurs access to visitors from around the world, creating opportunities to
                     generate revenue, build brand awareness, expand their customer base and demonstrate that Kansas City’s small business community
                     is ready for the global stage.”
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/press/3.jpg"
                     imageDetail="An array of users test out the CodeAlgo Academy platform in the startup’s booth at the City of Entrepreneurs marketplace at Union Station. Her space was provided by the Prospect Business Association;"
                     imageHeight={450}
                  />
                  <h2 className="text-mainColor font-bold text-lg">Global focus group</h2>
                  <p className="mt-5">
                     The City of Entrepreneurs marketplace — which saw more than 120,000 visitors throughout Kansas City’s World Cup run, according to
                     organizers — gave Fulks a unique experience: tens of thousands of real-time users from around the world, all testing the platform
                     in one place.
                  </p>
                  <p className="mt-5">
                     Visitors from Europe, Latin America and beyond quickly showed the team that even simple assumptions, like organizing lessons by
                     American grade levels, didn’t translate.
                  </p>
                  <p className="mt-5">
                     “So we started describing content as elementary or secondary instead of by grade,” said Fulks. “One thing it opened up is
                     language selection. Right now, we have French available, and we’re adding Spanish and other languages.”
                  </p>
                  <p className="mt-5">Watching students interact with the software uncovered opportunities they couldn’t always explain.</p>
                  <p className="mt-5">“A lot of the feedback wasn’t what people were saying,” she added. “It was nonverbal.”</p>
               </section>
               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/press/4.jpg"
                     imageDetail="The CodeAlgo Academy user interface; photo by Taylor Wilmore, Startland News."
                     imageHeight={450}
                  />

                  <p className="mt-5">
                     One example came from younger students using the platform’s block coding mode. They were earning virtual coins, but had nowhere
                     to spend them, unlike students working in Python. After hearing the same question from several students, CodeAlgo Academy built a
                     virtual mall for block coding users to customize their players before the event wrapped.
                  </p>
                  <p className="mt-5">
                     Other improvements came from simply watching how students used the platform. If a child paused in the same place multiple times,
                     the team took note. If several users got stuck in the same spot, the interface changed, said Fulks.
                  </p>
                  <p className="mt-5">
                     The marketplace also sped up CodeAlgo Academy’s expansion beyond schools, giving the startup a chance to connect directly with
                     parents. During the activation, CodeAlgo added roughly 500 parent users.{" "}
                  </p>
               </section>

               <section className="mt-3">
                  <ImagesContainer
                     image="/assets/press/5.jpg"
                     imageDetail="Triumfia Houmbie Fulks, CodeAlgo Academy; photo by Taylor Wilmore, Startland News."
                     imageHeight={450}
                  />

                  <h2 className="text-mainColor font-bold text-lg">Building the next version</h2>

                  <p className="mt-5">
                     Fulks said the first few days weren’t about selling subscriptions to the gamified platform. They were about figuring out how
                     people wanted to discover an educational technology company in a marketplace where visitors usually expected to leave with
                     something they could carry.
                  </p>
                  <p className="mt-5">
                     “We’re not like most companies out there with a product people can hold, the first several days were really about understanding
                     the market, understanding the traffic and understanding what people wanted to engage with,” she said.
                  </p>
                  <p className="mt-5">The lessons Fulks took home herself are already shaping the startup’s next phase.</p>
                  <p className="mt-5">
                     One of the biggest requests from traveling parents: offline access so children could keep coding during flights and road trips
                     without relying on Wi-Fi. Fulks said that feature is already in the works.
                  </p>
                  <p className="mt-5">
                     CodeAlgo Academy is also continuing to pilot the platform in classrooms where students use it daily, while continuing to build
                     new consumer features inspired by conversations at Union Station.
                  </p>

                  <p className="mt-5">
                     “Seeing them go from beginners to where they can actually write little programs and understand logical statements is pretty
                     wonderful,” said Fulks of the student users. “When they start, they all take a placement test, so we know exactly where everyone
                     is. Seeing that growth, while we’re also getting tremendous feedback about what to add and improve, tells us we’re headed in the
                     right direction.”
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
