import Image from "next/image";
import React from "react";

const Hero = () => {
   return (
      <header className="relative">
         <video src="/assets/landing/hero.mp4" className="h-[90vh] w-full object-cover" loop muted controls={false} autoPlay={true}></video>
         <div className="absolute top-[40px] left-[50%] -translate-x-[50%]">
            <Image src={"/assets/landing/code-your-way-to-success.png"} width={800} height={50} />
         </div>
      </header>
   );
};

export default Hero;
