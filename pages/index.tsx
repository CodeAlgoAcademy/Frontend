import type { NextPage } from "next";
import React, { ChangeEvent, LegacyRef, useRef } from "react";
import Navbar from "@/components/navbar/home/Navbar";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import CharactersArrangement from "@/components/home/charactersArrangement";
import HomeVideo from "@/components/home/video";
import MobileView from "@/components/home/mobile-view";
import CorrectCodeModal from "@/components/modals/CorrectCodeModal";
import Hero from "@/components/home/new-home/hero";
import WhatWeBuilt from "@/components/home/new-home/what-we-built";
import LetsLearnTogether from "@/components/home/new-home/lets-learn-together";
import VoiceOfOurCommunity from "@/components/home/new-home/voice-of-our-community";
import GetStarted from "@/components/home/new-home/get-started";
import CodeToSuccess from "@/components/home/new-home/code-to-success";
import AsSeenIs from "@/components/home/new-home/as-seen-in";
import Footer from "@/components/home/new-home/footer";

type Colors = "blue" | "purple" | "orange" | "";

const colors: Colors[] = ["orange", "purple", "blue"];

// [
//    `root.configure( bg="${colors[stepToMoveTo]}" )`,
//    `root.configure(bg = "${colors[stepToMoveTo]}")`,
//    `root.configure(bg="${colors[stepToMoveTo]}")`,
// ];

const Home: NextPage = () => {
   // auto focus on page load
   const ref = useRef<HTMLTextAreaElement>();

   const [currentStep, setCurrentStep] = useState(0);

   const [selectedColor, setSelectedColor] = useState<Colors>(colors[currentStep]);

   // open the join waitlist modal once their code is correct the first time
   const [correctFirstTime, setCorrectFirstTime] = useState<boolean>(false);
   const [modalOpen, setModalOpen] = useState<boolean>(false);

   // to avoid repetition of code,
   const stepToMoveTo = currentStep === 2 ? 0 : currentStep + 1;

   // const correctCode = `root.configure(bg="${colors[stepToMoveTo]}")`;
   const correctCode = `print("ilovecodealgo")`;

   const [code, setCode] = useState<string>("");

   const [status, setStatus] = useState<"correct" | "incorrect" | "">("");

   const isCodeCorrect = (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      // split to remove all emtpy spaces
      const newCode = code.split("\n").join("").toLowerCase().split(" ").join("").trimEnd().trimStart();

      // check if the value is among the correct codes
      if (correctCode === newCode) {
         setStatus("correct");
         setCurrentStep(stepToMoveTo);
         setSelectedColor(colors[stepToMoveTo]);
         setCode("");
         // Modal Functionality
         if (!correctFirstTime && currentStep === 0) {
            setCorrectFirstTime(true);
            setModalOpen(true);
         }
      } else {
         setStatus("incorrect");
      }
   };

   // Video Logic
   const [isPlaying, setIsPlaying] = useState<boolean>(true);
   const [width, setWidth] = useState<number>(0);

   const stopVideo = () => {
      setTimeout(() => {
         setIsPlaying(false);
      }, 500);
   };

   const resizeWindow = () => {
      setWidth(window?.innerWidth);
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
      setWidth(window?.innerWidth);
      window.addEventListener("resize", resizeWindow);

      return () => window.removeEventListener("resize", resizeWindow);
   }, []);

   if (width < 1100) {
      return <MobileView />;
   }

   return (
      <div className="relative overflow-x-hidden">
         {modalOpen && <CorrectCodeModal setModalOpen={setModalOpen} />}
         <Navbar />
         <Hero />
         <WhatWeBuilt />
         <LetsLearnTogether />
         <VoiceOfOurCommunity />
         <GetStarted />
         <CodeToSuccess />
         <AsSeenIs />
         <Footer />
      </div>
   );
};

export default Home;

const styles = {
   container: "flex-1 flex bg-center h-full",
   textContainer: "py-16 relative px-2 md:px-[3rem] space-y-5 z-10",
   containerText: "capitalize text-5xl font-extrabold leading-[60px] md:w-[500px] text-[#333]",
};
