import Image from "next/image";
import React from "react";
import { cn } from "utils";

const AsSeenIs = () => {
   return (
      <div className="mx-auto mt-10 max-w-[1200px] px-6 pb-12">
         <div className="mx-auto mt-8 mb-20 flex h-[8px] w-[500px] max-w-[90vw] md:mt-12 md:mb-28">
            {["bg-[#0961D6]", "bg-[#FF0D11]", "bg-[#FF98CE]", "bg-[#FF98CE]", "bg-[#FF0D11]", "bg-[#0961D6]"]?.map((bg, index) => (
               <span key={index} className={cn("block h-full flex-1", bg)}></span>
            ))}
         </div>

         <h1 className="text-center font-tiltWarp text-[2.1rem] max-md:text-[1.5rem]">AS SEEN IN</h1>

         <div className="mx-auto mt-12 max-w-[1200px]">
            <Image src={"/assets/landing/as-seen-in.png"} width={2000} height={600} />
         </div>
      </div>
   );
};

export default AsSeenIs;
