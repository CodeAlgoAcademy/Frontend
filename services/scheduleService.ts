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

export const postSchedule = createAsyncThunk("scheduleSlice/postSchedule", async (addedRecords: any, thunkApi) => {
	try {
		delete addedRecords[0].Id
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

export const putSchedule = createAsyncThunk("scheduleSlice/putSchedule", async (updatedRecords: any, thunkApi) => {
	const changedRecord = updatedRecords[0]
	console.log(changedRecord);
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

export const deleteSchedule = createAsyncThunk("scheduleSlice/deleteSchedule", async (deletedRecords: any, thunkApi) => {
	try {
		console.log(deletedRecords)
		const { data } = await http.delete("/academics/calendar/schedules/delete/", {
			data: {
				source: deletedRecords
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
