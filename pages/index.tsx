import type { NextPage } from "next";
import React from "react";
import Navbar from "@/components/navbar/home/Navbar";
import Hero from "@/components/home/new-home/hero";
import WhatWeBuilt from "@/components/home/new-home/what-we-built";
import VoiceOfOurCommunity from "@/components/home/new-home/voice-of-our-community";
import GetStarted from "@/components/home/new-home/get-started";
import CodeToSuccess from "@/components/home/new-home/code-to-success";
import AsSeenIs from "@/components/home/new-home/as-seen-in";
import Footer from "@/components/home/new-home/footer";
import ValuePropositions from "@/components/home/new-home/ValuePropositions";

const Home: NextPage = () => {
   return (
      <div className="relative  bg-white" suppressHydrationWarning>
         <Navbar />
         <Hero />
         <ValuePropositions /> 
         <WhatWeBuilt />
         <GetStarted />
         <CodeToSuccess />
         <VoiceOfOurCommunity />
         <AsSeenIs />
         <Footer />
      </div>
   );
};

export default Home;
