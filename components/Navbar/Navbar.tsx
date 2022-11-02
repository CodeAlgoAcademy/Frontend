import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/assets/imgs/CodeAlgo_Logo.png";
import NavLinks from "./NavLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="flex items-center font-medium justify-around">
        <div className="md:w-auto w-full px-5 md:px-0 flex justify-between md:justify-around items-center">
          <Image
            src={logo}
            alt="logo"
            className="md:cursor-pointer h-9"
            width={120}
            height={80}
          />
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            {open ? <IoCloseOutline /> : <GiHamburgerMenu />}
          </div>
        </div>
        <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <li>
            <Link href="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
        </ul>

        {/* Mobile nav */}
        <ul
          className={`z-50 md:hidden bg-white fixed w-full top-20 overflow-y-auto bottom-0 py-24 pl-4 duration-500 ${
            open ? "left-0" : "left-[-100%]"
          }`}
        >
          <li className="px-3 py-7 inline-block">
            <Link href="/">Home</Link>
          </li>
          <NavLinks />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
