export interface IModal {
   addClassModalOpen: boolean;
   gradesModalOpen: boolean;
   showAddStudents: boolean;
   colorsModalOpen: boolean;
   addUnitModalOpen: boolean;
   selectOrganizationOpen: boolean;
   // Parents dashboard
   addChildModalOpen: boolean;
}

export interface IFetch {
   errorModalOpen: boolean;
   errors: string[];
   loading: boolean;
   loadingText: string;
}
