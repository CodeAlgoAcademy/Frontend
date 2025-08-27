import React, { ReactElement, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import NavButton from "@/components/parents/UI/NavButton";
import { BsQuestion } from "react-icons/bs";
import { GiHelp } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { DEFAULT_SUPPORT } from "constants/support.const";

export interface ILink {
   name: string;
   icon: ReactElement;
   url: string;
}

interface Props {
   links: ILink[];
   isOpen: boolean;
   close(): void;
}

const TeacherSidebar = (props: Props) => {
   const router = useRouter();
   const [activeLink, setActiveLink] = useState(router?.pathname);
   return (
      <aside
         className={`
         ${props.isOpen ? "translate-x-0" : "translate-x-[100%]"}
         fixed top-0 right-0 z-[5]  h-full max-h-full w-full 
         overflow-y-scroll bg-white p-2 transition-all duration-500 md:left-0 
         md:!w-[300px] md:!translate-x-0 md:py-9 max-w820:hidden
      `}
      >
         <div className="mb-8 flex w-full items-center justify-between gap-2">
            <div className="block max-w-[150px]  md:mx-auto">
               <Link href={router?.pathname?.includes("/teacher") ? "/teachers/addClass" : "/organizers"}>
                  <Image src="/assets/CodeAlgo_Logo.png" alt="logo" loading="lazy" className="md:cursor-pointer" width={90} height={45} />
               </Link>
            </div>
            <span className="block md:hidden" onClick={props.close}>
               <MdClose size={26} cursor={"pointer"} />
            </span>
         </div>
         <>
            <div className="">
               {props?.links.map((link) => (
                  <div key={link.name} className=" mb-2 p-2">
                     <Link href={`${link.url}`} onClick={props.close}>
                        <div
                           className={
                              activeLink === link.url ||
                              (router?.pathname.includes(link.url) && link.url !== "/teachers" && link.url !== "/organizers")
                                 ? "flex w-full cursor-pointer items-center gap-6 rounded-md bg-mainColor px-[30px] py-3 text-white md:rounded-[28px]"
                                 : "flex cursor-pointer items-center gap-6 rounded-md px-[30px] py-3  text-mainColor hover:bg-slate-50 md:rounded-[28px] "
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

               <NavButton url={DEFAULT_SUPPORT.discord} title="Get Help" image={<GiHelp size={22} />} className="mx-auto max-w-[230px]" />
            </div>
         </>
      </aside>
   );
};

export default TeacherSidebar;
