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

}

export interface ICodingAccess {
   line_coding_locked: boolean;
   block_coding_max_level: string;
}
export interface ITeacherStudentsState{
  students: BaseStudent[];
  currentStudent: BaseStudent;
  diagnosticSummary: IDiagnosticSummary[]; 
  isLoading: boolean;
  error?: string;
}

export interface IDiagnosticSummary {
   student_id: number;
   student_name: string;
   last_completed_unit_level: string;
   mastery_band: "remediation" | "developing" | "proficient" | "advanced";
   persistence_band: "low" | "moderate" | "high";
   independence_band: "guided" | "independent";
   recommended_action: string;
   flags: string[];
}