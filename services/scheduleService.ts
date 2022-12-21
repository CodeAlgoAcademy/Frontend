import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "axios.config"
import { getAccessToken } from "utils/getTokens"

export const getSchedule = createAsyncThunk("scheduleSlice/getSchedule", async (name, thunkApi) => {
	try {
		const { data } = await http.get("/academics/calendar/schedules/", {
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		})
		return data
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})

export const postSchedule = createAsyncThunk("scheduleSlice/postSchedule", async (name, thunkApi) => {
	const state: any = thunkApi.getState()
	const addedRecords = state.schedule.addedRecords
	try {
		const { data } = await http.post("/academics/calendar/schedules/", addedRecords, {
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		})
		return { ...data }
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})

export const putSchedule = createAsyncThunk("scheduleSlice/putSchedule", async (name, thunkApi) => {
	const state: any = thunkApi.getState()
	const changedRecord = state.schedule.changedRecords[0]
	try {
		const { data } = await http.put(
			`/academics/calendar/schedules/${changedRecord.Id}`,
			{ ...changedRecord },
			{
				headers: {
					Authorization: `Bearer ${getAccessToken()}`
				}
			}
		)
		return { ...data }
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})

export const deleteSchedule = createAsyncThunk("scheduleSlice/deleteSchedule", async (name, thunkApi) => {
	const state: any = thunkApi.getState()
	try {
		const { data } = await http.delete("/academics/calendar/schedules/delete/", {
			data: {
				source: state.deletedRecords
			},
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		})
		return { ...data }
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})
