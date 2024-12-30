import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCurriculums } from "services/curriculumService";

const initialState = {
   curriculum: [],
};

const allCurriculumSlice = createSlice({
   name: "allCurriculum",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllCurriculums.fulfilled, (state: any, action: PayloadAction) => {
         state.curriculum = action.payload;
      });
   },
});

export default allCurriculumSlice.reducer;
