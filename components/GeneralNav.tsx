import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/assets/CodeAlgo_Logo.png";
import { BiHomeAlt } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

  const toggleClassTab = () => {
    setClassTab(!classTab);
  };
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
                  <h5 className="font-bold">{selectedClass}</h5>
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
                        <h5 className="font-bold">{option.name}</h5>
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
      <div className="rounded-[30px] px-2 py-[6px] w-[120px] flex items-center justify-between border border-[#BDBDBD]">
        <div className="overflow-hidden rounded-full flex items-center">
          <Image
            src="/assets/imgs/Assets/avatar.png"
            alt="avatar"
            className="md:cursor-pointer h-9"
            width={35}
            height={35}
          />
        </div>
        <div className="text-[32px] text-[#838383]">
          <RiArrowDropDownLine />
        </div>
      </div>
    </nav>
  );
};

export default GeneralNav;
