import type { NextPage } from "next";
import React, { ChangeEvent, LegacyRef, useRef } from "react";
import Navbar from "@/components/navbar/home/Navbar";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import CharactersArrangement from "@/components/home/charactersArrangement";

type Colors = "blue" | "purple" | "orange" | "";

const colors: Colors[] = ["blue", "purple", "orange"];

const Home: NextPage = () => {
   // auto focus on page load
   const ref = useRef<HTMLTextAreaElement>();

   const [currentStep, setCurrentStep] = useState(0);

   const [selectedColor, setSelectedColor] = useState<Colors>(colors[currentStep]);

   // open the join waitlist modal once their code is correct the first time
   const [correctFirstTime, setCorrectFirstTime] = useState<boolean>(false);

   // to avoid repetition of code,
   const stepToMoveTo = currentStep === 2 ? 0 : currentStep + 1;

   const correctCode = `root.configure(bg="${colors[stepToMoveTo]}")`;

   const [code, setCode] = useState<string>("");

   const [status, setStatus] = useState<"correct" | "incorrect" | "">("");

   const isCodeCorrect = (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      // split to remove all emtpy spaces
      const newCode = code.split("\n").join("").split(" ").join("").trimEnd().trimStart();
      console.log(correctCode + " and " + newCode);
      // check if the value is among the correct codes
      if (correctCode === newCode) {
         setStatus("correct");
         setCurrentStep(stepToMoveTo);
         setSelectedColor(colors[stepToMoveTo]);
         setCode("");
         // Modal Functionality
         if (!correctFirstTime && currentStep === 0) {
            setCorrectFirstTime(true);
         }
      } else {
         setStatus("incorrect");
      }
   };

   React.useEffect(() => {
      const timeout = setTimeout(() => {
         setStatus("");
      }, 1500);
      return () => clearTimeout(timeout);
   }, [status]);

   React.useEffect(() => {
      // autofocus mini-compiler on page load
      ref?.current?.focus();
   }, []);

   return (
      <div className="relative overflow-x-hidden">
         <div className="flex min-h-screen w-screen flex-col overflow-x-hidden overflow-y-visible bg-home3 bg-cover bg-left lg:bg-none">
            <img
               src="/assets/background3.png"
               className={`bg-image hidden h-screen w-screen ${currentStep === 0 ? "bg-image lg:block" : "lg:hidden"}`}
               alt=""
            />{" "}
            <img
               src="/assets/background2.png"
               className={`bg-image hidden h-screen w-screen ${currentStep === 1 ? "bg-image lg:block" : "lg:hidden"}`}
               alt=""
            />{" "}
            <img
               src="/assets/background1.png"
               className={`bg-image hidden h-screen w-screen ${currentStep === 2 ? "bg-image lg:block" : "lg:hidden"}`}
               alt=""
            />
            <Navbar />
            <div className="z-3 absolute top-[80px] left-0 flex w-screen flex-1 flex-col items-center justify-center overflow-hidden bg-home3 bg-cover bg-left lg:flex-row lg:bg-none">
               <div className={styles.container}>
                  <div className={styles.textContainer + ` text-gray-900 ${currentStep === 1 && "lg:text-white"}`}>
                     <p className={styles.containerText}>We Believe Every Child is a genius!</p>
                     <p className="text-sm md:w-[550px]">
                        3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves coding as they play.
                     </p>
                     {/* Mini Compiler */}
                     <div className="relative">
                        <div
                           className="absolute top-[50px] left-[0] z-[2] hidden max-w-fit translate-x-[50%] bg-white p-2 text-gray-800 shadow-md after:absolute after:top-[0] after:left-[5px] after:h-[15px] after:w-[15px] after:-translate-y-[50%] after:rotate-45 after:bg-white lg:block"
                           style={{ textShadow: "0" }}
                        >
                           <p className="mb-1 text-[0.97rem] font-bold">Type the following:</p>
                           <p className="">
                              root.<span className="text-red-600">configure</span>
                              {"("}bg=<span className="text-blue-600">{`"${colors[stepToMoveTo]}"`}</span>
                              {")"}
                           </p>
                        </div>
                        <form action="" onSubmit={isCodeCorrect} className="hidden w-full max-w-[400px] lg:block">
                           <textarea
                              className="mt-2 block h-[100px] w-full  resize-none rounded-md bg-black p-2 text-white caret-white"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              ref={ref as LegacyRef<HTMLTextAreaElement>}
                           ></textarea>
                           <button type={"submit"} className="ml-auto mt-2 block max-w-fit rounded-md bg-black py-2 px-3 text-white shadow-md">
                              RUN
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
               <CharactersArrangement displayOtherChars={true}>
                  <img src={"/assets/bg3.png"} alt="" className={`w-full object-cover ${currentStep === 2 ? "bg-image block" : "hidden"}`} />
                  <img src={"/assets/bg2.png"} alt="" className={`w-full object-cover ${currentStep === 1 ? "bg-image block" : "hidden"}`} />
                  <img src={"/assets/bg1.png"} alt="" className={`w-full object-cover ${currentStep === 0 ? "bg-image block" : "hidden"}`} />
               </CharactersArrangement>
            </div>
         </div>
      </div>
   );
};

export default Home;

const styles = {
   container: "flex-1 flex bg-center h-full",
   textContainer: "py-16 relative px-2 md:px-[3rem] space-y-5 z-10",
   containerText: "capitalize text-5xl font-extrabold leading-[60px] md:w-[600px]",
};
