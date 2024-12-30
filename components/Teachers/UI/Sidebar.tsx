import React, { ReactElement, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import NavButton from "@/components/parents/UI/NavButton";
import { BsQuestion } from "react-icons/bs";
import { GiHelp } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { DEFAULT_SUPPORT } from "constants/support.const";

interface ILink {
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
      <div
         className={`small-scroll-thumb fixed top-0 left-0 z-[5] h-screen max-h-screen w-full overflow-auto overflow-y-scroll bg-white px-4 pb-10 pt-7 transition-all duration-300 md:w-[300px] md:!translate-x-0 md:overflow-hidden md:px-0 md:hover:overflow-auto ${
            props.isOpen ? "translate-x-0" : "translate-x-[100%]"
         }`}
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
                  <div key={link.name} className="mx-auto mb-5 md:w-[228px]">
                     <Link href={`${link.url}`} onClick={props.close}>
                        <div
                           className={
                              activeLink === link.url ||
                              (router?.pathname.includes(link.url) && link.url !== "/teachers" && link.url !== "/organizers")
                                 ? "flex cursor-pointer items-center gap-6 rounded-md bg-mainColor px-[30px] py-3 text-white md:rounded-[28px]"
                                 : "flex cursor-pointer items-center gap-6 rounded-md px-[30px] py-3  text-gray-600 hover:bg-slate-50 md:rounded-[28px] "
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
      </div>
   );
};

export default TeacherSidebar;
