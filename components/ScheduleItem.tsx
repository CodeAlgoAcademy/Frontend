import React from "react"

const ScheduleItem = ({ id, time, item }: { id: number; time: string; item: string }) => {
	return (
		<div className='flex align-center px-3 py-1'>
			<span className='w-[72px] flex'>
				<p className='text-[#828282] inline-block align-middle my-auto text-sm'>{time}</p>
			</span>
			<span className='bg-[#d2c1f5b7] px-4 py-2 rounded-[6px] text-sm w-[235px] h-[35px] truncate ...' data-testid={`schedule-${id}`}>
				{item}
			</span>
		</div>
	)
}

export default ScheduleItem
