import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";
import { openErrorModal } from "store/fetchSlice";



export const getAllLessons: any = createAsyncThunk(
    "lessonSlice/getLessons", 
    async(topics, thunkApi) => {
        const dispatch = thunkApi.dispatch;
        try {
            const {data} = await http.get(`/academics/curriculums/lessons/?unit=${topics}`, {
                headers: { Authorization: "Bearer " + getAccessToken() },
            });
            return data;
        } catch (error: any) {
            if (error.response.status !== 401) {
                dispatch(openErrorModal({errorText: [error.message]}))
            }
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)