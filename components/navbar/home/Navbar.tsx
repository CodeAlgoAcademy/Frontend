import Image from "next/image";
import React, { Fragment } from "react";
import { links } from "./Links";
import Button, { CustomButton } from "@/components/UI/Button";
import Link from "next/link";

const Navbar = () => {
   return (
      <nav className="bg-mainBlack px-2 py-4">
         <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-6">
               <Link href={"/"}>
                  <Image src={"/assets/landing/logo_white.png"} width={100} height={50} />
               </Link>

               <Image src={"/assets/landing/nav_human.png"} width={50} height={50} />

               {links.map((link, index) => {
                  return (
                     <Fragment key={index}>
                        <div className="h-[30px] w-[3px] bg-slate-400"></div>
                        <p className="text-white">{link.name}</p>
                     </Fragment>
                  );
               })}
            </div>

            <CustomButton variant="filled" size="medium" className="text-white">
               Play Game
            </CustomButton>
         </div>
      </nav>
   );
};

export default Navbar;
