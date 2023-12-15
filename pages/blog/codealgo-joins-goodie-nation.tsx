import Footer from "@/components/home/Footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";

const CodeAlgoJoinsGoodieNation = () => {
   return (
      <section className="min-h-screen w-full bg-[#f7f8ff]">
         <Navbar />
         <Header
            body="Goodie Nation has chosen CodeAlgo Academy as one of the eight founders to be a part of their community, recognizing their exceptional potential for growth and impact in the industry."
            title={`CodeAlgo Academy Selected to join Goodie Nation`}
            image="/assets/blog/article4.png"
            date="March 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="We are excited to announce that CodeAlgo Academy has joined the Goodie Nation community as one of our newest members!" />
            <ImagesContainer imageHeight={400} imageDetail="" image="/assets/blog/article4-2.jpg" />
            <main className="mt-6">
               <p className="mt-3">
                  Goodie Nation is a non-profit organization creating an intentional culture where every innovative company has an official policy to
                  donate coaching, introductions, and opportunities to succeed for the next generation of diverse founders, K-12 tech talent training
                  program operators, and social entrepreneurs.
               </p>
               <p className="mt-3">
                  With over a million unfilled tech jobs in the workforce today, Codealgo Academy aims to fill the pipeline by helping students
                  develop programming skills and analytical thinking before they reach high school. The platform combines engaging learning modules
                  with gamification to teach students in kindergarten through eighth grade how to code.
               </p>
               <p className="mt-3">
                  As CodeAlgo Academy joins the Goodie Nation community, we are confident that they will thrive with the support of Goodie{" "}
                  {"Nation's"}
                  talented network of mentors, advisors, and investors.
               </p>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CodeAlgoJoinsGoodieNation;
