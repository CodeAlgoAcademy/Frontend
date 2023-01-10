import React from "react";
import Link from "next/link";
import { TbLayoutDashboard, TbClipboardText } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import { useRouter } from "next/router";

const links = [
  {
    name: "dashboard",
    icon: <TbLayoutDashboard />,
    url: "/dashboard",
  },
  {
    name: "curriculum",
    icon: <TbClipboardText />,
    url: "/curriculum",
  },
  {
    name: "students",
    icon: <FaUserGraduate />,
    url: "/students",
  },
  {
    name: "calendar",
    icon: <HiOutlineCalendar />,
    url: "/calendar",
  },
  {
    name: "messages",
    icon: <BiMessageRounded />,
    url: "/messages",
  },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      <>
        <div className="">
          {links.map((link) => (
            <div key={link.name} className="mb-4">
              <Link href={`${link.url}`}>
                <div
                  className={
                    router?.pathname.includes(`${link.url}`)
                      ? "flex items-center gap-5 pl-8 py-5 bg-[#E5E5E5] rounded-l-[28px] cursor-pointer"
                      : "flex items-center gap-5 pl-8 py-5 text-gray-600 hover:bg-[#f3f3f3] rounded-l-[28px] cursor-pointer"
                  }
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="capitalize font-semibold text-md">
                    {link.name}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Sidebar;
