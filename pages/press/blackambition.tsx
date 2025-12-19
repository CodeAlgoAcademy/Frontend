import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";

export default function BlackAmbition() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />

         <Header
            body=""
            title="Black Ambition is a non-profit initiative working to close the opportunity and wealth gap through entrepreneurship."
            image="/assets/blog/press/blackambition.png"
            date="June 2025"
         />

         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title="2025 Black Ambition Semifinalists"
               date="June 2025"
            />

            {/* VIDEO */}
            <div className="my-6 flex justify-center">
               <video
                  src="https://blackambitionprize.com/wp-content/uploads/2025/06/Congratulations-2025-Semifinalists-1-1.mov"
                  controls
                  className="w-full max-w-[900px] rounded-md shadow-md"
               />
            </div>

            <main className="mt-6">
               <section className="my-4 flex flex-col gap-[1rem]">
                  <DropCapsParagraph
                     text="Black Ambition has announced the 177 visionaries selected as the 2025 Semifinalists, representing a bold class of founders reshaping innovation across industries. This pioneering group reflects Black Ambition’s mission to close the opportunity gap and empower underrepresented entrepreneurs."
                  />

                  <p className="mt-5">
                     The 2025 semifinalists span sectors including artificial intelligence, health, education, finance, beauty, sustainability, and consumer products. Each founder brings a unique perspective and disruptive solution to real-world problems.
                  </p>

                  <p className="mt-5">
                     As semifinalists, these entrepreneurs receive access to a powerful support ecosystem—including mentorship, strategic guidance, and resources designed to accelerate their growth and prepare them for the next stage of competition.
                  </p>
               </section>

               {/* Example image section (you can remove or update if desired) */}
               <ImagesContainer
                  image="/assets/blog/press/blackam.png"
                  imageDetail="Black Ambition continues its work to elevate underrepresented founders through funding, mentorship, and long-term support."
                  imageHeight={420}
               />

               <p className="mt-5">
                  This announcement marks the beginning of the semifinalists’ journey toward the 2025 Black Ambition Prize, where finalists will compete for financial awards and continued investment in their ventures.
               </p>

               <p className="mt-5">
                  To explore the full list of semifinalists and learn more about the program, visit Black Ambition's official website.
               </p>
            </main>
         </div>

         <Footer />
      </section>
   );
}
