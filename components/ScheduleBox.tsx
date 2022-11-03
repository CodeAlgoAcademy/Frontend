import React, { useState } from "react"

const ScheduleBox = () => {
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
	return (
		<div className='rounded-md shadow-lg p-6 max-w-[380px] bg-white max-h-[212px] overflow-y-auto'>
			<div className='min-h-[114px]'>
				<h3 className='text-[20px] font-bold mb-3'>
					Schedule - <span>Apr 14, 2022</span>
				</h3>
				<div className='grid grid-cols-1 divide-y'>
					{scheduleItems.map(({ id, time, item }) => {
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
		</div>
	)
}

export default ScheduleBox
