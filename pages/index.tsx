import type { NextPage } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import and from "../public/assets/and.png";
import hello from "../public/assets/hello.png";
import slash from "../public/assets/slash.png";
import smaller from "../public/assets/smaller.png";
import true1 from "../public/assets/true.png";
import img13 from "../public/assets/0013.png";
import img7 from "../public/assets/0007.png";
import img10 from "../public/assets/0010.png";
import img1 from "../public/assets/0001.png";

const Home: NextPage = () => {
   const [x, setX] = useState(0);
   const [y, setY] = useState(0);

   const mouseMove = (e: any) => {
      console.log(e.clientX);
      setX(e.clientX / 30);
      setY(e.clientY / 30);
   };

   return (
      <div className="relative" onMouseMove={mouseMove}>
         <div className="h-screen w-screen overflow-hidden">
            <Navbar />
            <div className={styles.container} style={{ textShadow: "0px 2px 2px rgba(0,0,0,0.3)" }}>
               <div className={styles.textContainer}>
                  <p className={styles.containerText}>Coding for kids and Teens made easy</p>
                  <p className="text-sm md:w-[550px]">
                     3D games from CodeAlgo academy will bring students to compiter sciences where they can teach themselves as they play.
                  </p>
                  <Link href="/selectUserType">
                     <button className="w-[120px] rounded-md bg-blue-400 p-3 font-bold text-white">Sign up</button>
                  </Link>
               </div>
            </div>
            <div className="absolute top-0 bottom-0 overflow-hidden right-0 left-0 z-1 opacity-90" style={{ left: x, top: y }}>
               <div className="absolute right-[300px] w-[600px]">
                  <Image src={img1} alt="" className="w-full" />
               </div>
               <div className="absolute -top-[200px] right-0 rotate-[20deg] w-[800px]">
                  <Image src={and} alt="" className="w-full" />
               </div>
               <div className="absolute top-[50px] right-10 w-[800px]">
                  <Image src={hello} alt="" className="w-full" />
               </div>
               <div className="absolute -right-60 w-[800px]">
                  <Image src={slash} alt="" className="w-full" />
               </div>
               <div className="absolute top-0 right-60 w-[800px]">
                  <Image src={smaller} alt="" />
               </div>
               <div className="absolute">
                  <Image src={true1} alt="" />
               </div>
               <div className="absolute top-0 right-60 w-[800px]">
                  <Image src={img13} alt="" />
               </div>
               <div className="absolute top-0 right-60 w-[800px]">
                  <Image className="absolute top-0" src={img7} alt="" />
               </div>
               <div className="absolute top-0 right-60 w-[800px]">
                  <Image className="absolute top-0" src={img10} alt="" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;

const styles = {
   container: "relative flex bg-home bg-center h-full md:bg-right bg-cover bg-no-repeat",
   textContainer: "py-20 md:py-32 relative px-2 md:px-20 text-gray-800 space-y-5 z-10",
   containerText: "capitalize text-5xl font-extrabold leading-[60px] md:w-[600px]",
};
