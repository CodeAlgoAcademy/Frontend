import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { BiBell, BiHomeAlt, BiLogOut } from "react-icons/bi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentClass } from "../store/currentClassSlice";
import { IClass, CurrentClassState } from "../types/interfaces";
import { motion } from "framer-motion";
import { IoSettingsSharp } from "react-icons/io5";
import { resetAuthUser } from "store/authSlice";

const GeneralNav = () => {
  const [userDropDown, setUserDropDown] = useState<boolean>(false);
  const [settingsTabOpen, setSettingsTabOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useSelector(
    (state: RootState): IClass[] => state.allClasses.classes
  );
  const { firstname, lastname } = useSelector((state: RootState) => state.user);
  const currentClass = useSelector(
    (state: RootState): CurrentClassState => state.currentClass
  );
  const classDetails = classes.map((item: CurrentClassState) => {
    const { className, color } = item;
    return { className, color };
  });
  const otherClassDetails = classDetails.filter(
    (item: CurrentClassState) => item.className !== currentClass.className
  );

  const [classListView, setClassListView] = useState(false);

  const dropdownStyle = {
    transform: classListView ? "rotate(180deg)" : "",
    transition: "transform 150ms ease",
  };

  const classListStyle = {
    maxHeight: classListView ? "" : "56px",
    transition: "max-height 200ms ease",
    overflowY: classListView ? "auto" : "hidden",
    height: classListView ? "191.9px" : "",
  } as React.CSSProperties;

  const toggleUserDropDown = () => {
    setUserDropDown(!userDropDown);
  };
  const classBox = useRef<HTMLDivElement>(null);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(resetAuthUser());
    router.push("/login");
  };

  return (
    <div className="py-6 px-[5%] bg-white flex items-center justify-between">
      <div className="relative flex items-center gap-40">
        <div className="absolute left-0 top-0">
          <Link href="/addClass">
            <Image
              src="/assets/CodeAlgo_Logo.png"
              alt="logo"
              className="md:cursor-pointer h-9"
              width={100}
              height={52}
            />
          </Link>
        </div>
        <div></div>
        <div className="flex items-center gap-4">
          <Link href={`/addClass`}>
            <div className="text-[#616161] text-[24px]">
              <BiHomeAlt />
            </div>
          </Link>
          <div className="relative h-[52px]">
            <div className="overflow-hidden rounded-[28px] absolute left-0 top-0">
              <div
                className="rounded-[28px] z-10 w-[260px] border border-[#BDBDBD] divide-y overflow-hidden bg-white small-scroll-thumb"
                style={classListStyle}
                ref={classBox}
              >
                <div className="py-2 px-3 relative flex items-center justify-between hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: currentClass?.color }}
                      className='rounded-full content-[" "] w-[24px] h-[24px]'
                    ></span>
                    <span className="font-bold text-[18px]">
                      {currentClass.className}
                    </span>
                  </div>
                  <div
                    className="hover:b rounded-lg p-1"
                    onClick={() => setClassListView((prev) => !prev)}
                  >
                    <div
                      className="text-[32px] text-[#838383]"
                      style={dropdownStyle}
                    >
                      <RiArrowDropDownLine />
                    </div>
                  </div>
                </div>
                {otherClassDetails?.map((navClass: CurrentClassState) => (
                  <div
                    className="py-2 px-3 relative flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                    key={navClass.className}
                    onClick={() => {
                      dispatch(
                        updateCurrentClass({
                          className: navClass.className,
                          color: navClass.color,
                        })
                      );
                      const node = classBox.current;
                      if (node) {
                        node.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                      setClassListView((prev) => false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        style={{ backgroundColor: navClass?.color }}
                        className='rounded-full content-[" "] w-[24px] h-[24px]'
                      ></span>
                      <span className="font-bold text-[18px]">
                        {navClass.className}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div
          className={
            userDropDown
              ? `rounded-[20px] px-4 py-[6px] bg-white z-40 border border-[#BDBDBD] absolute right-[8rem] top-7 w-[16rem] ${
                  settingsTabOpen ? "h-[18rem]" : "h-[10rem]"
                } box-border duration-300 ease-in-out`
              : `rounded-[30px] px-2 py-[6px] h-[3rem] w-[7rem] border border-[#BDBDBD] absolute box-border right-[8rem] top-7 bg-white  transition-[width]`
          }
        >
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
            {userDropDown && (
              <div>
                <motion.h5
                  className="text-sm capitalize ml-2 font-[700] whitespace-nowrap"
                  initial={{ display: "none", opacity: 0 }}
                  animate={{
                    display: "block",
                    opacity: 1,
                    transition: { duration: "1", delay: 0.3 },
                  }}
                >
                  {firstname + " " + lastname}
                </motion.h5>
              </div>
            )}
            <div
              className="text-[32px] pl-6 text-[#838383] "
              onClick={toggleUserDropDown}
            >
              {userDropDown ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </div>
          </div>
          {userDropDown && (
            <div className="relative z-10">
              <div>
                <motion.header
                  className="flex w-full items-center  mt-4 pt-4 justify-between border-t border-black"
                  initial={{ opacity: 0, y: "5px" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: "0.5" },
                  }}
                  onClick={() => {
                    setSettingsTabOpen((prev) => !prev);
                  }}
                >
                  <div className="flex items-center">
                    <span className="text-xl">
                      <IoSettingsSharp />
                    </span>
                    <motion.h5 className="text-sm ml-2 font-[700] select-none">
                      Settings
                    </motion.h5>
                  </div>
                  <span className="text-sm font-light">
                    {settingsTabOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </motion.header>
                <main
                  className={`w-full flex flex-col mt-4 gap-2 transition duration-300 ${
                    settingsTabOpen ? "h-[125px]" : "h-0"
                  } overflow-hidden`}
                >
                  <article className="w-full flex gap-2 h-[35px] items-center border hover:border-mainPurple rounded-[4px] px-2">
                    <input
                      type="text"
                      className="border-none outline-none w-full h-full text-black text-[15px] tracking-wider placeholder:text-gray-500 cursor-pointer"
                      placeholder="Update username"
                    />
                    <span className="text-xl font-bold flex-[0.2] text-gray-900 relative">
                      <FaEdit />
                    </span>
                  </article>
                  <article className="w-full flex gap-2 h-[35px] items-center border hover:border-mainPurple rounded-[4px] px-2">
                    <input
                      type="text"
                      className="border-none outline-none w-full h-full text-black text-[15px] tracking-wider placeholder:text-gray-500 cursor-pointer"
                      placeholder="Update email"
                    />
                    <span className="text-xl font-bold flex-[0.2] text-gray-900 relative">
                      <FaEdit />
                    </span>
                  </article>
                  <article className="w-full flex gap-2 h-[35px] items-center border hover:border-mainPurple rounded-[4px] px-2">
                    <input
                      type="text"
                      className="border-none outline-none w-full h-full text-black text-[15px] tracking-wider placeholder:text-gray-500 cursor-pointer"
                      placeholder="Update password"
                    />
                    <span className="text-xl font-bold flex-[0.2] text-gray-900 relative">
                      <FaEdit />
                    </span>
                  </article>
                </main>
              </div>
              <motion.div
                className="cursor-pointer flex items-center mt-[1rem] pb-2"
                initial={{ opacity: 0, y: "5px" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3, duration: "0.5" },
                }}
                onClick={logout}
              >
                <span>
                  <BiLogOut />
                </span>

                <h5 className="text-sm ml-2 font-[500]">Logout</h5>
              </motion.div>
            </div>
          )}
        </div>
        <div className="text-[24px] text-[#616161] relative bell-shake cursor-pointer">
          {/* <span className='rounded-full content-[" "] w-[10px] h-[10px] bg-red-600 absolute top-0 right-0'></span> */}
          <BiBell />
        </div>
      </div>
    </div>
  );
};

export default GeneralNav;
