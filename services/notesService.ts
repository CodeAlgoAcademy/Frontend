import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "axios.config"
import { RootState } from "store/store"
import { getAccessToken } from "utils/getTokens"

export const getNotes: any = createAsyncThunk("notesSlice/getNotes", async (name, thunkApi) => {
	const state: any = thunkApi.getState()
	try {
		const { data } = await http.get("/academics/notes", {
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		})
		return data
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})

export const updateNotes: any = createAsyncThunk("notesSlice/updateNotes", async (name, thunkApi) => {
	const state: any = thunkApi.getState()
	const { html } = state.updateNotes
	try {
		const { data } = await http.put("/academics/notes", 
		{
			text: html
		},
		{
			headers: {
				Authorization: `Bearer ${getAccessToken()}`
			}
		});
		return  {...data };
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})
