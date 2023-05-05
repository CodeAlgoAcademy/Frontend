import Header from "@/components/about-us/Header";
import Section from "@/components/about-us/Section.jsx";
import Testimonials from "@/components/about-us/Testimonials";
import AOC from "@/components/about-us/aoc";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/home/Navbar";
import Link from "next/link";
import React from "react";
import { FiTarget } from "react-icons/fi";
import { GiTargetArrows } from "react-icons/gi";
import { CodeBlock, CopyBlock, dracula, androidstudio } from "react-code-blocks";

const AboutUs = () => {
   return (
      <>
         <section className="min-h-screen w-full bg-[#FFFFFF] pb-6">
            <Navbar />
            <div className="">
               <Header />
               <Section
                  hasButton={true}
                  order={1}
                  title="At CodeAlgo Academy, we teach your kids how to code, and we mean real coding!"
                  detail=""
                  image="/assets/compiler.png"
                  codeEditor={true}
               />

               <Section
                  hasButton={false}
                  order={2}
                  title="Technology built upon extensive research and development"
                  detail="An innovative coding platform that uses gamification artificial intelligence to teach children how to code."
                  image="/assets/tech.png"
                  extraImage="/assets/0013_1.png"
                  extraImagePosition="-top-[90px] z-[-1]"
               />
               <Section
                  hasButton={false}
                  order={1}
                  title="Learning Problem-Solving Skills"
                  detail={[
                     "Learn from coding mistakes and use them as opportunities for growth.",
                     "Use logic and critical thinking to analyze and solve problems.",
                     "Learn to break down larger coding problems into smaller, more manageable pieces.",
                     "Learn to work in groups through numerous projects",
                  ]}
                  image="/assets/children.jpeg"
                  extraImage="/assets/0013_2.png"
                  extraImagePosition="top-[15%] right-[100%] translate-x-[30%] z-[-1]"
               />
               <Testimonials />
               <AOC />
            </div>
         </section>
         <Footer />
      </>
   );
};

export default AboutUs;
