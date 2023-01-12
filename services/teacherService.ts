import { getAccessToken } from 'utils/getTokens';
import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../axios.config';
import { openErrorModal } from 'store/fetchSlice';


export const getTeachers: any = createAsyncThunk(
    'teacherSlice/fetchTeacher',
    async(name, thunkApi) => {
        const state: any = thunkApi.getState();
        const dispatch = thunkApi.dispatch;
        try {
            const {data} = await http.get('/academics/teacher/', {
                headers: {
                    Authorization: 'Bearer ' + getAccessToken()
                }
            });
            return data;
        } catch (error: any) {
            if (error.response.status !== 401) {
              dispatch(openErrorModal({ errorText: [error.message] }));
            }
            return thunkApi.rejectWithValue(error.response.data);
    }
}
)