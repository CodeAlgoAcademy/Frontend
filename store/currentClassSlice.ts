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
      builder.addCase(getAllClasses.fulfilled, (state: CurrentClassState, action: PayloadAction<IClass[]>) => {
   if (!state?.id && action.payload.length > 0) {
      const { id, className, color } = action.payload[0];
      return { id, className, color };
   }
   return state;
});
   },
});

export default currentClassSlice.reducer;
export const { updateCurrentClass } = currentClassSlice.actions;
