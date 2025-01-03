/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";
import CharactersArrangement from "../home/charactersArrangement";

const Header = () => {
   return (
      <header className="">
         {/*  <div className="mb-[5rem] flex h-screen w-full  flex-col bg-home1 bg-cover bg-left pt-[6rem] lg:mb-0 lg:pt-0">
            <div className="z-3 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center  p-6 lg:flex-row">
               <div className="flex-1">
                  <Fade triggerOnce={true} direction={"up"} duration={1000}>
                     <h1 className="font-tiltWarp text-[3.5rem] font-bold leading-[1.1] text-slate-700 md:max-w-[500px]">
                        About{" "}
                        <span className="bg-gradient-to-r from-pink-500 via-mainPink to-pink-600 bg-clip-text font-extrabold text-transparent">
                           CodeAlgo Academy
                        </span>
                     </h1>
                  </Fade>
                  <Fade triggerOnce={true} direction="up" duration={1000} delay={400}>
                     <p className="mt-2 text-[1.3rem] text-slate-700 md:max-w-[500px]">At CodeAlgo Academy, we believe every child is a genius!</p>
                  </Fade>
                  <Fade triggerOnce={true} direction="up" duration={1000} delay={400}>
                     <Link href={"/login"}>
                        <button className="mt-8 min-w-[120px] rounded-lg bg-mainPink p-3 font-tiltWarp text-[15px] font-bold text-white shadow-md">
                           Sign in
                        </button>
                     </Link>
                  </Fade>
               </div>
               <CharactersArrangement>
                  <img src="/assets/about-page-hero.png" className="block w-full object-cover" alt="" />
               </CharactersArrangement>
            </div>
         </div> */}
         <div className="mx-auto max-w-[1200px] space-y-5 py-10 px-6 text-center sm:px-20 md:px-60">
            <Fade triggerOnce={true} cascade duration={1000} direction={"up"}>
               <p className="font-thabit text-4xl font-bold max-md:text-2xl">Our Mission</p>
               <p className="max-md:text-[.9rem]">
                  Our mission is to democratize access to high-quality coding education, empowering all K-12 students, particularly Black and Brown
                  children, to develop critical thinking, creativity, and problem-solving skills. We equip students with the real programming skills,
                  and experiences necessary to thrive in a technology-driven world, fostering a love of learning and preparing them for successful
                  futures in diverse fields. We prioritize career readiness, especially for our high school students, providing pathways to in-demand
                  tech careers through hands-on projects, mentorship, and industry connections. We strive to increase diversity within the tech sector
                  by connecting students to internships, apprenticeships, and job opportunities, while cultivating an inclusive and supportive
                  learning environment for all.
               </p>

               <p className="font-thabit text-4xl font-bold max-md:text-2xl">Our Vision</p>
               <p className="max-md:text-[.9rem]">
                  To create a future where every student, regardless of background, has the skills, confidence, and opportunities to thrive in the
                  digital age. We envision a world where coding is as fundamental as literacy, where Black and Brown students are equally represented
                  in high-paying tech careers, and where diversity drives innovation in every industry. Through engaging, accessible education and
                  strategic partnerships, we aim to empower the next generation to lead, create, and shape a more inclusive and equitable future in
                  technology.
               </p>
            </Fade>
         </div>
         {/* <img src="/assets/0002.png" alt="" className="w-full object-cover" /> */}
      </header>
   );
};

export default Header;
