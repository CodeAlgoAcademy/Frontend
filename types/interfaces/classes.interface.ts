import { screentimeTypes } from "./parent.interface";
import { ISingleStudent } from "./student.interface";

export interface IAllClasses {
   classes: IClass[];
   loading?: boolean;
}

export interface IAddClass {
   student: ISingleStudent;
   class: ISingleClass;
   file: any;
}

export interface IClass {
   teacher: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      country: string;
      schoolCountry: string | null;
      schoolName: string | null;
      id: string | number;
   };
   className: string;
   roomNumber: string;
   subject: string;
   coTeacher: string | null;
   grade: string;
   color: string;
   totalStudent: number;
   id: number | string;
   organization: {
      id: string | number;
      name: string;
      description: string;
      invite_code: string;
      status: string;
      created_by: string | null;
   } | null;
}

export interface ISingleClass {
   className: string;
   roomNumber: string;
   subject: string;
   coTeachers: string; 
   grade: string;
   color: string;
   organization: string | number;
}

export interface CurrentClassState {
   className: string;
   color: string;
   id: string | number;
   timeLimits?: screentimeTypes[];
   isOrganizationClass?: boolean;
   organization?: {
      id: string | number;
      name: string;
   } | null;
}