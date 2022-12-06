import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISchedule } from "../types/interfaces"

const initialState: ISchedule[] = [
	{
		Id: "2",
		Subject: "Thule Air Crash Report",
		Location: "Newyork City",
		StartTime: "2022-11-22T06:30:00.000Z",
		EndTime: "2022-11-22T08:30:00.000Z"
	},
	{
		Id: "3",
		Subject: "Blue Moon Eclipse",
		Location: "Space Center USA",
		StartTime: "2022-11-23T04:00:00.000Z",
		EndTime: "2022-11-24T05:30:00.000Z"
	},
	{
		Id: "4",
		Subject: "Meteor Showers in 2021",
		Location: "Space Center USA",
		StartTime: "2022-11-25T07:30:00.000Z",
		EndTime: "2022-11-25T09:00:00.000Z"
	},
	{
		Id: "5",
		Subject: "Milky Way as Melting pot",
		Location: "Space Center USA",
		StartTime: "2022-11-30T06:30:00.000Z",
		EndTime: "2022-11-30T08:30:00.000Z"
	},
	{
		Id: "6",
		Subject: "Mysteries of Bermuda Triangle",
		Location: "Bermuda",
		StartTime: "2022-11-30T04:00:00.000Z",
		EndTime: "2022-11-30T05:30:00.000Z"
	},
	{
		Id: "8",
		Subject: "Life on Mars",
		Location: "Space Center USA",
		StartTime: "2022-11-21T03:30:00.000Z",
		EndTime: "2022-11-21T04:30:00.000Z"
	},
	{
		Id: "11",
		Subject: "Best Photography 2021",
		Location: "London",
		StartTime: "2022-12-1T04:00:00.000Z",
		EndTime: "2022-12-1T05:30:00.000Z"
	},
	{
		Id: "12",
		Subject: "Smarter Puppies",
		Location: "Sweden",
		StartTime: "2022-11-21T04:30:00.000Z",
		EndTime: "2022-11-21T06:00:00.000Z"
	},
	{
		Id: "14",
		Subject: "Aliens vs Humans",
		Location: "Research Center of USA",
		StartTime: "2022-11-11T04:30:00.000Z",
		EndTime: "2022-11-11T06:00:00.000Z"
	},
	{
		Id: "15",
		Subject: "Facts of Humming Birds",
		Location: "California",
		StartTime: "2022-11-10T04:00:00.000Z",
		EndTime: "2022-11-10T05:30:00.000Z"
	}
]

const calendarSlice = createSlice({
	name: "calender",
	initialState,
	reducers: {
		updateSchedule: (
			state: ISchedule[],
			action: PayloadAction<{
				key: string
				value: ISchedule
			}>
		) => {
			state = [...state, action.payload.value]
		}
	}
})

export default calendarSlice.reducer
export const { updateSchedule } = calendarSlice.actions
