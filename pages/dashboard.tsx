import React, { useState } from "react"
import Image from "next/image"

const Dashboard = () => {
	const [scheduleItems] = useState([
		{
			id: 1,
			time: "9:30 am",
			item: "tell class about guest speaker"
		},
		{
			id: 2,
			time: "11:15 am",
			item: "reminder about presentation"
		},
		{
			id: 3,
			time: "2:15 pm",
			item: "check in with Principal Smith"
		}
	])
	const [notes] = useState([
		{
			id: 1,
			note: "Remind students to have parents sign consent form for field trip"
		},
		{
			id: 2,
			note: "Fire drill on Thursday, 4/28"
		}
	])
	return (
		<div className='px-[5%] py-8 bg-[#E5E5E5]'>
			<h2 className='text-[28px] font-bold mb-6'>Today at a Glance</h2>
			<div className='flex gap-10 flex-wrap'>
				<div className='rounded-md shadow-lg p-6 max-w-[380px] bg-white h-fit'>
					<h3 className='text-[20px] font-bold mb-2'>
						Lesson - <span>Conditional Statements</span>
					</h3>
					<p className='leading-normal text-sm tracking-tight mb-4'>
						Conditional statements are used through the various programming languages to instruct the computer on the decision to make when
						given some conditions.
					</p>
					<div className='bg-[#F0AA9B] rounded-md py-12 w-[100%]'>
						<div className='w-[38%] relative aspect-[12/10] mx-auto'>
							<Image src='/images/loop.png' alt='current-lesson' layout='fill' />
						</div>
					</div>
				</div>
				<div className='grid gap-6'>
					<div className='rounded-md shadow-lg p-6 max-w-[380px] bg-white'>
						<h3 className='text-[20px] font-bold mb-3'>
							Schedule - <span>Apr 14, 2022</span>
						</h3>
						<div className='grid grid-cols-1 divide-y'>
							{scheduleItems.map(({ id, time, item }) => {
								const earlyTime = ""
								return (
									<div key={id} className='flex align-center px-3 py-1'>
										<span className='w-[72px] flex'>
											<p className='text-[#828282] inline-block align-middle my-auto text-sm'>{time}</p>
										</span>
										<span className='bg-[#d2c1f5b7] px-4 py-2 rounded-[6px] text-sm w-[235px] h-[35px] truncate ...'>{item}</span>
									</div>
								)
							})}
						</div>
					</div>
					<div className='rounded-md shadow-lg p-6 max-w-[380px] bg-white'>
						<div className='flex align-center justify-between'>
							<h3 className='text-[20px] font-bold mb-3'>Notes</h3>
							<svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12 0L15 3L12.713 5.288L9.713 2.288L12 0ZM0 11.988V14.988H3L11.299 6.701L8.299 3.701L0 11.988ZM0 17.988H16V19.988H0V17.988Z'
									fill='#828282'
								/>
							</svg>
						</div>
						<ul className='list-disc pl-6'>
							{notes.map(({ id, note }) => (
								<li key={id} className='text-sm mb-2'>
									{note}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
