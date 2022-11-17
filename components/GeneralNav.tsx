import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/assets/CodeAlgo_Logo.png";
import { BiHomeAlt, BiLogOut } from "react-icons/bi";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiArrowUpLine } from "react-icons/ri";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import {motion} from 'framer-motion'

const classOptions = [
  {
    name: "Class A",
    color: "#F6B86F",
  },
  {
    name: "Class B",
    color: "#AADE98",
  },
  {
    name: "Class C",
    color: "#92C7F7",
  },
  {
    name: "Class D",
    color: "#FFE977",
  },
];

const GeneralNav = () => {
  const [classTab, setClassTab] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>("Class C");
  const [classColor, setClassColor] = useState<string>("#92C7F7");
  const [userDropDown, setUserDropDown] = useState<boolean>(false);

  const toggleClassTab = () => {
    setClassTab(!classTab);
  };
  const toggleUserDropDown = () => {
    setUserDropDown(!userDropDown);
  }

  return (
    <nav className="py-6 px-[5%] bg-white flex items-center justify-between">
      <div className="relative flex items-center gap-40">
        <div className="max-w-[200px]">
          <Image
            src={Logo}
            alt="logo"
            className="md:cursor-pointer h-9"
            width={100}
            height={52}
          />
        </div>
        <div className="flex-1 flex gap-4">
          <div className="text-[#616161] text-[24px] cursor-pointer">
            <Link href="/addClass">
              <BiHomeAlt />
            </Link>
          </div>
          <div className="relative flex items-center gap-4">
            {/* selected hidden at first visible after click */}
            {!classTab && (
              <div
                onClick={toggleClassTab}
                className="absolute w-[14rem] flex justify-between items-center border rounded-full border-[#BDBDBD]  px-3.5 py-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="h-8  w-8 rounded-full"
                    style={{ background: classColor }}
                  ></span>
                  <h5 className="font-bold selec-none">{selectedClass}</h5>
                </div>  
                <FaChevronDown className="text-[#838383]" />
              </div>
            )}
            {classTab && (
              <div
                onClick={toggleClassTab}
                className="border-[#BDBDBD] border rounded-[1.6rem] absolute -top-4 left-0 bg-white z-30"
              >
                {classOptions.map((option) => {
                  return (
                    <div
                      className="w-[14rem] flex justify-between items-center border-b-2  px-3.5 py-2.5"
                      onClick={() => {
                        setSelectedClass(option.name),
                          setClassColor(option.color);
                      }}
                      key={option.name}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="h-8 w-8 rounded-full"
                          style={{ background: option.color }}
                        ></span>
                        <h5 className="font-bold select-none">{option.name}</h5>
                      </div>
                      {option.name == "Class A" ? (
                        <FaChevronUp className=" text-[#838383]" />
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div  className={userDropDown ? `rounded-[20px] px-4 py-[6px] bg-white  border border-[#BDBDBD] absolute right-10 top-7  w-[16rem] h-[13rem] box-border duration-200 ease-in-out`: `rounded-[30px] px-2 py-[6px] h-[3rem] w-[7rem] border border-[#BDBDBD] absolute box-border right-10 top-7 bg-white  transition-[width]`}>
        <div className="flex items-center justify-between">
            <div className="overflow-hidden rounded-full flex items-center">
              <Image
                src="/assets/avatar.png"
                alt="avatar"
                className="md:cursor-pointer h-9"
                width={35}
                height={35}
              />
            </div>
            {userDropDown && <div>
              <motion.h5 className="text-sm ml-2 font-[700] whitespace-nowrap" 
              initial={{display: 'none', opacity: 0}}
              animate={{ display: 'block', opacity: 1, transition:{duration: '1', delay: 0.3}}}
              >Stephen Williams</motion.h5>
            </div>}
            <div className="text-[32px] pl-6 text-[#838383] " onClick={toggleUserDropDown}>
              {userDropDown ? <RiArrowDropUpLine /> :<RiArrowDropDownLine />}
            </div>
        </div>
        {userDropDown && <div className="relative z-10">
          <a href="/settings" target="_blank">
          <div>
            <motion.div className="flex items-center border-t border-black mt-4 pt-4"
              initial={{opacity: 0, y: '5px'}}
              animate={{opacity: 1, y: 0, transition:{duration: '0.5'}}}
            >
              <span className="text-xl"><IoSettingsSharp /></span>
              <motion.h5 className="text-sm ml-2 font-[700] select-none">Settings</motion.h5>
            </motion.div>
            </div>
            </a>
            <motion.div className="flex items-center mt-[5rem]"
              initial={{opacity: 0, y: '5px'}}
              animate={{opacity: 1, y: 0, transition:{delay: 0.3, duration: '0.5'}}}
            >
              <span><BiLogOut /></span>
              <h5 className="text-sm ml-2 font-[500]">Logout</h5>
            </motion.div>
        </div>}
      </div>
    </nav>
  );
};

export default GeneralNav;
