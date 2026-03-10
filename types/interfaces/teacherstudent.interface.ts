import { LevelThresholdInputProps } from "@/components/parents/UI/levelthreshold";
import { IChildSkill, IChildTopics, screentimeTypes } from "./parent.interface";

export interface BaseStudent {
 question_level?: number;
   skills?: IChildSkill[];
   progress?: IChildTopics;
   level?: number;
   username: string;
   fullName: string;
   firstName:string;
   lastName:string;
   codingExperience: string;
   dob: string;
   timeLimits: screentimeTypes[];
   friend?: string;
   id?: string | number;
   friends?: {
      id: number;
      friend: string;
   }[];
   student_id:string | number;
  levelThresholds: LevelThresholdInputProps[];
  classId: number | string;
  codingAccess?: ICodingAccess; 
  // blockLevels: IBlockLevel[]
}

export interface IBlockLevel {
   id: number;
   name: string; // This is likely what we use for the "22_40" code
   data: {
      [key: string]: string; // Represents additionalProp1, etc.
   };
   student_id: number;
   student: string;
   created_at: string;
}
export interface ICodingAccess {
   line_coding_locked: boolean;
   block_coding_max_level: string;
}

export interface ITeacherStudentsState{
  students: BaseStudent[];
  currentStudent: BaseStudent;
  isLoading: boolean;
  error?: string;
}