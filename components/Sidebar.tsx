import React,{useState} from 'react';
import Link from 'next/link';
import {TbLayoutDashboard,TbClipboardText} from 'react-icons/tb';
import {FaUserGraduate} from 'react-icons/fa';
import {HiOutlineCalendar} from 'react-icons/hi';
import {BiMessageRounded} from 'react-icons/bi';
import {useRouter} from 'next/router';
import Image from 'next/image';

const links = [
  {
    name: 'dashboard',
    icon: <TbLayoutDashboard />,
    url: '/teachers',
  },
  {
    name: 'curriculum',
    icon: <TbClipboardText />,
    url: '/teachers/curriculum',
  },
  {
    name: 'students',
    icon: <FaUserGraduate />,
    url: '/teachers/students',
  },
  {
    name: 'calendar',
    icon: <HiOutlineCalendar />,
    url: '/teachers/calendar',
  },
  {
    name: 'messages',
    icon: <BiMessageRounded />,
    url: '/teachers/messages',
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [activeLink,setActiveLink] = useState(router.pathname);
  return (
    <div className="md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      <div className="mx-auto my-8 w-fit">
        <Link href="/teachers/addClass">
          <a>
            <Image
              src="/assets/CodeAlgo_Logo.png"
              alt="logo"
              className="md:cursor-pointer h-9"
              width={100}
              height={52}
            />
          </a>
        </Link>
      </div>
      <>
        <div className="">
          {links.map((link) => (
            <div key={link.name} className="mb-5 w-[228px] mx-auto">
              <Link href={`${link.url}`}>
                <div
                  className={
                    activeLink === link.url || (router?.pathname.includes(link.url) && link.url !== "/teachers")
                      ? 'flex items-center gap-6 px-[30px] py-[14px] text-white bg-[#2073fa] rounded-[28px] cursor-pointer'
                      : 'flex items-center gap-6 px-[30px] py-[14px] text-gray-600  rounded-[28px] cursor-pointer hover:bg-slate-50 '
                  }
                  onClick={() => {
                    setActiveLink(() => link.url);
                  }}
                >
                  <span
                    className={`text-lg ${activeLink === link.url || (router?.pathname.includes(link.url) && link.url !== "/teachers") ? 'text-white' : 'text-[#2073fa]'
                      }`}
                  >
                    {link.icon}
                  </span>
                  <span className="capitalize font-semibold text-base">{link.name}</span>
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
