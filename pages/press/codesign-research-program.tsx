import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";

const CoDesigResearchProgram = () => {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff]">
         <Navbar />
         <Header
            body="CodeAlgo Academy was selected to participate in a Co-design research program with LeanLab"
            title={`Co-design research program with LeanLab`}
            image="/assets/blog/article3.png"
            date="April 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="CodeAlgo Academy was selected to participate in a Co-design research program with LeanLab" />
            <p className="mt-5">
               LeanLab match parents, learners and educators with edtech developers to inform, develop, and evaluate the next generation of classroom
               tools. They study how edtech tools work in real classroom environments, and connect promising edtech solutions with resources to
               support accelerating their impact.
            </p>
            <ImagesContainer imageHeight={400} imageDetail="" image="/assets/blog/article3-2.png" />

            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <div className="mt-6 flex-1">
                     <p className="mt-3">
                        Our recent visit to local schools, made possible through our partnership with LeanLab Education, was truly a remarkable
                        experience. Through our partnership with LeanLab Education, we had the pleasure of visiting 2 diverse schools in April, where
                        we had the opportunity to interact with students and staff.{" "}
                     </p>
                     <p className="mt-3">
                        During our visit, we had the opportunity to demo CodeAlgo Academy to 5th, 6th, and 7th graders. After our demos, students were
                        put into different focus groups where they had the opportunity to not only share their amazing feedback, but also co-design
                        with us. It was very clear that the CodeAlgo game play was something that they had high interest in.
                     </p>
                     <p className="mt-3">
                        To our surprise, 100 of students return to us after our demos to the teachers, requesting to play CodeAlgo. We spoke to the
                        students, and they were even more interested than we originally thought! They wanted to see the possibilities of what it could
                        do, which is the mindset of a future Engineer.
                     </p>
                  </div>

                  <div className="flex-[0.7]">
                     <ImagesContainer image="/assets/blog/article3-3.jpg" imageDetail="" imageHeight={350} />
                  </div>
               </section>

               <section className="mt-3">
                  <p className="mt-3">
                     We had a group of teachers stop by our station to see what our platform looked like. They provided great insights and ideas on
                     how CodeAlgo Academy could be used in classrooms. With a couple of Math and Science teachers in the building, we were happy to
                     see that other areas of the spectrum also saw value in CodeAlgo Academy.
                  </p>
                  <p className="mt-3">
                     Having the chance to co-design with the teachers and students from these diverse schools has been an amazing experience and is
                     going to help shape the future of CodeAlgo Academy.
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CoDesigResearchProgram;
