import React from 'react';
import {TbLayoutDashboard,TbClipboardText} from 'react-icons/tb';
import {FaUserGraduate} from 'react-icons/fa';
import {HiOutlineCalendar} from 'react-icons/hi';
import {BiMessageRounded} from 'react-icons/bi';
import NavButton from 'components/parents/NavButton';

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

const TeacherMobileSideNav = ({className}: {className?: string;}) => {
   return (
      <div
         className={`py-2 mr-[3%] min-w-[50px] flex xl:hidden divide-y sticky top-0 h-full z-20 flex-col gap-4 first:pt-0 ${className}`}
      >
         <div className="flex gap-3 pt-4 flex-col justify-between">
            {links.map(({name,icon,url}) => {
               return (
                  <NavButton {...{image: icon,url,title: name}} key={name} isIcon={true} />
               );
            })}
         </div>
      </div>
   );
};

export default TeacherMobileSideNav;
