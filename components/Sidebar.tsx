import Image from 'next/image';
import React from 'react';
import logo from '../images/logo.png';
import {RiDashboardLine} from 'react-icons/ri';
import {HiOutlineClipboardList} from 'react-icons/hi';
import {HiOutlineUsers} from 'react-icons/hi';
import {BsCalendar2Event} from 'react-icons/bs';
import {BsChat} from 'react-icons/bs';



export default function Sidebar() {
  return (
    <div className='z-10 fixed bg-white top-0 h-full w-[20rem]'>
        <div className='w-100% flex justify-center h-24 items-center '>
            <Image src={logo} />
        </div>
        <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black '>
            <RiDashboardLine  className='text-2xl ml-[4rem]'/>
            <h4 className='font-bold text-lg '>Dashboard</h4>
        </div>
        <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black mt-[0.3rem] '>
            <HiOutlineClipboardList  className='text-2xl ml-[4rem]'/>
            <h4 className='font-bold text-lg '>Curriculum</h4>
        </div>
        <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black mt-[0.3rem] '>
            <HiOutlineUsers  className='text-2xl ml-[4rem]'/>
            <h4 className='font-bold text-lg '>Students</h4>
        </div>
        <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black mt-[0.3rem] '>
            <BsCalendar2Event  className='text-2xl ml-[4rem]'/>
            <h4 className='font-bold text-lg '>Calandar</h4>
        </div>
        <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black mt-[0.3rem] '>
            <BsChat className='text-2xl ml-[4rem]'/>
            <h4 className='font-bold text-lg '>Messages</h4>
        </div>
    </div>
  );
}