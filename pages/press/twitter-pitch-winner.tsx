import Footer from "@/components/home/Footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";

const TwitterPitchWinners = () => {
   return (
      <section className="min-h-screen w-full bg-[#f7f8ff]">
         <Navbar />
         <Header
            body="CodeAlgo Academy selected as 1 of the winners"
            title={`Visibile Hands Twitter Pitch Winner`}
            image="/assets/blog/article5.png"
            date="April 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="CodeAlgo Academy seleceted as 1 of the winners of the visible hands twitter pitch" />
            <main className="mt-6">
               <p>We are thrilled to share that CodeAlgo Academy had a major win at the Visible Hands pitch competition.</p>
               <p className="mt-3">
                  Visible Hands focus on the top of the funnel, the earliest stages of company building, where access to capital, resources, and
                  connections are the biggest barriers for underrepresented founders
               </p>
               <p className="mt-3">
                  After intense competition with some of the amazing startups in the industry, our founder Triumfia Houmbie Fulks was honored to be
                  announced as a winner! The prize money will be used to cover our design costs, enabling us to continue providing innovative
                  solutions for our clients.
               </p>
               <ImagesContainer imageHeight={500} imageDetail="" image="/assets/blog/article5-2.png" />
               <p className="mt-3">
                  This win is a testament to the hard work and dedication of our team members and the support of our valued community. We {"couldn't"}
                  have achieved this without the encouragement and motivation from all of you. We want to extend a heartfelt thank you to everyone who
                  has been a part of this journey with us.
               </p>
               <p className="mt-3">
                  As we continue to grow and develop our platform, we are excited to bring even more exciting developments to the table. Keep an eye
                  out for our upcoming announcements and updates, as we strive to provide the best solutions possible for our clients.
               </p>
            </main>
         </div>
         <Footer />
      </section>
   );
};

export default TwitterPitchWinners;
