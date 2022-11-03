// <<<<<<< HEAD
// import Image from 'next/image';
// import React from 'react';
// import logo from '../public/images/logo.png';
// import {RiDashboardLine} from 'react-icons/ri';
// import {HiOutlineClipboardList} from 'react-icons/hi';
// import {HiOutlineUsers} from 'react-icons/hi';
// import {BsCalendar2Event} from 'react-icons/bs';
// import {BsChat} from 'react-icons/bs';



// export default function Sidebar() {
//   return (
//     <div className='z-10 fixed bg-white top-0 h-full w-[20rem]'>
//         <div className='w-100% flex justify-center h-24 items-center '>
//             <Image src={logo} />
//         </div>
//         <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black '>
//             <RiDashboardLine  className='text-2xl ml-[4rem]'/>
//             <h4 className='font-bold text-lg '>Dashboard</h4>
//         </div>
//         <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black mt-[0.3rem] '>
//             <HiOutlineClipboardList  className='text-2xl ml-[4rem]'/>
//             <h4 className='font-bold text-lg '>Curriculum</h4>
//         </div>
//         <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black mt-[0.3rem] '>
//             <HiOutlineUsers  className='text-2xl ml-[4rem]'/>
//             <h4 className='font-bold text-lg '>Students</h4>
//         </div>
//         <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black mt-[0.3rem] '>
//             <BsCalendar2Event  className='text-2xl ml-[4rem]'/>
//             <h4 className='font-bold text-lg '>Calandar</h4>
//         </div>
//         <div className='w-100%  h-[4.2rem] gap-6 flex  items-center rounded-l-full text-gray-500 hover:bg-[#E5E5E5]  hover:text-black mt-[0.3rem] '>
//             <BsChat className='text-2xl ml-[4rem]'/>
//             <h4 className='font-bold text-lg '>Messages</h4>
//         </div>
//     </div>
//   );
// }
// =======


import Link from "next/link"
import React from "react"
import { TbLayoutDashboard, TbClipboardText } from "react-icons/tb"
import { HiOutlineCalendar } from "react-icons/hi"
import { BiMessageRounded } from "react-icons/bi"
import { FaUserGraduate } from "react-icons/fa"
import { useRouter } from "next/router"

const links = [
	{
		name: "dashboard",
		icon: <TbLayoutDashboard />
	},
	{
		name: "Curriculum",
		icon: <TbClipboardText />
	},
	{
		name: "students",
		icon: <FaUserGraduate />
	},
	{
		name: "calendar",
		icon: <HiOutlineCalendar />
	},
	{
		name: "messages",
		icon: <BiMessageRounded />
	}
]

const Sidebar = () => {
	const router = useRouter()
	return (
		<div className='md:overflow-hidden overflow-auto h-full md:hover:overflow-auto pb-10'>
			<>
				<div className=''>
					{links.map((link) => (
						<div key={link.name} className='mb-4'>
							<Link href={`${link.name}`}>
								<div
									className={
										router.pathname == `/${link.name}`
											? "flex items-center gap-5 pl-8 py-5 bg-[#E5E5E5] rounded-l-[28px] cursor-pointer"
											: "flex items-center gap-5 pl-8 py-5 text-gray-600 hover:bg-[#f3f3f3] rounded-l-[28px] cursor-pointer"
									}>
									<span className='text-xl'>{link.icon}</span>
									<span className='capitalize font-semibold text-md'>{link.name}</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			</>
		</div>
	)
}

export default Sidebar

