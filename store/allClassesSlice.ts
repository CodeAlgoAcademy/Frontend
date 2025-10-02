import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteClass, getAllClasses } from "services/classesService";
import { IAllClasses, IClass } from "../types/interfaces";

const initialState: IAllClasses = {
   classes: [],
   loading:false,
};

const allClassesSlice = createSlice({
   name: "allClasses",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllClasses?.fulfilled, (state: IAllClasses, action: PayloadAction<IClass[]>) => {
         state.classes = action.payload;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted class from state
        state.classes = state.classes.filter(
          (cls: any) => cls.id !== action.meta.arg
        );
      })
   },
});

export default allClassesSlice.reducer;
