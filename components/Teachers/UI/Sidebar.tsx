import React, { ReactElement, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import NavButton from "@/components/parents/UI/NavButton";
import { BsQuestion } from "react-icons/bs";
import { GiHelp } from "react-icons/gi";

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
               <Image src="/assets/CodeAlgo_Logo.png" alt="logo" loading="lazy" className="md:cursor-pointer" width={200} height={100} />
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
                                 ? "flex cursor-pointer items-center gap-6 rounded-[28px] bg-mainColor px-[30px] py-[14px] text-white"
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

               <NavButton url="https://discord.gg/9cvbR5SU2" title="Get Help" image={<GiHelp />} className="!justify-center" />
            </div>
         </>
      </div>
   );
};

export default Sidebar;
