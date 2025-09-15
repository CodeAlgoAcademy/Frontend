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
}

export interface ITeacherStudentsState extends BaseStudent{
  students: BaseStudent[];
  currentStudent: BaseStudent;
  isLoading: boolean;
  error?: string;
}