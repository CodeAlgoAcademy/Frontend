import { ISingleStudent } from "./student.interface";

export interface IMainAssignment {
   id?: string | number;
   title: string;
   order: string;
   date: string;
   number: number;
   skills: AssignmentSkill[];
   students: ISingleStudent[];
   is_current: boolean;
   status: string;
   start_date: string;
   end_date: string;
}

export interface AssignmentDetails {
   title: string;
   order: string;
   start_date: string;
   end_date: string;
   number: number;
   skills: AssignmentSkill[];
   students: ISingleStudent[];
   is_current: boolean;
}

export interface AssignmentSkill {
   skillId: string;
}

export interface IAllAssignments {
   assignments: AssignmentDetails[];
}
