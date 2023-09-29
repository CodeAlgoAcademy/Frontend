import { screentimeTypes } from "./parent.interface";

export interface ISingleStudent {
   firstName: string;
   lastName: string;
   email: string;
   username: string;
   dob: string;
   id?: string;
   timeLimits?: screentimeTypes[];
}

export interface IUserStudent {
   newStudent: ISingleStudent | null;
   students: { students: ISingleStudent[] };
   studentComments: Array<{
      text: string;
      id: number | string;
      date: string;
   }>;
}
