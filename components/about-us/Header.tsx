/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";
import CharactersArrangement from "../home/charactersArrangement";

const Header = () => {
   return (
      <header className="">
         <div className="mb-[5rem] flex h-screen w-full  flex-col bg-home1 bg-cover bg-left pt-[6rem] lg:mb-0 lg:pt-0">
            <div className="z-3 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center  p-6 lg:flex-row">
               <div className="flex-1">
                  <Fade triggerOnce={true} direction={"up"} duration={1000}>
                     <h1 className="text-[3.5rem] font-bold leading-[1.1] text-slate-700 md:max-w-[500px]">
                        About{" "}
                        <span className="bg-gradient-to-r from-red-500 via-yellow-300 to-orange-600 bg-clip-text font-extrabold text-transparent">
                           CodeAlgo Academy
                        </span>
                     </h1>
                  </Fade>
                  <Fade triggerOnce={true} direction="up" duration={1000} delay={400}>
                     <p className="mt-2 text-[1.3rem] text-slate-700 md:max-w-[500px]">At CodeAlgo Academy, we believe every child is a genius!</p>
                  </Fade>
                  <Fade triggerOnce={true} direction="up" duration={1000} delay={400}>
                     <Link href={"/login/select-account-type"}>
                        <button className="mt-8 min-w-fit rounded-lg bg-orange-400 p-3 text-[15px] font-bold text-white shadow-md">Sign in</button>
                     </Link>
                  </Fade>
               </div>
               <CharactersArrangement>
                  <img src="/assets/about-page-hero.png" className="block w-full object-cover" alt="" />
               </CharactersArrangement>
            </div>
         </div>
         <div className="space-y-5 py-10 text-center text-slate-600 sm:px-20 md:px-80">
            <Fade triggerOnce={true} cascade duration={1000} direction={"up"}>
               <p className="text-4xl font-semibold">Our Mission</p>
               <p className="">
                  Our mission is to normalize coding in elementary and middle school, so kids can develop critical thinking and problem-solving skills
                  before reaching high school. We strive to make learning to code a fun and engaging experience that sets our students up for a
                  successful future.
               </p>
            </Fade>
         </div>
         <img src="/assets/0002.png" alt="" className="w-full object-cover" />
      </header>
   );
};

export default Header;
