import React from "react";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";

const CodeAlgoAtProX = () => {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff]">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="CodeAlgo at ProX Hiring Fair – Connecting with Future Innovators!" date="October 7, 2023" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/codealgo-at-proX.jpeg"
               imageDetail="CodeAlgo at ProX Hiring Fair"
               className="lg:!object-top"
            />

            <main className="mt-6">
               <section className="my-4">
                  <p className="my-3">
                     We're thrilled to announce our active participation in the ProX Hiring Fair, an exceptional event hosted by Pro X, where more
                     than 90 employers converge to interview over 1,000 talented students, paving the way for transformative summer internships. At
                     CodeAlgo, we recognize the importance of nurturing the next generation of tech enthusiasts, and this event provides an ideal
                     platform to connect with bright minds.
                  </p>
                  <p>
                     Whether you're a student eager to explore internship opportunities or an individual passionate about contributing to the tech
                     community as a volunteer, Look no further! CodeAlgo is setting up shop at the ProX Hiring Fair, and we invite you to drop by our
                     table. Engage with our team, learn about our innovative projects, and discover how you can be a part of our dynamic community.
                  </p>
                  <p>
                     <b>Date:</b> March 18, 2023
                  </p>
                  <p>
                     <b>Time:</b> 7:00 am - 12:30 pm
                  </p>
                  <p>
                     <b>Location:</b> Loews Hotel 1515 Wyandotte St, Kansas City, MO 64108
                  </p>
               </section>
               <section className="my-4">
                  <p>
                     Check out our platform <Link text="here" link="https://www.codealgoacademy.com" />
                  </p>
                  <p>See you at the ProX Hiring Fair!</p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default CodeAlgoAtProX;
