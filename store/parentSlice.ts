import { createSlice } from "@reduxjs/toolkit";
import { getAllParents } from "services/parentService";

const initialState = {
   parents: [],
};

const parentSlice = createSlice({
   name: "parentSlice",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllParents.fulfilled, (state, action) => {
         state.parents = action.payload;
      });
   },
});

export const {} = parentSlice.actions;
export default parentSlice.reducer;
