import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNewAssignments, getAssignments } from "services/assignmentService";
import { AssignmentDetails, IAllAssignments } from "types/interfaces";

const initialState: IAllAssignments = {
   assignments: [],
};

const allAssignmentsReducer = createSlice({
   name: "assignments",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAssignments.fulfilled, (state: IAllAssignments, action: PayloadAction<AssignmentDetails[]>) => {
         return { ...state, assignments: action.payload };
      });
   },
});

export default allAssignmentsReducer.reducer;
