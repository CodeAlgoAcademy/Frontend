import { createAsyncThunk } from '@reduxjs/toolkit';
import http from 'axios.config';
import { getAccessToken } from 'utils/getTokens';

export const getSchedule = createAsyncThunk('scheduleSlice/getSchedule', async (name, thunkApi) => {
  try {
    const { data } = await http.get('/academics/calendar/schedules/', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const postGoogleAccess = createAsyncThunk(
  'scheduleSlice/postGoogleAuth',
  async (access_token: any, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    try {
      console.log(access_token);
      const { data } = await http.post(
        '/auth/google-signup/',
        { access_token },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );

      return { ...data };
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const postSchedule = createAsyncThunk(
  'scheduleSlice/postSchedule',
  async (addedRecords: any, thunkApi) => {
    try {
      delete addedRecords[0].Id;
      const { data } = await http.post('/academics/calendar/schedules/', addedRecords, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return { ...data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const putSchedule = createAsyncThunk(
  'scheduleSlice/putSchedule',
  async (updatedRecords: any, thunkApi) => {
    const { Id, StartTimezone, EndTimezone, Guid, ...others } = updatedRecords[0];

    try {
      const { data } = await http.put(
        `/academics/calendar/schedules/${Id}`,
        JSON.stringify(others),
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      return { ...data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const deleteSchedule = createAsyncThunk(
  'scheduleSlice/deleteSchedule',
  async (deletedRecords: any, thunkApi) => {
    try {
      const { data } = await http.delete('/academics/calendar/schedules/delete/', {
        data: JSON.stringify(deletedRecords),
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return { ...data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);
