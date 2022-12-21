import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getSchedule, postSchedule, putSchedule, deleteSchedule } from "services/scheduleService"
import { Schedule } from "types/interfaces"

const initialState: Schedule = {
	allSchedule: [],
	addedRecords: [],
	deletedRecords: [],
	changedRecords: []
}

const scheduleSlice = createSlice({
	name: "schedule",
	initialState,
	reducers: {
		updateSchedule: (state, action) => {
			return { ...action.payload }
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getSchedule.fulfilled, (state: any, action: PayloadAction<Schedule>) => {
			state.allSchedule = action.payload
		}),
			builder.addCase(getSchedule.rejected, (state: any, action: PayloadAction<any>) => {
				console.error("Fetch Error")
			}),
			builder.addCase(postSchedule.rejected, (state: any, action: PayloadAction<any>) => {
				console.error("Post Error")
			}),
			builder.addCase(putSchedule.rejected, (state: any, action: PayloadAction<any>) => {
				console.error("Update Error")
			}),
			builder.addCase(deleteSchedule.rejected, (state: any, action: PayloadAction<any>) => {
				console.error("Delete Error")
			})
	}
})

export default scheduleSlice.reducer
export const { updateSchedule } = scheduleSlice.actions
