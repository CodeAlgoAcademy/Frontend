import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllClasses } from "services/classesService";
import { CurrentClassState, IClass } from "../types/interfaces";

const initialState: CurrentClassState = {
   className: "",
   color: "",
   id: "",
};

const currentClassSlice = createSlice({
   name: "currentClass",
   initialState,
   reducers: {
      updateCurrentClass: (state: CurrentClassState, action: PayloadAction<CurrentClassState>) => action.payload,
   },
   extraReducers: (builder) => {
      // Set the default class to the user's first class when fetched
      builder.addCase(getAllClasses.fulfilled, (state: CurrentClassState, action: PayloadAction<IClass[]>) => {
         return action.payload?.[0];
      });
   },
});

export default currentClassSlice.reducer;
export const { updateCurrentClass } = currentClassSlice.actions;
