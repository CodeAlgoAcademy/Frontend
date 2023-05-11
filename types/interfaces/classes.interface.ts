import { ISingleStudent } from "./student.interface";

export interface IAllClasses {
   classes: IClass[];
}

export interface IAddClass {
   student: ISingleStudent;
   class: ISingleClass;
   file: any;
}

export interface IClass {
   teacher: {
      email: string;
      firstname: string;
      lastname: string;
      country: string;
      schoolName: string;
      id: string | number;
   };
   className: string;
   roomNumber: number | string;
   subject: string;
   coTeachers: string;
   grade: string;
   color: string;
   totalStudent: number | string;
   id: number | string;
}

export interface ISingleClass {
   className: string;
   roomNumber: number | string;
   subject: string;
   coTeachers: string;
   grade: string;
   color: string;
}

export interface CurrentClassState {
    className: string;
    color: string;
    id: string | number;
 }