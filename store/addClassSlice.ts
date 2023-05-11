import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddClass } from "../types/interfaces";
import { colors } from "../components/Teachers/addClass/colors";
import { addClass } from "services/classesService";

const initialState: IAddClass = {
   student: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
   },
   class: {
      className: "",
      grade: "Select Grade",
      subject: "",
      coTeachers: "",
      roomNumber: "",
      color: colors[0],
   },
   file: "",
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
            state.student[action.payload.key as keyof typeof state.student] = action.payload.value;
         } else {
            state.class[action.payload.key as keyof typeof state.class] = action.payload.value;
         }
      },
      addFile: (state: IAddClass, action: PayloadAction<any>) => {
         state.file = action.payload;
      },
      clearFields: (state: IAddClass) => {
         state.student = initialState.student;
         state.class = initialState.class;
      },
   },
});

export default addClassSlice.reducer;
export const { updateClassDetails, clearFields, addFile } = addClassSlice.actions;
