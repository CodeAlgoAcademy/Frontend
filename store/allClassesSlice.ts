import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllClasses } from "services/classesService";
import { IAllClasses, IClass } from "../types/interfaces";

const initialState: IAllClasses = {
  classes: [],
};

const allClassesSlice = createSlice({
  name: "allClasses",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllClasses.pending]: (state: IAllClasses) => {
      console.log("pending");
    },
    [getAllClasses.fulfilled]: (
      state: IAllClasses,
      action: PayloadAction<IClass[]>
    ) => {
      console.log("class", action.payload);
      state.classes = action.payload;
    },
    [getAllClasses.rejected]: (state: IAllClasses, action: PayloadAction) => {
      console.log(action.payload);
    },
  },
});

export default allClassesSlice.reducer;
