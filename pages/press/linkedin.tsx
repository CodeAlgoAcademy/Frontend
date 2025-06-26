import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import RelatedArticles from "@/components/press/RelatedArticles";
import React from "react";

export default function Index() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title="Viruses vs. Bacteria—Made Fun for Kids!"
               date="April 2025"
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/save.PNG"
               imageDetail="Viruses vs. Bacteria—Made Fun for Kids!"
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4 flex flex-col gap-[1rem]">
                  <DropCapsParagraph text="We’ve partnered with the Kansas Department of Health to teach kids the difference between viruses and bacteria in a fun, interactive way—empowering them to understand their bodies and health!" />
                  <p className="mt-4">
                     Through exciting visuals, hands-on activities, and age-appropriate language, this educational collaboration helps children grasp essential health concepts.
                  </p>
                  <p className="mt-4">
                     The initiative not only fosters early science literacy, but also encourages curiosity and self-awareness, laying the foundation for healthier future generations.
                  </p>
                  <p className="mt-4">
                     Parents and educators can access these materials and join us in promoting informed, confident decision-making around hygiene, illness, and everyday health.
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
