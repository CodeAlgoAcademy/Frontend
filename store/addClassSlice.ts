import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddClass } from "../types/interfaces";
import { colors } from "../components/addClass/colors";

const initialState: IAddClass = {
  student: {
    studentName: "",
    studentEmail: "",
    studentId: "",
  },
  class: {
    className: "",
    grade: "Change Grade",
    subject: "",
    coTeachers: "",
    roomNumber: "",
    color: colors[0],
  },
};

const addClassSlice = createSlice({
  name: "addClass",
  initialState,
  reducers: {
    updateClassDetails: (
      state: IAddClass,
      action: PayloadAction<{
        key: string;
        value: string;
      }>
    ) => {
      if (action.payload.key.includes("student")) {
        state.student[action.payload.key as keyof typeof state.student] =
          action.payload.value;
      } else {
        state.class[action.payload.key as keyof typeof state.class] =
          action.payload.value;
      }
    },
  },
});

export default addClassSlice.reducer;
export const { updateClassDetails } = addClassSlice.actions;
