import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Navbar from "../navbar/home/Navbar";

const MobileView = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   return (
      <>
         <Navbar />
         <section className="min-h-screen w-full bg-[#f4f4f4] pt-[60px]">
            <header className="relative min-h-[50vh] w-full  ">
               <div className="absolute top-0 left-0 z-[4] h-[50vh] w-full bg-opacity-20 bg-gradient-to-tr from-[rgb(187,186,186)] to-[#ffffff94] px-6 pt-8 text-[#333]">
                  <h2 className="text-[2.5rem] font-bold leading-[1.2]">Welcome to CodeAlgo Academy</h2>
                  <p className="mt-4 max-w-[300px] text-[1.1rem] font-bold leading-[1.4]">We Believe Every Child is a genius!</p>

                  <img src="/assets/0008_1.png" alt="" className="absolute -bottom-[70px] right-0 h-[150px] w-[100px] cursor-pointer" />
               </div>

               <div className="z-[3] h-[50vh] w-full overflow-hidden">
                  {mounted && (
                     <ReactPlayer
                        width={"100%"}
                        height={"100%"}
                        url="https://youtu.be/cijtWZ1I2i4"
                        playing={true}
                        muted={true}
                        controls={false}
                        loop={true}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                     />
                  )}
               </div>
            </header>

            <div className="min-h-[40vh] p-6">
               <p className="mt-2 mb-4 max-w-[400px] text-[0.9rem]">
                  3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves coding as they play.
               </p>
               <p className="mb-2 font-bold text-gray-800">Create your account: </p>
               <Link href="/signup">
                  <button className="rounded-md bg-orange-400 px-5 py-3 font-bold text-white">Sign Up</button>
               </Link>
            </div>
         </section>
      </>
   );
};

export default MobileView;
