import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddClass } from "../types/interfaces";
import { colors } from "../components/addClass/colors";
import { addClass } from "services/classesService";
import { Action } from "@syncfusion/ej2-react-grids";

const initialState: IAddClass = {
  student: {
    firstName: "",
    lastName: "",
    email: "",
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
        typeofState?: string;
      }>
    ) => {
      if (action.payload.typeofState === "student") {
        state.student[action.payload.key as keyof typeof state.student] =
          action.payload.value;
      } else {
        state.class[action.payload.key as keyof typeof state.class] =
          action.payload.value;
      }
    },
    clearFields: (state: IAddClass) => {
      state.student = initialState.student;
      state.class = initialState.class;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addClass.pending,
      (state: IAddClass, action: PayloadAction) => {
        console.log("pending");
      }
    ),
      builder.addCase(
        addClass.fulfilled,
        (state: IAddClass, action: PayloadAction) => {
          console.log("fulfilled");
        }
      ),
      builder.addCase(
        addClass.rejected,
        (state: IAddClass, action: PayloadAction) => {
          console.log(action.payload);
        }
      );
  },
});

export default addClassSlice.reducer;
export const { updateClassDetails, clearFields } = addClassSlice.actions;
