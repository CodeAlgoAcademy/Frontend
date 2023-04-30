import Image from "next/image";
import React from "react";
import { BsTwitter, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";

const socials = [
   { link: "https://twitter.com/stcodealgo", icon: <BsTwitter /> },
   { link: "https://linkedin.com/company/codealgo", icon: <BsLinkedin /> },
   { link: "https://facebook.com/stcodealgo", icon: <BsFacebook /> },
   { link: "https://instagram.com/stcodealgo", icon: <BsInstagram /> },
];

const Footer = () => {
   return (
      <footer className="mt-6 border-t-[1.5px] bg-orange-400 py-4 px-6">
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
                           className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[17px] text-orange-400"
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
