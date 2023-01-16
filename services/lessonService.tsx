import { createAsyncThunk } from '@reduxjs/toolkit';
import http from 'axios.config';
import { getAccessToken } from 'utils/getTokens';
import { closePreloader, openErrorModal, openPreloader } from 'store/fetchSlice';
import { newLesson } from 'types/interfaces';

export const getAllLessons: any = createAsyncThunk(
  'lessonSlice/getLessons',
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    const { currentUnitInView } = state.unit;
    const dispatch = thunkApi.dispatch;

    try {
      const { data } = await http.get(
        `/academics/curriculums/units/${currentUnitInView.id}/lessons`,
        {
          headers: { Authorization: 'Bearer ' + getAccessToken() },
        },
      );
      console.log('lessons', data);
      return data;
    } catch (error: any) {
      if (error.response.status !== 401) {
        dispatch(openErrorModal({ errorText: [error.message] }));
      }

      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);

export const addLessons: any = createAsyncThunk(
  'lesson/add',
  async (lessonDetails: newLesson, thunkApi) => {
    const state: any = thunkApi.getState();
    const { currentUnitInView } = state.unit;
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader({ loadingText: 'Adding Lesson' }));
    try {
      const { data } = await http.post(
        `/academics/curriculums/units/${currentUnitInView.id}/lessons`,
        {
          lessonDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      dispatch(closePreloader());
    } catch (error: any) {
      dispatch(openErrorModal({ errorText: [error.message || error.response.data] }));
      console.log(error.message);
      dispatch(closePreloader());
    }
  },
);
