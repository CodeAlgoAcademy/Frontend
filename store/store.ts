import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./authSlice";
import modalReducer from "./modalSlice";
import addClassReducer from "./addClassSlice";
import allClassesReducer from "./allClassesSlice";
import currentClassReducer from "./currentClassSlice";
import scheduleReducer from "./scheduleSlice";
import unitsSlice from "./unitsSlice";
import messagesReducer from "./messagesSlice";
import notesReducer from "./notesSlice";
import fetchReducer from "./fetchSlice";
import studentReducer from "./studentSlice";
import allCurriculumReducer from "./allCurriculumSlice";
import skillsReducer from "./skillsSlice";
import newAssignmentReducer from "./newAssignmentSlice";
import allAssignmentsReducer from "./allAssignments";
import lessonsReducer from "./lessonsSlice";
import teacherReducer from "./teacherSlice";
import policySliceReducer from "./policySlice";
import parentChildSlice from "./parentChildSlice";
import parentSlice from "./parentSlice";

export const store = configureStore({
   reducer: {
      user: userReducer,
      modal: modalReducer,
      addClass: addClassReducer,
      allClasses: allClassesReducer,
      currentClass: currentClassReducer,
      unit: unitsSlice,
      schedule: scheduleReducer,
      allCurriculum: allCurriculumReducer,
      allLessons: lessonsReducer,
      notes: notesReducer,
      fetch: fetchReducer,
      messages: messagesReducer,
      students: studentReducer,
      skills: skillsReducer,
      addAssignment: newAssignmentReducer,
      allAssignments: allAssignmentsReducer,
      allTeachers: teacherReducer,
      policyCheck: policySliceReducer,
      parentChild: parentChildSlice,
      parent: parentSlice,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
