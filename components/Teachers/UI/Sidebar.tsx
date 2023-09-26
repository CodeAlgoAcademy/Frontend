import React, { ReactElement, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

interface ILink {
   name: string;
   icon: ReactElement;
   url: string;
}

interface Props {
   links: ILink[];
}

const Sidebar = (props: Props) => {
   const router = useRouter();
   const [activeLink, setActiveLink] = useState(router?.pathname);
   return (
      <div className="overflow-auto pb-10 md:overflow-hidden md:hover:overflow-auto">
         <div className="relative mx-auto my-8 h-[60px] w-[100px]">
            <Link href={router?.pathname?.includes("/teacher") ? "/teachers/addClass" : "/organizers"}>
               <a>
                  <Image src="/assets/CodeAlgo_Logo.png" alt="logo" loading="lazy" className="md:cursor-pointer" layout="fill" objectFit="contain" />
               </a>
            </Link>
         </div>
         <>
            <div className="">
               {props?.links.map((link) => (
                  <div key={link.name} className="mx-auto mb-5 w-[228px]">
                     <Link href={`${link.url}`}>
                        <div
                           className={
                              activeLink === link.url ||
                              (router?.pathname.includes(link.url) && link.url !== "/teachers" && link.url !== "/organizers")
                                 ? "bg-mainColor flex cursor-pointer items-center gap-6 rounded-[28px] px-[30px] py-[14px] text-white"
                                 : "flex cursor-pointer items-center gap-6 rounded-[28px] px-[30px]  py-[14px] text-gray-600 hover:bg-slate-50 "
                           }
                           onClick={() => {
                              setActiveLink(() => link.url);
                           }}
                        >
                           <span
                              className={`text-lg ${
                                 activeLink === link.url ||
                                 (router?.pathname.includes(link.url) && link.url !== "/teachers" && link.url !== "/organizers")
                                    ? "text-white"
                                    : "text-mainColor"
                              }`}
                           >
                              {link.icon}
                           </span>
                           <span className="text-base font-semibold capitalize">{link.name}</span>
                        </div>
                     </Link>
                  </div>
               ))}
            </div>
         </>
      </div>
   );
};

export default Sidebar;
