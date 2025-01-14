import Image from "next/image";
import React, { Fragment, useState } from "react";
import { links } from "./Links";
import Button, { CustomButton } from "@/components/UI/Button";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import AccessibilityMenu from "./AccessibilityMenu";
import { IoAccessibility, IoPerson } from "react-icons/io5";
import { cn } from "utils";
import { BiMenu } from "react-icons/bi";
import MobileNavbar from "./mobile-navbar";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
   const [showAccessibilityMenu, setShowAccessibiliyMenu] = useState(false);
   const [heading, setHeading] = useState("");
   const router = useRouter();
   const [showMobileNav, setShowMobileNav] = useState(false);
   const isMobile = useMediaQuery("(max-width: 768px)");
   const { push } = useRouter();

   return (
      <nav className="sticky top-0 left-0 z-[500] bg-mainBlack px-6 py-4">
         <div className="mx-auto flex items-center justify-between">
            <ul className="flex items-center gap-6">
               <Link href={"/"}>
                  <img src={"/assets/landing/logo_white.png"} width={isMobile ? 70 : 100} height={isMobile ? 35 : 50} />
               </Link>

               <div className="h-[30px] w-[3px] rounded-full bg-white/70"></div>

               <span
                  className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-black"
                  onClick={() => setShowAccessibiliyMenu(!showAccessibilityMenu)}
               >
                  <IoAccessibility size={isMobile ? 20 : 25} color="white" />
               </span>

               <AnimatePresence>
                  <AccessibilityMenu onClose={() => setShowAccessibiliyMenu(false)} open={showAccessibilityMenu} />
               </AnimatePresence>

               <div className="flex items-center gap-6 max-md:hidden">
                  {links.map((link, index) => {
                     return (
                        <Fragment key={index}>
                           <div className="h-[30px] w-[3px] rounded-full bg-white/70"></div>
                           <div
                              className="relative"
                              onMouseEnter={() => {
                                 if (link.sublinks) {
                                    setHeading(link.name);
                                 }
                              }}
                              onMouseLeave={() => {
                                 if (link.sublinks) {
                                    setHeading("");
                                 }
                              }}
                              onClick={() => {
                                 if (link.name == heading) {
                                    setHeading("");
                                 } else {
                                    setHeading(link.name);
                                 }

                                 if (link.route) {
                                    router.push(link.route);
                                 }
                              }}
                           >
                              <p className="text-white">
                                 <Link href={""}>{link.name}</Link>
                              </p>

                              <div
                                 className={cn(
                                    "absolute top-[100%] left-0 z-[100] min-h-fit min-w-[120px] cursor-pointer bg-white",
                                    heading != link.name && "hidden"
                                 )}
                              >
                                 {link.sublinks?.map((slinks, index) => (
                                    <Link key={index} href={slinks.link}>
                                       <p className="z-[400] p-2 text-[.85rem] hover:bg-mainRed/20">{slinks.name}</p>
                                    </Link>
                                 ))}
                              </div>
                           </div>
                        </Fragment>
                     );
                  })}
               </div>

               <AnimatePresence>{showMobileNav && <MobileNavbar close={() => setShowMobileNav(false)} />}</AnimatePresence>
            </ul>

            <CustomButton
               onClick={() => push("https://play.codealgoacademy.com")}
               variant="filled"
               size="medium"
               className="bg-mainRed font-bold !text-white hover:bg-mainRed/80 max-md:hidden"
            >
               <span className="no-contrast-adjust">PLAY GAME</span>
            </CustomButton>

            <BiMenu className="text-white md:hidden" size={28} onClick={() => setShowMobileNav(true)} />
         </div>
      </nav>
   );
};

export default Navbar;
