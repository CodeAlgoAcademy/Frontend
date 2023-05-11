export interface IAllCurriculum {
   allCurriculum: Icurriculum[];
}

export interface Icurriculum {
   title: string;
   description: string;
   end_date: string;
   start_date: string;
   teacher: null | string;
   grades: string[];
   id: number | string;
   standard: string;
   level: string;
   is_current: boolean;
   is_finished: boolean;
   class_model: string | number;
}
