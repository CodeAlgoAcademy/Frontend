import React from 'react';
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
    url: '/dashboard',
  },
  {
    name: 'curriculum',
    icon: <TbClipboardText />,
    url: '/curriculum',
  },
  {
    name: 'students',
    icon: <FaUserGraduate />,
    url: '/students',
  },
  {
    name: 'calendar',
    icon: <HiOutlineCalendar />,
    url: '/calendar',
  },
  {
    name: 'messages',
    icon: <BiMessageRounded />,
    url: '/messages',
  },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      <div className="mx-auto my-8 w-fit">
        <Link href="/addClass">
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
                    router?.pathname.includes(`${link.url}`)
                      ? 'flex items-center gap-6 px-[30px] py-[14px] text-white bg-[#2073fa] rounded-[28px] cursor-pointer'
                      : 'flex items-center gap-6 px-[30px] py-[14px] text-gray-600  rounded-[28px] cursor-pointer hover:bg-slate-50 '
                  }
                >
                  <span
                    className={`text-lg ${router?.pathname.includes(link.url) ? 'text-white' : 'text-[#2073fa]'
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
