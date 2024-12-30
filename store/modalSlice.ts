import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IModal } from "../types/interfaces";

const initialState: IModal = {
   successModal: {
      message: "",
      isOpen: false,
   },
   addClassModalOpen: false,
   gradesModalOpen: false,
   showAddStudents: false,
   colorsModalOpen: false,
   addUnitModalOpen: false,
   selectOrganizationOpen: false,
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
      toggleSelectOrg: (state: IModal) => {
         state.selectOrganizationOpen = !state.selectOrganizationOpen;
      },
      closeSelectOrg: (state: IModal) => {
         state.selectOrganizationOpen = false;
      },

      openSuccessModal: (state: IModal, action: PayloadAction<string>) => {
         state.successModal.isOpen = true;
         state.successModal.message = action.payload;
      },

      closeSuccessModal: (state: IModal) => {
         state.successModal.isOpen = false;
         state.successModal.message = "";
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
   toggleSelectOrg,
   closeSelectOrg,
   openSuccessModal,
   closeSuccessModal,
} = modalSlice.actions;

export default modalSlice.reducer;
