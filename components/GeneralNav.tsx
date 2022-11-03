import React from "react";
import Image from "next/image";
import { BiHomeAlt } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";

const GeneralNav = () => {
	return (
		<div className='py-6 px-[5%] bg-white flex items-center justify-between'>
			<div className='relative flex items-center gap-40'>
				<div className='absolute left-0 top-0'>
					<Image src='/assets/imgs/CodeAlgo_Logo.png' alt='logo' className='md:cursor-pointer h-9' width={100} height={52} />
				</div>
				<div></div>
				<div className='flex items-center gap-4'>
					<div className='text-[#616161] text-[24px]'>
						<BiHomeAlt />
					</div>
					<div className='rounded-[28px] p-2 w-[260px] flex items-center justify-between border border-[#BDBDBD]'>
						<div className='flex items-center gap-3'>
							<span style={{ backgroundColor: "#92C7F7" }} className='rounded-full content-[" "] w-[24px] h-[24px]'></span>
							<span className='font-bold text-[18px]'>Class C</span>
						</div>
						<div className='text-[32px] text-[#838383]'>
							<RiArrowDropDownLine />
						</div>
					</div>
				</div>
			</div>
			<div className='rounded-[30px] px-2 py-[6px] w-[120px] flex items-center justify-between border border-[#BDBDBD]'>
				<div className='overflow-hidden rounded-full flex items-center'>
					<Image src='/assets/imgs/Assets/avatar.png' alt='avatar' className='md:cursor-pointer h-9' width={35} height={35} />
				</div>
				<div className='text-[32px] text-[#838383]'>
					<RiArrowDropDownLine />
				</div>
			</div>
		</div>
	)
}

export default GeneralNav
