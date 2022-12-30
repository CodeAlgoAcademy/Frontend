import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNewAssignments, getAssignments } from "services/assignmentService";
import { IAllAssignments } from "types/interfaces";

const initialState: IAllAssignments = {
  assignments: [],
};

const allAssignmentsReducer = createSlice({
  name: "assignments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewAssignments.pending, () => {
      console.log("pending");
    });
    builder.addCase(addNewAssignments.fulfilled, () => {
      console.log("fulfilled");
    });
    builder.addCase(addNewAssignments.rejected, (_, action: PayloadAction) => {
      console.log(action.payload);
    });
    builder.addCase(getAssignments.pending, () => {
      console.log("pending");
    });
    builder.addCase(
      getAssignments.fulfilled,
      (state: IAllAssignments, action: PayloadAction<IAllAssignments>) => {
        return action.payload;
      }
    );
    builder.addCase(getAssignments.rejected, (_, action: PayloadAction) => {
      console.log(action.payload);
    });
  },
});

export const {} = allAssignmentsReducer.actions;
export default allAssignmentsReducer.reducer;
