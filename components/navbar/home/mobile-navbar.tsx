import Image from "next/image";
import React, { FC, forwardRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { links, NavbarLink } from "./Links";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { cn } from "utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { Variant, motion } from "framer-motion";

interface NavbarProps {
   close(): void;
}

const variants: Record<string, Variant> = {
   hidden: {
      scale: 0,
      opacity: 1,
   },
   visible: {
      scale: 1,
      opacity: 1,
   },
};

const MobileNavbar: FC<NavbarProps> = ({ close }) => {
   const router = useRouter();

   return (
      <motion.aside
         variants={variants}
         initial="hidden"
         animate="visible"
         exit="hidden"
         className="fixed top-0 left-0 z-[100] flex h-screen w-screen flex-col bg-mainBlack py-6 px-8 font-thabit md:hidden"
      >
         <header className="flex items-center justify-between gap-4">
            <div onClick={() => (router.push("/"), close())}>
               <Image src={"/assets/landing/logo_white.png"} width={100} height={50} />
            </div>
            <MdClose onClick={close} color="white" size={28} />
         </header>

         <div className="mt-[80px] w-full flex-1 space-y-2">
            {links.map((link, index) => {
               const ref = useRef<HTMLDivElement>(null);
               return <SingleMobileLink link={link} ref={ref} key={index} />;
            })}
         </div>
      </motion.aside>
   );
};

interface Props {
   link: NavbarLink;
}

const SingleMobileLink = forwardRef<HTMLDivElement, Props>(({ link }, ref) => {
   const [isOpen, setIsOpen] = useState(false);
   const [height, setHeight] = useState(0);
   const router = useRouter();

   const innerRef = useRef<HTMLUListElement>(null);

   useEffect(() => {
      const element = (ref && "current" in ref ? ref.current : innerRef.current) as HTMLDivElement | null;

      if (element) {
         setHeight(element.clientHeight);
      }
   }, [ref, innerRef]);

   return (
      <div className="w-full text-white">
         <header
            onClick={() => {
               if (link.sublinks) {
                  setIsOpen(!isOpen);
               } else {
                  router.push(link.route!);
                  close();
               }
            }}
            className="flex items-center justify-between p-4 hover:bg-black/10"
         >
            <h1 className="text-[1.3rem]">{link.name}</h1>
            {link.sublinks && <span className="text-white">{isOpen ? <BiChevronUp size={25} /> : <BiChevronDown size={25} />}</span>}
         </header>

         <div className={cn("overflow-hidden font-sans transition-all  duration-300")} style={{ height: isOpen ? height : 0 }}>
            <div ref={(ref as MutableRefObject<HTMLDivElement>) || innerRef} className="py-3 px-4 text-[.9rem]">
               {link.sublinks?.map((link, index) => {
                  return (
                     <li key={index} onClick={close}>
                        <Link href={link.link}>
                           <p className="rounded-md p-2 text-[.9rem] transition-all duration-300 hover:bg-mainPink hover:text-white" key={index}>
                              {link.name}
                           </p>
                        </Link>
                     </li>
                  );
               })}
            </div>
         </div>
      </div>
   );
});

SingleMobileLink.displayName = "SingleMobileLink";

export default MobileNavbar;
