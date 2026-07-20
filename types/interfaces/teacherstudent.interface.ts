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

export interface IPlayedLevel {
   unit_level: string;
   sort_index: number;
   completed: boolean;
}

export interface ICodingAccess {
   line_coding_locked: boolean;
   block_coding_max_level: string;
   locked_levels?: string[];
   // Only returned by the teacher / parent endpoint.
   played_levels?: IPlayedLevel[];
}
export interface ITeacherStudentsState{
  students: BaseStudent[];
  currentStudent: BaseStudent;
  diagnosticSummary: IDiagnosticSummary[]; 
  lineDiagnosticSummary: ILineDiagnosticSummary[];
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

export interface ILineDiagnosticRecord {
   id: number;
   student: number;
   standard: number;
   standard_code?: string;
   standard_name?: string;
   unit_level: string;
   level_name: string;
   status: string;
   started_at: string;
   completed_at: string | null;
   duration_seconds: number;
   attempts: number;
   pass_count: number;
   fail_count: number;
   hint_uses: number;
   code_snapshot: string;
   ai_feedback: string;
   resilience_flag: boolean;
   innovation_flag: boolean;
   communication_flag: boolean;
   critical_thinking_flag: boolean;
   mastery_band: string;
   persistence_band: string;
   independence_band: string;
   recommended_action: string;
   teacher_flagged: boolean;
   teacher_notes: string;
}

export interface ILineDiagnosticSummary {
   student_id: number;
   student_name: string;
   last_completed_unit_level: string;
   mastery_band: string;
   persistence_band: string;
   independence_band: string;
   recommended_action: string;
   flags: string[];
}