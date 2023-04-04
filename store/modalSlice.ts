import { createSlice } from "@reduxjs/toolkit";
import { IModal } from "../types/interfaces";

const initialState: IModal = {
   addClassModalOpen: false,
   gradesModalOpen: false,
   showAddStudents: false,
   colorsModalOpen: false,
   addUnitModalOpen: false,
   // parent dashboard
   addChildModalOpen: false,
};

const modalSlice = createSlice({
   name: "modal",
   initialState,
   reducers: {
      openAddClassModal: (state: IModal) => {
         state.addClassModalOpen = true;
      },
      closeAddClassModal: (state: IModal) => {
         state.addClassModalOpen = false;
      },
      openGradesModal: (state: IModal) => {
         state.gradesModalOpen = true;
      },
      closeGradesModal: (state: IModal) => {
         state.gradesModalOpen = false;
      },
      openAddStudentsModal: (state: IModal) => {
         state.showAddStudents = true;
      },
      closeAddStudentsModal: (state: IModal) => {
         state.showAddStudents = false;
      },
      toggleColorModal: (state: IModal) => {
         state.colorsModalOpen = !state.colorsModalOpen;
      },
      closeColorModal: (state: IModal) => {
         state.colorsModalOpen = false;
      },
      openAddUnitModal: (state: IModal) => {
         state.addUnitModalOpen = true;
      },
      closeAddUnitModal: (state: IModal) => {
         state.addUnitModalOpen = false;
      },
      openAddChildModal: (state: IModal) => {
         state.addChildModalOpen = true;
      },
      closeAddChildModal: (state: IModal) => {
         state.addChildModalOpen = false;
      },
   },
});

export const {
   openAddClassModal,
   closeAddClassModal,
   openGradesModal,
   closeGradesModal,
   openAddStudentsModal,
   closeAddStudentsModal,
   toggleColorModal,
   closeColorModal,
   openAddUnitModal,
   closeAddUnitModal,
   openAddChildModal,
   closeAddChildModal,
} = modalSlice.actions;

export default modalSlice.reducer;
