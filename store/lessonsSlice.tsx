import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addLessons, getAllLessons } from "services/lessonService";

const initialState = {
   lessons: [],
   lessonOpened: {},
};

const lessonsSlice = createSlice({
   name: "allLessons",
   initialState,
   reducers: {
      updateLessonOpened: (state, action: PayloadAction<any>) => {
         state.lessonOpened = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getAllLessons.fulfilled, (state: any, action: PayloadAction) => {
         state.lessons = action.payload;
      });
   },
});

export const { updateLessonOpened } = lessonsSlice.actions;

export default lessonsSlice.reducer;
