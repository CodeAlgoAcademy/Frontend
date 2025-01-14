import Image from "next/image";
import React from "react";
import { socials } from "./new-home/footer";

const Footer = () => {
   return (
      <footer className="mt-6 border-t-[1.5px] bg-mainRed py-4 px-6">
         <div className="mx-auto max-w-[1100px]">
            <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row">
               <p className="block text-center font-bold text-white md:hidden">
                  Copyright &copy; {new Date().getFullYear()} CodeAlgo Academy - All Rights Reserved
               </p>
               <div className="flex items-center justify-center gap-3">
                  {socials.map((social, index) => {
                     return (
                        <a
                           href={social.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[17px] text-mainRed"
                           key={index}
                        >
                           {social.icon}
                        </a>
                     );
                  })}
               </div>
               <p className="hidden text-center font-bold text-white md:block">
                  Copyright &copy; {new Date().getFullYear()} CodeAlgo Academy - All Rights Reserved
               </p>

               <p className="text-center font-bold text-white">720 Main St, Kansas City MO, 64105</p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
