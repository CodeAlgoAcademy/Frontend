import { ISingleStudent } from "./student.interface";

export interface newLesson {
   topic: {
      title: string;
      description: string;
   };
   students: ISingleStudent[];
   start_date: string;
   end_date: string;
   status: "published" | "unpublished";
}

export interface Ilessons {
   title: string;
   id: number;
   description: string;
   unit_name: string;
   date: string;
   status: string;
}
