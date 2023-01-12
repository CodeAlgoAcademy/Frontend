import { createAsyncThunk } from '@reduxjs/toolkit';
import http from 'axios.config';
import { getAccessToken } from 'utils/getTokens';
import { closePreloader, openErrorModal, openPreloader } from 'store/fetchSlice';

export const getAllLessons: any = createAsyncThunk(
  'lessonSlice/getLessons',
  async (topics, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader({ loadingText: 'Fetching Lessons' }));
    try {
      const { data } = await http.get(`/academics/curriculums/lessons/?unit=${topics}`, {
        headers: { Authorization: 'Bearer ' + getAccessToken() },
      });
      dispatch(closePreloader());
      return data;
    } catch (error: any) {
      if (error.response.status !== 401) {
        dispatch(openErrorModal({ errorText: [error.message] }));
      }
      dispatch(closePreloader());
      return thunkApi.rejectWithValue(error.response.data);
    }
  },
);
