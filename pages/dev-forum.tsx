import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import { CustomButton } from "@/components/UI/Button";
import Image from "next/image";
import { FC } from "react";
const DevForum = () => {
   return (
      <div className="relative overflow-x-hidden font-thabit">
         <Navbar />
         <Image src={"/assets/home-banner.png"} width={1500} height={400} />

         <div className="mx-auto mt-5 max-w-[1200px] p-6">
            <h1 className="text-center  text-[2.1rem] font-bold max-md:text-[1.5rem]">CodeAlgo Professional Development Program</h1>

            <p className="mx-auto mt-4 mb-12 max-w-[800px] text-center text-[1.4rem] font-light  max-md:text-[.87rem]">
               Our CodeAlgo Professional Development Program empowers educators with the skills and resources they need to elevate their teaching and
               inspire the next generation of innovators
            </p>

            <Image src={"/assets/landing/dev-forum.png"} width={1200} height={600} />

            <div className="mt-16 rounded-2xl bg-[#f4f6f9] p-8 max-md:p-4">
               <h1 className="text-center  text-[2.1rem] font-bold max-md:text-[1.5rem]">About Our Program</h1>

               <p className="mx-auto mt-2 mb-12 max-w-[800px] text-center text-[1.4rem] font-light max-md:text-[.87rem]">
                  We offer in-person and virtual workshops to optimize the use of CodeAlgo.
               </p>

               <div className="grid gap-8 md:grid-cols-2">
                  <SingleForumInfo
                     title="Introduction to CodeAlgo"
                     subtitle="A comprehensive guide to our coding-focused platform: setting up learners, creating courses, managing tasks, analyzing learner progress, and more."
                  />
                  <SingleForumInfo
                     title="Best Practices for Utilizing CodeAlgo"
                     subtitle="Designed for educators experienced with CodeAlgo. Explores instructional strategies for effectively leveraging our coding tools."
                  />
                  <SingleForumInfo
                     title="Quick Start"
                     subtitle="Short on time? Discover the fastest way to begin with CodeAlgoAcademy. This course focuses on the essentials and does not cover all of CodeAlgo's advanced features."
                  />
                  <SingleForumInfo
                     title="CodeAlgo Refresher and Feature Updates"
                     subtitle="This session offers a quick overview of our latest features and gives educators the chance to revisit tools and functions where they need extra guidance."
                  />
               </div>
            </div>
         </div>

         <Footer />
      </div>
   );
};

interface ForumInfoProps {
   title: string;
   subtitle: string;
}

const SingleForumInfo: FC<ForumInfoProps> = ({ title, subtitle }) => {
   return (
      <div className="rounded-2xl bg-white px-4 py-6">
         <h1 className="text-[1.5rem] font-bold max-md:text-[1.2rem]">{title}</h1>

         <p className="mt-5 text-[.9rem]">{subtitle}</p>
      </div>
   );
};

export default DevForum;
