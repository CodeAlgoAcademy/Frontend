import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   deleteGoogleCalendar,
   deleteSchedule,
   getGoogleCalendar,
   getSchedule,
   googleCalendar,
   postGoogleCalendar,
   postSchedule,
   putGoogleCalendar,
   putSchedule,
} from "services/scheduleService";
import { Schedule } from "types/interfaces";

const initialState: Schedule = {
   allSchedule: [],
   googleConnect: false,
};

const scheduleSlice = createSlice({
   name: "schedule",
   initialState,
   reducers: {
      updateSchedule: (state, action) => {
         return { ...action.payload };
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getSchedule.fulfilled, (state: any, action: PayloadAction<Schedule>) => {
         state.allSchedule = action.payload;
         state.googleConnect = false;
      }),
         builder.addCase(getGoogleCalendar.fulfilled, (state: any, { payload }: PayloadAction) => {
            state.googleConnect = true;
            state.allSchedule = payload;
         });
   },
});

export default scheduleSlice.reducer;
export const { updateSchedule } = scheduleSlice.actions;
