import React, { useState, useEffect } from "react"
import ScheduleItem from "./ScheduleItem"
import { getSchedule } from "services/scheduleService"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { Schedule } from "types/interfaces"

const ScheduleBox = () => {
	const scheduleData: Schedule = useSelector((state: RootState) => state.schedule)
	const [currentSchedule, setCurrentSchedule] = useState([])
	const [allSchedule] = useState(scheduleData.allSchedule)
	const dispatch = useDispatch<AppDispatch>()
	function isToday (date: Date): boolean {
		const today = new Date()
		let result: boolean = false
		try {
			if (today.toDateString() === date?.toDateString()) {
				result = true
			}
		} catch {
			result = false
		}
		return result
	}
	function formatAMPM (date: Date) {
		let hours = date.getHours()
		let minutes: any = date.getMinutes()
		let ampm = hours >= 12 ? 'pm' : 'am'
		hours = hours % 12
		hours = hours ? hours : 12 // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes
		let strTime = hours + ':' + minutes + ' ' + ampm
		return strTime
	}
	const fetchSchedule = async () => {
		const data = await dispatch(getSchedule())
	}
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	const fullDate = new Date()
	const date = fullDate.getDate()
	const month = fullDate.getMonth()
	const year = fullDate.getFullYear()
	useEffect(() => {
		fetchSchedule()
	}, [])
	useEffect(() => {
		const data = allSchedule.filter((item: any) => isToday(item.startTime))
		setCurrentSchedule((prev) => data)
	}, [allSchedule])
	return (
		<div className='rounded-md shadow-lg p-6 max-w-[380px] bg-white max-h-[212px] overflow-y-auto'>
			<div className='min-h-[114px]'>
				<h3 className='text-[20px] font-bold mb-3' data-testid='schedule-box-heading'>
					Schedule - <span>{ `${months[month]} ${date}, ${year}` }</span>
				</h3>
				<div className='grid grid-cols-1 divide-y'>
					{ currentSchedule.length > 0 && (
						currentSchedule?.map(({ id, startTime, Subject }) => {
							return <ScheduleItem key={ id } time={ formatAMPM(startTime) } item={ Subject } id={ id } />
						}))
					}
				</div>
			</div>
		</div>
	)
}

export default ScheduleBox
