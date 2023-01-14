import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getSchedule,
  postSchedule,
  putSchedule,
  deleteSchedule,
  googleCalendar,
  getGoogleCalendar,
} from 'services/scheduleService';
import { Schedule } from 'types/interfaces';

const initialState: Schedule = {
  allSchedule: [],
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    updateSchedule: (state, action) => {
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSchedule.fulfilled, (state: any, action: PayloadAction<Schedule>) => {
      state.allSchedule = action.payload;
    }),
      builder.addCase(getSchedule.rejected, (state: any, action: PayloadAction<any>) => {
        console.error('Fetch Error');
      }),
      builder.addCase(postSchedule.fulfilled, (state: any, action: PayloadAction<any>) => {
        console.info('Schedule created Successfully');
        window.location.reload();
      }),
      builder.addCase(postSchedule.rejected, (state: any, action: PayloadAction<any>) => {
        console.error('Post Error');
      }),
      builder.addCase(putSchedule.fulfilled, (state: any, action: PayloadAction<any>) => {
        console.info('Schedule updated Successfully');
        window.location.reload();
      }),
      builder.addCase(putSchedule.rejected, (state: any, action: PayloadAction<any>) => {
        console.error('Update Error');
      }),
      builder.addCase(deleteSchedule.rejected, (state: any, action: PayloadAction<any>) => {
        console.error('Delete Error');
      });
    builder.addCase(getGoogleCalendar.fulfilled, (state: any, { payload }: PayloadAction) => {
      console.log('Successful');
      console.log(payload);
    });
    builder.addCase(googleCalendar.rejected, (state: any, { payload }) => {
      console.log(payload);
    });
  },
});

export default scheduleSlice.reducer;
export const { updateSchedule } = scheduleSlice.actions;
