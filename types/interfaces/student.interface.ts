import { AssignmentDetails, IAllAssignments } from "./assignment.interface";
import { screentimeTypes } from "./parent.interface";

export interface ISingleStudent {
   firstName: string;
   lastName: string;
   email: string;
   username: string;
   dob: string;
   id?: string;
   timeLimits?: screentimeTypes[];
   active?: boolean;
   assignments?: AssignmentDetails[];
   student_id?: string;
}

// add the timelimit to it
export interface IStudentWithScreentime extends ISingleStudent {
   timeLimits?: screentimeTypes[];
}

export interface IUserStudent {
   newStudent: ISingleStudent | null;
   students: ISingleStudent[];
   studentComments: Array<{
      text: string;
      id: number | string;
      date: string;
   }>;
   currentStudent?: IStudentWithScreentime;
}
