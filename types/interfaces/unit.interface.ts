export interface IUnitsSlice {
   addUnit: {
      standard: string;
      units: Array<{
         id: number | string;
         title: string;
         isCurrent: boolean;
         startDate: string;
         endDate: string;
         hoverText: string;
         isChosen: boolean;
      }>;
      rearrangedUnits: Array<{
         description: string;
         end_date: string;
         grades: string[];
         is_current: boolean;
         is_finished: boolean;
         level: string;
         standard: string;
         start_date: string;
         title: string;
         class_model: string | number;
      }>;
      levels: string;
      grades: string[];
      chosenGrades: string[];
      unitsWithError: string[];
   };
   currentUnitInView: {
      id: string | number;
      is_current: boolean;
      is_finished: boolean;
      start_date: string;
   };
}
