import { createAsyncThunk } from '@reduxjs/toolkit';
import http from 'axios.config';
import { closePreloader, openErrorModal, openPreloader } from 'store/fetchSlice';
import { RootState } from 'store/store';
import { getAccessToken } from 'utils/getTokens';

export const getAllClasses: any = createAsyncThunk(
  'allClassesSlice/getAllClasses',
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    
    try {
      const { data } = await http.get('/academics/class', {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const addClass: any = createAsyncThunk(
  'allClassesSlice/addClass',
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader({loadingText: "Adding Class"}));
    const {
      student,
      class: { className, grade, subject, coTeachers, roomNumber, color },
    } = state.addClass;
    const { firstName, lastName, email } = state.addClass.student;
    const options =
      firstName && lastName && email
        ? {
            className,
            grade,
            subject,
            roomNumber,
            color,
            student: {
              firstName,
              lastName,
              email,
            },
          }
        : {
            className,
            grade,
            subject,
            roomNumber,
            color,
          };
    try {
      const { data } = await http.post(
        '/academics/class/',
        {
          ...options,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      dispatch(closePreloader());

      return { ...data };
    } catch (error: any) {
      dispatch(
        openErrorModal({
          errorText: [error.response.data.detail ? error.response.data.detail : error.message],
        }),
      );
      dispatch(closePreloader());

      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);
