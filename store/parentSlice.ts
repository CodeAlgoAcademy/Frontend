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
      builder
         .addCase(getAllParents.pending, () => {
            console.log("Getting all parents...");
         })
         .addCase(getAllParents.rejected, () => {
            console.log("Unable to get all parents");
         })
         .addCase(getAllParents.fulfilled, (state, action) => {
            state.parents = action.payload;
            console.log(action.payload);
         });
   },
});

export const {} = parentSlice.actions;
export default parentSlice.reducer;
