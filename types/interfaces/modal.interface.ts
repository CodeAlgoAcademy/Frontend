export interface IModal {
   addClassModalOpen: boolean;
   gradesModalOpen: boolean;
   showAddStudents: boolean;
   colorsModalOpen: boolean;
   addUnitModalOpen: boolean;
   selectOrganizationOpen: boolean;
   // Parents dashboard
   addChildModalOpen: boolean;
   dictionaryModal: {
      word: string;
      isOpen: boolean;
   };
   successModal: {
      message: string;
      isOpen: boolean;
      studentId?:string;
   };
   generatingModal: {
    isOpen: boolean;
    message?: string;
  };
  isEditMode: boolean; 
  editingClassId: string | null | number;
}

export interface IFetch {
   errorModalOpen: boolean;
   errors: string[];
   loading: boolean;
   loadingText: string;
}
