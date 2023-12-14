import React from "react";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";

export default function CodeAlgoWinsRockstarBusinessAward() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff]">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="🌟 CodeAlgo Academy Wins the Rockstar Business Award! 🌟" date="August, 2023" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/codealgo-wins-rockstar-business-award.jpeg"
               imageDetail="CodeAlgo Wins Rockstar Business Award"
               className="lg:!object-top"
            />

            <main className="mt-6">
               <section className="my-4">
                  <DropCapsParagraph text="We are thrilled to share the exhilarating news that CodeAlgo Academy has been honored with the prestigious Rockstar Business Award. This recognition is a testament to the dedication and innovation of our incredible team." />
                  <p className="mt-3">
                     Our heartfelt gratitude extends to the Prospect Business Association for acknowledging our efforts and contributions. This award
                     wouldn't have been possible without their support and the guidance of our esteemed mentor and advisor, Simone Curls. Her
                     unwavering commitment has been a guiding light for us, and we're truly grateful for her invaluable mentorship.
                  </p>
                  <p className="mt-3">
                     For those not yet acquainted with the Prospect Business Association, now is the perfect moment to explore the incredible
                     opportunities they offer for businesses. Their commitment to fostering growth and excellence aligns seamlessly with our mission
                     at CodeAlgo Academy.
                  </p>
               </section>
               <section className="my-4">
                  <BlogTitle title="🚀 Join us on this Journey!" />
                  <p className="mt-1">
                     If you haven't already, consider joining our waitlist as we continue to embark on this exciting journey.{" "}
                     <Link link="https://www.codealgoacademy.com" text="Sign up here" /> and be part of the coding revolution!
                  </p>

                  <BlogTitle title="🌐 Spread the Excitement" />
                  <p className="mt-1">
                     Share this thrilling news with your networks! Your ongoing support means the world to us, and together, we're shaping the future
                     of education and innovation.
                  </p>
                  <p className="mt-1">Thank you for being part of the CodeAlgo Academy community. Here's to many more milestones and achievements!</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
