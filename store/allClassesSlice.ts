import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteClass, getAllClasses } from "services/classesService";
import { IAllClasses, IClass } from "../types/interfaces";

const initialState: IAllClasses = {
   classes: [],
   loading: false,
};

const allClassesSlice = createSlice({
   name: "allClasses",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllClasses.pending, (state: IAllClasses) => {
            state.loading = true;
         })
         .addCase(getAllClasses.fulfilled, (state: IAllClasses, action: PayloadAction<IClass[]>) => {
            state.loading = false;
            state.classes = action.payload;
         })
         .addCase(getAllClasses.rejected, (state: IAllClasses) => {
            state.loading = false;
         })
         .addCase(deleteClass.pending, (state) => {
            state.loading = true;
         })
         .addCase(deleteClass.fulfilled, (state, action) => {
            state.loading = false;
            state.classes = state.classes.filter(
               (cls: any) => cls.id !== action.meta.arg
            );
         })
         .addCase(deleteClass.rejected, (state) => {
            state.loading = false;
         });
   },
});

export default allClassesSlice.reducer;