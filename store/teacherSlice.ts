import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getTeachers } from "services/teacherService";
// import { IUserConversation, User } from 'types/interfaces';

const initialState = {
   teachers: [],
};

const teacherSlice = createSlice({
   name: "allTeachers",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getTeachers.fulfilled, (state: any, action: PayloadAction) => {
         state.teachers = action.payload;
      });
   },
});

export default teacherSlice.reducer;
