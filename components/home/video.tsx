import Image from "next/image";
import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import ReactPlayer from "react-player";
import Button from "../UI/Button";
import Navbar from "../navbar/home/Navbar";

interface HomeVideoProps {
   stopVideo: () => void;
}

const HomeVideo = (props: HomeVideoProps) => {
   return (
      <>
         <section className="relative z-[3] h-screen w-screen bg-[rgb(244,244,244)] pt-[0px]">
            <div className="absolute top-0 left-0 z-[4] h-screen w-screen bg-opacity-20 bg-gradient-to-tr from-[rgb(244,244,244)] to-[rgba(251,251,251,0.58)]"></div>
            <div className="ml-auto h-[100%] w-[80%] overflow-hidden rounded-bl-[50%]">
               <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  url="https://youtu.be/cijtWZ1I2i4"
                  playing={true}
                  muted={true}
                  controls={false}
                  loop={true}
                  style={{ height: "", width: "100%" }}
                  onEnded={props.stopVideo}
                  // fallback={<img className="hidden h-screen w-screen" src="/assets/background1.png" alt="" />}
               />
            </div>
         </section>
      </>
   );
};

export default HomeVideo;
