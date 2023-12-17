import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavLinks from "./NavLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import Buttons from "./Buttons";
import BetaButton from "@/components/UI/beta-button";

const Navbar = () => {
   const [open, setOpen] = useState(false);

   return (
      <nav className="bg-white">
         <div className={styles.container}>
            <div className={styles.mobilleHeader}>
               <Link href="/">
                  <Image alt="logo" src="/assets/CodeAlgo_Logo.png" className={styles.headerImage} width={110} height={55} />
               </Link>
               <div className={styles.hamburgerContainer} onClick={() => setOpen(!open)}>
                  <BetaButton />
                  {open ? <IoCloseOutline /> : <GiHamburgerMenu />}
               </div>
            </div>
            <ul className={styles.headerCenter}>
               <NavLinks />
            </ul>
            <div className={styles.headerRight}>
               <BetaButton />
               <Buttons />
            </div>

            {/* Mobile nav */}
            <ul className={`${styles.mobileNav} ${open ? "left-0" : "left-[-100%]"}`}>
               <NavLinks />
               <Buttons />
            </ul>
         </div>
      </nav>
   );
};

export default Navbar;

const styles = {
   container: "flex items-center font-medium justify-between px-2 md:px-10  z-[50] w-full bg-white",
   mobilleHeader: "md:w-auto w-full px-5 md:px-0 flex justify-between md:justify-around items-center",
   headerImage: "md:cursor-pointer h-9",
   hamburgerContainer: "text-3xl md:hidden flex items-center gap-2",
   headerCenter: "md:flex hidden capitalise items-center gap-8 font-normal",
   headerRight: "hidden md:flex items-center gap-2",
   mobileNav: "z-50 md:hidden bg-white fixed w-full top-20 overflow-y-auto bottom-0 py-24 px-4 duration-500",
};
