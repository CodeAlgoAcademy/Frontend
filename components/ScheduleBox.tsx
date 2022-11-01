import React, { useState } from "react"
import ScheduleItem from "./ScheduleItem"

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
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	const fullDate = new Date()
	const date = fullDate.getDate()
	const month = fullDate.getMonth()
	const year = fullDate.getFullYear()
	return (
		<div className='rounded-md shadow-lg p-6 max-w-[380px] bg-white max-h-[212px] overflow-y-auto'>
			<div className='min-h-[114px]'>
				<h3 className='text-[20px] font-bold mb-3' data-testid='schedule-box-heading'>
					Schedule - <span>{`${months[month]} ${date}, ${year}`}</span>
				</h3>
				<div className='grid grid-cols-1 divide-y'>
					{scheduleItems?.map(({ id, time, item }) => {
						return <ScheduleItem key={id} time={time} item={item} id={id} />
					})}
				</div>
			</div>
		</div>
	)
}

export default ScheduleBox
